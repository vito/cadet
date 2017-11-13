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
    , allIssueOrPRs : Dict GitHubGraph.ID IssueOrPR
    , issueOrPRActors : Dict GitHubGraph.ID (List Data.ActorEvent)
    , issueOrPRGraphs : List (ForceGraph IssueOrPRNode)
    , selectedIssueOrPRs : List GitHubGraph.ID
    , anticipatedIssueOrPRs : List GitHubGraph.ID
    , currentDate : Date
    , projects : List GitHubGraph.Project
    , cards : Dict String (List GitHubGraph.ProjectColumnCard)
    }


type Msg
    = Noop
    | SetPage Page
    | Tick Time
    | SetCurrentDate Date
    | DataFetched (Result Http.Error Data)
    | SelectIssueOrPR GitHubGraph.ID
    | DeselectIssueOrPR GitHubGraph.ID
    | AnticipateIssueOrPR GitHubGraph.ID
    | UnanticipateIssueOrPR GitHubGraph.ID
    | SearchIssueOrPRs String
    | SelectAnticipatedIssueOrPRs
    | ClearSelectedIssueOrPRs


type Page
    = GlobalGraphPage
    | AllProjectsPage


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

        withSelection =
            RouteUrl.Builder.replaceHash (String.join "," b.selectedIssueOrPRs)

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

                _ ->
                    SetPage GlobalGraphPage

        selection =
            List.map SelectIssueOrPR (String.split "," hash)
    in
        Debug.log "messages" <|
            page
                :: selection


type IssueOrPR
    = Issue GitHubGraph.Issue
    | PR GitHubGraph.PullRequest


type alias IssueOrPRNode =
    { issueOrPR : IssueOrPR
    , flair : List (Svg Msg)
    , labels : List (Svg Msg)
    , radii :
        { base : Float
        , withLabels : Float
        , withFlair : Float
        }
    , selected : Bool
    }


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , page = GlobalGraphPage
      , allIssueOrPRs = Dict.empty
      , issueOrPRActors = Dict.empty
      , issueOrPRGraphs = []
      , selectedIssueOrPRs = []
      , anticipatedIssueOrPRs = []
      , currentDate = Date.fromTime config.initialDate
      , projects = []
      , cards = Dict.empty
      }
    , Data.fetch DataFetched
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every Time.second (SetCurrentDate << Date.fromTime)
        , if List.all FG.isCompleted model.issueOrPRGraphs then
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
                | issueOrPRGraphs =
                    List.map
                        (\g ->
                            if FG.isCompleted g then
                                g
                            else
                                FG.tick g
                        )
                        model.issueOrPRGraphs
              }
            , Cmd.none
            )

        SetCurrentDate date ->
            ( { model | currentDate = date }, Cmd.none )

        SearchIssueOrPRs "" ->
            ( { model | anticipatedIssueOrPRs = [] }, Cmd.none )

        SearchIssueOrPRs query ->
            let
                issueOrPRMatch issueOrPR =
                    let
                        id =
                            case issueOrPR of
                                Issue issue ->
                                    issue.id

                                PR pr ->
                                    pr.id

                        title =
                            case issueOrPR of
                                Issue issue ->
                                    issue.title

                                PR pr ->
                                    pr.title
                    in
                        if String.contains (String.toLower query) (String.toLower title) then
                            Just id
                        else
                            Nothing

                foundIssueOrPRs =
                    List.filterMap issueOrPRMatch (Dict.values model.allIssueOrPRs)
            in
                ( { model | anticipatedIssueOrPRs = foundIssueOrPRs }, Cmd.none )

        SelectAnticipatedIssueOrPRs ->
            ( { model
                | anticipatedIssueOrPRs = []
                , selectedIssueOrPRs = model.selectedIssueOrPRs ++ model.anticipatedIssueOrPRs
              }
            , Cmd.none
            )

        SelectIssueOrPR id ->
            ( { model
                | issueOrPRGraphs = List.map (setIssueOrPRSelected id True) model.issueOrPRGraphs
                , selectedIssueOrPRs =
                    if List.member id model.selectedIssueOrPRs then
                        model.selectedIssueOrPRs
                    else
                        model.selectedIssueOrPRs ++ [ id ]
              }
            , Cmd.none
            )

        ClearSelectedIssueOrPRs ->
            ( { model | selectedIssueOrPRs = [] }, Cmd.none )

        DeselectIssueOrPR id ->
            ( { model
                | issueOrPRGraphs = List.map (setIssueOrPRSelected id False) model.issueOrPRGraphs
                , selectedIssueOrPRs = List.filter ((/=) id) model.selectedIssueOrPRs
              }
            , Cmd.none
            )

        AnticipateIssueOrPR id ->
            ( { model | anticipatedIssueOrPRs = id :: model.anticipatedIssueOrPRs }
            , Cmd.none
            )

        UnanticipateIssueOrPR id ->
            ( { model | anticipatedIssueOrPRs = List.filter ((/=) id) model.anticipatedIssueOrPRs }, Cmd.none )

        DataFetched (Ok data) ->
            let
                withIssues =
                    Dict.foldl (\_ is iops -> List.foldl (\i -> Dict.insert i.id (Issue i)) iops is) Dict.empty data.issues

                withPRs =
                    Dict.foldl (\_ ps iops -> List.foldl (\p -> Dict.insert p.id (PR p)) iops ps) withIssues data.prs

                allIssueOrPRs =
                    withPRs

                ( graphedModel, graphedMsg ) =
                    computeGraphs model data
            in
                ( { graphedModel | allIssueOrPRs = allIssueOrPRs, projects = data.projects, cards = data.cards }
                , graphedMsg
                )

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


view : Model -> Html Msg
view model =
    let
        anticipatedIssueOrPRs =
            List.map (viewIssueInfo model) <|
                List.filterMap (flip Dict.get model.allIssueOrPRs) <|
                    List.filter (not << flip List.member model.selectedIssueOrPRs) model.anticipatedIssueOrPRs

        selectedIssueOrPRs =
            List.map (viewIssueInfo model) <|
                List.filterMap (flip Dict.get model.allIssueOrPRs) model.selectedIssueOrPRs

        sidebarIssues =
            selectedIssueOrPRs ++ anticipatedIssueOrPRs
    in
        Html.div [ HA.class "cadet" ]
            [ Html.div [ HA.class "main-page" ]
                [ Html.div [ HA.class "page-content" ]
                    [ case model.page of
                        GlobalGraphPage ->
                            viewSpatialGraph model

                        AllProjectsPage ->
                            viewProjects model
                    ]
                , Html.div [ HA.class "page-sidebar" ]
                    [ if List.isEmpty sidebarIssues then
                        Html.div [ HA.class "no-issues" ]
                            [ Html.text "no issues selected" ]
                      else
                        Html.div [ HA.class "issues" ] sidebarIssues
                    ]
                ]
            , viewNavBar model
            ]


viewSpatialGraph : Model -> Html Msg
viewSpatialGraph model =
    Html.div [ HA.class "spatial-graph" ] <|
        List.map (Html.Lazy.lazy (viewGraph model)) model.issueOrPRGraphs


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
    { name : String
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
                    { name = project.name
                    , backlog = b
                    , inFlight = i
                    , done = d
                    , problemSpace = rest
                    }

            _ ->
                Nothing


viewProjects : Model -> Html Msg
viewProjects model =
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
                [ Html.h4 [] [ Html.text name ] ]
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
            case Dict.get i model.allIssueOrPRs of
                Just iop ->
                    viewIssueCard model iop

                Nothing ->
                    -- closed issue?
                    Html.text ""

        _ ->
            Debug.crash "impossible"


viewSearch : Html Msg
viewSearch =
    Html.div [ HA.class "issue-search" ]
        [ Html.span
            [ HE.onClick ClearSelectedIssueOrPRs
            , HA.class "octicon octicon-x clear-selected"
            ]
            [ Html.text "" ]
        , Html.form [ HE.onSubmit SelectAnticipatedIssueOrPRs ]
            [ Html.input [ HE.onInput SearchIssueOrPRs, HA.placeholder "filter issues" ] [] ]
        ]


setIssueOrPRSelected : GitHubGraph.ID -> Bool -> ForceGraph IssueOrPRNode -> ForceGraph IssueOrPRNode
setIssueOrPRSelected id val fg =
    let
        graphId =
            Hash.hash id

        toggle node =
            { node | selected = val }
    in
        if FG.member graphId fg then
            FG.update graphId toggle fg
        else
            fg


computeGraphs : Model -> Data -> ( Model, Cmd Msg )
computeGraphs model data =
    let
        withIssues =
            Dict.foldl (\_ is iops -> List.foldl (\i -> Dict.insert i.id (Issue i)) iops is) Dict.empty data.issues

        withPRs =
            Dict.foldl (\_ ps iops -> List.foldl (\p -> Dict.insert p.id (PR p)) iops ps) withIssues data.prs

        allIssueOrPRs =
            withPRs

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
                data.references

        issueOrPRNode i =
            let
                id =
                    case i of
                        Issue issue ->
                            issue.id

                        PR pr ->
                            pr.id
            in
                Graph.Node (Hash.hash id) i

        graph =
            Graph.mapContexts issueNode <|
                Graph.fromNodesAndEdges
                    (List.map issueOrPRNode (Dict.values allIssueOrPRs))
                    references

        issueOrPRGraphs =
            subGraphs graph
                |> List.map FG.fromGraph
                |> List.sortWith graphCompare
                |> List.reverse
    in
        ( { model
            | allIssueOrPRs = allIssueOrPRs
            , issueOrPRActors = data.actors
            , issueOrPRGraphs = issueOrPRGraphs
            , projects = data.projects
            , cards = data.cards
          }
        , Cmd.none
        )


graphCompare : ForceGraph IssueOrPRNode -> ForceGraph IssueOrPRNode -> Order
graphCompare a b =
    case compare (Graph.size a.graph) (Graph.size b.graph) of
        EQ ->
            let
                graphScore =
                    List.foldl (+) 0 << List.map (.label >> nodeScore) << Graph.nodes
            in
                compare (graphScore a.graph) (graphScore b.graph)

        x ->
            x


nodeScore : FG.ForceNode IssueOrPRNode -> Int
nodeScore fn =
    case fn.value.issueOrPR of
        Issue issue ->
            GitHubGraph.issueScore issue

        PR pr ->
            GitHubGraph.pullRequestScore pr


viewGraph : Model -> ForceGraph IssueOrPRNode -> Html Msg
viewGraph model { graph } =
    let
        nodeContexts =
            Graph.fold (::) [] graph

        bounds =
            List.map issueNodeBounds nodeContexts

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
                    , Svg.Lazy.lazy (viewIssueOrPRNode model) node :: ns
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


issueRadius : Graph.NodeContext IssueOrPR () -> Float
issueRadius { incoming, outgoing } =
    15 + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))


issueRadiusWithLabels : Graph.NodeContext IssueOrPR () -> Float
issueRadiusWithLabels =
    issueRadius >> ((+) 3)


flairRadiusBase : Float
flairRadiusBase =
    16


issueRadiusWithFlair : Graph.NodeContext IssueOrPR () -> Float
issueRadiusWithFlair nc =
    let
        commentCount =
            case nc.node.label of
                Issue issue ->
                    issue.commentCount

                PR pr ->
                    pr.commentCount

        reactions =
            case nc.node.label of
                Issue issue ->
                    issue.reactions

                PR pr ->
                    pr.reactions

        reactionCounts =
            List.map .count reactions

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (commentCount :: reactionCounts)
    in
        issueRadiusWithLabels nc + flairRadiusBase + toFloat highestFlair


issueNode : Graph.NodeContext IssueOrPR () -> Graph.NodeContext IssueOrPRNode ()
issueNode nc =
    let
        node =
            nc.node

        issueOrPR =
            node.label

        flair =
            nodeFlairArcs nc

        labels =
            nodeLabelArcs nc

        forceNode =
            { node
                | label =
                    { issueOrPR = issueOrPR
                    , radii =
                        { base = issueRadius nc
                        , withLabels = issueRadiusWithLabels nc
                        , withFlair = issueRadiusWithFlair nc
                        }
                    , flair = flair
                    , labels = labels
                    , selected = False
                    }
            }
    in
        { nc | node = forceNode }


nodeFlairArcs : Graph.NodeContext IssueOrPR () -> List (Svg Msg)
nodeFlairArcs nc =
    let
        issue =
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

        commentCount =
            case nc.node.label of
                Issue issue ->
                    issue.commentCount

                PR pr ->
                    pr.commentCount

        reactions =
            case nc.node.label of
                Issue issue ->
                    issue.reactions

                PR pr ->
                    pr.reactions

        emojiReactions =
            flip List.map reactions <|
                \{ type_, count } ->
                    ( reactionTypeEmoji type_, count )

        flairs =
            List.filter (Tuple.second >> flip (>) 0) <|
                (( "💬", commentCount ) :: emojiReactions)

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


nodeLabelArcs : Graph.NodeContext IssueOrPR () -> List (Svg Msg)
nodeLabelArcs nc =
    let
        labels =
            case nc.node.label of
                Issue issue ->
                    issue.labels

                PR pr ->
                    pr.labels

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
                (List.repeat (List.length labels) 1)
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
            labels


viewIssueFlair : Model -> Graph.Node (FG.ForceNode IssueOrPRNode) -> Svg Msg
viewIssueFlair model { label } =
    let
        x =
            label.x

        y =
            label.y

        uat =
            case label.value.issueOrPR of
                Issue { updatedAt } ->
                    updatedAt

                PR { updatedAt } ->
                    updatedAt
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


viewIssueOrPRNode : Model -> Graph.Node (FG.ForceNode IssueOrPRNode) -> Svg Msg
viewIssueOrPRNode model { label } =
    let
        x =
            label.x

        y =
            label.y

        issueOrPR =
            label.value.issueOrPR

        id =
            case issueOrPR of
                Issue i ->
                    i.id

                PR p ->
                    p.id

        circleWithNumber =
            case issueOrPR of
                Issue issue ->
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
                        [ Svg.text (toString issue.number)
                        ]
                    ]

                PR pr ->
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
                        [ Svg.text (toString pr.number)
                        ]
                    ]
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            , SE.onMouseOver (AnticipateIssueOrPR id)
            , SE.onMouseOut (UnanticipateIssueOrPR id)
            , SE.onClick
                (if label.value.selected then
                    DeselectIssueOrPR id
                 else
                    SelectIssueOrPR id
                )
            ]
            (circleWithNumber ++ label.value.labels)


viewIssueInfo : Model -> IssueOrPR -> Html Msg
viewIssueInfo model iop =
    let
        url =
            case iop of
                Issue issue ->
                    issue.url

                PR pr ->
                    pr.url

        id =
            case iop of
                Issue issue ->
                    issue.id

                PR pr ->
                    pr.id

        title =
            case iop of
                Issue issue ->
                    issue.title

                PR pr ->
                    pr.title

        number =
            case iop of
                Issue issue ->
                    issue.number

                PR pr ->
                    pr.number

        author =
            case iop of
                Issue issue ->
                    issue.author

                PR pr ->
                    pr.author

        labels =
            case iop of
                Issue issue ->
                    issue.labels

                PR pr ->
                    pr.labels

        anticipated =
            isAnticipated model iop
    in
        Html.div [ HA.class "issue-controls" ]
            [ Html.div [ HA.class "issue-buttons" ]
                [ if not anticipated then
                    Html.span
                        [ HE.onClick (DeselectIssueOrPR id)
                        , HA.class "octicon octicon-x"
                        ]
                        [ Html.text "" ]
                  else
                    Html.text ""
                ]
            , viewIssueCard model iop
            ]


inColumn : String -> IssueOrPR -> Bool
inColumn name iop =
    let
        cards =
            case iop of
                Issue i ->
                    i.cards

                PR p ->
                    p.cards
    in
        List.member name (List.filterMap (Maybe.map .name << .column) cards)


isInFlight : IssueOrPR -> Bool
isInFlight =
    inColumn "In Flight"


isAnticipated : Model -> IssueOrPR -> Bool
isAnticipated model iop =
    let
        id =
            case iop of
                Issue issue ->
                    issue.id

                PR pr ->
                    pr.id
    in
        List.member id model.anticipatedIssueOrPRs && not (List.member id model.selectedIssueOrPRs)


isDone : IssueOrPR -> Bool
isDone =
    inColumn "Done"


isBacklog : IssueOrPR -> Bool
isBacklog =
    inColumn "Backlog"


viewIssueCard : Model -> IssueOrPR -> Html Msg
viewIssueCard model iop =
    let
        url =
            case iop of
                Issue issue ->
                    issue.url

                PR pr ->
                    pr.url

        title =
            case iop of
                Issue issue ->
                    issue.title

                PR pr ->
                    pr.title

        number =
            case iop of
                Issue issue ->
                    issue.number

                PR pr ->
                    pr.number

        author =
            case iop of
                Issue issue ->
                    issue.author

                PR pr ->
                    pr.author

        labels =
            case iop of
                Issue issue ->
                    issue.labels

                PR pr ->
                    pr.labels

        id =
            case iop of
                Issue issue ->
                    issue.id

                PR pr ->
                    pr.id
    in
        Html.div
            [ HA.classList
                [ ( "card", True )
                , ( "issue-card", True )
                , ( "issue-info", True )
                , ( "in-flight", isInFlight iop )
                , ( "done", isDone iop )
                , ( "backlog", isBacklog iop )
                , ( "anticipated", isAnticipated model iop )
                ]
            , HE.onClick (SelectIssueOrPR id)
            ]
            [ Html.div [ HA.class "issue-actors" ] <|
                List.map (viewIssueActor model) (recentActors model iop)
            , Html.a [ HA.href url, HA.target "_blank", HA.class "issue-title" ]
                [ Html.text title
                ]
            , Html.span [ HA.class "issue-labels" ] <|
                List.map viewLabel labels
            , Html.div [ HA.class "issue-meta" ]
                [ Html.a [ HA.href url, HA.target "_blank" ] [ Html.text ("#" ++ toString number) ]
                , Html.text " "
                , Html.text "opened by "
                , case author of
                    Just user ->
                        Html.a [ HA.href user.url, HA.target "_blank" ] [ Html.text user.login ]

                    _ ->
                        Html.text "(deleted user)"
                ]
            ]


recentActors : Model -> IssueOrPR -> List Data.ActorEvent
recentActors model iop =
    let
        id =
            case iop of
                Issue issue ->
                    issue.id

                PR pr ->
                    pr.id
    in
        Dict.get id model.issueOrPRActors
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
        [ HA.class "issue-label"
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
        [ Html.span [ HA.class "issue-label-text" ]
            [ Html.text name ]
        ]


viewIssueActor : Model -> Data.ActorEvent -> Html Msg
viewIssueActor model { createdAt, actor } =
    Html.img
        [ HA.class "issue-actor"
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


issueNodeBounds : Graph.NodeContext (FG.ForceNode IssueOrPRNode) () -> ( Float, Float, Float, Float )
issueNodeBounds nc =
    let
        x =
            nc.node.label.x

        y =
            nc.node.label.y

        radius =
            nc.node.label.value.radii.withFlair
    in
        ( x - radius, y - radius, x + radius, y + radius )


sameIssueOrPR : IssueOrPR -> IssueOrPR -> Bool
sameIssueOrPR a b =
    case ( a, b ) of
        ( Issue ai, Issue bi ) ->
            ai.id == bi.id

        ( PR ap, PR bp ) ->
            ap.id == bp.id

        _ ->
            False
