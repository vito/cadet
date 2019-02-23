port module Main exposing (main)

import Backend exposing (Data, Me)
import Browser
import Browser.Events
import Browser.Navigation as Nav
import Card exposing (Card)
import Colors
import Dict exposing (Dict)
import Drag
import ForceGraph exposing (ForceGraph)
import GitHub
import Hash
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Html.Keyed
import Html.Lazy
import Http
import IntDict exposing (IntDict)
import Json.Decode as JD
import Log
import Markdown
import Octicons
import OrderedSet exposing (OrderedSet)
import ParseInt
import Path
import Project
import Random
import Regex exposing (Regex)
import Set exposing (Set)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Events as SE
import Svg.Keyed
import Svg.Lazy
import Task
import Time
import Url exposing (Url)
import Url.Parser as UP exposing ((</>))


port eventReceived : (( String, String, String ) -> msg) -> Sub msg


type alias Config =
    { initialTime : Int
    }


type alias Model =
    -- nav/user/global state
    { key : Nav.Key
    , page : Page
    , me : Maybe Me
    , currentTime : Time.Posix

    -- data from backend
    , dataIndex : Int
    , repos : Dict GitHub.ID GitHub.Repo
    , projects : Dict GitHub.ID GitHub.Project
    , columnCards : Dict GitHub.ID (List Backend.ColumnCard)
    , comparisons : Dict GitHub.ID GitHub.V3Comparison
    , graphs : List (ForceGraph GitHub.ID)
    , issues : Dict GitHub.ID GitHub.Issue
    , prs : Dict GitHub.ID GitHub.PullRequest
    , actors : Dict GitHub.ID (List Backend.EventActor)
    , reviewers : Dict GitHub.ID (List GitHub.PullRequestReview)

    -- 'views' into data
    , allLabels : Dict GitHub.ID GitHub.Label
    , cards : Dict GitHub.ID Card
    , reposByName : Dict String GitHub.ID
    , reposByLabel : Dict ( String, String ) (List GitHub.ID)
    , labelToRepoToId : Dict String (Dict GitHub.ID GitHub.ID)
    , prsByMergeCommit : Dict String GitHub.ID
    , openPRsByRepo : Dict GitHub.ID (List GitHub.ID)
    , cardsByMilestone : Dict GitHub.ID (List GitHub.ID)
    , releaseRepos : Dict GitHub.ID ReleaseRepo

    -- cache of computed lightness values for each color; used for determining
    -- whether label text should be white or dark
    , colorLightnessCache : Dict String Bool

    -- card dragging in projects
    , projectDrag : Drag.Model CardSource CardDestination Msg

    -- sidebar card search/selecting state
    , cardSearch : String
    , selectedCards : OrderedSet GitHub.ID
    , anticipatedCards : Set GitHub.ID

    -- sidebar label operations
    , labelSearch : String
    , showLabelOperations : Bool
    , cardLabelOperations : Dict String CardLabelOperation

    -- card/node hover state
    , highlightedCard : Maybe GitHub.ID
    , highlightedNode : Maybe GitHub.ID

    -- card graph state
    , statefulGraphs : List StatefulGraph
    , baseGraphFilter : Maybe GraphFilter
    , graphFilters : List GraphFilter
    , graphSort : GraphSort
    , showLabelFilters : Bool

    -- label crud state
    , deletingLabels : Set ( String, String )
    , editingLabels : Dict ( String, String ) SharedLabel
    , newLabel : SharedLabel
    , newLabelColored : Bool

    -- card tabbed view state
    , suggestedLabels : List String
    , releaseRepoTab : Int
    , repoPullRequestsTab : Int
    }


type alias StatefulGraph =
    { state : CardNodeState
    , nodes : List CardNode
    , edges : List CardEdge
    , matches : Set Int
    }


type alias CardNode =
    { card : Card
    , x : Float
    , y : Float
    , mass : Float
    , filteredOut : Bool
    }


type alias CardEdge =
    { source : CardEdgePoint
    , target : CardEdgePoint
    , filteredOut : Bool
    }


type alias CardEdgePoint =
    { x : Float
    , y : Float
    }


type alias ProjectDragRefresh =
    { contentId : Maybe GitHub.ID
    , content : Maybe GitHub.CardContent
    , sourceId : Maybe GitHub.ID
    , sourceCards : Maybe (List Backend.ColumnCard)
    , targetId : Maybe GitHub.ID
    , targetCards : Maybe (List Backend.ColumnCard)
    }


type CardLabelOperation
    = AddLabelOperation
    | RemoveLabelOperation


type alias ReleaseRepo =
    { repo : GitHub.Repo
    , nextMilestone : Maybe GitHub.Milestone
    , totalCommits : Int
    , openPRs : List Card
    , mergedPRs : List Card
    , openIssues : List Card
    , closedIssues : List Card
    , doneCards : List Card
    , documentedCards : List Card
    , undocumentedCards : List Card
    , noImpactCards : List Card
    }


type ReleaseRepoTab
    = ToDoTab
    | DoneTab
    | DocumentedTab
    | UndocumentedTab
    | NoImpactTab


type GraphFilter
    = ExcludeAllFilter
    | InProjectFilter String
    | HasLabelFilter String String
    | InvolvesUserFilter String
    | IssuesFilter
    | PullRequestsFilter
    | UntriagedFilter


type GraphSort
    = ImpactSort
    | AllActivitySort


type alias SharedLabel =
    { name : String
    , color : String
    }


type alias CardNodeState =
    { allLabels : Dict GitHub.ID GitHub.Label
    , reviewers : Dict GitHub.ID (List GitHub.PullRequestReview)
    , currentTime : Time.Posix
    , selectedCards : OrderedSet GitHub.ID
    , anticipatedCards : Set GitHub.ID
    , highlightedNode : Maybe GitHub.ID
    }


type alias CardDestination =
    { projectId : GitHub.ID
    , columnId : GitHub.ID
    , afterId : Maybe GitHub.ID
    }


type CardSource
    = FromColumnCardSource { columnId : GitHub.ID, cardId : GitHub.ID }
    | NewContentCardSource { contentId : GitHub.ID }


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | Poll
    | SetCurrentTime Time.Posix
    | ProjectDrag (Drag.Msg CardSource CardDestination Msg)
    | MoveCardAfter CardSource CardDestination
    | CardMoved GitHub.ID (Result GitHub.Error GitHub.ProjectColumnCard)
    | RefreshQueued (Result Http.Error ())
    | MeFetched (Result Http.Error (Maybe Me))
    | DataFetched (Result Http.Error (Backend.Indexed Data))
    | EventReceived ( String, String, String )
    | CardDataFetched (Result Http.Error (Backend.Indexed Backend.CardData))
    | GraphsFetched (Result Http.Error (Backend.Indexed (List (ForceGraph GitHub.ID))))
    | SelectCard GitHub.ID
    | DeselectCard GitHub.ID
    | HighlightNode GitHub.ID
    | UnhighlightNode GitHub.ID
    | AnticipateCardFromNode GitHub.ID
    | UnanticipateCardFromNode GitHub.ID
    | SearchCards String
    | SelectAnticipatedCards
    | ClearSelectedCards
    | MirrorLabel SharedLabel
    | StartDeletingLabel SharedLabel
    | StopDeletingLabel SharedLabel
    | DeleteLabel SharedLabel
    | StartEditingLabel SharedLabel
    | StopEditingLabel SharedLabel
    | SetLabelName SharedLabel String
    | SetLabelColor String
    | RandomizeLabelColor SharedLabel
    | EditLabel SharedLabel
    | CreateLabel
    | RandomizeNewLabelColor
    | SetNewLabelName String
    | LabelChanged GitHub.Repo (Result GitHub.Error ())
    | LabelCard Card String
    | UnlabelCard Card String
    | RefreshIssue GitHub.ID
    | RefreshPullRequest GitHub.ID
    | AddFilter GraphFilter
    | RemoveFilter GraphFilter
    | SetGraphSort GraphSort
    | ToggleLabelFilters
    | SetLabelSearch String
    | ToggleLabelOperations
    | SetLabelOperation String CardLabelOperation
    | UnsetLabelOperation String
    | ApplyLabelOperations
    | DataChanged (Cmd Msg) (Result GitHub.Error ())
    | SetReleaseRepoTab Int
    | SetRepoPullRequestsTab Int


type Page
    = AllProjectsPage
    | GlobalGraphPage
    | ProjectPage String
    | LabelsPage
    | ReleasePage
    | ReleaseRepoPage String
    | PullRequestsPage
    | PullRequestsRepoPage String
    | BouncePage


main : Program Config Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


routeParser : UP.Parser (Page -> a) a
routeParser =
    UP.oneOf
        [ UP.map AllProjectsPage UP.top
        , UP.map AllProjectsPage (UP.s "projects")
        , UP.map ProjectPage (UP.s "projects" </> UP.string)
        , UP.map GlobalGraphPage (UP.s "graph")
        , UP.map LabelsPage (UP.s "labels")
        , UP.map ReleaseRepoPage (UP.s "release" </> UP.string)
        , UP.map ReleasePage (UP.s "release")
        , UP.map PullRequestsPage (UP.s "pull-requests")
        , UP.map PullRequestsRepoPage (UP.s "pull-requests" </> UP.string)
        , UP.map BouncePage (UP.s "auth" </> UP.s "github")
        , UP.map BouncePage (UP.s "auth")
        , UP.map BouncePage (UP.s "logout")
        ]


type alias CardNodeRadii =
    { base : Float
    , withoutFlair : Float
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
    { card : Card
    , viewLower : Position -> a -> Svg Msg
    , viewUpper : Position -> a -> Svg Msg
    , bounds : Position -> NodeBounds
    , score : Int
    }


init : Config -> Url -> Nav.Key -> ( Model, Cmd Msg )
init config url key =
    let
        model =
            { key = key
            , page = GlobalGraphPage
            , me = Nothing
            , graphs = []
            , dataIndex = 0
            , repos = Dict.empty
            , projects = Dict.empty
            , columnCards = Dict.empty
            , comparisons = Dict.empty
            , reposByLabel = Dict.empty
            , reposByName = Dict.empty
            , labelToRepoToId = Dict.empty
            , openPRsByRepo = Dict.empty
            , prsByMergeCommit = Dict.empty
            , cardsByMilestone = Dict.empty
            , releaseRepos = Dict.empty
            , issues = Dict.empty
            , prs = Dict.empty
            , actors = Dict.empty
            , reviewers = Dict.empty
            , cards = Dict.empty
            , allLabels = Dict.empty
            , colorLightnessCache = Dict.empty
            , cardSearch = "is:open "
            , selectedCards = OrderedSet.empty
            , anticipatedCards = Set.empty
            , highlightedCard = Nothing
            , highlightedNode = Nothing
            , currentTime = Time.millisToPosix config.initialTime
            , statefulGraphs = []
            , baseGraphFilter = Nothing
            , graphFilters = []
            , graphSort = ImpactSort
            , projectDrag = Drag.init
            , deletingLabels = Set.empty
            , editingLabels = Dict.empty
            , newLabel = { name = "", color = "ffffff" }
            , newLabelColored = False
            , showLabelFilters = False
            , labelSearch = ""
            , suggestedLabels = []
            , showLabelOperations = False
            , cardLabelOperations = Dict.empty
            , releaseRepoTab = 0
            , repoPullRequestsTab = 0
            }

        ( navedModel, navedMsgs ) =
            update (UrlChanged url) model
    in
    ( navedModel
    , Cmd.batch
        [ Backend.fetchData DataFetched
        , Backend.fetchMe MeFetched
        , navedMsgs
        ]
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ eventReceived EventReceived
        , Time.every (60 * 1000) (always Poll)
        , Time.every (60 * 60 * 1000) SetCurrentTime
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Poll ->
            ( model, Backend.fetchData DataFetched )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            case UP.parse routeParser url of
                Just BouncePage ->
                    ( model, Nav.load (Url.toString url) )

                Just page ->
                    ( { model | page = page }
                        |> computeViewForPage
                    , Cmd.none
                    )

                Nothing ->
                    -- 404 would be nice
                    ( model, Cmd.none )

        SetCurrentTime date ->
            ( updateGraphStates { model | currentTime = date }, Cmd.none )

        ProjectDrag subMsg ->
            let
                dragModel =
                    Drag.update subMsg model.projectDrag

                newModel =
                    { model | projectDrag = dragModel }
            in
            case dragModel of
                Drag.Dropping state ->
                    update state.msg { newModel | projectDrag = Drag.drop newModel.projectDrag }

                _ ->
                    ( newModel, Cmd.none )

        MoveCardAfter source dest ->
            case source of
                FromColumnCardSource { cardId } ->
                    ( model, moveCard model dest cardId )

                NewContentCardSource { contentId } ->
                    ( model, addCard model dest contentId )

        CardMoved targetCol (Ok card) ->
            case model.projectDrag of
                Drag.Dropped drag ->
                    let
                        colCard =
                            { id = card.id
                            , contentId =
                                case card.content of
                                    Just (GitHub.IssueCardContent { id }) ->
                                        Just id

                                    Just (GitHub.PullRequestCardContent { id }) ->
                                        Just id

                                    Nothing ->
                                        Nothing
                            , note = card.note
                            }

                        removeCard =
                            List.filter ((/=) card.id << .id)

                        removeCardFromOldColumn =
                            case drag.source of
                                FromColumnCardSource cs ->
                                    Dict.update cs.columnId (Maybe.map removeCard)

                                NewContentCardSource _ ->
                                    identity

                        insertAfter id new cards =
                            case cards of
                                c :: rest ->
                                    if c.id == id then
                                        c :: new :: rest

                                    else
                                        c :: insertAfter id new rest

                                [] ->
                                    -- this shouldn't really happen
                                    [ new ]

                        insertCard cards =
                            case drag.target.afterId of
                                Nothing ->
                                    colCard :: cards

                                Just cardId ->
                                    insertAfter cardId colCard cards

                        addCardToNewColumn =
                            Dict.update targetCol (Maybe.map insertCard)

                        movedOptimistically =
                            { model | columnCards = addCardToNewColumn (removeCardFromOldColumn model.columnCards) }
                    in
                    ( { movedOptimistically | projectDrag = Drag.complete model.projectDrag }
                    , Cmd.batch
                        [ Backend.refreshCards targetCol RefreshQueued
                        , case card.content of
                            Just (GitHub.IssueCardContent issue) ->
                                Backend.refreshIssue issue.id RefreshQueued

                            Just (GitHub.PullRequestCardContent pr) ->
                                Backend.refreshPR pr.id RefreshQueued

                            Nothing ->
                                Cmd.none
                        , case drag.source of
                            FromColumnCardSource cs ->
                                if cs.columnId == targetCol then
                                    Cmd.none

                                else
                                    Backend.refreshCards cs.columnId RefreshQueued

                            NewContentCardSource _ ->
                                Cmd.none
                        ]
                    )

                _ ->
                    ( model, Cmd.none )

        CardMoved col (Err err) ->
            Log.debug "failed to move card" err <|
                ( model, Cmd.none )

        RefreshQueued (Ok ()) ->
            Log.debug "refresh queued" () ( model, Cmd.none )

        RefreshQueued (Err err) ->
            Log.debug "refresh failed" err <|
                ( model, Cmd.none )

        SearchCards str ->
            ( updateGraphStates
                { model
                    | cardSearch = str
                    , anticipatedCards = searchCards model str
                }
            , Cmd.none
            )

        SelectAnticipatedCards ->
            ( updateGraphStates
                { model
                    | anticipatedCards = Set.empty
                    , selectedCards = Set.foldl OrderedSet.insert model.selectedCards model.anticipatedCards
                }
            , Cmd.none
            )

        SelectCard id ->
            ( updateGraphStates { model | selectedCards = OrderedSet.insert id model.selectedCards }
            , Cmd.none
            )

        ClearSelectedCards ->
            ( updateGraphStates { model | selectedCards = OrderedSet.empty }
            , Cmd.none
            )

        DeselectCard id ->
            ( updateGraphStates { model | selectedCards = OrderedSet.remove id model.selectedCards }
            , Cmd.none
            )

        HighlightNode id ->
            ( updateGraphStates { model | highlightedNode = Just id }, Cmd.none )

        UnhighlightNode id ->
            ( updateGraphStates { model | highlightedNode = Nothing }, Cmd.none )

        AnticipateCardFromNode id ->
            ( updateGraphStates
                { model
                    | anticipatedCards = Set.insert id model.anticipatedCards
                    , highlightedCard = Just id
                }
            , Cmd.none
            )

        UnanticipateCardFromNode id ->
            ( updateGraphStates
                { model
                    | anticipatedCards = Set.remove id model.anticipatedCards
                    , highlightedCard = Nothing
                }
            , Cmd.none
            )

        MeFetched (Ok me) ->
            ( updateGraphStates { model | me = me }, Cmd.none )

        MeFetched (Err err) ->
            Log.debug "error fetching self" err <|
                ( model, Cmd.none )

        EventReceived ( event, data, indexStr ) ->
            case String.toInt indexStr of
                Just index ->
                    if index >= model.dataIndex then
                        ( { model | dataIndex = index }
                            |> handleEvent event data index
                            |> computeViewForPage
                        , if index == model.dataIndex + 1 then
                            Cmd.none

                          else
                            Log.debug "skipped a data index; syncing" ( model.dataIndex, index ) <|
                                Backend.fetchData DataFetched
                        )

                    else
                        Log.debug "skipping event for stale index" ( model.dataIndex, index ) <|
                            ( model, Cmd.none )

                Nothing ->
                    Log.debug "invalid event index" indexStr <|
                        ( model, Cmd.none )

        DataFetched (Ok { index, value }) ->
            if index > model.dataIndex then
                ( { model
                    | dataIndex = index
                    , repos = value.repos
                    , projects = value.projects
                    , columnCards = value.columnCards
                    , comparisons = value.comparisons
                  }
                    |> computeDataView
                    |> computeViewForPage
                , Backend.fetchCardData CardDataFetched
                )

            else
                Log.debug "ignoring stale index" ( index, model.dataIndex ) <|
                    ( model, Cmd.none )

        DataFetched (Err err) ->
            Log.debug "error fetching data" err <|
                ( model, Cmd.none )

        CardDataFetched (Ok { index, value }) ->
            Log.debug "cards fetched" ( index, Dict.size value.issues + Dict.size value.prs ) <|
                ( { model
                    | issues = value.issues
                    , prs = value.prs
                    , actors = value.actors
                    , reviewers = value.reviewers
                  }
                    |> computeCardsView
                    |> computeViewForPage
                , Backend.fetchGraphs GraphsFetched
                )

        CardDataFetched (Err err) ->
            Log.debug "error fetching cards" err <|
                ( model, Cmd.none )

        GraphsFetched (Ok { index, value }) ->
            Log.debug "graphs fetched" ( index, List.length value ) <|
                ( { model | graphs = value }
                    |> computeGraphsView
                    |> computeViewForPage
                , Cmd.none
                )

        GraphsFetched (Err err) ->
            Log.debug "error fetching graphs" err <|
                ( model, Cmd.none )

        MirrorLabel newLabel ->
            let
                cmds =
                    Dict.foldl
                        (\_ r acc ->
                            case List.filter ((==) newLabel.name << .name) r.labels of
                                [] ->
                                    createLabel model r newLabel :: acc

                                label :: _ ->
                                    if label.color == newLabel.color then
                                        acc

                                    else
                                        updateLabel model r label newLabel :: acc
                        )
                        []
                        model.repos
            in
            ( model, Cmd.batch cmds )

        StartDeletingLabel label ->
            ( { model | deletingLabels = Set.insert (labelKey label) model.deletingLabels }, Cmd.none )

        StopDeletingLabel label ->
            ( { model | deletingLabels = Set.remove (labelKey label) model.deletingLabels }, Cmd.none )

        DeleteLabel label ->
            let
                cmds =
                    Dict.foldl
                        (\_ r acc ->
                            case List.filter (matchesLabel label) r.labels of
                                [] ->
                                    acc

                                repoLabel :: _ ->
                                    deleteLabel model r repoLabel :: acc
                        )
                        []
                        model.repos
            in
            ( { model | deletingLabels = Set.remove (labelKey label) model.deletingLabels }, Cmd.batch cmds )

        StartEditingLabel label ->
            ( { model | editingLabels = Dict.insert (labelKey label) label model.editingLabels }, Cmd.none )

        StopEditingLabel label ->
            ( { model | editingLabels = Dict.remove (labelKey label) model.editingLabels }, Cmd.none )

        SetLabelName label newName ->
            ( { model
                | editingLabels =
                    Dict.update (labelKey label) (Maybe.map (\newLabel -> { newLabel | name = newName })) model.editingLabels
              }
            , Cmd.none
            )

        SetLabelColor newColor ->
            let
                newLabel =
                    model.newLabel
            in
            ( { model
                | newLabel =
                    if String.isEmpty newLabel.name then
                        newLabel

                    else
                        { newLabel | color = newColor }
                , newLabelColored = not (String.isEmpty newLabel.name)
                , editingLabels =
                    Dict.map (\_ label -> { label | color = newColor }) model.editingLabels
              }
            , Cmd.none
            )

        RandomizeLabelColor label ->
            case Dict.get (labelKey label) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    ( { model
                        | editingLabels =
                            Dict.insert (labelKey label) (randomizeColor newLabel) model.editingLabels
                      }
                    , Cmd.none
                    )

        EditLabel oldLabel ->
            case Dict.get (labelKey oldLabel) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    let
                        cmds =
                            Dict.foldl
                                (\_ r acc ->
                                    case List.filter (matchesLabel oldLabel) r.labels of
                                        repoLabel :: _ ->
                                            updateLabel model r repoLabel newLabel :: acc

                                        _ ->
                                            acc
                                )
                                []
                                model.repos
                    in
                    ( { model | editingLabels = Dict.remove (labelKey oldLabel) model.editingLabels }, Cmd.batch cmds )

        CreateLabel ->
            if model.newLabel.name == "" then
                ( model, Cmd.none )

            else
                update (MirrorLabel model.newLabel)
                    { model
                        | newLabel = { name = "", color = "ffffff" }
                        , newLabelColored = False
                    }

        RandomizeNewLabelColor ->
            ( { model | newLabel = randomizeColor model.newLabel, newLabelColored = True }, Cmd.none )

        SetNewLabelName name ->
            let
                newLabel =
                    model.newLabel

                newColor =
                    if model.newLabelColored then
                        model.newLabel.color

                    else
                        generateColor (Hash.hash name)
            in
            ( { model | newLabel = { newLabel | name = name, color = newColor } }, Cmd.none )

        LabelChanged repo (Ok ()) ->
            let
                repoSel =
                    { owner = repo.owner, name = repo.name }
            in
            ( model, Backend.refreshRepo repoSel RefreshQueued )

        LabelChanged repo (Err err) ->
            Log.debug "failed to modify labels" err <|
                ( model, Cmd.none )

        LabelCard card label ->
            case card.content of
                GitHub.IssueCardContent issue ->
                    ( model, addIssueLabels model issue [ label ] )

                GitHub.PullRequestCardContent pr ->
                    ( model, addPullRequestLabels model pr [ label ] )

        UnlabelCard card label ->
            case card.content of
                GitHub.IssueCardContent issue ->
                    ( model, removeIssueLabel model issue label )

                GitHub.PullRequestCardContent pr ->
                    ( model, removePullRequestLabel model pr label )

        DataChanged cb (Ok ()) ->
            ( model, cb )

        DataChanged cb (Err err) ->
            Log.debug "failed to change data" err <|
                ( model, Cmd.none )

        RefreshIssue id ->
            ( model, Backend.refreshIssue id RefreshQueued )

        RefreshPullRequest id ->
            ( model, Backend.refreshPR id RefreshQueued )

        AddFilter filter ->
            ( computeGraphsView { model | graphFilters = filter :: model.graphFilters }
            , Cmd.none
            )

        RemoveFilter filter ->
            ( computeGraphsView { model | graphFilters = List.filter ((/=) filter) model.graphFilters }
            , Cmd.none
            )

        SetGraphSort sort ->
            ( computeGraphsView { model | graphSort = sort }, Cmd.none )

        ToggleLabelFilters ->
            ( computeGraphsView { model | showLabelFilters = not model.showLabelFilters }, Cmd.none )

        SetLabelSearch string ->
            ( { model | labelSearch = string }, Cmd.none )

        ToggleLabelOperations ->
            ( if model.showLabelOperations then
                { model
                    | showLabelOperations = False
                    , labelSearch = ""
                    , cardLabelOperations = Dict.empty
                }

              else
                { model | showLabelOperations = True }
            , Cmd.none
            )

        SetLabelOperation name op ->
            ( { model | cardLabelOperations = Dict.insert name op model.cardLabelOperations }, Cmd.none )

        UnsetLabelOperation name ->
            ( { model | cardLabelOperations = Dict.remove name model.cardLabelOperations }, Cmd.none )

        ApplyLabelOperations ->
            let
                cards =
                    List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)

                ( addPairs, removePairs ) =
                    Dict.toList model.cardLabelOperations
                        |> List.partition ((==) AddLabelOperation << Tuple.second)

                labelsToAdd =
                    List.map Tuple.first addPairs

                labelsToRemove =
                    List.map Tuple.first removePairs

                adds =
                    List.map
                        (\card ->
                            case card.content of
                                GitHub.IssueCardContent issue ->
                                    addIssueLabels model issue labelsToAdd

                                GitHub.PullRequestCardContent pr ->
                                    addPullRequestLabels model pr labelsToAdd
                        )
                        cards

                removals =
                    List.concatMap
                        (\name ->
                            List.filterMap
                                (\card ->
                                    if hasLabel model name card then
                                        case card.content of
                                            GitHub.IssueCardContent issue ->
                                                Just (removeIssueLabel model issue name)

                                            GitHub.PullRequestCardContent pr ->
                                                Just (removePullRequestLabel model pr name)

                                    else
                                        Nothing
                                )
                                cards
                        )
                        labelsToRemove
            in
            ( model, Cmd.batch (adds ++ removals) )

        SetReleaseRepoTab tab ->
            ( { model | releaseRepoTab = tab }, Cmd.none )

        SetRepoPullRequestsTab tab ->
            ( { model | repoPullRequestsTab = tab }, Cmd.none )


searchCards : Model -> String -> Set GitHub.ID
searchCards model str =
    let
        tokens =
            String.split " " str

        ( filterTokens, rest ) =
            List.partition (String.contains ":") tokens

        filters =
            List.map (String.split ":" >> searchFilter model) filterTokens

        query =
            String.toLower (String.join " " rest)

        titleMatch title _ =
            String.contains query title
    in
    if String.length query < 2 then
        -- don't bother querying with so few characters
        Set.empty

    else
        filteredCardsByTitle model filters
            |> Dict.filter titleMatch
            |> Dict.foldl (\_ -> Set.insert) Set.empty


searchFilter : Model -> List String -> Card -> Bool
searchFilter model filter card =
    case filter of
        [ "label", name ] ->
            hasLabel model name card

        [ "is", "pr" ] ->
            Card.isPR card

        [ "is", "issue" ] ->
            not (Card.isPR card)

        [ "is", "open" ] ->
            Card.isOpen card

        [ "is", "closed" ] ->
            not (Card.isOpen card)

        _ ->
            False


filteredCardsByTitle : Model -> List (Card -> Bool) -> Dict String GitHub.ID
filteredCardsByTitle model filters =
    Dict.foldl
        (\_ card ->
            if List.all (\f -> f card) filters then
                Dict.insert (String.toLower card.title) card.id

            else
                identity
        )
        Dict.empty
        model.cards


updateGraphStates : Model -> Model
updateGraphStates model =
    let
        newState =
            { currentTime = model.currentTime
            , selectedCards = model.selectedCards
            , anticipatedCards = model.anticipatedCards
            , highlightedNode = model.highlightedNode
            , allLabels = model.allLabels
            , reviewers = model.reviewers
            }

        affectedByState =
            List.any
                (\{ card } ->
                    OrderedSet.member card.id newState.selectedCards
                        || Set.member card.id newState.anticipatedCards
                        || (newState.highlightedNode == Just card.id)
                )
    in
    { model
        | statefulGraphs =
            List.map
                (\sg ->
                    if affectedByState sg.nodes then
                        -- set new state for graph containing
                        -- selected/anticipated/highlighted cards
                        { sg | state = newState }

                    else if isBaseGraphState model sg.state then
                        -- preserve current state
                        sg

                    else
                        -- reset to initial state
                        { sg | state = baseGraphState model }
                )
                model.statefulGraphs
    }


isBaseGraphState : Model -> CardNodeState -> Bool
isBaseGraphState model state =
    (state.currentTime == model.currentTime)
        && Set.isEmpty state.anticipatedCards
        && OrderedSet.isEmpty state.selectedCards
        && (state.highlightedNode == Nothing)


addToList : x -> Maybe (List x) -> Maybe (List x)
addToList x entry =
    case entry of
        Nothing ->
            Just [ x ]

        Just xs ->
            Just (x :: xs)


computeViewForPage : Model -> Model
computeViewForPage model =
    let
        reset =
            { model
                | baseGraphFilter = Nothing
                , suggestedLabels = []
            }
    in
    case model.page of
        GlobalGraphPage ->
            reset
                |> updateGraphStates

        ProjectPage name ->
            { reset | baseGraphFilter = Just (InProjectFilter name) }
                |> updateGraphStates

        ReleasePage ->
            reset
                |> computeReleaseRepos

        ReleaseRepoPage _ ->
            { reset
                | suggestedLabels =
                    [ "release/documented"
                    , "release/undocumented"
                    , "release/no-impact"
                    ]
            }
                |> computeReleaseRepos

        PullRequestsRepoPage _ ->
            { reset
                | suggestedLabels = [ "needs-test" ]
            }

        _ ->
            reset


computeDataView : Model -> Model
computeDataView model =
    let
        reposByName =
            Dict.foldl (\id { name } -> Dict.insert name id) Dict.empty model.repos

        allLabels =
            Dict.foldl
                (\_ repo als ->
                    List.foldl
                        (\label -> Dict.insert label.id { label | color = String.toLower label.color })
                        als
                        repo.labels
                )
                Dict.empty
                model.repos

        groupRepoLabels =
            Dict.foldl
                (\_ repo cbn ->
                    List.foldl
                        (\label -> Dict.update ( label.name, String.toLower label.color ) (addToList repo.id))
                        cbn
                        repo.labels
                )
                Dict.empty
                model.repos

        setRepoLabelId label repo mrc =
            case mrc of
                Just rc ->
                    Just (Dict.insert repo.id label.id rc)

                Nothing ->
                    Just (Dict.singleton repo.id label.id)

        groupLabelsToRepoToId =
            Dict.foldl
                (\_ repo lrc ->
                    List.foldl
                        (\label -> Dict.update label.name (setRepoLabelId label repo))
                        lrc
                        repo.labels
                )
                Dict.empty
                model.repos

        colorLightnessCache =
            Dict.foldl
                (\_ label -> Dict.update label.color (warmColorLightnessCache label.color))
                model.colorLightnessCache
                allLabels
    in
    { model
        | reposByName = reposByName
        , reposByLabel = groupRepoLabels
        , labelToRepoToId = groupLabelsToRepoToId
        , allLabels = allLabels
        , colorLightnessCache = colorLightnessCache
    }


computeCardsView : Model -> Model
computeCardsView model =
    let
        cards =
            Dict.union
                (Dict.map (always Card.fromIssue) model.issues)
                (Dict.map (always Card.fromPR) model.prs)

        prsByMergeCommit =
            Dict.foldl
                (\_ pr prs ->
                    case pr.mergeCommit of
                        Nothing ->
                            prs

                        Just { sha } ->
                            Dict.insert sha pr.id prs
                )
                Dict.empty
                model.prs

        openPRsByRepo =
            Dict.foldl
                (\_ pr prs ->
                    if pr.state == GitHub.PullRequestStateOpen then
                        Dict.update pr.repo.id (addToList pr.id) prs

                    else
                        prs
                )
                Dict.empty
                model.prs

        cardsByMilestone =
            Dict.foldl
                (\id card cbm ->
                    case card.milestone of
                        Just milestone ->
                            Dict.update milestone.id (addToList id) cbm

                        Nothing ->
                            cbm
                )
                Dict.empty
                cards
    in
    { model
        | cards = cards
        , prsByMergeCommit = prsByMergeCommit
        , openPRsByRepo = openPRsByRepo
        , cardsByMilestone = cardsByMilestone
    }


warmColorLightnessCache : String -> Maybe Bool -> Maybe Bool
warmColorLightnessCache color mb =
    case mb of
        Nothing ->
            Just (computeColorIsLight color)

        _ ->
            mb


makeReleaseRepo : Model -> GitHub.Repo -> ReleaseRepo
makeReleaseRepo model repo =
    let
        nextMilestone =
            repo.milestones
                |> List.filter ((==) GitHub.MilestoneStateOpen << .state)
                |> List.sortBy .number
                |> List.head

        mcomparison =
            Dict.get repo.id model.comparisons

        mergedPRCards =
            List.filterMap
                (\{ sha } ->
                    Dict.get sha model.prsByMergeCommit
                        |> Maybe.andThen (\id -> Dict.get id model.cards)
                )
                (Maybe.withDefault [] (Maybe.map .commits mcomparison))

        issueOrOpenPR cardId =
            case Dict.get cardId model.cards of
                Nothing ->
                    Nothing

                Just card ->
                    if Card.isMerged card then
                        -- don't double-count merged PRs - they are collected via the
                        -- comparison
                        Nothing

                    else
                        Just card

        milestoneCards =
            case nextMilestone of
                Nothing ->
                    []

                Just nm ->
                    Dict.get nm.id model.cardsByMilestone
                        |> Maybe.withDefault []
                        |> List.filterMap issueOrOpenPR

        allCards =
            milestoneCards ++ mergedPRCards

        categorizeByDocumentedState card sir =
            if hasLabel model "release/documented" card then
                { sir | documentedCards = card :: sir.documentedCards }

            else if hasLabel model "release/undocumented" card then
                { sir | undocumentedCards = card :: sir.undocumentedCards }

            else if hasLabel model "release/no-impact" card then
                { sir | noImpactCards = card :: sir.noImpactCards }

            else
                { sir | doneCards = card :: sir.doneCards }

        categorizeByCardState card sir =
            case card.state of
                Card.IssueState GitHub.IssueStateOpen ->
                    { sir | openIssues = card :: sir.openIssues }

                Card.IssueState GitHub.IssueStateClosed ->
                    { sir | closedIssues = card :: sir.closedIssues }

                Card.PullRequestState GitHub.PullRequestStateOpen ->
                    { sir | openPRs = card :: sir.openPRs }

                Card.PullRequestState GitHub.PullRequestStateMerged ->
                    { sir | mergedPRs = card :: sir.mergedPRs }

                Card.PullRequestState GitHub.PullRequestStateClosed ->
                    -- ignored
                    sir

        categorizeCard card sir =
            let
                byState =
                    categorizeByCardState card sir
            in
            if Card.isOpen card then
                byState

            else
                categorizeByDocumentedState card byState
    in
    List.foldl categorizeCard
        { repo = repo
        , nextMilestone = nextMilestone
        , totalCommits = Maybe.withDefault 0 (Maybe.map .totalCommits mcomparison)
        , openPRs = []
        , mergedPRs = []
        , openIssues = []
        , closedIssues = []
        , doneCards = []
        , documentedCards = []
        , undocumentedCards = []
        , noImpactCards = []
        }
        allCards


computeReleaseRepos : Model -> Model
computeReleaseRepos model =
    let
        addReleaseRepo repoId repo acc =
            let
                releaseRepo =
                    makeReleaseRepo model repo
            in
            case ( releaseRepo.nextMilestone, releaseRepo.totalCommits ) of
                ( Nothing, 0 ) ->
                    acc

                _ ->
                    Dict.insert repo.name releaseRepo acc
    in
    { model | releaseRepos = Dict.foldl addReleaseRepo Dict.empty model.repos }


view : Model -> Browser.Document Msg
view model =
    { title = "Cadet"
    , body = [ viewCadet model ]
    }


viewCadet : Model -> Html Msg
viewCadet model =
    Html.div [ HA.class "cadet" ]
        [ viewNavBar model
        , Html.div [ HA.class "side-by-side" ]
            [ viewPage model
            , viewSidebar model
            ]
        ]


viewPage : Model -> Html Msg
viewPage model =
    Html.div [ HA.class "main-content" ]
        [ case model.page of
            AllProjectsPage ->
                viewAllProjectsPage model

            GlobalGraphPage ->
                viewGlobalGraphPage model

            ProjectPage name ->
                viewProjectPage model name

            LabelsPage ->
                viewLabelsPage model

            ReleasePage ->
                viewReleasePage model

            ReleaseRepoPage repoName ->
                case Dict.get repoName model.releaseRepos of
                    Just sir ->
                        viewReleaseRepoPage model sir

                    Nothing ->
                        Html.text "repo not found"

            PullRequestsPage ->
                viewPullRequestsPage model

            PullRequestsRepoPage repoName ->
                viewRepoPullRequestsPage model repoName

            BouncePage ->
                Html.text "you shouldn't see this"
        ]


viewSidebar : Model -> Html Msg
viewSidebar model =
    let
        anticipatedCards =
            List.map (viewCardEntry model) <|
                List.filterMap (\a -> Dict.get a model.cards) <|
                    List.filter (not << (\a -> OrderedSet.member a model.selectedCards)) (Set.toList model.anticipatedCards)

        selectedCards =
            List.map (viewCardEntry model) <|
                List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)

        sidebarCards =
            selectedCards ++ anticipatedCards
    in
    Html.div [ HA.class "main-sidebar" ]
        [ viewSidebarControls model
        , if List.isEmpty sidebarCards then
            Html.div [ HA.class "no-cards" ]
                [ Html.text "no cards selected" ]

          else
            Html.div [ HA.class "cards" ] sidebarCards
        ]


viewSidebarControls : Model -> Html Msg
viewSidebarControls model =
    let
        viewLabelOperation name color =
            let
                ( checkClass, icon, clickOperation ) =
                    case Dict.get name model.cardLabelOperations of
                        Just AddLabelOperation ->
                            ( "checked", Octicons.check octiconOpts, SetLabelOperation name RemoveLabelOperation )

                        Just RemoveLabelOperation ->
                            ( "unhecked", Octicons.plus octiconOpts, UnsetLabelOperation name )

                        Nothing ->
                            let
                                cards =
                                    List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)
                            in
                            if not (List.isEmpty cards) && List.all (hasLabel model name) cards then
                                ( "checked", Octicons.check octiconOpts, SetLabelOperation name RemoveLabelOperation )

                            else if List.any (hasLabel model name) cards then
                                ( "mixed", Octicons.dash octiconOpts, SetLabelOperation name AddLabelOperation )

                            else
                                ( "unchecked", Octicons.plus octiconOpts, SetLabelOperation name AddLabelOperation )
            in
            Html.div [ HA.class "label-operation" ]
                [ Html.span [ HA.class ("checkbox " ++ checkClass), HE.onClick clickOperation ]
                    [ icon ]
                , Html.span
                    ([ HA.class "label"
                     , HE.onClick (AddFilter (HasLabelFilter name color))
                     ]
                        ++ labelColorStyles model color
                    )
                    [ Html.span [ HA.class "label-text" ]
                        [ Html.text name ]
                    ]
                ]

        labelOptions =
            if model.showLabelOperations then
                Dict.keys model.reposByLabel
                    |> List.filter (String.contains model.labelSearch << Tuple.first)
                    |> List.map (\( a, b ) -> viewLabelOperation a b)

            else
                []
    in
    Html.div [ HA.class "sidebar-controls" ]
        [ Html.div [ HA.class "control-knobs" ]
            [ Html.span [ HA.class "controls-label" ] [ Html.text "change:" ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.showLabelOperations ) ]
                , HE.onClick ToggleLabelOperations
                ]
                [ Octicons.tag octiconOpts
                , Html.text "labels"
                ]
            , Html.span
                [ HE.onClick ClearSelectedCards
                , HA.class "clear-selected"
                ]
                [ Octicons.x octiconOpts ]
            ]
        , Html.div [ HA.classList [ ( "label-operations", True ), ( "visible", model.showLabelOperations ) ] ]
            [ Html.input [ HA.type_ "text", HA.placeholder "search labels", HE.onInput SetLabelSearch ] []
            , Html.div [ HA.class "label-options" ] labelOptions
            , Html.div [ HA.class "buttons" ]
                [ Html.div [ HA.class "button cancel", HE.onClick ToggleLabelOperations ]
                    [ Octicons.x octiconOpts
                    , Html.text "cancel"
                    ]
                , Html.div [ HA.class "button apply", HE.onClick ApplyLabelOperations ]
                    [ Octicons.check octiconOpts
                    , Html.text "apply"
                    ]
                ]
            ]
        ]


viewGlobalGraphPage : Model -> Html Msg
viewGlobalGraphPage model =
    Html.div [ HA.class "all-issues-graph" ]
        [ Html.div [ HA.class "column-title" ]
            [ Octicons.circuitBoard octiconOpts
            , Html.text "Issue Graph"
            ]
        , viewSpatialGraph model
        ]


viewSpatialGraph : Model -> Html Msg
viewSpatialGraph model =
    Html.div [ HA.class "spatial-graph" ]
        [ viewGraphControls model
        , model.statefulGraphs
            |> List.map (\graph -> ( graphId graph, Html.Lazy.lazy viewGraph graph ))
            |> Html.Keyed.node "div" [ HA.class "graphs" ]
        ]


graphId : StatefulGraph -> String
graphId graph =
    List.foldl (\{ card } acc -> max card.id acc) "" graph.nodes


viewGraphControls : Model -> Html Msg
viewGraphControls model =
    let
        labelFilters =
            List.filterMap
                (\filter ->
                    case filter of
                        HasLabelFilter name color ->
                            Just <|
                                Html.div
                                    ([ HA.class "control-setting"
                                     , HE.onClick (RemoveFilter filter)
                                     ]
                                        ++ labelColorStyles model color
                                    )
                                    [ Octicons.tag octiconOpts
                                    , Html.text name
                                    ]

                        _ ->
                            Nothing
                )
                model.graphFilters

        allLabelFilters =
            (\a -> List.filterMap a (Dict.toList model.reposByLabel)) <|
                \( ( name, color ), _ ) ->
                    if String.contains model.labelSearch name then
                        Just <|
                            Html.div [ HA.class "label-filter" ]
                                [ Html.div
                                    ([ HA.class "label"
                                     , HE.onClick (AddFilter (HasLabelFilter name color))
                                     ]
                                        ++ labelColorStyles model color
                                    )
                                    [ Octicons.tag octiconOpts
                                    , Html.text name
                                    ]
                                ]

                    else
                        Nothing
    in
    Html.div [ HA.class "graph-controls" ]
        [ Html.div [ HA.class "control-group" ]
            ([ Html.span [ HA.class "controls-label" ] [ Html.text "filter:" ]
             , let
                filter =
                    UntriagedFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.inbox octiconOpts
                , Html.text "untriaged"
                ]
             , let
                filter =
                    IssuesFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.issueOpened octiconOpts
                , Html.text "issues"
                ]
             , let
                filter =
                    PullRequestsFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.gitPullRequest octiconOpts
                , Html.text "pull requests"
                ]
             , case model.me of
                Just { user } ->
                    let
                        filter =
                            InvolvesUserFilter user.login
                    in
                    Html.div
                        [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                        , HE.onClick <|
                            if hasFilter model filter then
                                RemoveFilter filter

                            else
                                AddFilter filter
                        ]
                        [ Octicons.commentDiscussion octiconOpts
                        , Html.text "involving me"
                        ]

                Nothing ->
                    Html.text ""
             , Html.div [ HA.class "label-selection" ]
                [ Html.div [ HA.classList [ ( "label-filters", True ), ( "visible", model.showLabelFilters ) ] ]
                    [ Html.div [ HA.class "label-options" ]
                        allLabelFilters
                    , Html.input [ HA.type_ "text", HE.onInput SetLabelSearch ] []
                    ]
                , Html.div
                    [ HA.classList [ ( "control-setting", True ), ( "active", model.showLabelFilters ) ]
                    , HE.onClick ToggleLabelFilters
                    ]
                    [ Octicons.tag octiconOpts
                    , Html.text "label"
                    ]
                ]
             ]
                ++ labelFilters
            )
        , Html.div [ HA.class "control-group" ]
            [ Html.span [ HA.class "controls-label" ] [ Html.text "sort:" ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.graphSort == ImpactSort ) ]
                , HE.onClick (SetGraphSort ImpactSort)
                ]
                [ Octicons.flame octiconOpts
                , Html.text "impact"
                ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.graphSort == AllActivitySort ) ]
                , HE.onClick (SetGraphSort AllActivitySort)
                ]
                [ Octicons.clock octiconOpts
                , Html.text "all activity"
                ]
            ]
        ]


hasFilter : Model -> GraphFilter -> Bool
hasFilter model filter =
    List.member filter model.graphFilters


hideLabel : String -> Html Msg
hideLabel x =
    Html.span [ HA.class "hide-label" ] [ Html.text x ]


viewNavBar : Model -> Html Msg
viewNavBar model =
    Html.div [ HA.class "nav-bar" ]
        [ Html.div [ HA.class "nav" ]
            [ Html.a [ HA.class "button", HA.href "/" ]
                [ Octicons.project octiconOpts
                , hideLabel "Projects"
                ]
            , Html.a [ HA.class "button", HA.href "/release" ]
                [ Octicons.milestone octiconOpts
                , hideLabel "Release"
                ]
            , Html.a [ HA.class "button", HA.href "/pull-requests" ]
                [ Octicons.gitPullRequest octiconOpts
                , hideLabel "PRs"
                ]
            , Html.a [ HA.class "button", HA.href "/graph" ]
                [ Octicons.circuitBoard octiconOpts
                , hideLabel "Graph"
                ]
            , Html.a [ HA.class "button", HA.href "/labels" ]
                [ Octicons.tag octiconOpts
                , hideLabel "Labels"
                ]
            ]
        , case model.me of
            Nothing ->
                Html.a [ HA.class "user-info", HA.href "/auth/github" ]
                    [ Octicons.signIn octiconOpts
                    , hideLabel "Sign In"
                    ]

            Just { user } ->
                Html.a [ HA.class "user-info", HA.href user.url ]
                    [ Html.img [ HA.class "user-avatar", HA.src user.avatar ] []
                    , hideLabel user.login
                    ]
        , viewSearch model
        ]


type alias ProjectState =
    { project : GitHub.Project
    , icebox : GitHub.ProjectColumn
    , backlogs : List GitHub.ProjectColumn
    , inFlight : GitHub.ProjectColumn
    , done : GitHub.ProjectColumn
    }


selectStatefulProject : GitHub.Project -> Maybe ProjectState
selectStatefulProject project =
    let
        findColumns match =
            List.filter (match << .name) project.columns

        icebox =
            findColumns Project.detectColumn.icebox

        backlogs =
            findColumns Project.detectColumn.backlog

        inFlights =
            findColumns Project.detectColumn.inFlight

        dones =
            findColumns Project.detectColumn.done
    in
    case ( backlogs, ( icebox, inFlights, dones ) ) of
        ( (_ :: _) as bs, ( [ ib ], [ i ], [ d ] ) ) ->
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
            List.filterMap selectStatefulProject (Dict.values model.projects)
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.project octiconOpts
            , Html.text "Projects"
            ]
        , Html.div [ HA.class "metrics-items" ]
            (List.map (viewProject model) statefulProjects)
        ]


viewLabelsPage : Model -> Html Msg
viewLabelsPage model =
    let
        newLabel =
            Html.div [ HA.class "new-label" ]
                [ Html.div [ HA.class "label-cell" ]
                    [ Html.div [ HA.class "label-name" ]
                        [ Html.form [ HA.class "label-edit", HE.onSubmit CreateLabel ]
                            [ Html.span
                                ([ HA.class "label-icon"
                                 , HE.onClick RandomizeNewLabelColor
                                 ]
                                    ++ labelColorStyles model model.newLabel.color
                                )
                                [ Octicons.sync octiconOpts ]
                            , Html.input
                                ([ HE.onInput SetNewLabelName
                                 , HA.value model.newLabel.name
                                 ]
                                    ++ labelColorStyles model model.newLabel.color
                                )
                                []
                            ]
                        ]
                    ]
                , Html.div [ HA.class "label-cell" ]
                    [ Html.div [ HA.class "label-controls" ]
                        [ Html.span
                            [ HE.onClick CreateLabel
                            , HA.class "button"
                            ]
                            [ Octicons.plus octiconOpts ]
                        ]
                    ]
                ]

        labelRows =
            (\a -> List.map a (Dict.toList model.reposByLabel)) <|
                \( ( name, color ), repoIds ) ->
                    viewLabelRow model { name = name, color = color } repoIds
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.tag octiconOpts
            , Html.text "Labels"
            ]
        , newLabel
        , Html.div [ HA.class "labels-table" ]
            labelRows
        ]


viewReleasePage : Model -> Html Msg
viewReleasePage model =
    let
        repos =
            Dict.values model.releaseRepos
                |> List.sortBy .totalCommits
                |> List.reverse
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.milestone octiconOpts
            , Html.text "Release"
            ]
        , Html.div [ HA.class "metrics-items" ]
            (List.map (viewReleaseRepo model) repos)
        ]


viewReleaseRepoPage : Model -> ReleaseRepo -> Html Msg
viewReleaseRepoPage model sir =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Html.a [ HA.href "/release" ]
                [ Octicons.milestone octiconOpts
                , Html.text "Release"
                ]
            , Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.nextMilestone of
                Just nm ->
                    Html.span [ HA.class "release-next-milestone" ]
                        [ Octicons.milestone octiconOpts
                        , Html.text nm.title
                        ]

                Nothing ->
                    Html.text ""
            ]
        , viewTabbedCards model
            .releaseRepoTab
            SetReleaseRepoTab
            [ ( Octicons.inbox octiconOpts, "To Do", sir.openIssues ++ sir.openPRs )
            , ( Octicons.check octiconOpts, "Done", sir.doneCards )
            , ( viewLabelByName model "release/documented", "Documented", sir.documentedCards )
            , ( viewLabelByName model "release/undocumented", "Undocumented", sir.undocumentedCards )
            , ( viewLabelByName model "release/no-impact", "No Impact", sir.noImpactCards )
            ]
        ]


viewLabelByName : Model -> String -> Html Msg
viewLabelByName model name =
    let
        mlabel =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (List.head << Dict.values)
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)
    in
    case mlabel of
        Just label ->
            viewLabel model label

        Nothing ->
            Html.text ("missing label: " ++ name)


viewTabbedCards :
    Model
    -> (Model -> Int)
    -> (Int -> Msg)
    -> List ( Html Msg, String, List Card )
    -> Html Msg
viewTabbedCards model currentTab setTab tabs =
    Html.div [ HA.class "tabbed-cards" ]
        [ let
            tabAttrs tab =
                [ HA.classList [ ( "tab", True ), ( "selected", currentTab model == tab ) ]
                , HE.onClick (setTab tab)
                ]

            tabCount count =
                Html.span [ HA.class "counter" ]
                    [ Html.text (String.fromInt count) ]
          in
          Html.div [ HA.class "tab-row" ] <|
            List.indexedMap
                (\idx ( icon, label, cards ) ->
                    Html.span (tabAttrs idx)
                        [ icon
                        , hideLabel label
                        , tabCount (List.length cards)
                        ]
                )
                tabs
        , let
            firstTabClass =
                HA.classList [ ( "first-tab", currentTab model == 0 ) ]
          in
          case List.drop (currentTab model) tabs of
            ( _, _, cards ) :: _ ->
                if List.isEmpty cards then
                    Html.div [ HA.class "no-tab-cards", firstTabClass ]
                        [ Html.text "no cards" ]

                else
                    cards
                        |> List.sortBy (.updatedAt >> Time.posixToMillis)
                        |> List.reverse
                        |> List.map (viewCard model)
                        |> Html.div [ HA.class "tab-cards", firstTabClass ]

            _ ->
                Html.text ""
        ]


viewReleaseRepo : Model -> ReleaseRepo -> Html Msg
viewReleaseRepo model sir =
    Html.div [ HA.class "metrics-item" ]
        [ Html.a [ HA.class "column-title", HA.href ("/release/" ++ sir.repo.name) ]
            [ Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.nextMilestone of
                Just nm ->
                    Html.span []
                        [ Octicons.milestone octiconOpts
                        , Html.text nm.title
                        ]

                Nothing ->
                    Html.text ""
            ]
        , Html.div [ HA.class "metrics" ]
            [ viewMetric
                (Octicons.gitCommit { octiconOpts | color = Colors.gray })
                sir.totalCommits
                "commits"
                "commit"
                "since last release"
            , viewMetric
                (Octicons.gitPullRequest { octiconOpts | color = Colors.purple })
                (List.length sir.mergedPRs)
                "merged PRs"
                "merged PRs"
                "since last release"
            , if List.isEmpty sir.closedIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.check { octiconOpts | color = Colors.green })
                    (List.length sir.closedIssues)
                    "closed issues"
                    "closed issue"
                    "in milestone"
            , if List.isEmpty sir.openIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.issueOpened { octiconOpts | color = Colors.yellow })
                    (List.length sir.openIssues)
                    "open issues"
                    "open issue"
                    "in milestone"
            ]
        ]


viewPullRequestsPage : Model -> Html Msg
viewPullRequestsPage model =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.gitPullRequest octiconOpts
            , Html.text "Pull Requests"
            ]
        , Dict.toList model.openPRsByRepo
            |> List.sortBy (Tuple.second >> List.length)
            |> List.reverse
            |> List.map (\( a, b ) -> viewRepoPRs model a b)
            |> Html.div [ HA.class "pull-request-columns" ]
        ]


type alias CategorizedRepoPRs =
    { inbox : List Card
    , failedChecks : List Card
    , needsTest : List Card
    , mergeConflict : List Card
    , changesRequested : List Card
    }


viewRepoPRs : Model -> GitHub.ID -> List GitHub.ID -> Html Msg
viewRepoPRs model repoId prIds =
    case Dict.get repoId model.repos of
        Just repo ->
            Html.div [ HA.class "repo-pull-requests" ]
                [ Html.a [ HA.class "column-title", HA.href ("/pull-requests/" ++ repo.name) ]
                    [ Octicons.repo octiconOpts
                    , Html.text repo.name
                    ]
                , prIds
                    |> List.filterMap (\id -> Dict.get id model.cards)
                    |> List.sortBy (.updatedAt >> Time.posixToMillis)
                    |> List.reverse
                    |> List.map (viewCard model)
                    |> Html.div [ HA.class "cards" ]
                ]

        Nothing ->
            Html.text ""


failedChecks : Card -> Bool
failedChecks card =
    case card.content of
        GitHub.PullRequestCardContent { lastCommit } ->
            case lastCommit |> Maybe.andThen .status of
                Just { contexts } ->
                    List.any ((==) GitHub.StatusStateFailure << .state) contexts

                Nothing ->
                    False

        _ ->
            False


changesRequested : Model -> Card -> Bool
changesRequested model card =
    case Dict.get card.id model.reviewers of
        Just reviews ->
            List.any ((==) GitHub.PullRequestReviewStateChangesRequested << .state) reviews

        _ ->
            False


hasMergeConflict : Card -> Bool
hasMergeConflict card =
    case card.content of
        GitHub.PullRequestCardContent { mergeable } ->
            case mergeable of
                GitHub.MergeableStateMergeable ->
                    False

                GitHub.MergeableStateConflicting ->
                    True

                GitHub.MergeableStateUnknown ->
                    False

        _ ->
            False


viewRepoPullRequestsPage : Model -> String -> Html Msg
viewRepoPullRequestsPage model repoName =
    let
        prCards =
            Dict.get repoName model.reposByName
                |> Maybe.andThen (\id -> Dict.get id model.openPRsByRepo)
                |> Maybe.map (List.filterMap (\id -> Dict.get id model.cards))
                |> Maybe.withDefault []

        categorizeCard card cat =
            if hasLabel model "needs-test" card then
                { cat | needsTest = card :: cat.needsTest }

            else if changesRequested model card then
                { cat | changesRequested = card :: cat.changesRequested }

            else if failedChecks card then
                { cat | failedChecks = card :: cat.failedChecks }

            else if hasMergeConflict card then
                { cat | mergeConflict = card :: cat.mergeConflict }

            else
                { cat | inbox = card :: cat.inbox }

        categorized =
            List.foldl categorizeCard
                { inbox = []
                , failedChecks = []
                , needsTest = []
                , mergeConflict = []
                , changesRequested = []
                }
                prCards
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Html.div []
                [ Html.a [ HA.href "/pull-requests" ]
                    [ Octicons.gitPullRequest octiconOpts
                    , Html.text "Pull Requests"
                    ]
                , Octicons.repo octiconOpts
                , Html.text repoName
                ]
            ]
        , Html.div [ HA.class "repo-pull-requests" ]
            [ viewTabbedCards model
                .repoPullRequestsTab
                SetRepoPullRequestsTab
                [ ( Octicons.inbox octiconOpts, "Inbox", categorized.inbox )
                , ( Octicons.x octiconOpts, "Failed Checks", categorized.failedChecks )
                , ( Octicons.alert octiconOpts, "Merge Conflict", categorized.mergeConflict )
                , ( Octicons.law octiconOpts, "Changes Requested", categorized.changesRequested )
                , ( viewLabelByName model "needs-test", "Needs Tests", categorized.needsTest )
                ]
            ]
        ]


matchesLabel : SharedLabel -> GitHub.Label -> Bool
matchesLabel sl l =
    l.name == sl.name && String.toLower l.color == String.toLower sl.color


includesLabel : Model -> SharedLabel -> List GitHub.ID -> Bool
includesLabel model label labelIds =
    List.any
        (\id ->
            case Dict.get id model.allLabels of
                Just l ->
                    matchesLabel label l

                Nothing ->
                    False
        )
        labelIds


viewLabelRow : Model -> SharedLabel -> List GitHub.ID -> Html Msg
viewLabelRow model label repoIds =
    let
        stateKey =
            labelKey label

        ( prs, issues ) =
            Dict.foldl
                (\_ c ( ps, is ) ->
                    if Card.isOpen c && includesLabel model label c.labels then
                        if Card.isPR c then
                            ( c :: ps, is )

                        else
                            ( ps, c :: is )

                    else
                        ( ps, is )
                )
                ( [], [] )
                model.cards
    in
    Html.div [ HA.class "label-row" ]
        [ Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-name" ]
                [ case Dict.get stateKey model.editingLabels of
                    Nothing ->
                        Html.div [ HA.class "label-background" ]
                            [ if String.isEmpty model.newLabel.name && Dict.isEmpty model.editingLabels then
                                Html.span
                                    ([ HA.class "label-icon"
                                     , HE.onClick (searchLabel model label.name)
                                     ]
                                        ++ labelColorStyles model label.color
                                    )
                                    [ Octicons.tag octiconOpts ]

                              else
                                Html.span
                                    ([ HA.class "label-icon"
                                     , HE.onClick (SetLabelColor label.color)
                                     ]
                                        ++ labelColorStyles model label.color
                                    )
                                    [ Octicons.paintcan octiconOpts ]
                            , Html.span
                                ([ HA.class "label big"
                                 , HE.onClick (searchLabel model label.name)
                                 ]
                                    ++ labelColorStyles model label.color
                                )
                                [ Html.span [ HA.class "label-text" ]
                                    [ Html.text label.name ]
                                ]
                            ]

                    Just newLabel ->
                        Html.form [ HA.class "label-edit", HE.onSubmit (EditLabel label) ]
                            [ Html.span
                                ([ HA.class "label-icon"
                                 , HE.onClick (RandomizeLabelColor label)
                                 ]
                                    ++ labelColorStyles model newLabel.color
                                )
                                [ Octicons.sync octiconOpts ]
                            , Html.input
                                ([ HE.onInput (SetLabelName label)
                                 , HA.value newLabel.name
                                 ]
                                    ++ labelColorStyles model newLabel.color
                                )
                                []
                            ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts first" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.issueOpened octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length issues))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.gitPullRequest octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length prs))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts last" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.repo octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length repoIds))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell drawer-cell" ]
            [ Html.div [ HA.class "label-controls" ]
                [ Html.span
                    [ HE.onClick (MirrorLabel label)
                    , HA.class "button"
                    ]
                    [ Octicons.mirror octiconOpts ]
                , if Dict.member stateKey model.editingLabels then
                    Html.span
                        [ HE.onClick (StopEditingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.x octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (StartEditingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.pencil octiconOpts ]
                , if Set.member stateKey model.deletingLabels then
                    Html.span
                        [ HE.onClick (StopDeletingLabel label)
                        , HA.class "button close"
                        ]
                        [ Octicons.x octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (StartDeletingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.trashcan octiconOpts ]
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
                        , HA.class "button delete"
                        ]
                        [ Octicons.check octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (EditLabel label)
                        , HA.class "button edit"
                        ]
                        [ Octicons.check octiconOpts ]
                ]
            ]
        ]


searchLabel : Model -> String -> Msg
searchLabel model name =
    SearchCards <|
        if String.isEmpty model.cardSearch then
            "label:" ++ name

        else
            model.cardSearch ++ " label:" ++ name


labelColorStyles : Model -> String -> List (Html.Attribute Msg)
labelColorStyles model color =
    [ HA.style "background-color" ("#" ++ color)
    , if colorIsLight model color then
        HA.class "light-label"

      else
        HA.class "dark-label"
    ]


onlyOpenCards : Model -> List Backend.ColumnCard -> List Backend.ColumnCard
onlyOpenCards model =
    List.filter <|
        \{ contentId } ->
            case contentId of
                Just id ->
                    case Dict.get id model.cards of
                        Just card ->
                            Card.isOpen card

                        Nothing ->
                            False

                Nothing ->
                    False


viewMetric : Html Msg -> Int -> String -> String -> String -> Html Msg
viewMetric icon count plural singular description =
    Html.div [ HA.class "metric" ]
        [ icon
        , Html.span [ HA.class "count" ] [ Html.text (String.fromInt count) ]
        , Html.text " "
        , Html.text <|
            if count == 1 then
                singular

            else
                plural
        , Html.text " "
        , Html.text description
        ]


viewProject : Model -> ProjectState -> Html Msg
viewProject model { project, backlogs, inFlight, done } =
    let
        cardCount column =
            Dict.get column.id model.columnCards
                |> Maybe.map (List.length << onlyOpenCards model)
                |> Maybe.withDefault 0
    in
    Html.div [ HA.class "metrics-item" ]
        [ Html.a [ HA.class "column-title", HA.href ("/projects/" ++ project.name) ]
            [ Octicons.project octiconOpts
            , Html.text project.name
            ]
        , Html.div [ HA.class "metrics" ]
            [ viewMetric
                (Octicons.book { octiconOpts | color = Colors.gray })
                (List.sum (List.map cardCount backlogs))
                "stories"
                "story"
                "scheduled"
            , viewMetric
                (Octicons.pulse { octiconOpts | color = Colors.yellow })
                (cardCount inFlight)
                "stories"
                "story"
                "in-flight"
            , viewMetric
                (Octicons.check { octiconOpts | color = Colors.green })
                (cardCount done)
                "stories"
                "story"
                "done"
            ]
        ]


viewProjectColumn : Model -> GitHub.Project -> (List Backend.ColumnCard -> List Backend.ColumnCard) -> Html Msg -> GitHub.ProjectColumn -> Html Msg
viewProjectColumn model project mod icon col =
    let
        cards =
            mod <|
                Maybe.withDefault [] (Dict.get col.id model.columnCards)

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
        [ Html.div [ HA.class "column-title" ]
            [ icon
            , Html.text col.name
            ]
        , if List.isEmpty cards then
            Html.div [ HA.class "no-cards" ]
                [ Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing
                ]

          else
            Html.div [ HA.class "cards" ] <|
                Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing
                    :: List.concatMap (viewProjectColumnCard model project col) cards
        ]


viewProjectColumnCard : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> List (Html Msg)
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
    case ( ghCard.note, ghCard.contentId ) of
        ( Just n, Nothing ) ->
            [ Drag.draggable model.projectDrag ProjectDrag dragId (viewNoteCard model col n)
            , Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate (Just dragId)
            ]

        ( Nothing, Just contentId ) ->
            case Dict.get contentId model.cards of
                Just card ->
                    [ Drag.draggable model.projectDrag ProjectDrag dragId (viewCard model card)
                    , Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate (Just dragId)
                    ]

                Nothing ->
                    Log.debug "impossible: content has no card" contentId <|
                        []

        _ ->
            Log.debug "impossible?: card has no note or content" ghCard <|
                []


viewProjectPage : Model -> String -> Html Msg
viewProjectPage model name =
    let
        statefulProjects =
            List.filterMap selectStatefulProject (Dict.values model.projects)

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
        [ Html.div [ HA.class "icebox-graph" ]
            [ Html.div [ HA.class "column-title" ]
                [ Octicons.circuitBoard octiconOpts
                , Html.text (project.name ++ " Graph")
                ]
            , viewSpatialGraph model
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
              Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing
            ]
        , Html.div [ HA.class "project-columns" ]
            ([ Html.div [ HA.class "column done-column" ]
                [ viewProjectColumn model project (onlyOpenCards model) (Octicons.check octiconOpts) done ]
             , Html.div [ HA.class "column in-flight-column" ]
                [ viewProjectColumn model project identity (Octicons.pulse octiconOpts) inFlight ]
             ]
                ++ List.map
                    (\backlog ->
                        Html.div [ HA.class "column backlog-column" ]
                            [ viewProjectColumn model project identity (Octicons.book octiconOpts) backlog ]
                    )
                    backlogs
            )
        ]


viewSearch : Model -> Html Msg
viewSearch model =
    Html.div [ HA.class "card-search" ]
        [ Html.form [ HE.onSubmit SelectAnticipatedCards ]
            [ Html.input
                [ HA.type_ "search"
                , HA.placeholder "search cards"
                , HA.value model.cardSearch
                , HE.onInput SearchCards
                ]
                []
            ]
        ]


statefulGraph : Model -> ForceGraph GitHub.ID -> StatefulGraph
statefulGraph model fg =
    let
        allFilters =
            case model.baseGraphFilter of
                Just f ->
                    f :: model.graphFilters

                Nothing ->
                    model.graphFilters

        ( nodes, matches ) =
            ForceGraph.fold
                (\node ( ns, ms ) ->
                    case Dict.get node.value model.cards of
                        Just card ->
                            let
                                satisfies =
                                    satisfiesFilters model allFilters card
                            in
                            ( { card = card
                              , x = node.x
                              , y = node.y
                              , mass = node.mass
                              , filteredOut = not satisfies
                              }
                                :: ns
                            , if satisfies then
                                Set.insert node.id ms

                              else
                                ms
                            )

                        Nothing ->
                            ( ns, ms )
                )
                ( [], Set.empty )
                fg

        edges =
            List.filterMap
                (\( from, to ) ->
                    case ( ForceGraph.get from fg, ForceGraph.get to fg ) of
                        ( Just fromNode, Just toNode ) ->
                            Just
                                { source =
                                    { x = fromNode.x
                                    , y = fromNode.y
                                    }
                                , target =
                                    { x = toNode.x
                                    , y = toNode.y
                                    }
                                , filteredOut =
                                    not (Set.member from matches && Set.member to matches)
                                }

                        _ ->
                            Nothing
                )
                fg.edges
    in
    { state = baseGraphState model
    , nodes = nodes
    , edges = edges
    , matches = matches
    }


computeGraphsView : Model -> Model
computeGraphsView model =
    let
        statefulGraphs =
            List.map (statefulGraph model) model.graphs

        filteredGraphs =
            List.filter (not << Set.isEmpty << .matches) statefulGraphs

        sortFunc a b =
            case model.graphSort of
                ImpactSort ->
                    graphImpactCompare model a.nodes b.nodes

                AllActivitySort ->
                    graphAllActivityCompare model a.nodes b.nodes
    in
    { model
        | statefulGraphs =
            filteredGraphs
                |> List.sortWith sortFunc
                |> List.reverse
    }


baseGraphState : Model -> CardNodeState
baseGraphState model =
    { allLabels = model.allLabels
    , reviewers = model.reviewers
    , currentTime = model.currentTime
    , selectedCards = OrderedSet.empty
    , anticipatedCards = Set.empty
    , highlightedNode = Nothing
    }


satisfiesFilters : Model -> List GraphFilter -> Card -> Bool
satisfiesFilters model filters card =
    List.all (\a -> satisfiesFilter model a card) filters


satisfiesFilter : Model -> GraphFilter -> Card -> Bool
satisfiesFilter model filter card =
    case filter of
        ExcludeAllFilter ->
            False

        InProjectFilter name ->
            isInProject name card

        HasLabelFilter label color ->
            hasLabelAndColor model label color card

        InvolvesUserFilter login ->
            involvesUser model login card

        PullRequestsFilter ->
            Card.isPR card

        IssuesFilter ->
            not (Card.isPR card)

        UntriagedFilter ->
            Card.isUntriaged card


graphImpactCompare : Model -> List CardNode -> List CardNode -> Order
graphImpactCompare model a b =
    case compare (List.length a) (List.length b) of
        EQ ->
            let
                graphScore =
                    List.foldl
                        (\{ card } sum -> card.score + sum)
                        0
            in
            compare (graphScore a) (graphScore b)

        x ->
            x


graphAllActivityCompare : Model -> List CardNode -> List CardNode -> Order
graphAllActivityCompare model a b =
    let
        latestActivity =
            List.foldl
                (\{ card } latest ->
                    let
                        mlatest =
                            Dict.get card.id model.actors
                                |> Maybe.andThen List.head
                                |> Maybe.map (.createdAt >> Time.posixToMillis)

                        updated =
                            Time.posixToMillis card.updatedAt
                    in
                    case mlatest of
                        Just activity ->
                            max activity latest

                        Nothing ->
                            max updated latest
                )
                0
    in
    compare (latestActivity a) (latestActivity b)


viewGraph : StatefulGraph -> Html Msg
viewGraph graph =
    let
        ( flairs, nodes, bounds ) =
            List.foldl (viewNodeLowerUpper graph.state) ( [], [], [] ) graph.nodes

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
            List.map (linkPath graph.state) graph.edges
    in
    Svg.svg
        [ SA.width (String.fromFloat width ++ "px")
        , SA.style "max-width: 95%"
        , SA.viewBox (String.fromFloat minX ++ " " ++ String.fromFloat minY ++ " " ++ String.fromFloat width ++ " " ++ String.fromFloat height)
        ]
        [ Svg.g [ SA.class "links" ] links
        , Svg.Keyed.node "g" [ SA.class "lower" ] flairs
        , Svg.Keyed.node "g" [ SA.class "upper" ] nodes
        ]


viewNodeLowerUpper :
    CardNodeState
    -> CardNode
    -> ( List ( String, Svg Msg ), List ( String, Svg Msg ), List NodeBounds )
    -> ( List ( String, Svg Msg ), List ( String, Svg Msg ), List NodeBounds )
viewNodeLowerUpper state node ( fs, ns, bs ) =
    let
        radiiWithFlair =
            cardRadiusWithFlair node.card node.mass

        bounds =
            { x1 = node.x - radiiWithFlair
            , y1 = node.y - radiiWithFlair
            , x2 = node.x + radiiWithFlair
            , y2 = node.y + radiiWithFlair
            }

        isHighlighted =
            Set.member node.card.id state.anticipatedCards
                || (state.highlightedNode == Just node.card.id)

        isSelected =
            OrderedSet.member node.card.id state.selectedCards
    in
    ( ( node.card.id, Svg.Lazy.lazy4 viewCardFlair node state.currentTime isHighlighted state.reviewers ) :: fs
    , ( node.card.id, Svg.Lazy.lazy4 viewCardCircle node state.allLabels isHighlighted isSelected ) :: ns
    , bounds :: bs
    )


viewCardFlair : CardNode -> Time.Posix -> Bool -> Dict GitHub.ID (List GitHub.PullRequestReview) -> Svg Msg
viewCardFlair node currentTime isHighlighted reviewers =
    let
        flairArcs =
            reactionFlairArcs (Maybe.withDefault [] <| Dict.get node.card.id reviewers) node.card node.mass

        radii =
            { base = node.mass
            , withoutFlair = node.mass
            , withFlair = cardRadiusWithFlair node.card node.mass
            }

        scale =
            if isHighlighted then
                "1.1"

            else if node.filteredOut then
                "0.5"

            else
                "1"

        anticipateRadius =
            if List.isEmpty node.card.labels then
                radii.base + 5

            else
                radii.withoutFlair + 5

        anticipatedHalo =
            if isHighlighted then
                Svg.circle
                    [ SA.r (String.fromFloat anticipateRadius)
                    , SA.class "anticipated-circle"
                    ]
                    []

            else
                Svg.text ""

        classes =
            [ "flair"
            , activityClass currentTime node.card.updatedAt
            , if node.filteredOut then
                "filtered-out"

              else
                "filtered-in"
            ]
    in
    Svg.g
        [ SA.transform ("translate(" ++ String.fromFloat node.x ++ "," ++ String.fromFloat node.y ++ ") scale(" ++ scale ++ ")")
        , SA.class (String.join " " classes)
        ]
        (flairArcs ++ [ anticipatedHalo ])


viewCardCircle : CardNode -> Dict GitHub.ID GitHub.Label -> Bool -> Bool -> Svg Msg
viewCardCircle node labels isHighlighted isSelected =
    let
        labelArcs =
            cardLabelArcs labels node.card node.mass

        radii =
            { base = node.mass
            , withoutFlair = node.mass
            , withFlair = cardRadiusWithFlair node.card node.mass
            }

        circle =
            Svg.g []
                [ Svg.circle
                    [ SA.r (String.fromFloat radii.base)
                    , SA.fill "#fff"
                    ]
                    []
                , Svg.text_
                    [ SA.textAnchor "middle"
                    , SA.alignmentBaseline "middle"
                    , SA.class "issue-number"
                    ]
                    [ Svg.text ("#" ++ String.fromInt node.card.number)
                    ]
                ]

        card =
            node.card

        scale =
            if isHighlighted then
                "1.1"

            else if node.filteredOut then
                "0.5"

            else
                "1"
    in
    Svg.g
        [ SA.transform ("translate(" ++ String.fromFloat node.x ++ "," ++ String.fromFloat node.y ++ ") scale(" ++ scale ++ ")")
        , if Card.isInFlight card then
            SA.class "in-flight"

          else if Card.isDone card then
            SA.class "done"

          else if Card.isIcebox card then
            SA.class "icebox"

          else if Card.isBacklog card then
            SA.class "backlog"

          else
            SA.class "untriaged"
        , if node.filteredOut then
            SA.class "filtered-out"

          else
            SA.class "filtered-in"
        , SE.onMouseOver (AnticipateCardFromNode card.id)
        , SE.onMouseOut (UnanticipateCardFromNode card.id)
        , SE.onClick
            (if isSelected then
                DeselectCard card.id

             else
                SelectCard card.id
            )
        ]
        (circle :: labelArcs)


linkPath : CardNodeState -> CardEdge -> Svg Msg
linkPath state { source, target, filteredOut } =
    Svg.line
        [ SA.class "graph-edge"
        , if filteredOut then
            SA.class "filtered-out"

          else
            SA.class "filtered-in"
        , SA.x1 (String.fromFloat source.x)
        , SA.y1 (String.fromFloat source.y)
        , SA.x2 (String.fromFloat target.x)
        , SA.y2 (String.fromFloat target.y)
        ]
        []


cardRadiusWithLabels : Float -> Float
cardRadiusWithLabels mass =
    mass + 3


flairRadiusBase : Float
flairRadiusBase =
    20


cardRadiusWithFlair : Card -> Float -> Float
cardRadiusWithFlair card mass =
    let
        reactionCounts =
            List.map .count card.reactions

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (card.commentCount :: reactionCounts)
    in
    mass + flairRadiusBase + toFloat highestFlair


reactionFlairArcs : List GitHub.PullRequestReview -> Card -> Float -> List (Svg Msg)
reactionFlairArcs reviews card radius =
    let
        reactionTypeEmoji type_ =
            case type_ of
                GitHub.ReactionTypeThumbsUp ->
                    "👍"

                GitHub.ReactionTypeThumbsDown ->
                    "👎"

                GitHub.ReactionTypeLaugh ->
                    "😄"

                GitHub.ReactionTypeConfused ->
                    "😕"

                GitHub.ReactionTypeHeart ->
                    "💖"

                GitHub.ReactionTypeHooray ->
                    "🎉"

                GitHub.ReactionTypeRocket ->
                    "🚀"

                GitHub.ReactionTypeEyes ->
                    "👀"

        emojiReactions =
            (\a -> List.map a card.reactions) <|
                \{ type_, count } ->
                    ( Html.text (reactionTypeEmoji type_), "reaction", count )

        prSegments =
            case card.content of
                GitHub.IssueCardContent _ ->
                    []

                GitHub.PullRequestCardContent pr ->
                    let
                        statusChecks =
                            case Maybe.map .status pr.lastCommit of
                                Just (Just { contexts }) ->
                                    (\a -> List.map a contexts) <|
                                        \c ->
                                            ( Html.span [ HA.class "status-icon" ]
                                                [ case c.state of
                                                    GitHub.StatusStatePending ->
                                                        Octicons.primitiveDot { octiconOpts | color = Colors.yellow }

                                                    GitHub.StatusStateSuccess ->
                                                        Octicons.check { octiconOpts | color = Colors.green }

                                                    GitHub.StatusStateFailure ->
                                                        Octicons.x { octiconOpts | color = Colors.red }

                                                    GitHub.StatusStateExpected ->
                                                        Octicons.question { octiconOpts | color = Colors.purple }

                                                    GitHub.StatusStateError ->
                                                        Octicons.alert { octiconOpts | color = Colors.orange }
                                                ]
                                            , case c.state of
                                                GitHub.StatusStatePending ->
                                                    "pending"

                                                GitHub.StatusStateSuccess ->
                                                    "success"

                                                GitHub.StatusStateFailure ->
                                                    "failure"

                                                GitHub.StatusStateExpected ->
                                                    "expected"

                                                GitHub.StatusStateError ->
                                                    "error"
                                            , 0
                                            )

                                _ ->
                                    []

                        reviewStates =
                            List.map
                                (\r ->
                                    ( Html.img [ HA.class "status-actor", HA.src r.author.avatar ] []
                                    , case r.state of
                                        GitHub.PullRequestReviewStatePending ->
                                            "pending"

                                        GitHub.PullRequestReviewStateApproved ->
                                            "success"

                                        GitHub.PullRequestReviewStateChangesRequested ->
                                            "failure"

                                        GitHub.PullRequestReviewStateCommented ->
                                            "commented"

                                        GitHub.PullRequestReviewStateDismissed ->
                                            "dismissed"
                                    , 0
                                    )
                                )
                                reviews
                    in
                    ( Html.span [ HA.class "status-icon" ] [ Octicons.gitMerge octiconOpts ]
                    , case pr.mergeable of
                        GitHub.MergeableStateMergeable ->
                            "success"

                        GitHub.MergeableStateConflicting ->
                            "failure"

                        GitHub.MergeableStateUnknown ->
                            "pending"
                    , 0
                    )
                        :: (statusChecks ++ reviewStates)

        flairs =
            prSegments
                ++ (List.filter (\( _, _, count ) -> count > 0) <|
                        (( Octicons.comment octiconOpts, "comments", card.commentCount ) :: emojiReactions)
                   )

        segments =
            Shape.pie
                { startAngle = 0
                , endAngle = 2 * pi
                , padAngle = 0.03
                , sortingFn = Basics.compare
                , valueFn = identity
                , innerRadius = radius
                , outerRadius = radius + flairRadiusBase
                , cornerRadius = 3
                , padRadius = 0
                }
                (List.repeat (List.length flairs) 1)

        reactionSegment i ( _, _, count ) =
            case List.take 1 (List.drop i segments) of
                [ s ] ->
                    s

                _ ->
                    Log.debug "impossible: empty segments"
                        ( i, segments )
                        emptyArc
    in
    (\a -> List.indexedMap a flairs) <|
        \i (( content, class, count ) as reaction) ->
            let
                segmentArc =
                    reactionSegment i reaction

                arc =
                    { segmentArc | outerRadius = segmentArc.outerRadius + toFloat count }

                ( centroidX, centroidY ) =
                    let
                        r =
                            arc.innerRadius + 12

                        a =
                            (arc.startAngle + arc.endAngle) / 2 - pi / 2
                    in
                    ( cos a * r - 8, sin a * r - 8 )
            in
            Svg.g [ SA.class "reveal" ]
                [ Path.element (Shape.arc arc)
                    [ SA.class ("flair-arc " ++ class)
                    ]
                , Svg.foreignObject
                    [ SA.transform ("translate(" ++ String.fromFloat centroidX ++ "," ++ String.fromFloat centroidY ++ ")")
                    , SA.class "hidden"
                    ]
                    [ content
                    ]
                ]


cardLabelArcs : Dict GitHub.ID GitHub.Label -> Card -> Float -> List (Svg Msg)
cardLabelArcs allLabels card radius =
    let
        labelSegments =
            Shape.pie
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
            Path.element (Shape.arc arc)
                [ SA.fill ("#" ++ label.color)
                , SA.class "label-arc"
                ]
        )
        labelSegments
        (List.filterMap (\a -> Dict.get a allLabels) card.labels)


activityClass : Time.Posix -> Time.Posix -> String
activityClass now date =
    let
        delta =
            Time.posixToMillis now - Time.posixToMillis date

        daysSinceLastUpdate =
            delta // (24 * 60 * 60 * 1000)
    in
    if daysSinceLastUpdate <= 1 then
        "active-today"

    else if daysSinceLastUpdate <= 2 then
        "active-yesterday"

    else if daysSinceLastUpdate <= 7 then
        "active-this-week"

    else if daysSinceLastUpdate <= 30 then
        "active-this-month"

    else
        "active-long-ago"


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
        [ Drag.draggable model.projectDrag ProjectDrag dragSource <|
            cardView
        , Html.div [ HA.class "card-buttons" ]
            [ if not anticipated then
                Html.span
                    [ HE.onClick (DeselectCard card.id)
                    ]
                    [ Octicons.x octiconOpts ]

              else
                Html.text ""
            ]
        ]


isInProject : String -> Card -> Bool
isInProject name card =
    List.member name (List.map (.project >> .name) card.cards)


involvesUser : Model -> String -> Card -> Bool
involvesUser model login card =
    Maybe.withDefault [] (Dict.get card.id model.actors)
        |> List.any (.user >> Maybe.map .login >> (==) (Just login))


lastActivityIsByUser : Dict GitHub.ID (List Backend.EventActor) -> String -> Card -> Bool
lastActivityIsByUser cardEvents login card =
    Dict.get card.id cardEvents
        |> Maybe.andThen List.head
        |> Maybe.andThen .user
        |> Maybe.map ((==) login << .login)
        |> Maybe.withDefault False


isAnticipated : Model -> Card -> Bool
isAnticipated model card =
    Set.member card.id model.anticipatedCards && not (OrderedSet.member card.id model.selectedCards)


hasLabel : Model -> String -> Card -> Bool
hasLabel model name card =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)
    in
    case mlabelId of
        Just id ->
            List.member id card.labels

        Nothing ->
            False


hasLabelAndColor : Model -> String -> String -> Card -> Bool
hasLabelAndColor model name color card =
    let
        matchingLabels =
            model.allLabels
                |> Dict.filter (\_ l -> l.name == name && l.color == color)
    in
    List.any (\a -> Dict.member a matchingLabels) card.labels


viewCard : Model -> Card -> Html Msg
viewCard model card =
    Html.div
        [ HA.classList
            [ ( "card", True )
            , ( "in-flight", Card.isInFlight card )
            , ( "done", Card.isDone card )
            , ( "icebox", Card.isIcebox card )
            , ( "backlog", Card.isBacklog card )
            , ( "paused", Card.isPaused card )
            , ( "anticipated", isAnticipated model card )
            , ( "highlighted", model.highlightedCard == Just card.id )
            , ( activityClass model.currentTime card.updatedAt, Card.isPR card )
            , ( "last-activity-is-me"
              , case model.me of
                    Just { user } ->
                        lastActivityIsByUser model.actors user.login card

                    Nothing ->
                        False
              )
            ]
        , HE.onClick (SelectCard card.id)
        , HE.onMouseOver (HighlightNode card.id)
        , HE.onMouseOut (UnhighlightNode card.id)
        ]
        [ Html.div [ HA.class "card-info" ]
            [ Html.div [ HA.class "card-actors" ] <|
                List.map (viewCardActor model) (recentActors model card)
            , Html.span
                [ HA.class "card-title"
                , HA.draggable "false"
                ]
                ([ Html.a
                    [ HA.href card.url
                    , HA.target "_blank"
                    ]
                    [ Html.text card.title
                    ]
                 ]
                    ++ externalIcons card
                )
            , Html.span [ HA.class "card-labels" ] <|
                List.map (searchableLabel model) card.labels
                    ++ List.map (viewSuggestedLabel model card) model.suggestedLabels
            , Html.div [ HA.class "card-meta" ]
                [ Html.a
                    [ HA.href card.url
                    , HA.target "_blank"
                    , HA.draggable "false"
                    ]
                    [ Html.text ("#" ++ String.fromInt card.number) ]
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
        , Html.div [ HA.class "card-icons" ]
            ([ Html.span
                [ HE.onClick
                    (if Card.isPR card then
                        RefreshPullRequest card.id

                     else
                        RefreshIssue card.id
                    )
                ]
                [ if Card.isPR card then
                    Octicons.gitPullRequest
                        { octiconOpts
                            | color =
                                if Card.isMerged card then
                                    Colors.purple

                                else if Card.isOpen card then
                                    Colors.green

                                else
                                    Colors.red
                        }

                  else if Card.isOpen card then
                    Octicons.issueOpened { octiconOpts | color = Colors.green }

                  else
                    Octicons.issueClosed { octiconOpts | color = Colors.red }
                ]
             , case ( Card.isInFlight card, Card.isPaused card ) of
                ( _, True ) ->
                    Html.span
                        [ HA.class "pause-toggle"
                        , HE.onClick (UnlabelCard card "paused")
                        ]
                        [ Octicons.bookmark { octiconOpts | color = Colors.gray300 }
                        ]

                ( True, False ) ->
                    Html.span
                        [ HA.class "pause-toggle"
                        , HE.onClick (LabelCard card "paused")
                        ]
                        [ Octicons.bookmark { octiconOpts | color = Colors.gray600 }
                        ]

                _ ->
                    Html.text ""
             ]
                ++ prIcons model card
            )
        ]


externalIcons : Card -> List (Html Msg)
externalIcons card =
    List.map
        (\{ url } ->
            Html.a
                [ HA.target "_blank"
                , HA.class "external-link"
                , HA.href url
                ]
                [ Octicons.linkExternal octiconOpts ]
        )
        card.cards


prIcons : Model -> Card -> List (Html Msg)
prIcons model card =
    case card.content of
        GitHub.IssueCardContent _ ->
            []

        GitHub.PullRequestCardContent pr ->
            let
                statusChecks =
                    case Maybe.map .status pr.lastCommit of
                        Just (Just { contexts }) ->
                            (\a -> List.map a contexts) <|
                                \c ->
                                    let
                                        color =
                                            case c.state of
                                                GitHub.StatusStatePending ->
                                                    Colors.yellow

                                                GitHub.StatusStateSuccess ->
                                                    Colors.green

                                                GitHub.StatusStateFailure ->
                                                    Colors.red

                                                GitHub.StatusStateExpected ->
                                                    Colors.purple

                                                GitHub.StatusStateError ->
                                                    Colors.orange
                                    in
                                    Html.span [ HA.class "status-icon" ]
                                        [ case c.state of
                                            GitHub.StatusStatePending ->
                                                Octicons.primitiveDot { octiconOpts | color = color }

                                            GitHub.StatusStateSuccess ->
                                                Octicons.check { octiconOpts | color = color }

                                            GitHub.StatusStateFailure ->
                                                Octicons.x { octiconOpts | color = color }

                                            GitHub.StatusStateExpected ->
                                                Octicons.question { octiconOpts | color = color }

                                            GitHub.StatusStateError ->
                                                Octicons.alert { octiconOpts | color = color }
                                        ]

                        _ ->
                            []

                reviews =
                    Maybe.withDefault [] <| Dict.get card.id model.reviewers

                reviewStates =
                    List.map
                        (\r ->
                            let
                                reviewClass =
                                    case r.state of
                                        GitHub.PullRequestReviewStatePending ->
                                            "pending"

                                        GitHub.PullRequestReviewStateApproved ->
                                            "success"

                                        GitHub.PullRequestReviewStateChangesRequested ->
                                            "failure"

                                        GitHub.PullRequestReviewStateCommented ->
                                            "commented"

                                        GitHub.PullRequestReviewStateDismissed ->
                                            "dismissed"
                            in
                            Html.img [ HA.class ("status-actor " ++ reviewClass), HA.src r.author.avatar ] []
                        )
                        reviews
            in
            Octicons.gitMerge
                { octiconOpts
                    | color =
                        case pr.mergeable of
                            GitHub.MergeableStateMergeable ->
                                Colors.green

                            GitHub.MergeableStateConflicting ->
                                Colors.red

                            GitHub.MergeableStateUnknown ->
                                Colors.yellow
                }
                :: (statusChecks ++ reviewStates)


viewNoteCard : Model -> GitHub.ProjectColumn -> String -> Html Msg
viewNoteCard model col text =
    Html.div
        [ HA.classList
            [ ( "card", True )
            , ( "in-flight", Project.detectColumn.inFlight col.name )
            , ( "done", Project.detectColumn.done col.name )
            , ( "backlog", Project.detectColumn.backlog col.name )
            ]
        ]
        [ Html.div [ HA.class "card-info card-note" ]
            [ Markdown.toHtml [] text ]
        , Html.div [ HA.class "card-icons" ]
            [ Octicons.book octiconOpts
            ]
        ]


recentActors : Model -> Card -> List Backend.EventActor
recentActors model card =
    Dict.get card.id model.actors
        |> Maybe.withDefault []
        |> List.take 3
        |> List.reverse


hexRegex : Regex
hexRegex =
    Maybe.withDefault Regex.never <|
        Regex.fromString "([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"


hexBrightness : Int -> Int
hexBrightness h =
    case compare h (0xFF // 2) of
        LT ->
            -1

        EQ ->
            0

        GT ->
            1


colorIsLight : Model -> String -> Bool
colorIsLight model hex =
    case Dict.get hex model.colorLightnessCache of
        Just res ->
            res

        Nothing ->
            Log.debug "color lightness cache miss" hex <|
                computeColorIsLight hex


computeColorIsLight : String -> Bool
computeColorIsLight hex =
    let
        matches =
            List.head <| Regex.find hexRegex hex
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
                    Log.debug "invalid hex" hex <|
                        False

        _ ->
            Log.debug "invalid hex" hex <|
                False


viewSuggestedLabel : Model -> Card -> String -> Html Msg
viewSuggestedLabel model card name =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)

        mlabel =
            mlabelId
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)

        has =
            case mlabelId of
                Just id ->
                    List.member id card.labels

                Nothing ->
                    False
    in
    case mlabel of
        Nothing ->
            Html.text ""

        Just { color } ->
            Html.span
                ([ HA.class "label suggested"
                 , HE.onClick <|
                    if has then
                        UnlabelCard card name

                    else
                        LabelCard card name
                 ]
                    ++ labelColorStyles model color
                )
                [ if has then
                    Octicons.dash { octiconOpts | color = Colors.white }

                  else
                    Octicons.plus { octiconOpts | color = Colors.white }
                , Html.span [ HA.class "label-text" ]
                    [ Html.text name ]
                ]


viewLabel : Model -> GitHub.Label -> Html Msg
viewLabel model label =
    Html.span
        ([ HA.class "label" ] ++ labelColorStyles model label.color)
        [ Html.span [ HA.class "label-text" ]
            [ Html.text label.name ]
        ]


searchableLabel : Model -> GitHub.ID -> Html Msg
searchableLabel model labelId =
    case Dict.get labelId model.allLabels of
        Just label ->
            Html.span [ HE.onClick (searchLabel model label.name) ]
                [ viewLabel model label
                ]

        Nothing ->
            Html.text ""


viewCardActor : Model -> Backend.EventActor -> Html Msg
viewCardActor model { createdAt, avatar } =
    Html.img
        [ HA.class ("card-actor " ++ activityClass model.currentTime createdAt)
        , HA.src <|
            if String.contains "?" avatar then
                avatar ++ "&s=88"

            else
                avatar ++ "?s=88"
        , HA.draggable "false"
        ]
        []


isOrgMember : Maybe (List GitHub.User) -> GitHub.User -> Bool
isOrgMember users user =
    List.any (\x -> x.id == user.id) (Maybe.withDefault [] users)


withTokenOrLogIn : Model -> (String -> Cmd Msg) -> Cmd Msg
withTokenOrLogIn model f =
    case model.me of
        Just { token } ->
            f token

        Nothing ->
            Nav.load "/auth/github"


moveCard : Model -> CardDestination -> GitHub.ID -> Cmd Msg
moveCard model { columnId, afterId } cardId =
    withTokenOrLogIn model <|
        \token ->
            GitHub.moveCardAfter token columnId cardId afterId
                |> Task.attempt (CardMoved columnId)


addCard : Model -> CardDestination -> GitHub.ID -> Cmd Msg
addCard model { projectId, columnId, afterId } contentId =
    withTokenOrLogIn model <|
        \token ->
            case contentCardId model projectId contentId of
                Just cardId ->
                    GitHub.moveCardAfter token columnId cardId afterId
                        |> Task.attempt (CardMoved columnId)

                Nothing ->
                    GitHub.addContentCardAfter token columnId contentId afterId
                        |> Task.attempt (CardMoved columnId)


contentCardId : Model -> GitHub.ID -> GitHub.ID -> Maybe GitHub.ID
contentCardId model projectId contentId =
    case Dict.get contentId model.cards of
        Just card ->
            case List.filter ((==) projectId << .id << .project) card.cards of
                [ c ] ->
                    Just c.id

                _ ->
                    Nothing

        Nothing ->
            Nothing


findCardColumns : Model -> GitHub.ID -> List GitHub.ID
findCardColumns model cardId =
    Dict.foldl
        (\columnId cards columnIds ->
            if List.any ((==) cardId << .id) cards then
                columnId :: columnIds

            else
                columnIds
        )
        []
        model.columnCards


labelKey : SharedLabel -> ( String, String )
labelKey label =
    ( label.name, String.toLower label.color )


createLabel : Model -> GitHub.Repo -> SharedLabel -> Cmd Msg
createLabel model repo label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.createRepoLabel token repo label.name label.color
                |> Task.attempt (LabelChanged repo)


updateLabel : Model -> GitHub.Repo -> GitHub.Label -> SharedLabel -> Cmd Msg
updateLabel model repo label1 label2 =
    withTokenOrLogIn model <|
        \token ->
            GitHub.updateRepoLabel token repo label1 label2.name label2.color
                |> Task.attempt (LabelChanged repo)


deleteLabel : Model -> GitHub.Repo -> GitHub.Label -> Cmd Msg
deleteLabel model repo label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.deleteRepoLabel token repo label.name
                |> Task.attempt (LabelChanged repo)


addIssueLabels : Model -> GitHub.Issue -> List String -> Cmd Msg
addIssueLabels model issue labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addIssueLabels token issue labels
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))


removeIssueLabel : Model -> GitHub.Issue -> String -> Cmd Msg
removeIssueLabel model issue label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removeIssueLabel token issue label
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))


addPullRequestLabels : Model -> GitHub.PullRequest -> List String -> Cmd Msg
addPullRequestLabels model pr labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addPullRequestLabels token pr labels
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))


removePullRequestLabel : Model -> GitHub.PullRequest -> String -> Cmd Msg
removePullRequestLabel model pr label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removePullRequestLabel token pr label
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))


randomizeColor : SharedLabel -> SharedLabel
randomizeColor label =
    let
        currentColor =
            Maybe.withDefault 0 <| Result.toMaybe <| ParseInt.parseIntHex label.color

        randomHex =
            generateColor currentColor
    in
    { label | color = randomHex }


generateColor : Int -> String
generateColor seed =
    let
        ( randomColor, _ ) =
            Random.step (Random.int 0x00 0x00FFFFFF) (Random.initialSeed seed)
    in
    String.padLeft 6 '0' (ParseInt.toHex randomColor)


handleEvent : String -> String -> Int -> Model -> Model
handleEvent event data index model =
    let
        withDecoded decoder fn =
            case JD.decodeString decoder data of
                Ok val ->
                    Log.debug ("updating " ++ event) () <|
                        fn val

                Err err ->
                    Log.debug "error decoding event" err <|
                        model
    in
    case event of
        "repo" ->
            withDecoded GitHub.decodeRepo <|
                \val ->
                    { model | repos = Dict.insert val.id val model.repos }
                        |> computeDataView

        "project" ->
            withDecoded GitHub.decodeProject <|
                \val ->
                    { model | projects = Dict.insert val.id val model.projects }

        "columnCards" ->
            withDecoded Backend.decodeColumnCardsEvent <|
                \val ->
                    { model | columnCards = Dict.insert val.columnId val.cards model.columnCards }

        "comparison" ->
            withDecoded Backend.decodeComparisonEvent <|
                \val ->
                    { model | comparisons = Dict.insert val.repoId val.comparison model.comparisons }

        "issue" ->
            withDecoded GitHub.decodeIssue <|
                \val ->
                    { model | issues = Dict.insert val.id val model.issues }
                        |> computeCardsView

        "pr" ->
            withDecoded GitHub.decodePullRequest <|
                \val ->
                    { model | prs = Dict.insert val.id val model.prs }
                        |> computeCardsView

        "actors" ->
            withDecoded Backend.decodeActorsEvent <|
                \val ->
                    { model | actors = Dict.insert val.cardId val.actors model.actors }

        "reviewers" ->
            withDecoded Backend.decodeReviewersEvent <|
                \val ->
                    { model | reviewers = Dict.insert val.cardId val.reviewers model.reviewers }

        "graphs" ->
            withDecoded Backend.decodeGraphs <|
                \val ->
                    { model | graphs = val }
                        |> computeGraphsView

        _ ->
            Log.debug "event ignored" ( event, data, index ) <|
                model


emptyArc : Shape.Arc
emptyArc =
    { startAngle = 0
    , endAngle = 0
    , padAngle = 0
    , innerRadius = 0
    , outerRadius = 0
    , cornerRadius = 0
    , padRadius = 0
    }


octiconOpts : Octicons.Options
octiconOpts =
    Octicons.defaultOptions
