module Main exposing (..)

import AnimationFrame
import Date exposing (Date)
import Debug
import Dict exposing (Dict)
import Graph exposing (Graph)
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Html.Lazy
import Http
import IntDict exposing (IntDict)
import Navigation
import ParseInt
import Random
import Regex exposing (Regex)
import RouteUrl
import RouteUrl.Builder
import Set exposing (Set)
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Events as SE
import Svg.Lazy
import Task
import Time exposing (Time)
import Visualization.Shape as VS
import Markdown
import Drag
import GitHubGraph
import Hash
import Backend exposing (Data, Me)
import ForceGraph as FG exposing (ForceGraph)
import StrictEvents


type alias Config =
    { initialDate : Time
    }


type alias Model =
    { config : Config
    , me : Maybe Me
    , page : Page
    , currentDate : Date
    , drag : Drag.Model CardSource CardDestination Msg
    , data : Data
    , allCards : Dict GitHubGraph.ID Card
    , selectedCards : List GitHubGraph.ID
    , anticipatedCards : List GitHubGraph.ID
    , highlightedCard : Maybe GitHubGraph.ID
    , highlightedNode : Maybe GitHubGraph.ID
    , cardGraphs : List (ForceGraph (Node CardNodeState))
    , computeGraph : Data -> List Card -> List (ForceGraph (Node CardNodeState))
    , deletingLabels : Set ( String, String )
    , editingLabels : Dict ( String, String ) GitHubGraph.Label
    }


type alias CardNodeState =
    { currentDate : Date
    , selectedCards : List GitHubGraph.ID
    , anticipatedCards : List GitHubGraph.ID
    , highlightedNode : Maybe GitHubGraph.ID
    }


type alias Card =
    { id : GitHubGraph.ID
    , url : String
    , number : Int
    , title : String
    , updatedAt : Date
    , author : Maybe GitHubGraph.User
    , labels : List GitHubGraph.Label
    , cards : List GitHubGraph.CardLocation
    , commentCount : Int
    , reactions : GitHubGraph.Reactions
    , score : Int
    , state : CardState
    }


type CardState
    = IssueState GitHubGraph.IssueState
    | PullRequestState GitHubGraph.PullRequestState


type alias CardDestination =
    { projectId : GitHubGraph.ID
    , columnId : GitHubGraph.ID
    , afterId : Maybe GitHubGraph.ID
    }


type CardSource
    = FromColumnCardSource { columnId : GitHubGraph.ID, cardId : GitHubGraph.ID }
    | NewContentCardSource { contentId : GitHubGraph.ID }


type Msg
    = Noop
    | SetPage Page
    | Tick Time
    | SetCurrentDate Date
    | Drag (Drag.Msg CardSource CardDestination Msg)
    | MoveCardAfter CardSource CardDestination
    | CardMoved GitHubGraph.ID (Result GitHubGraph.Error GitHubGraph.ID)
    | CardsFetched (Model -> ( Model, Cmd Msg )) GitHubGraph.ID (Result Http.Error (List GitHubGraph.ProjectColumnCard))
    | MeFetched (Result Http.Error (Maybe Me))
    | DataFetched (Result Http.Error Data)
    | SelectCard GitHubGraph.ID
    | DeselectCard GitHubGraph.ID
    | HighlightNode GitHubGraph.ID
    | UnhighlightNode GitHubGraph.ID
    | AnticipateCardFromNode GitHubGraph.ID
    | UnanticipateCardFromNode GitHubGraph.ID
    | SearchCards String
    | SelectAnticipatedCards
    | ClearSelectedCards
    | MirrorLabel GitHubGraph.Label
    | StartDeletingLabel GitHubGraph.Label
    | StopDeletingLabel GitHubGraph.Label
    | DeleteLabel GitHubGraph.Label
    | StartEditingLabel GitHubGraph.Label
    | StopEditingLabel GitHubGraph.Label
    | SetLabelName GitHubGraph.Label String
    | SetLabelColor String
    | RandomizeLabelColor GitHubGraph.Label
    | EditLabel GitHubGraph.Label
    | LabelChanged GitHubGraph.Repo (Result Http.Error ())
    | RepoRefreshed (Result Http.Error GitHubGraph.Repo)


type Page
    = GlobalGraphPage
    | AllProjectsPage
    | ProjectPage String
    | LabelsPage


detectColumn : { icebox : String -> Bool, backlog : String -> Bool, inFlight : String -> Bool, done : String -> Bool }
detectColumn =
    { icebox = (==) "Icebox"
    , backlog = String.startsWith "Backlog"
    , inFlight = (==) "In Flight"
    , done = (==) "Done"
    }


main : RouteUrl.RouteUrlProgram Config Model Msg
main =
    RouteUrl.programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        , delta2url = delta2url
        , location2messages = location2messages
        }


delta2url : Model -> Model -> Maybe RouteUrl.UrlChange
delta2url a b =
    let
        withPageEntry =
            if a.page == b.page then
                identity
            else
                RouteUrl.Builder.newEntry

        withPagePath =
            case b.page of
                GlobalGraphPage ->
                    RouteUrl.Builder.replacePath []

                AllProjectsPage ->
                    RouteUrl.Builder.replacePath [ "projects" ]

                ProjectPage name ->
                    RouteUrl.Builder.replacePath [ "projects", name ]

                LabelsPage ->
                    RouteUrl.Builder.replacePath [ "labels" ]

        withSelection =
            RouteUrl.Builder.replaceHash (String.join "," b.selectedCards)

        builder =
            List.foldl (\f b -> f b) RouteUrl.Builder.builder [ withPageEntry, withPagePath, withSelection ]
    in
        Just (RouteUrl.Builder.toUrlChange builder)


location2messages : Navigation.Location -> List Msg
location2messages loc =
    let
        builder =
            RouteUrl.Builder.fromUrl loc.href

        path =
            RouteUrl.Builder.path builder

        hash =
            RouteUrl.Builder.hash builder

        page =
            case path of
                [] ->
                    SetPage GlobalGraphPage

                [ "projects" ] ->
                    SetPage AllProjectsPage

                [ "projects", name ] ->
                    SetPage (ProjectPage name)

                [ "labels" ] ->
                    SetPage LabelsPage

                _ ->
                    SetPage GlobalGraphPage

        selection =
            List.map SelectCard (String.split "," hash)
    in
        page :: selection


type alias CardNodeRadii =
    { base : Float
    , withLabels : Float
    , withFlair : Float
    }


type alias NodeBounds =
    { x1 : Float
    , y1 : Float
    , x2 : Float
    , y2 : Float
    }


type alias Position =
    { x : Float
    , y : Float
    }


type alias Node a =
    { viewLower : Position -> a -> Svg Msg
    , viewUpper : Position -> a -> Svg Msg
    , bounds : Position -> NodeBounds
    , score : Int
    }


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , page = GlobalGraphPage
      , me = Nothing
      , data = Backend.emptyData
      , allCards = Dict.empty
      , selectedCards = []
      , anticipatedCards = []
      , highlightedCard = Nothing
      , highlightedNode = Nothing
      , currentDate = Date.fromTime config.initialDate
      , cardGraphs = []
      , computeGraph = computeReferenceGraph
      , drag = Drag.init
      , deletingLabels = Set.empty
      , editingLabels = Dict.empty
      }
    , Cmd.batch
        [ Backend.fetchData DataFetched
        , Backend.fetchMe MeFetched
        ]
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every Time.second (SetCurrentDate << Date.fromTime)
        , if List.all FG.isCompleted model.cardGraphs then
            Sub.none
          else
            AnimationFrame.times Tick
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        SetPage page ->
            let
                compute data cards =
                    case page of
                        GlobalGraphPage ->
                            computeReferenceGraph data cards

                        AllProjectsPage ->
                            []

                        ProjectPage name ->
                            computeReferenceGraph data (List.filter (isInProject name) cards)

                        LabelsPage ->
                            []
            in
                ( { model
                    | page = page
                    , cardGraphs = compute model.data (Dict.values model.allCards)
                    , computeGraph = compute
                  }
                , Cmd.none
                )

        Tick _ ->
            ( { model
                | cardGraphs =
                    List.map
                        (\g ->
                            if FG.isCompleted g then
                                g
                            else
                                FG.tick g
                        )
                        model.cardGraphs
              }
            , Cmd.none
            )

        SetCurrentDate date ->
            ( { model | currentDate = date }, Cmd.none )

        Drag msg ->
            let
                dragModel =
                    Drag.update msg model.drag

                newModel =
                    { model | drag = dragModel }
            in
                case dragModel of
                    Drag.Dropped { msg } ->
                        update msg newModel

                    _ ->
                        ( newModel, Cmd.none )

        MoveCardAfter source dest ->
            case source of
                FromColumnCardSource { cardId } ->
                    ( model, moveCard model dest cardId )

                NewContentCardSource { contentId } ->
                    ( model, addCard model dest contentId )

        CardMoved col (Ok cardId) ->
            case model.drag of
                Drag.Dropped drag ->
                    let
                        finishDrag model =
                            ( { model
                                | drag = Drag.complete model.drag
                                , cardGraphs = model.computeGraph model.data (Dict.values model.allCards)
                              }
                            , Cmd.none
                            )

                        refresh landed id model =
                            ( { model
                                | drag =
                                    if landed then
                                        Drag.land model.drag
                                    else
                                        model.drag
                              }
                            , Backend.refreshCards id (CardsFetched finishDrag id)
                            )
                    in
                        case drag.source of
                            FromColumnCardSource cs ->
                                if cs.columnId == col then
                                    refresh False col model
                                else
                                    ( model, Backend.refreshCards col (CardsFetched (refresh True cs.columnId) col) )

                            NewContentCardSource _ ->
                                refresh False col model

                _ ->
                    ( model, Cmd.none )

        CardMoved col (Err msg) ->
            flip always (Debug.log "failed to move card" msg) <|
                ( model, Cmd.none )

        CardsFetched cb col (Ok cards) ->
            let
                data =
                    model.data
            in
                cb
                    { model
                        | data = { data | cards = Dict.insert col cards data.cards }
                        , allCards = addProjectCards cards model.allCards
                    }

        CardsFetched _ col (Err msg) ->
            flip always (Debug.log "failed to refresh cards" msg) <|
                ( model, Cmd.none )

        SearchCards "" ->
            ( { model | anticipatedCards = [] }, Cmd.none )

        SearchCards query ->
            let
                cardMatch { id, title } =
                    if String.contains (String.toLower query) (String.toLower title) then
                        Just id
                    else
                        Nothing

                foundCards =
                    List.filterMap cardMatch (Dict.values model.allCards)
            in
                ( { model | anticipatedCards = foundCards }, Cmd.none )

        SelectAnticipatedCards ->
            ( { model
                | anticipatedCards = []
                , selectedCards = model.selectedCards ++ model.anticipatedCards
              }
            , Cmd.none
            )

        SelectCard id ->
            ( { model
                | selectedCards =
                    if List.member id model.selectedCards then
                        model.selectedCards
                    else
                        model.selectedCards ++ [ id ]
              }
            , Cmd.none
            )

        ClearSelectedCards ->
            ( { model | selectedCards = [] }, Cmd.none )

        DeselectCard id ->
            ( { model
                | selectedCards = List.filter ((/=) id) model.selectedCards
              }
            , Cmd.none
            )

        HighlightNode id ->
            ( { model | highlightedNode = Just id }, Cmd.none )

        UnhighlightNode id ->
            ( { model | highlightedNode = Nothing }, Cmd.none )

        AnticipateCardFromNode id ->
            ( { model
                | anticipatedCards = id :: model.anticipatedCards
                , highlightedCard = Just id
              }
            , Cmd.none
            )

        UnanticipateCardFromNode id ->
            ( { model
                | anticipatedCards = List.filter ((/=) id) model.anticipatedCards
                , highlightedCard = Nothing
              }
            , Cmd.none
            )

        MeFetched (Ok me) ->
            ( { model | me = me }, Cmd.none )

        MeFetched (Err msg) ->
            flip always (Debug.log "error fetching self" msg) <|
                ( model, Cmd.none )

        DataFetched (Ok data) ->
            let
                withIssues =
                    Dict.foldl (\_ is cards -> List.foldl (\i -> Dict.insert i.id (issueCard i)) cards is) Dict.empty data.issues

                withPRs =
                    Dict.foldl (\_ ps cards -> List.foldl (\p -> Dict.insert p.id (prCard p)) cards ps) withIssues data.prs

                allCards =
                    List.foldl addProjectCards withPRs (Dict.values data.cards)
            in
                ( { model
                    | data = data
                    , allCards = allCards
                    , cardGraphs = model.computeGraph data (Dict.values allCards)
                  }
                , Backend.pollData DataFetched
                )

        DataFetched (Err msg) ->
            flip always (Debug.log "error fetching data" msg) <|
                ( model, Backend.pollData DataFetched )

        MirrorLabel newLabel ->
            let
                cmds =
                    List.map
                        (\r ->
                            case List.filter ((==) newLabel.name << .name) r.labels of
                                [] ->
                                    createLabel model r newLabel

                                label :: _ ->
                                    if label.color /= newLabel.color then
                                        updateLabel model r label newLabel
                                    else
                                        Cmd.none
                        )
                        model.data.repos
            in
                ( model, Cmd.batch cmds )

        StartDeletingLabel { name, color } ->
            ( { model | deletingLabels = Set.insert ( name, color ) model.deletingLabels }, Cmd.none )

        StopDeletingLabel { name, color } ->
            ( { model | deletingLabels = Set.remove ( name, color ) model.deletingLabels }, Cmd.none )

        DeleteLabel { name, color } ->
            let
                cmds =
                    List.map
                        (\r ->
                            case List.filter ((==) name << .name) r.labels of
                                [] ->
                                    Cmd.none

                                label :: _ ->
                                    if label.color == color then
                                        deleteLabel model r label
                                    else
                                        Cmd.none
                        )
                        model.data.repos
            in
                ( { model | deletingLabels = Set.remove ( name, color ) model.deletingLabels }, Cmd.batch cmds )

        StartEditingLabel ({ name, color } as label) ->
            ( { model | editingLabels = Dict.insert ( name, color ) label model.editingLabels }, Cmd.none )

        StopEditingLabel { name, color } ->
            ( { model | editingLabels = Dict.remove ( name, color ) model.editingLabels }, Cmd.none )

        SetLabelName { name, color } newName ->
            ( { model
                | editingLabels =
                    Dict.update ( name, color ) (Maybe.map (\label -> { label | name = newName })) model.editingLabels
              }
            , Cmd.none
            )

        SetLabelColor newColor ->
            ( { model
                | editingLabels =
                    Dict.map (\_ label -> { label | color = newColor }) model.editingLabels
              }
            , Cmd.none
            )

        RandomizeLabelColor { name, color } ->
            case Dict.get ( name, color ) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    let
                        currentColor =
                            Maybe.withDefault 0 <| Result.toMaybe <| ParseInt.parseIntHex newLabel.color

                        ( randomColor, _ ) =
                            Random.step (Random.int 0x00 0x00FFFFFF) (Random.initialSeed currentColor)

                        randomHex =
                            String.padLeft 6 '0' (ParseInt.toHex randomColor)
                    in
                        ( { model
                            | editingLabels =
                                Dict.insert ( name, color ) { newLabel | color = randomHex } model.editingLabels
                          }
                        , Cmd.none
                        )

        EditLabel ({ name, color } as oldLabel) ->
            case Dict.get ( name, color ) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    let
                        cmds =
                            List.map
                                (\r ->
                                    if List.member oldLabel r.labels then
                                        updateLabel model r oldLabel newLabel
                                    else
                                        Cmd.none
                                )
                                model.data.repos
                    in
                        ( { model | editingLabels = Dict.remove ( name, color ) model.editingLabels }, Cmd.batch cmds )

        LabelChanged repo (Ok ()) ->
            let
                repoSel =
                    { owner = repo.owner, name = repo.name }
            in
                ( model, Backend.refreshRepo repoSel RepoRefreshed )

        LabelChanged repo (Err msg) ->
            flip always (Debug.log "failed to modify labels" msg) <|
                ( model, Cmd.none )

        RepoRefreshed (Ok repo) ->
            let
                data =
                    model.data
            in
                ( { model
                    | data =
                        { data
                            | repos =
                                List.map
                                    (\r ->
                                        if r.id == repo.id then
                                            repo
                                        else
                                            r
                                    )
                                    data.repos
                        }
                  }
                , Cmd.none
                )

        RepoRefreshed (Err msg) ->
            flip always (Debug.log "failed to refresh repo" msg) <|
                ( model, Cmd.none )


addProjectCards : List GitHubGraph.ProjectColumnCard -> Dict GitHubGraph.ID Card -> Dict GitHubGraph.ID Card
addProjectCards cards allCards =
    List.foldl
        (\card ->
            case card.content of
                Nothing ->
                    identity

                Just (GitHubGraph.IssueCardContent i) ->
                    Dict.insert i.id (issueCard i)

                Just (GitHubGraph.PullRequestCardContent p) ->
                    Dict.insert p.id (prCard p)
        )
        allCards
        cards


issueCard : GitHubGraph.Issue -> Card
issueCard ({ id, url, number, title, updatedAt, author, labels, cards, commentCount, reactions, state } as issue) =
    { id = id
    , url = url
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , labels = labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHubGraph.issueScore issue
    , state = IssueState state
    }


prCard : GitHubGraph.PullRequest -> Card
prCard ({ id, url, number, title, updatedAt, author, labels, cards, commentCount, reactions, state } as pr) =
    { id = id
    , url = url
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , labels = labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHubGraph.pullRequestScore pr
    , state = PullRequestState state
    }


view : Model -> Html Msg
view model =
    let
        anticipatedCards =
            List.map (viewCardEntry model) <|
                List.filterMap (flip Dict.get model.allCards) <|
                    List.filter (not << flip List.member model.selectedCards) model.anticipatedCards

        selectedCards =
            List.map (viewCardEntry model) <|
                List.filterMap (flip Dict.get model.allCards) model.selectedCards

        sidebarCards =
            selectedCards ++ anticipatedCards
    in
        Html.div [ HA.class "cadet" ]
            [ Html.div [ HA.class "main-page" ]
                [ Html.div [ HA.class "page-content" ]
                    [ case model.page of
                        GlobalGraphPage ->
                            viewSpatialGraph model

                        AllProjectsPage ->
                            viewAllProjectsPage model

                        ProjectPage id ->
                            viewProjectPage model id

                        LabelsPage ->
                            viewLabelsPage model
                    ]
                , Html.div [ HA.class "page-sidebar" ]
                    [ if List.isEmpty sidebarCards then
                        Html.div [ HA.class "no-cards" ]
                            [ Html.text "no cards selected" ]
                      else
                        Html.div [ HA.class "cards" ] sidebarCards
                    ]
                ]
            , viewNavBar model
            ]


viewSpatialGraph : Model -> Html Msg
viewSpatialGraph model =
    Html.div [ HA.class "spatial-graph" ] <|
        List.map (Html.Lazy.lazy (viewGraph model)) model.cardGraphs


viewNavBar : Model -> Html Msg
viewNavBar model =
    Html.div [ HA.class "bottom-bar" ]
        [ Html.div [ HA.class "nav" ]
            [ case model.me of
                Nothing ->
                    Html.a [ HA.class "button user-info", HA.href "/auth/github" ]
                        [ Html.span [ HA.class "log-in-icon octicon octicon-sign-in" ] []
                        , Html.text "log in"
                        ]

                Just { user } ->
                    Html.a [ HA.class "button user-info", HA.href user.url ]
                        [ Html.img [ HA.class "user-avatar", HA.src user.avatar ] []
                        , Html.text user.login
                        ]
            , Html.a [ HA.class "button", HA.href "/", StrictEvents.onLeftClick (SetPage GlobalGraphPage) ]
                [ Html.span [ HA.class "octicon octicon-globe" ] []
                ]
            , Html.a [ HA.class "button", HA.href "/projects", StrictEvents.onLeftClick (SetPage AllProjectsPage) ]
                [ Html.span [ HA.class "octicon octicon-list-unordered" ] []
                ]
            , Html.a [ HA.class "button", HA.href "/labels", StrictEvents.onLeftClick (SetPage LabelsPage) ]
                [ Html.span [ HA.class "octicon octicon-tag" ] []
                ]
            ]
        , viewSearch
        ]


type alias ProjectState =
    { project : GitHubGraph.Project
    , icebox : GitHubGraph.ProjectColumn
    , backlogs : List GitHubGraph.ProjectColumn
    , inFlight : GitHubGraph.ProjectColumn
    , done : GitHubGraph.ProjectColumn
    }


selectStatefulProject : GitHubGraph.Project -> Maybe ProjectState
selectStatefulProject project =
    let
        findColumns match =
            List.filter (match << .name) project.columns

        icebox =
            findColumns (detectColumn.icebox)

        backlogs =
            findColumns (detectColumn.backlog)

        inFlights =
            findColumns (detectColumn.inFlight)

        dones =
            findColumns (detectColumn.done)
    in
        case ( icebox, backlogs, inFlights, dones ) of
            ( [ ib ], (_ :: _) as bs, [ i ], [ d ] ) ->
                Just
                    { project = project
                    , icebox = ib
                    , backlogs = bs
                    , inFlight = i
                    , done = d
                    }

            _ ->
                Nothing


viewAllProjectsPage : Model -> Html Msg
viewAllProjectsPage model =
    let
        statefulProjects =
            List.filterMap selectStatefulProject model.data.projects
    in
        Html.div [ HA.class "project-table" ]
            [ Html.div [ HA.class "projects" ]
                (List.map (viewProject model) statefulProjects)
            ]


viewLabelsPage : Model -> Html Msg
viewLabelsPage model =
    let
        addRepo repo =
            Just << Maybe.withDefault [ repo ] << Maybe.map ((::) repo)

        reposByLabel =
            List.foldl
                (\repo cbn ->
                    List.foldl
                        (\label cbn2 ->
                            Dict.update ( label.name, label.color ) (addRepo repo) cbn2
                        )
                        cbn
                        repo.labels
                )
                Dict.empty
                model.data.repos

        allCards =
            Dict.values model.allCards
    in
        Html.div [ HA.class "all-labels" ] <|
            flip List.map (Dict.toList reposByLabel) <|
                \( ( name, color ), repos ) ->
                    viewLabelRow model { name = name, color = color } repos allCards


viewLabelRow : Model -> GitHubGraph.Label -> List GitHubGraph.Repo -> List Card -> Html Msg
viewLabelRow model ({ name, color } as label) repos allCards =
    let
        stateKey =
            ( name, color )
    in
        Html.div [ HA.class "label-row" ] <|
            [ Html.div [ HA.class "label-cell" ]
                [ Html.div [ HA.class "label-name" ]
                    [ case Dict.get stateKey model.editingLabels of
                        Nothing ->
                            Html.div [ HA.class "label-background" ]
                                [ if Dict.isEmpty model.editingLabels then
                                    Html.span
                                        [ HA.class "label-icon octicon octicon-tag"
                                        , labelColorStyle color
                                        ]
                                        []
                                  else
                                    Html.span
                                        [ HA.class "label-icon label-color-control octicon octicon-paintcan"
                                        , HE.onClick (SetLabelColor color)
                                        , labelColorStyle color
                                        ]
                                        []
                                , Html.span
                                    [ HA.class "label big"
                                    , labelColorStyle color
                                    ]
                                    [ Html.span [ HA.class "label-text" ]
                                        [ Html.text name ]
                                    ]
                                ]

                        Just newLabel ->
                            Html.form [ HA.class "label-edit", HE.onSubmit (EditLabel label) ]
                                [ Html.span
                                    [ HA.class "label-icon label-color-control octicon octicon-sync"
                                    , HE.onClick (RandomizeLabelColor label)
                                    , labelColorStyle newLabel.color
                                    ]
                                    []
                                , Html.input
                                    [ HE.onInput (SetLabelName label)
                                    , HA.value newLabel.name
                                    , labelColorStyle newLabel.color
                                    ]
                                    []
                                ]
                    ]
                ]
            , Html.div [ HA.class "label-cell" ]
                [ Html.div [ HA.class "label-repos" ] <|
                    let
                        ( prs, issues ) =
                            List.partition isPR (List.filter (\c -> isOpen c && List.member label c.labels) allCards)
                    in
                        [ case List.length issues of
                            1 ->
                                Html.text ("1 issue")

                            n ->
                                Html.text (toString n ++ " issues")
                        , Html.text ", "
                        , case List.length prs of
                            1 ->
                                Html.text ("1 pr")

                            n ->
                                Html.text (toString n ++ " prs")
                        , Html.span [ HA.title (String.join ", " (List.map .name repos)) ]
                            [ case List.length repos of
                                1 ->
                                    Html.text " in 1 repo"

                                n ->
                                    Html.text (" across " ++ toString n ++ " repos")
                            ]
                        ]
                ]
            , Html.div [ HA.class "label-cell drawer-cell" ]
                [ Html.div [ HA.class "label-controls" ]
                    [ Html.span
                        [ HE.onClick (MirrorLabel label)
                        , HA.class "button octicon octicon-mirror"
                        ]
                        []
                    , if Dict.member ( name, color ) model.editingLabels then
                        Html.span
                            [ HE.onClick (StopEditingLabel label)
                            , HA.class "button octicon octicon-x"
                            ]
                            []
                      else
                        Html.span
                            [ HE.onClick (StartEditingLabel label)
                            , HA.class "button octicon octicon-pencil"
                            ]
                            []
                    , if Set.member ( name, color ) model.deletingLabels then
                        Html.span
                            [ HE.onClick (StopDeletingLabel label)
                            , HA.class "button close octicon octicon-x"
                            ]
                            []
                      else
                        Html.span
                            [ HE.onClick (StartDeletingLabel label)
                            , HA.class "button octicon octicon-trashcan"
                            ]
                            []
                    ]
                , let
                    isDeleting =
                        Set.member stateKey model.deletingLabels

                    isEditing =
                        Dict.member stateKey model.editingLabels
                  in
                    Html.div
                        [ HA.classList
                            [ ( "label-confirm", True )
                            , ( "active", isDeleting || isEditing )
                            ]
                        ]
                        [ if isDeleting then
                            Html.span
                                [ HE.onClick (DeleteLabel label)
                                , HA.class "button delete octicon octicon-check"
                                ]
                                []
                          else
                            Html.span
                                [ HE.onClick (EditLabel label)
                                , HA.class "button edit octicon octicon-check"
                                ]
                                []
                        ]
                ]
            ]


labelColorStyle : String -> Html.Attribute Msg
labelColorStyle color =
    HA.style
        [ ( "background-color", "#" ++ color )
        , ( "color"
          , if colorIsLight color then
                -- GitHub appears to pre-compute a hex code, but this seems to be
                -- pretty much all it's doing
                "rgba(0, 0, 0, .8)"
            else
                -- for darker backgrounds they just do white
                "#fff"
          )
        ]


viewLabelBig : GitHubGraph.Label -> Html Msg
viewLabelBig label =
    Html.span
        [ HA.class "label big"
        , labelColorStyle label.color
        ]
        [ Html.span [ HA.class "octicon octicon-tag" ]
            [ Html.text "" ]
        , Html.text " "
        , Html.span [ HA.class "label-text" ]
            [ Html.text label.name ]
        ]


onlyOpenContentCards : List GitHubGraph.ProjectColumnCard -> List GitHubGraph.ProjectColumnCard
onlyOpenContentCards =
    List.filter <|
        \{ content } ->
            case content of
                Just (GitHubGraph.IssueCardContent issue) ->
                    issue.state == GitHubGraph.IssueStateOpen

                Just (GitHubGraph.PullRequestCardContent pr) ->
                    pr.state == GitHubGraph.PullRequestStateOpen

                Nothing ->
                    False


viewProject : Model -> ProjectState -> Html Msg
viewProject model { project, backlogs, inFlight, done } =
    Html.div [ HA.class "project" ]
        [ Html.div [ HA.class "project-columns" ]
            [ Html.div [ HA.class "column name-column" ]
                [ Html.h4 []
                    [ Html.a
                        [ HA.href ("/projects/" ++ project.name)
                        , StrictEvents.onLeftClick (SetPage (ProjectPage project.name))
                        ]
                        [ Html.text project.name ]
                    ]
                ]
            , Html.div [ HA.class "column backlog-column" ]
                (List.map (\backlog -> viewProjectColumn model project (List.take 3) backlog) backlogs)
            , Html.div [ HA.class "column in-flight-column" ]
                [ viewProjectColumn model project identity inFlight ]
            , Html.div [ HA.class "column done-column" ]
                [ viewProjectColumn model project onlyOpenContentCards done ]
            ]
        ]


viewProjectColumn : Model -> GitHubGraph.Project -> (List GitHubGraph.ProjectColumnCard -> List GitHubGraph.ProjectColumnCard) -> GitHubGraph.ProjectColumn -> Html Msg
viewProjectColumn model project mod col =
    let
        cards =
            mod <|
                Maybe.withDefault [] (Dict.get col.id model.data.cards)

        dropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Nothing
                }
            }
    in
        Html.div [ HA.class "project-column" ]
            [ Html.div [ HA.class "column-name" ] [ Html.text col.name ]
            , if List.isEmpty cards then
                Html.div [ HA.class "no-cards" ]
                    [ Drag.viewDropArea model.drag Drag dropCandidate Nothing
                    ]
              else
                Html.div [ HA.class "cards" ] <|
                    Drag.viewDropArea model.drag Drag dropCandidate Nothing
                        :: List.concatMap (viewProjectColumnCard model project col) cards
            ]


viewProjectColumnCard : Model -> GitHubGraph.Project -> GitHubGraph.ProjectColumn -> GitHubGraph.ProjectColumnCard -> List (Html Msg)
viewProjectColumnCard model project col ghCard =
    let
        dragId =
            FromColumnCardSource { columnId = col.id, cardId = ghCard.id }

        dropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Just ghCard.id
                }
            }
    in
        case ( ghCard.note, ghCard.content ) of
            ( Just n, Nothing ) ->
                [ Drag.draggable model.drag Drag dragId (viewNoteCard model col n)
                , Drag.viewDropArea model.drag Drag dropCandidate (Just dragId)
                ]

            ( Nothing, Just content ) ->
                let
                    card =
                        case content of
                            GitHubGraph.IssueCardContent issue ->
                                issueCard issue

                            GitHubGraph.PullRequestCardContent pr ->
                                prCard pr
                in
                    [ Drag.draggable model.drag Drag dragId (viewCard model card)
                    , Drag.viewDropArea model.drag Drag dropCandidate (Just dragId)
                    ]

            _ ->
                Debug.crash "impossible"


viewProjectPage : Model -> String -> Html Msg
viewProjectPage model name =
    let
        statefulProjects =
            List.filterMap selectStatefulProject model.data.projects

        mproject =
            List.head <|
                List.filter ((==) name << .name << .project) statefulProjects
    in
        case mproject of
            Just project ->
                viewSingleProject model project

            Nothing ->
                Html.text "project not found"


viewSingleProject : Model -> ProjectState -> Html Msg
viewSingleProject model { project, icebox, backlogs, inFlight, done } =
    Html.div [ HA.class "project single" ]
        [ Html.div [ HA.class "project-columns" ]
            ([ Html.div [ HA.class "column name-column" ]
                [ Html.h4 [] [ Html.text project.name ] ]
             , Html.div [ HA.class "column done-column" ]
                [ viewProjectColumn model project onlyOpenContentCards done ]
             , Html.div [ HA.class "column in-flight-column" ]
                [ viewProjectColumn model project identity inFlight ]
             ]
                ++ flip List.map
                    backlogs
                    (\backlog ->
                        Html.div [ HA.class "column backlog-column" ]
                            [ viewProjectColumn model project identity backlog ]
                    )
            )
        , Html.div [ HA.class "icebox-graph" ]
            [ viewSpatialGraph model
            , let
                dropCandidate =
                    { msgFunc = MoveCardAfter
                    , target =
                        { projectId = project.id
                        , columnId = icebox.id
                        , afterId = Nothing
                        }
                    }
              in
                Drag.viewDropArea model.drag Drag dropCandidate Nothing
            ]
        ]


viewSearch : Html Msg
viewSearch =
    Html.div [ HA.class "card-search" ]
        [ Html.span
            [ HE.onClick ClearSelectedCards
            , HA.class "button octicon octicon-x clear-selected"
            ]
            [ Html.text "" ]
        , Html.form [ HE.onSubmit SelectAnticipatedCards ]
            [ Html.input [ HE.onInput SearchCards, HA.placeholder "filter cards" ] [] ]
        ]


computeReferenceGraph : Data -> List Card -> List (ForceGraph (Node CardNodeState))
computeReferenceGraph data cards =
    let
        cardEdges =
            Dict.foldl
                (\idStr sourceIds refs ->
                    let
                        id =
                            Hash.hash idStr
                    in
                        List.map
                            (\sourceId ->
                                { from = Hash.hash sourceId
                                , to = id
                                , label = ()
                                }
                            )
                            sourceIds
                            ++ refs
                )
                []
                data.references

        cardNodeThunks =
            List.map (\card -> Graph.Node (Hash.hash card.id) (cardNode card)) <|
                List.filter isOpen cards

        applyWithContext ({ node, incoming, outgoing } as nc) =
            let
                context =
                    { incoming = incoming, outgoing = outgoing }
            in
                { nc | node = { node | label = node.label context } }

        graph =
            Graph.mapContexts applyWithContext <|
                Graph.fromNodesAndEdges
                    cardNodeThunks
                    cardEdges
    in
        subGraphs graph
            |> List.map FG.fromGraph
            |> List.sortWith graphCompare
            |> List.reverse


graphCompare : ForceGraph (Node a) -> ForceGraph (Node a) -> Order
graphCompare a b =
    case compare (Graph.size a.graph) (Graph.size b.graph) of
        EQ ->
            let
                graphScore =
                    List.foldl (+) 0 << List.map (.label >> .value >> .score) << Graph.nodes
            in
                compare (graphScore a.graph) (graphScore b.graph)

        x ->
            x


viewGraph : Model -> ForceGraph (Node CardNodeState) -> Html Msg
viewGraph model { graph } =
    let
        nodeContexts =
            Graph.fold (::) [] graph

        bounds =
            List.map nodeBounds nodeContexts

        padding =
            10

        minX =
            List.foldl (\{ x1 } acc -> min x1 acc) 999999 bounds - padding

        minY =
            List.foldl (\{ y1 } acc -> min y1 acc) 999999 bounds - padding

        maxX =
            List.foldl (\{ x2 } acc -> max x2 acc) 0 bounds + padding

        maxY =
            List.foldl (\{ y2 } acc -> max y2 acc) 0 bounds + padding

        width =
            maxX - minX

        height =
            maxY - minY

        links =
            (List.map (Svg.Lazy.lazy <| linkPath graph) (Graph.edges graph))

        state =
            { currentDate = model.currentDate
            , selectedCards = model.selectedCards
            , anticipatedCards = model.anticipatedCards
            , highlightedNode = model.highlightedNode
            }

        ( flairs, nodes ) =
            Graph.fold (viewNodeLowerUpper state) ( [], [] ) graph
    in
        Svg.svg
            [ SA.width (toString width ++ "px")
            , SA.height (toString height ++ "px")
            , SA.viewBox (toString minX ++ " " ++ toString minY ++ " " ++ toString width ++ " " ++ toString height)
            ]
            [ Svg.g [ SA.class "links" ] links
            , Svg.g [ SA.class "lower" ] flairs
            , Svg.g [ SA.class "upper" ] nodes
            ]


viewNodeLowerUpper : CardNodeState -> Graph.NodeContext (FG.ForceNode (Node CardNodeState)) () -> ( List (Svg Msg), List (Svg Msg) ) -> ( List (Svg Msg), List (Svg Msg) )
viewNodeLowerUpper state { node } ( fs, ns ) =
    let
        pos =
            { x = node.label.x, y = node.label.y }
    in
        ( Svg.Lazy.lazy2 node.label.value.viewLower pos state :: fs
        , Svg.Lazy.lazy2 node.label.value.viewUpper pos state :: ns
        )


linkPath : Graph (FG.ForceNode n) () -> Graph.Edge () -> Svg Msg
linkPath graph edge =
    let
        source =
            case Maybe.map (.node >> .label) (Graph.get edge.from graph) of
                Just { x, y } ->
                    { x = x, y = y }

                Nothing ->
                    { x = 0, y = 0 }

        target =
            case Maybe.map (.node >> .label) (Graph.get edge.to graph) of
                Just { x, y } ->
                    { x = x, y = y }

                Nothing ->
                    { x = 0, y = 0 }
    in
        Svg.line
            [ SA.strokeWidth "4"
            , SA.stroke "rgba(0,0,0,.2)"
            , SA.x1 (toString source.x)
            , SA.y1 (toString source.y)
            , SA.x2 (toString target.x)
            , SA.y2 (toString target.y)
            ]
            []


type alias GraphContext =
    { incoming : IntDict ()
    , outgoing : IntDict ()
    }


issueRadius : Card -> GraphContext -> Float
issueRadius card { incoming, outgoing } =
    15 + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))


issueRadiusWithLabels : Card -> GraphContext -> Float
issueRadiusWithLabels card context =
    issueRadius card context + 3


flairRadiusBase : Float
flairRadiusBase =
    16


issueRadiusWithFlair : Card -> GraphContext -> Float
issueRadiusWithFlair card context =
    let
        reactionCounts =
            List.map .count card.reactions

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (card.commentCount :: reactionCounts)
    in
        issueRadiusWithLabels card context + flairRadiusBase + toFloat highestFlair


cardNode : Card -> GraphContext -> Node CardNodeState
cardNode card context =
    let
        flair =
            nodeFlairArcs card context

        labels =
            nodeLabelArcs card context

        radii =
            { base = issueRadius card context
            , withLabels = issueRadiusWithLabels card context
            , withFlair = issueRadiusWithFlair card context
            }
    in
        { viewLower = viewCardNodeFlair card radii flair
        , viewUpper = viewCardNode card radii labels
        , bounds =
            \{ x, y } ->
                { x1 = x - radii.withFlair
                , y1 = y - radii.withFlair
                , x2 = x + radii.withFlair
                , y2 = y + radii.withFlair
                }
        , score = card.score
        }


renderCardNode : Card -> CardNodeState -> List (Svg Msg)
renderCardNode card state =
    []


nodeFlairArcs : Card -> GraphContext -> List (Svg Msg)
nodeFlairArcs card context =
    let
        radius =
            issueRadiusWithLabels card context

        reactionTypeEmoji type_ =
            case type_ of
                GitHubGraph.ReactionTypeThumbsUp ->
                    "👍"

                GitHubGraph.ReactionTypeThumbsDown ->
                    "👎"

                GitHubGraph.ReactionTypeLaugh ->
                    "😄"

                GitHubGraph.ReactionTypeConfused ->
                    "😕"

                GitHubGraph.ReactionTypeHeart ->
                    "💖"

                GitHubGraph.ReactionTypeHooray ->
                    "🎉"

        emojiReactions =
            flip List.map card.reactions <|
                \{ type_, count } ->
                    ( reactionTypeEmoji type_, count )

        flairs =
            List.filter (Tuple.second >> flip (>) 0) <|
                (( "💬", card.commentCount ) :: emojiReactions)

        reactionSegment i ( _, count ) =
            let
                segments =
                    VS.pie
                        { startAngle = 0
                        , endAngle = 2 * pi
                        , padAngle = 0.03
                        , sortingFn = \_ _ -> EQ
                        , valueFn = always 1.0
                        , innerRadius = radius
                        , outerRadius = radius + flairRadiusBase + toFloat count
                        , cornerRadius = 3
                        , padRadius = 0
                        }
                        (List.repeat (List.length flairs) 1)
            in
                case List.take 1 (List.drop i segments) of
                    [ s ] ->
                        s

                    _ ->
                        Debug.crash "impossible"

        innerCentroid arc =
            let
                r =
                    arc.innerRadius + 10

                a =
                    (arc.startAngle + arc.endAngle) / 2 - pi / 2
            in
                ( cos a * r, sin a * r )
    in
        flip List.indexedMap flairs <|
            \i (( emoji, count ) as reaction) ->
                let
                    arc =
                        reactionSegment i reaction
                in
                    Svg.g [ SA.class "reveal" ]
                        [ Svg.path
                            [ SA.d (VS.arc arc)
                            ]
                            []
                        , Svg.text_
                            [ SA.transform ("translate" ++ toString (innerCentroid arc))
                            , SA.textAnchor "middle"
                            , SA.alignmentBaseline "middle"
                            , SA.class "hidden"
                            ]
                            [ Svg.text emoji
                            ]
                        ]


nodeLabelArcs : Card -> GraphContext -> List (Svg Msg)
nodeLabelArcs card context =
    let
        radius =
            issueRadius card context

        labelSegments =
            VS.pie
                { startAngle = 0
                , endAngle = 2 * pi
                , padAngle = 0
                , sortingFn = \_ _ -> EQ
                , valueFn = always 1.0
                , innerRadius = radius
                , outerRadius = radius + 3
                , cornerRadius = 0
                , padRadius = 0
                }
                (List.repeat (List.length card.labels) 1)
    in
        List.map2
            (\arc label ->
                Svg.path
                    [ SA.d (VS.arc arc)
                    , SA.fill ("#" ++ label.color)
                    ]
                    []
            )
            labelSegments
            card.labels


viewCardNodeFlair : Card -> CardNodeRadii -> List (Svg Msg) -> Position -> CardNodeState -> Svg Msg
viewCardNodeFlair card radii flair { x, y } state =
    let
        isHighlighted =
            List.member card.id state.anticipatedCards
                || (state.highlightedNode == Just card.id)

        scale =
            if isHighlighted then
                "1.1"
            else
                "1"

        anticipateRadius =
            if List.isEmpty card.labels then
                radii.base + 5
            else
                radii.withLabels + 5

        anticipatedHalo =
            if isHighlighted then
                Svg.circle
                    [ SA.r (toString anticipateRadius)
                    , SA.class "anticipated-circle"
                    ]
                    []
            else
                Svg.text ""

        projectHalo =
            Svg.circle
                [ SA.strokeWidth "2px"
                , SA.r (toString (radii.base + 4))
                , if isInFlight card then
                    SA.class "project-status in-flight"
                  else if isDone card then
                    SA.class "project-status done"
                  else if isIcebox card then
                    SA.class "project-status icebox"
                  else if isBacklog card then
                    SA.class "project-status backlog"
                  else
                    SA.class "project-status untriaged"
                ]
                []
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ") scale(" ++ scale ++ ")")
            , SE.onMouseOver (AnticipateCardFromNode card.id)
            , SE.onMouseOut (UnanticipateCardFromNode card.id)
            , SA.class ("flair " ++ activityClass state.currentDate card.updatedAt)
            ]
            (flair ++ [ projectHalo, anticipatedHalo ])


activityClass : Date -> Date -> String
activityClass now date =
    let
        daysSinceLastUpdate =
            (Date.toTime now / (24 * Time.hour)) - (Date.toTime date / (24 * Time.hour))
    in
        if daysSinceLastUpdate <= 1 then
            "active-today"
        else if daysSinceLastUpdate <= 2 then
            "active-yesterday"
        else if daysSinceLastUpdate <= 7 then
            "active-this-week"
        else
            "active-long-ago"


viewCardNode : Card -> CardNodeRadii -> List (Svg Msg) -> Position -> CardNodeState -> Svg Msg
viewCardNode card radii labels { x, y } state =
    let
        isSelected =
            List.member card.id state.selectedCards

        isHighlighted =
            List.member card.id state.anticipatedCards
                || (state.highlightedNode == Just card.id)

        circleWithNumber =
            case card.state of
                IssueState _ ->
                    [ Svg.circle
                        [ SA.r (toString radii.base)
                        , SA.fill "#fff"
                        ]
                        []
                    , Svg.text_
                        [ SA.textAnchor "middle"
                        , SA.alignmentBaseline "middle"
                        , SA.class "issue-number"
                        ]
                        [ Svg.text (toString card.number)
                        ]
                    ]

                PullRequestState _ ->
                    [ Svg.circle
                        [ SA.r (toString radii.base)
                        , SA.class "pr-circle"
                        ]
                        []
                    , Svg.text_
                        [ SA.textAnchor "middle"
                        , SA.alignmentBaseline "middle"
                        , SA.fill "#fff"
                        ]
                        [ Svg.text (toString card.number)
                        ]
                    ]

        scale =
            if isHighlighted then
                "1.1"
            else
                "1"
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ") scale(" ++ scale ++ ")")
            , if isInFlight card then
                SA.class "in-flight"
              else if isDone card then
                SA.class "done"
              else if isIcebox card then
                SA.class "icebox"
              else if isBacklog card then
                SA.class "backlog"
              else
                SA.class "untriaged"
            , SE.onMouseOver (AnticipateCardFromNode card.id)
            , SE.onMouseOut (UnanticipateCardFromNode card.id)
            , SE.onClick
                (if isSelected then
                    DeselectCard card.id
                 else
                    SelectCard card.id
                )
            ]
            (circleWithNumber ++ labels)


viewCardEntry : Model -> Card -> Html Msg
viewCardEntry model card =
    let
        anticipated =
            isAnticipated model card

        cardView =
            viewCard model card

        dragSource =
            NewContentCardSource { contentId = card.id }
    in
        Html.div [ HA.class "card-controls" ]
            [ Drag.draggable model.drag Drag dragSource <|
                cardView
            , Html.div [ HA.class "card-buttons" ]
                [ if not anticipated then
                    Html.span
                        [ HE.onClick (DeselectCard card.id)
                        , HA.class "octicon octicon-x"
                        ]
                        [ Html.text "" ]
                  else
                    Html.text ""
                ]
            ]


isInProject : String -> Card -> Bool
isInProject name card =
    List.member name (List.map (.project >> .name) card.cards)


inColumn : (String -> Bool) -> Card -> Bool
inColumn match card =
    List.any (Maybe.withDefault False << Maybe.map (match << .name) << .column) card.cards


isAnticipated : Model -> Card -> Bool
isAnticipated model card =
    List.member card.id model.anticipatedCards && not (List.member card.id model.selectedCards)


isPR : Card -> Bool
isPR card =
    case card.state of
        PullRequestState _ ->
            True

        IssueState _ ->
            False


isOpen : Card -> Bool
isOpen card =
    case card.state of
        IssueState GitHubGraph.IssueStateOpen ->
            True

        PullRequestState GitHubGraph.PullRequestStateOpen ->
            True

        _ ->
            False


isInFlight : Card -> Bool
isInFlight =
    inColumn detectColumn.inFlight


isDone : Card -> Bool
isDone =
    inColumn detectColumn.done


isBacklog : Card -> Bool
isBacklog =
    inColumn detectColumn.backlog


isIcebox : Card -> Bool
isIcebox =
    inColumn detectColumn.icebox


viewCard : Model -> Card -> Html Msg
viewCard model card =
    Html.div
        [ HA.classList
            [ ( "card", True )
            , ( "in-flight", isInFlight card )
            , ( "done", isDone card )
            , ( "icebox", isIcebox card )
            , ( "backlog", isBacklog card )
            , ( "anticipated", isAnticipated model card )
            , ( "highlighted", model.highlightedCard == Just card.id )
            ]
        , HE.onClick (SelectCard card.id)
        , HE.onMouseOver (HighlightNode card.id)
        , HE.onMouseOut (UnhighlightNode card.id)
        ]
        [ Html.div [ HA.class "card-icons" ]
            [ case card.state of
                IssueState GitHubGraph.IssueStateOpen ->
                    Html.span [ HA.class "octicon open octicon-issue-opened" ] []

                IssueState GitHubGraph.IssueStateClosed ->
                    Html.span [ HA.class "octicon closed octicon-issue-closed" ] []

                PullRequestState GitHubGraph.PullRequestStateOpen ->
                    Html.span [ HA.class "octicon open octicon-git-pull-request" ] []

                PullRequestState GitHubGraph.PullRequestStateClosed ->
                    Html.span [ HA.class "octicon closed octicon-git-pull-request" ] []

                PullRequestState GitHubGraph.PullRequestStateMerged ->
                    Html.span [ HA.class "octicon merged octicon-git-pull-request" ] []
            ]
        , Html.div [ HA.class "card-info" ]
            [ Html.div [ HA.class "card-actors" ] <|
                List.map (viewCardActor model) (recentActors model card)
            , Html.a
                [ HA.href card.url
                , HA.target "_blank"
                , HA.class "card-title"
                , HA.draggable "false"
                ]
                [ Html.text card.title
                ]
            , Html.span [ HA.class "card-labels" ] <|
                List.map viewLabel card.labels
            , Html.div [ HA.class "card-meta" ]
                [ Html.a
                    [ HA.href card.url
                    , HA.target "_blank"
                    , HA.draggable "false"
                    ]
                    [ Html.text ("#" ++ toString card.number) ]
                , Html.text " "
                , Html.text "opened by "
                , case card.author of
                    Just user ->
                        Html.a
                            [ HA.href user.url
                            , HA.target "_blank"
                            , HA.draggable "false"
                            ]
                            [ Html.text user.login ]

                    _ ->
                        Html.text "(deleted user)"
                ]
            ]
        ]


viewNoteCard : Model -> GitHubGraph.ProjectColumn -> String -> Html Msg
viewNoteCard model col text =
    Html.div
        [ HA.classList
            [ ( "card", True )
            , ( "in-flight", detectColumn.inFlight col.name )
            , ( "done", detectColumn.done col.name )
            , ( "backlog", detectColumn.backlog col.name )
            ]
        ]
        [ Html.div [ HA.class "card-info card-note" ]
            [ Markdown.toHtml [] text ]
        ]


recentActors : Model -> Card -> List Backend.ActorEvent
recentActors model card =
    Dict.get card.id model.data.actors
        |> Maybe.withDefault []
        |> List.reverse
        |> List.take 3
        |> List.reverse


hexRegex : Regex
hexRegex =
    Regex.regex "([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"


hexBrightness : Int -> Int
hexBrightness h =
    case compare h (0xFF // 2) of
        LT ->
            -1

        EQ ->
            0

        GT ->
            1


colorIsLight : String -> Bool
colorIsLight hex =
    let
        matches =
            List.head <| Regex.find (Regex.AtMost 1) hexRegex hex
    in
        case Maybe.map .submatches matches of
            Just [ Just h1s, Just h2s, Just h3s ] ->
                case List.map ParseInt.parseIntHex [ h1s, h2s, h3s ] of
                    [ Ok h1, Ok h2, Ok h3 ] ->
                        if (hexBrightness h1 + hexBrightness h2 + hexBrightness h3) > 0 then
                            True
                        else
                            False

                    _ ->
                        Debug.crash "invalid hex"

            _ ->
                Debug.crash "invalid hex"


viewLabel : GitHubGraph.Label -> Html Msg
viewLabel { name, color } =
    Html.span
        [ HA.class "label"
        , HA.style
            [ ( "background-color", "#" ++ color )
            , ( "color"
              , if colorIsLight color then
                    -- GitHub appears to pre-compute a hex code, but this seems to be
                    -- pretty much all it's doing
                    "rgba(0, 0, 0, .8)"
                else
                    -- for darker backgrounds they just do white
                    "#fff"
              )
            ]
        ]
        [ Html.span [ HA.class "label-text" ]
            [ Html.text name ]
        ]


viewCardActor : Model -> Backend.ActorEvent -> Html Msg
viewCardActor model { createdAt, actor } =
    Html.img
        [ HA.class ("card-actor " ++ activityClass model.currentDate createdAt)
        , HA.src (actor.avatar ++ "&s=88")
        , HA.draggable "false"
        ]
        []


isOrgMember : Maybe (List GitHubGraph.User) -> GitHubGraph.User -> Bool
isOrgMember users user =
    List.any (\x -> x.id == user.id) (Maybe.withDefault [] users)


subEdges : List (Graph.Edge e) -> List (List (Graph.Edge e))
subEdges edges =
    let
        edgesContains nodeId =
            List.any (\{ from, to } -> from == nodeId || to == nodeId)

        go edges acc =
            case edges of
                [] ->
                    acc

                edge :: rest ->
                    let
                        hasFrom =
                            List.filter (edgesContains edge.from) acc

                        hasTo =
                            List.filter (edgesContains edge.to) acc

                        hasNeither =
                            List.filter (\es -> not (edgesContains edge.from es) && not (edgesContains edge.to es)) acc
                    in
                        case ( hasFrom, hasTo ) of
                            ( [], [] ) ->
                                go rest ([ edge ] :: acc)

                            ( [ sub1 ], [ sub2 ] ) ->
                                go rest ((edge :: (sub1 ++ sub2)) :: hasNeither)

                            ( [ sub1 ], [] ) ->
                                go rest ((edge :: sub1) :: hasNeither)

                            ( [], [ sub2 ] ) ->
                                go rest ((edge :: sub2) :: hasNeither)

                            _ ->
                                Debug.crash "impossible"
    in
        go edges []


subGraphs : Graph n e -> List (Graph n e)
subGraphs graph =
    let
        singletons =
            Graph.fold
                (\nc ncs ->
                    if IntDict.isEmpty nc.incoming && IntDict.isEmpty nc.outgoing then
                        nc :: ncs
                    else
                        ncs
                )
                []
                graph

        singletonGraphs =
            List.map (flip Graph.insert Graph.empty) singletons

        subEdgeNodes =
            List.foldl (\edge set -> Set.insert edge.from (Set.insert edge.to set)) Set.empty

        connectedGraphs =
            graph
                |> Graph.edges
                |> subEdges
                |> List.map (flip Graph.inducedSubgraph graph << Set.toList << subEdgeNodes)
    in
        connectedGraphs ++ singletonGraphs


nodeBounds : Graph.NodeContext (FG.ForceNode (Node a)) () -> NodeBounds
nodeBounds nc =
    let
        x =
            nc.node.label.x

        y =
            nc.node.label.y
    in
        nc.node.label.value.bounds { x = x, y = y }


moveCard : Model -> CardDestination -> GitHubGraph.ID -> Cmd Msg
moveCard model { columnId, afterId } cardId =
    case model.me of
        Just { token } ->
            GitHubGraph.moveCardAfter token columnId cardId afterId
                |> Task.attempt (CardMoved columnId)

        Nothing ->
            Cmd.none


addCard : Model -> CardDestination -> GitHubGraph.ID -> Cmd Msg
addCard model { projectId, columnId, afterId } contentId =
    case model.me of
        Just { token } ->
            case contentCardId model projectId contentId of
                Just cardId ->
                    GitHubGraph.moveCardAfter token columnId cardId afterId
                        |> Task.attempt (CardMoved columnId)

                Nothing ->
                    GitHubGraph.addContentCardAfter token columnId contentId afterId
                        |> Task.attempt (CardMoved columnId)

        Nothing ->
            Cmd.none


contentCardId : Model -> GitHubGraph.ID -> GitHubGraph.ID -> Maybe GitHubGraph.ID
contentCardId model projectId contentId =
    case Dict.get contentId model.allCards of
        Just card ->
            case List.filter ((==) projectId << .id << .project) card.cards of
                [ card ] ->
                    Just card.id

                _ ->
                    Nothing

        Nothing ->
            Nothing


findCardColumns : Model -> GitHubGraph.ID -> List GitHubGraph.ID
findCardColumns model cardId =
    Dict.foldl
        (\columnId cards columnIds ->
            if List.any ((==) cardId << .id) cards then
                columnId :: columnIds
            else
                columnIds
        )
        []
        model.data.cards


createLabel : Model -> GitHubGraph.Repo -> GitHubGraph.Label -> Cmd Msg
createLabel model repo label =
    case model.me of
        Just { token } ->
            GitHubGraph.createRepoLabel token repo label
                |> Task.attempt (LabelChanged repo)

        Nothing ->
            Cmd.none


updateLabel : Model -> GitHubGraph.Repo -> GitHubGraph.Label -> GitHubGraph.Label -> Cmd Msg
updateLabel model repo label1 label2 =
    case model.me of
        Just { token } ->
            GitHubGraph.updateRepoLabel token repo label1 label2
                |> Task.attempt (LabelChanged repo)

        Nothing ->
            Cmd.none


deleteLabel : Model -> GitHubGraph.Repo -> GitHubGraph.Label -> Cmd Msg
deleteLabel model repo label =
    case model.me of
        Just { token } ->
            GitHubGraph.deleteRepoLabel token repo label
                |> Task.attempt (LabelChanged repo)

        Nothing ->
            Cmd.none
