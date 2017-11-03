module Main exposing (..)

import IntDict
import Set
import Debug
import Json.Decode
import Json.Decode.Extra exposing ((|:))
import Http
import HttpBuilder
import Time
import Dict exposing (Dict)
import Graph exposing (Graph)
import AnimationFrame
import Svg exposing (Svg)
import Svg.Attributes as SA
import Html exposing (Html)
import Html.Attributes as HA
import Visualization.Force as VF
import Visualization.Shape as VS
import ParseInt
import Regex exposing (Regex)
import Task exposing (Task)
import Window
import Random
import GitHub


type alias Config =
    { windowSize : Window.Size
    }


type alias Model =
    { config : Config
    , repos : List GitHub.Repo
    , repoIssues : Dict String (List GitHub.Issue)
    , issueTimelines : Dict String (List GitHub.TimelineEvent)
    , issueGraphs : List (ForceGraph GitHub.Issue)
    }


type alias ForceGraph n =
    { graph : Graph (ForceNode n) ()
    , simulation : VF.State Graph.NodeId
    }


type alias ForceNode n =
    VF.Entity Graph.NodeId { value : n }


main : Program Config Model Msg
main =
    Html.programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


type Msg
    = Noop
    | Tick Time.Time
    | Resize Window.Size
    | DataFetched (Result Http.Error Data)


type alias Data =
    { repositories : List GitHub.Repo
    , issues : Dict String (List GitHub.Issue)
    , timelines : Dict String (List GitHub.TimelineEvent)
    }


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , repos = []
      , repoIssues = Dict.empty
      , issueTimelines = Dict.empty
      , issueGraphs = []
      }
    , fetchData
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Window.resizes Resize
        , if List.all (VF.isCompleted << .simulation) model.issueGraphs then
            Sub.none
          else
            AnimationFrame.times Tick
        ]


updateGraphWithList : Graph (ForceNode n) () -> List (ForceNode n) -> Graph (ForceNode n) ()
updateGraphWithList =
    let
        graphUpdater value =
            Maybe.map (\ctx -> updateContextWithValue ctx value)
    in
        List.foldr (\node -> Graph.update node.id (graphUpdater node))


bind : Float -> Int -> Float -> Float
bind target size gap =
    if target < gap then
        gap
    else if target > toFloat size - gap then
        toFloat size - gap
    else
        target


updateContextWithValue : Graph.NodeContext (ForceNode n) () -> ForceNode n -> Graph.NodeContext (ForceNode n) ()
updateContextWithValue nodeCtx value =
    let
        node =
            nodeCtx.node
    in
        { nodeCtx | node = { node | label = value } }


edgesContains : Graph.NodeId -> List (Graph.Edge e) -> Bool
edgesContains nodeId =
    List.any (\{ from, to } -> from == nodeId || to == nodeId)


subEdges : List (Graph.Edge e) -> List (List (Graph.Edge e))
subEdges edges =
    let
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


tickGraph : ForceGraph n -> ForceGraph n
tickGraph { graph, simulation } =
    let
        ( newState, list ) =
            VF.tick simulation (List.map .label (Graph.nodes graph))
    in
        { graph = updateGraphWithList graph list
        , simulation = newState
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Tick _ ->
            ( { model
                | issueGraphs = List.map tickGraph model.issueGraphs
              }
            , Cmd.none
            )

        Resize size ->
            let
                newConfig =
                    model.config
            in
                ( { model | config = { newConfig | windowSize = size } }, Cmd.none )

        DataFetched (Ok data) ->
            let
                allIssues =
                    List.concat (Dict.values data.issues)

                graph =
                    Graph.fromNodesAndEdges
                        (Tuple.first <|
                            List.foldl
                                (\issue ( nodes, seed ) ->
                                    let
                                        ( entity, nextSeed ) =
                                            issueEntity seed model.config.windowSize issue
                                    in
                                        ( Graph.Node issue.id entity :: nodes, nextSeed )
                                )
                                ( [], Random.initialSeed 1 )
                                allIssues
                        )
                        []

                allEvents =
                    List.concat (Dict.values data.timelines)

                references =
                    Dict.foldl
                        (\targetIDStr events pairs ->
                            let
                                targetID =
                                    case String.toInt targetIDStr of
                                        Ok id ->
                                            id

                                        Err err ->
                                            Debug.crash err
                            in
                                List.filterMap
                                    (\event ->
                                        case event.source of
                                            Just { type_, issueID } ->
                                                case issueID of
                                                    Just sourceID ->
                                                        Just ( targetID, sourceID )

                                                    _ ->
                                                        Nothing

                                            _ ->
                                                Nothing
                                    )
                                    events
                                    ++ pairs
                        )
                        []
                        data.timelines

                wiredGraph =
                    List.foldl
                        (\( targetID, sourceID ) graph ->
                            Graph.mapContexts
                                (\nc ->
                                    if nc.node.id == sourceID then
                                        { nc | outgoing = IntDict.insert targetID () nc.outgoing }
                                    else if nc.node.id == targetID then
                                        { nc | incoming = IntDict.insert sourceID () nc.incoming }
                                    else
                                        nc
                                )
                                graph
                        )
                        graph
                        references
            in
                ( { model
                    | repos = data.repositories
                    , repoIssues = data.issues
                    , issueTimelines = data.timelines
                    , issueGraphs = List.map forceGraph (subGraphs wiredGraph)
                  }
                , Cmd.none
                )

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


forceGraph : Graph (ForceNode n) () -> ForceGraph n
forceGraph graph =
    let
        link { from, to } =
            let
                distance =
                    case ( Graph.get from graph, Graph.get to graph ) of
                        ( Just fnc, Just tnc ) ->
                            40 + (max (IntDict.size tnc.incoming) (IntDict.size fnc.outgoing) * 5)

                        _ ->
                            Debug.crash "impossible: unknown target"
            in
                { source = from, target = to, distance = toFloat distance, strength = Nothing }

        forces =
            [ VF.customLinks 1 <| List.map link <| Graph.edges graph
            , VF.manyBodyStrength -120 <| List.map .id <| Graph.nodes graph
            ]

        newSimulation =
            VF.simulation forces
    in
        { graph = graph, simulation = newSimulation }


issueEntity : Random.Seed -> Window.Size -> GitHub.Issue -> ( ForceNode GitHub.Issue, Random.Seed )
issueEntity s1 { width, height } issue =
    let
        ( x, s2 ) =
            Random.step (Random.float 0 (toFloat width)) s1

        ( y, s3 ) =
            Random.step (Random.float 0 (toFloat height)) s2

        initialRadius =
            30.0
    in
        ( { x =
                x
                --toFloat (index % 33) * (initialRadius + 5) + initialRadius
          , y =
                y
                --(toFloat <| index // 33) * (initialRadius + 5) + initialRadius
          , vx = 0.0
          , vy = 0.0
          , id = issue.id
          , value = issue
          }
        , s3
        )


isOrgMember : Maybe (List GitHub.User) -> GitHub.User -> Bool
isOrgMember users user =
    List.any (\x -> x.id == user.id) (Maybe.withDefault [] users)


view : Model -> Html Msg
view model =
    Html.div [] <|
        List.map (viewGraph 500 500) (List.reverse <| List.sortBy (.graph >> Graph.size) model.issueGraphs)


viewGraph : Int -> Int -> ForceGraph GitHub.Issue -> Html Msg
viewGraph w h { graph } =
    let
        nodeContexts =
            Graph.fold (::) [] graph

        padding =
            50

        minX =
            List.foldl (\nc acc -> min nc.node.label.x acc) 999999 nodeContexts - padding

        minY =
            List.foldl (\nc acc -> min nc.node.label.y acc) 999999 nodeContexts - padding

        maxX =
            List.foldl (\nc acc -> max nc.node.label.x acc) 0 nodeContexts + padding

        maxY =
            List.foldl (\nc acc -> max nc.node.label.y acc) 0 nodeContexts + padding

        width =
            maxX - minX

        height =
            maxY - minY
    in
        Svg.svg
            [ SA.width (toString width ++ "px")
            , SA.height (toString height ++ "px")
            , SA.viewBox (toString minX ++ " " ++ toString minY ++ " " ++ toString width ++ " " ++ toString height)
            ]
            [ Svg.g [ SA.class "links" ] (List.map (linkPath graph) (Graph.edges graph))
            , Svg.g [ SA.class "nodes" ] (List.map issueNode nodeContexts)
            ]


linkPath : Graph (ForceNode n) () -> Graph.Edge () -> Svg Msg
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


issueNode : Graph.NodeContext (ForceNode GitHub.Issue) () -> Svg Msg
issueNode { node, incoming, outgoing } =
    let
        x =
            node.label.x

        y =
            node.label.y

        issue =
            node.label.value

        labels =
            issue.labels

        radius =
            15 + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))

        segments =
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
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            ]
            [ Svg.a
                [ SA.xlinkHref issue.htmlURL
                ]
                ([ Svg.circle
                    [ SA.r (toString radius)
                    , SA.fill <|
                        if issue.isPullRequest then
                            "#28a745"
                        else
                            "#fff"
                    ]
                    []
                 , Svg.text_
                    [ SA.y "4"
                    , SA.textAnchor "middle"
                    , SA.fill <|
                        if issue.isPullRequest then
                            "#fff"
                        else
                            "#C6A49A"
                    , SA.fontWeight "bold"
                    ]
                    [ Svg.text (toString issue.number)
                    ]
                 ]
                    ++ (List.map2
                            (\arc label ->
                                Svg.path
                                    [ SA.d (VS.arc arc)
                                    , SA.fill ("#" ++ label.color)
                                    ]
                                    []
                            )
                            segments
                            labels
                       )
                )
            ]


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


viewIssueLabel : GitHub.IssueLabel -> Html Msg
viewIssueLabel { name, color } =
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
        [ Html.text name
        ]


issueFlair : GitHub.Issue -> List (Html Msg)
issueFlair { url, reactions, commentCount } =
    let
        presentReactions =
            List.filter ((/=) 0 << Tuple.second) <|
                GitHub.reactionCodes reactions

        viewReaction ( code, count ) =
            Html.span [ HA.class "reaction" ]
                [ Html.span [ HA.class "emoji" ] [ Html.text code ]
                , Html.span [ HA.class "count" ] [ Html.text <| toString count ]
                ]

        commentsElement =
            Html.span [ HA.class "reaction" ]
                [ Html.span [ HA.class "emoji" ] [ Html.i [ HA.class "octicon octicon-comment" ] [] ]
                , Html.span [ HA.class "count" ] [ Html.text <| toString commentCount ]
                ]

        reactionElements =
            List.map viewReaction presentReactions
    in
        if commentCount > 0 then
            reactionElements ++ [ commentsElement ]
        else
            reactionElements


fetchData : Cmd Msg
fetchData =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt DataFetched


decodeData : Json.Decode.Decoder Data
decodeData =
    Json.Decode.succeed Data
        |: (Json.Decode.field "repositories" <| Json.Decode.list GitHub.decodeRepo)
        |: (Json.Decode.field "issues" <| Json.Decode.dict (Json.Decode.list GitHub.decodeIssue))
        |: (Json.Decode.field "timelines" <| Json.Decode.dict (Json.Decode.list GitHub.decodeTimelineEvent))
