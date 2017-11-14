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
import IntDict
import ParseInt
import Regex exposing (Regex)
import Set
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Events as SE
import Svg.Lazy
import Time exposing (Time)
import Visualization.Shape as VS
import RouteUrl
import RouteUrl.Builder
import Navigation
import Hash
import GitHubGraph
import Data exposing (Data)
import ForceGraph as FG exposing (ForceGraph)
import StrictEvents


type alias Config =
    { initialDate : Time
    }


type alias Model =
    { config : Config
    , page : Page
    , allCards : Dict GitHubGraph.ID Card
    , cardActors : Dict GitHubGraph.ID (List Data.ActorEvent)
    , cardGraphs : List (ForceGraph Node)
    , selectedCards : List GitHubGraph.ID
    , anticipatedCards : List GitHubGraph.ID
    , currentDate : Date
    , projects : List GitHubGraph.Project
    , cards : Dict String (List GitHubGraph.ProjectColumnCard)
    , references : Dict GitHubGraph.ID (List GitHubGraph.ID)
    }


type alias Card =
    { isPullRequest : Bool
    , id : GitHubGraph.ID
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
    }


type Msg
    = Noop
    | SetPage Page
    | Tick Time
    | SetCurrentDate Date
    | DataFetched (Result Http.Error Data)
    | SelectCard GitHubGraph.ID
    | DeselectCard GitHubGraph.ID
    | AnticipateCard GitHubGraph.ID
    | UnanticipateCard GitHubGraph.ID
    | SearchCards String
    | SelectAnticipatedCards
    | ClearSelectedCards


type Page
    = GlobalGraphPage
    | AllProjectsPage
    | ProjectPage String


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

                _ ->
                    SetPage GlobalGraphPage

        selection =
            List.map SelectCard (String.split "," hash)
    in
        page :: selection


type alias Node =
    { card : Card
    , score : Int
    , flair : List (Svg Msg)
    , labels : List (Svg Msg)
    , radii :
        { base : Float
        , withLabels : Float
        , withFlair : Float
        }
    }


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , page = GlobalGraphPage
      , allCards = Dict.empty
      , cardActors = Dict.empty
      , cardGraphs = []
      , selectedCards = []
      , anticipatedCards = []
      , currentDate = Date.fromTime config.initialDate
      , projects = []
      , cards = Dict.empty
      , references = Dict.empty
      }
    , Data.fetch DataFetched
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
            ( { model | page = page }, Cmd.none )

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

        AnticipateCard id ->
            ( { model | anticipatedCards = id :: model.anticipatedCards }
            , Cmd.none
            )

        UnanticipateCard id ->
            ( { model | anticipatedCards = List.filter ((/=) id) model.anticipatedCards }, Cmd.none )

        DataFetched (Ok data) ->
            let
                withIssues =
                    Dict.foldl (\_ is cards -> List.foldl (\i -> Dict.insert i.id (issueCard i)) cards is) Dict.empty data.issues

                withPRs =
                    Dict.foldl (\_ ps cards -> List.foldl (\p -> Dict.insert p.id (prCard p)) cards ps) withIssues data.prs

                allCards =
                    withPRs
            in
                ( computeGlobalReferenceGraph
                    { model
                        | allCards = allCards
                        , projects = data.projects
                        , cards = data.cards
                        , cardActors = data.actors
                        , references = data.references
                    }
                , Cmd.none
                )

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


issueCard : GitHubGraph.Issue -> Card
issueCard ({ id, url, number, title, updatedAt, author, labels, cards, commentCount, reactions } as issue) =
    { isPullRequest = False
    , id = id
    , url = url
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , labels = labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHubGraph.pullRequestScore issue
    }


prCard : GitHubGraph.PullRequest -> Card
prCard ({ id, url, number, title, updatedAt, author, labels, cards, commentCount, reactions } as pr) =
    { isPullRequest = True
    , id = id
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

        sidebarIssues =
            selectedCards ++ anticipatedCards
    in
        Html.div [ HA.class "cadet" ]
            [ Html.div [ HA.class "main-page" ]
                [ Html.div [ HA.class "page-content" ]
                    [ case model.page of
                        GlobalGraphPage ->
                            viewGlobalGraphPage model

                        AllProjectsPage ->
                            viewAllProjectsPage model

                        ProjectPage id ->
                            viewProjectPage model id
                    ]
                , Html.div [ HA.class "page-sidebar" ]
                    [ if List.isEmpty sidebarIssues then
                        Html.div [ HA.class "no-cards" ]
                            [ Html.text "no cards selected" ]
                      else
                        Html.div [ HA.class "cards" ] sidebarIssues
                    ]
                ]
            , viewNavBar model
            ]


viewGlobalGraphPage : Model -> Html Msg
viewGlobalGraphPage model =
    Html.div [ HA.class "spatial-graph" ] <|
        List.map (Html.Lazy.lazy (viewGraph model)) model.cardGraphs


viewNavBar : Model -> Html Msg
viewNavBar model =
    Html.div [ HA.class "bottom-bar" ]
        [ Html.div [ HA.class "nav" ]
            [ Html.a [ HA.class "button", HA.href "/", StrictEvents.onLeftClick (SetPage GlobalGraphPage) ]
                [ Html.span [ HA.class "octicon octicon-globe" ] []
                ]
            , Html.a [ HA.class "button", HA.href "/projects", StrictEvents.onLeftClick (SetPage AllProjectsPage) ]
                [ Html.span [ HA.class "octicon octicon-list-unordered" ] []
                ]
            ]
        , viewSearch
        ]


type alias ProjectState =
    { id : GitHubGraph.ID
    , name : String
    , backlog : GitHubGraph.ProjectColumn
    , inFlight : GitHubGraph.ProjectColumn
    , done : GitHubGraph.ProjectColumn
    , problemSpace : List GitHubGraph.ProjectColumn
    }


selectStatefulProject : GitHubGraph.Project -> Maybe ProjectState
selectStatefulProject project =
    let
        findColumn name =
            case List.filter ((==) name << .name) project.columns of
                [ col ] ->
                    Just col

                _ ->
                    Nothing

        backlog =
            findColumn "Backlog"

        inFlight =
            findColumn "In Flight"

        done =
            findColumn "Done"

        rest =
            List.filter (not << flip List.member [ "Backlog", "In Flight", "Done" ] << .name) project.columns
    in
        case ( backlog, inFlight, done ) of
            ( Just b, Just i, Just d ) ->
                Just
                    { id = project.id
                    , name = project.name
                    , backlog = b
                    , inFlight = i
                    , done = d
                    , problemSpace = rest
                    }

            _ ->
                Nothing


viewAllProjectsPage : Model -> Html Msg
viewAllProjectsPage model =
    let
        statefulProjects =
            List.filterMap selectStatefulProject model.projects
    in
        Html.div [ HA.class "project-table" ]
            [ Html.div [ HA.class "project-name-columns" ]
                [ Html.div [ HA.class "column name-column" ]
                    []
                , Html.div [ HA.class "column backlog-column" ]
                    [ Html.h4 [] [ Html.text "Backlog" ] ]
                , Html.div [ HA.class "column in-flight-column" ]
                    [ Html.h4 [] [ Html.text "In Flight" ] ]
                , Html.div [ HA.class "column done-column" ]
                    [ Html.h4 [] [ Html.text "Done" ] ]
                ]
            , Html.div [ HA.class "projects" ]
                (List.map (viewProject model) statefulProjects)
            ]


viewProject : Model -> ProjectState -> Html Msg
viewProject model { name, backlog, inFlight, done } =
    Html.div [ HA.class "project" ]
        [ Html.div [ HA.class "project-columns" ]
            [ Html.div [ HA.class "column name-column" ]
                [ Html.h4 []
                    [ Html.a [ HA.href ("/projects/" ++ name), StrictEvents.onLeftClick (SetPage (ProjectPage name)) ]
                        [ Html.text name ]
                    ]
                ]
            , Html.div [ HA.class "column backlog-column" ]
                [ viewProjectColumn model backlog ]
            , Html.div [ HA.class "column in-flight-column" ]
                [ viewProjectColumn model inFlight ]
            , Html.div [ HA.class "column done-column" ]
                [ viewProjectColumn model done ]
            ]
        , Html.div [ HA.class "project-spacer-columns" ]
            [ Html.div [ HA.class "column name-column" ]
                []
            , Html.div [ HA.class "column backlog-column" ]
                []
            , Html.div [ HA.class "column in-flight-column" ]
                []
            , Html.div [ HA.class "column done-column" ]
                []
            ]
        ]


viewProjectColumn : Model -> GitHubGraph.ProjectColumn -> Html Msg
viewProjectColumn model { id, name } =
    let
        cards =
            Maybe.withDefault [] (Dict.get id model.cards)
    in
        Html.div [ HA.class "cards" ]
            (List.map (viewProjectColumnCard model) (List.take 3 cards))


viewProjectColumnCard : Model -> GitHubGraph.ProjectColumnCard -> Html Msg
viewProjectColumnCard model { itemID, note } =
    case ( note, itemID ) of
        ( Just n, Nothing ) ->
            Html.text ""

        ( Nothing, Just i ) ->
            case Dict.get i model.allCards of
                Just card ->
                    viewCard model card

                Nothing ->
                    -- closed issue?
                    Html.text ""

        _ ->
            Debug.crash "impossible"


viewProjectPage : Model -> String -> Html Msg
viewProjectPage model name =
    let
        statefulProjects =
            List.filterMap selectStatefulProject model.projects

        mproject =
            List.head <|
                List.filter ((==) name << .name) statefulProjects
    in
        case mproject of
            Just project ->
                viewSingleProject model project

            Nothing ->
                Html.text "project not found"


viewSingleProject : Model -> ProjectState -> Html Msg
viewSingleProject model { id, name, backlog, inFlight, done } =
    let
        relevantGraphs =
            List.filter (graphContainsIssuesInProject id) model.cardGraphs
    in
        Html.div [ HA.class "project single" ]
            [ Html.div [ HA.class "project-columns" ]
                [ Html.div [ HA.class "column name-column" ]
                    [ Html.h4 [] [ Html.text name ] ]
                , Html.div [ HA.class "column done-column" ]
                    [ viewProjectColumn model done ]
                , Html.div [ HA.class "column in-flight-column" ]
                    [ viewProjectColumn model inFlight ]
                , Html.div [ HA.class "column backlog-column" ]
                    [ viewProjectColumn model backlog ]
                ]
            , Html.div [ HA.class "spatial-graph" ] <|
                List.map (Html.Lazy.lazy (viewGraph model)) relevantGraphs
            ]


graphContainsIssuesInProject : GitHubGraph.ID -> ForceGraph Node -> Bool
graphContainsIssuesInProject id { graph } =
    let
        nodeIsInProject { label } =
            List.any ((==) id << .projectID) label.value.card.cards
    in
        List.any nodeIsInProject (Graph.nodes graph)


viewSearch : Html Msg
viewSearch =
    Html.div [ HA.class "card-search" ]
        [ Html.span
            [ HE.onClick ClearSelectedCards
            , HA.class "octicon octicon-x clear-selected"
            ]
            [ Html.text "" ]
        , Html.form [ HE.onSubmit SelectAnticipatedCards ]
            [ Html.input [ HE.onInput SearchCards, HA.placeholder "filter cards" ] [] ]
        ]


computeGlobalReferenceGraph : Model -> Model
computeGlobalReferenceGraph model =
    let
        allCards =
            model.allCards

        references =
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
                model.references

        graphNode card =
            Graph.Node (Hash.hash card.id) card

        graph =
            Graph.mapContexts cardNode <|
                Graph.fromNodesAndEdges
                    (List.map graphNode (Dict.values allCards))
                    references

        cardGraphs =
            subGraphs graph
                |> List.map FG.fromGraph
                |> List.sortWith graphCompare
                |> List.reverse
    in
        { model | cardGraphs = cardGraphs }


graphCompare : ForceGraph Node -> ForceGraph Node -> Order
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


viewGraph : Model -> ForceGraph Node -> Html Msg
viewGraph model { graph } =
    let
        nodeContexts =
            Graph.fold (::) [] graph

        bounds =
            List.map nodeBounds nodeContexts

        padding =
            10

        minX =
            List.foldl (\( x1, _, _, _ ) acc -> min x1 acc) 999999 bounds - padding

        minY =
            List.foldl (\( _, y1, _, _ ) acc -> min y1 acc) 999999 bounds - padding

        maxX =
            List.foldl (\( _, _, x2, _ ) acc -> max x2 acc) 0 bounds + padding

        maxY =
            List.foldl (\( _, _, _, y2 ) acc -> max y2 acc) 0 bounds + padding

        width =
            maxX - minX

        height =
            maxY - minY

        links =
            (List.map (Svg.Lazy.lazy <| linkPath graph) (Graph.edges graph))

        ( flairs, nodes ) =
            Graph.fold
                (\{ node } ( fs, ns ) ->
                    ( Svg.Lazy.lazy (viewIssueFlair model) node :: fs
                    , Svg.Lazy.lazy (viewNode model) node :: ns
                    )
                )
                ( [], [] )
                graph
    in
        Svg.svg
            [ SA.width (toString width ++ "px")
            , SA.height (toString height ++ "px")
            , SA.viewBox (toString minX ++ " " ++ toString minY ++ " " ++ toString width ++ " " ++ toString height)
            ]
            [ Svg.g [ SA.class "links" ] links
            , Svg.g [ SA.class "flairs" ] flairs
            , Svg.g [ SA.class "nodes" ] nodes
            ]


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


issueRadius : Graph.NodeContext Card () -> Float
issueRadius { incoming, outgoing } =
    15 + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))


issueRadiusWithLabels : Graph.NodeContext Card () -> Float
issueRadiusWithLabels =
    issueRadius >> ((+) 3)


flairRadiusBase : Float
flairRadiusBase =
    16


issueRadiusWithFlair : Graph.NodeContext Card () -> Float
issueRadiusWithFlair nc =
    let
        card =
            nc.node.label

        reactionCounts =
            List.map .count card.reactions

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (card.commentCount :: reactionCounts)
    in
        issueRadiusWithLabels nc + flairRadiusBase + toFloat highestFlair


cardNode : Graph.NodeContext Card () -> Graph.NodeContext Node ()
cardNode nc =
    let
        node =
            nc.node

        card =
            node.label

        flair =
            nodeFlairArcs nc

        labels =
            nodeLabelArcs nc

        forceNode =
            { node
                | label =
                    { card = card
                    , score = card.score
                    , radii =
                        { base = issueRadius nc
                        , withLabels = issueRadiusWithLabels nc
                        , withFlair = issueRadiusWithFlair nc
                        }
                    , flair = flair
                    , labels = labels
                    }
            }
    in
        { nc | node = forceNode }


nodeFlairArcs : Graph.NodeContext Card () -> List (Svg Msg)
nodeFlairArcs nc =
    let
        card =
            nc.node.label

        radius =
            issueRadiusWithLabels nc

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
                            , SA.fill "#fff"
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


nodeLabelArcs : Graph.NodeContext Card () -> List (Svg Msg)
nodeLabelArcs nc =
    let
        card =
            nc.node.label

        radius =
            issueRadius nc

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


viewIssueFlair : Model -> Graph.Node (FG.ForceNode Node) -> Svg Msg
viewIssueFlair model { label } =
    let
        x =
            label.x

        y =
            label.y

        uat =
            label.value.card.updatedAt
    in
        Svg.g
            [ SA.opacity (toString (activityOpacity model uat * 0.75))
            , SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            ]
            label.value.flair


activityOpacity : Model -> Date -> Float
activityOpacity { currentDate } date =
    let
        daysSinceLastUpdate =
            (Date.toTime currentDate / (24 * Time.hour)) - (Date.toTime date / (24 * Time.hour))
    in
        if daysSinceLastUpdate <= 1 then
            1
        else if daysSinceLastUpdate <= 2 then
            0.75
        else if daysSinceLastUpdate <= 7 then
            0.5
        else
            0.25


viewNode : Model -> Graph.Node (FG.ForceNode Node) -> Svg Msg
viewNode model { label } =
    let
        x =
            label.x

        y =
            label.y

        card =
            label.value.card

        isSelected =
            List.member card.id model.selectedCards

        circleWithNumber =
            if not card.isPullRequest then
                [ Svg.circle
                    [ SA.r (toString label.value.radii.base)
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
            else
                [ Svg.circle
                    [ SA.r (toString label.value.radii.base)
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
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            , SE.onMouseOver (AnticipateCard card.id)
            , SE.onMouseOut (UnanticipateCard card.id)
            , SE.onClick
                (if isSelected then
                    DeselectCard card.id
                 else
                    SelectCard card.id
                )
            ]
            (circleWithNumber ++ label.value.labels)


viewCardEntry : Model -> Card -> Html Msg
viewCardEntry model card =
    let
        anticipated =
            isAnticipated model card
    in
        Html.div [ HA.class "card-controls" ]
            [ Html.div [ HA.class "card-buttons" ]
                [ if not anticipated then
                    Html.span
                        [ HE.onClick (DeselectCard card.id)
                        , HA.class "octicon octicon-x"
                        ]
                        [ Html.text "" ]
                  else
                    Html.text ""
                ]
            , viewCard model card
            ]


inColumn : String -> Card -> Bool
inColumn name card =
    List.member name (List.filterMap (Maybe.map .name << .column) card.cards)


isInFlight : Card -> Bool
isInFlight =
    inColumn "In Flight"


isAnticipated : Model -> Card -> Bool
isAnticipated model card =
    List.member card.id model.anticipatedCards && not (List.member card.id model.selectedCards)


isDone : Card -> Bool
isDone =
    inColumn "Done"


isBacklog : Card -> Bool
isBacklog =
    inColumn "Backlog"


viewCard : Model -> Card -> Html Msg
viewCard model card =
    Html.div
        [ HA.classList
            [ ( "card", True )
            , ( "card-info", True )
            , ( "in-flight", isInFlight card )
            , ( "done", isDone card )
            , ( "backlog", isBacklog card )
            , ( "anticipated", isAnticipated model card )
            ]
        , HE.onClick (SelectCard card.id)
        ]
        [ Html.div [ HA.class "card-actors" ] <|
            List.map (viewIssueActor model) (recentActors model card)
        , Html.a [ HA.href card.url, HA.target "_blank", HA.class "card-title" ]
            [ Html.text card.title
            ]
        , Html.span [ HA.class "card-labels" ] <|
            List.map viewLabel card.labels
        , Html.div [ HA.class "card-meta" ]
            [ Html.a [ HA.href card.url, HA.target "_blank" ] [ Html.text ("#" ++ toString card.number) ]
            , Html.text " "
            , Html.text "opened by "
            , case card.author of
                Just user ->
                    Html.a [ HA.href user.url, HA.target "_blank" ] [ Html.text user.login ]

                _ ->
                    Html.text "(deleted user)"
            ]
        ]


recentActors : Model -> Card -> List Data.ActorEvent
recentActors model card =
    Dict.get card.id model.cardActors
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
        [ HA.class "card-label"
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
        [ Html.span [ HA.class "card-label-text" ]
            [ Html.text name ]
        ]


viewIssueActor : Model -> Data.ActorEvent -> Html Msg
viewIssueActor model { createdAt, actor } =
    Html.img
        [ HA.class "card-actor"
        , HA.style [ ( "opacity", toString (activityOpacity model createdAt) ) ]
        , HA.src (actor.avatar ++ "&s=88")
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


nodeBounds : Graph.NodeContext (FG.ForceNode Node) () -> ( Float, Float, Float, Float )
nodeBounds nc =
    let
        x =
            nc.node.label.x

        y =
            nc.node.label.y

        radius =
            nc.node.label.value.radii.withFlair
    in
        ( x - radius, y - radius, x + radius, y + radius )
