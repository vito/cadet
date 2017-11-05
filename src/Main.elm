module Main exposing (..)

import AnimationFrame
import Debug
import Dict exposing (Dict)
import Graph exposing (Graph)
import Html exposing (Html)
import Html.Attributes as HA
import Http
import IntDict
import ParseInt
import Regex exposing (Regex)
import Set
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Lazy
import Time
import Visualization.Shape as VS
import Window
import GitHub
import Data exposing (Data)
import ForceGraph as FG exposing (ForceGraph)


type alias Config =
    { windowSize : Window.Size
    }


type alias Model =
    { config : Config
    , issueTimelines : Dict Int (List GitHub.TimelineEvent)
    , issueGraphs : List (ForceGraph IssueNode)
    }


type alias IssueNode =
    { issue : GitHub.Issue
    , flair : List (Svg Msg)
    , labels : List (Svg Msg)
    , radii :
        { base : Float
        , withLabels : Float
        , withFlair : Float
        }
    }


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


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , issueGraphs = []
      , issueTimelines = Dict.empty
      }
    , Data.fetch DataFetched
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Window.resizes Resize
        , if List.all FG.isCompleted model.issueGraphs then
            Sub.none
          else
            AnimationFrame.times Tick
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Tick _ ->
            ( { model
                | issueGraphs =
                    List.map
                        (\g ->
                            if FG.isCompleted g then
                                g
                            else
                                FG.tick g
                        )
                        model.issueGraphs
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
            computeGraphs model data

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


view : Model -> Html Msg
view model =
    flowGraphs model.config.windowSize <|
        List.map viewGraph model.issueGraphs


flowGraphs : Window.Size -> List Subgraph -> Html Msg
flowGraphs window graphs =
    let
        ( gs, x, y, nextRow ) =
            List.foldl (viewSubgraph window) ( [], 0, 0, 0 ) graphs
    in
        Svg.svg
            [ SA.width (toString window.width ++ "px")
            , SA.height (toString (y + nextRow) ++ "px")
            ]
            gs


viewSubgraph : Window.Size -> Subgraph -> ( List (Svg Msg), Float, Float, Float ) -> ( List (Svg Msg), Float, Float, Float )
viewSubgraph window sg ( gs, atX, atY, nextRow ) =
    let
        ( wrappedX, wrappedY, wrappedNextRow ) =
            if atX + sg.size.width > toFloat window.width then
                ( 0, atY + nextRow, sg.size.height )
            else
                ( atX, atY, max sg.size.height nextRow )

        ( x, y ) =
            ( wrappedX - sg.bounds.minX, wrappedY - sg.bounds.minY )

        transform =
            "translate(" ++ toString x ++ ", " ++ toString y ++ ")"
    in
        ( Svg.g [ SA.transform transform ] sg.content :: gs
        , wrappedX + sg.size.width
        , wrappedY
        , wrappedNextRow
        )


computeGraphs : Model -> Data -> ( Model, Cmd Msg )
computeGraphs model data =
    let
        allIssues =
            List.concat (Dict.values data.issues)

        references =
            Dict.foldl
                (\idStr sourceIds refs ->
                    case String.toInt idStr of
                        Ok id ->
                            List.map
                                (\sourceId ->
                                    { from = sourceId
                                    , to = id
                                    , label = ()
                                    }
                                )
                                sourceIds
                                ++ refs

                        _ ->
                            Debug.crash "impossible"
                )
                []
                data.references

        graph =
            Graph.mapContexts issueNode <|
                Graph.fromNodesAndEdges
                    (List.map (\i -> Graph.Node i.id i) allIssues)
                    references

        issueGraphs =
            subGraphs graph
                |> List.map FG.fromGraph
                |> List.sortWith graphCompare
                |> List.reverse
    in
        ( { model | issueGraphs = issueGraphs }, Cmd.none )


graphCompare : ForceGraph IssueNode -> ForceGraph IssueNode -> Order
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


nodeScore : FG.ForceNode IssueNode -> Int
nodeScore fn =
    GitHub.issueScore fn.value.issue


type alias Subgraph =
    { content : List (Svg Msg)
    , bounds : { minX : Float, minY : Float, maxX : Float, maxY : Float }
    , size : { width : Float, height : Float }
    }


viewGraph : ForceGraph IssueNode -> Subgraph
viewGraph { graph } =
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
                    ( Svg.Lazy.lazy viewIssueFlair node :: fs
                    , Svg.Lazy.lazy viewIssueNode node :: ns
                    )
                )
                ( [], [] )
                graph
    in
        { content =
            [ Svg.g [ SA.class "links" ] links
            , Svg.g [ SA.class "flairs" ] flairs
            , Svg.g [ SA.class "nodes" ] nodes
            ]
        , bounds = { minX = minX, minY = minY, maxX = maxX, maxY = maxY }
        , size = { width = width, height = height }
        }


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


issueRadius : Graph.NodeContext GitHub.Issue () -> Float
issueRadius { incoming, outgoing } =
    15 + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))


issueRadiusWithLabels : Graph.NodeContext GitHub.Issue () -> Float
issueRadiusWithLabels =
    issueRadius >> ((+) 3)


flairRadiusBase : Float
flairRadiusBase =
    16


issueRadiusWithFlair : Graph.NodeContext GitHub.Issue () -> Float
issueRadiusWithFlair nc =
    let
        issue =
            nc.node.label

        reactionCounts =
            List.map Tuple.second (GitHub.reactionCodes issue.reactions)

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (issue.commentCount :: reactionCounts)
    in
        issueRadiusWithLabels nc + flairRadiusBase + toFloat highestFlair


issueNode : Graph.NodeContext GitHub.Issue () -> Graph.NodeContext IssueNode ()
issueNode nc =
    let
        node =
            nc.node

        issue =
            node.label

        flair =
            nodeFlairArcs nc

        labels =
            nodeLabelArcs nc

        forceNode =
            { node
                | label =
                    { issue = issue
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


nodeFlairArcs : Graph.NodeContext GitHub.Issue () -> List (Svg Msg)
nodeFlairArcs nc =
    let
        issue =
            nc.node.label

        radius =
            issueRadiusWithLabels nc

        reactions =
            List.filter (Tuple.second >> flip (>) 0) <|
                (( "💬", issue.commentCount ) :: GitHub.reactionCodes issue.reactions)

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
                        (List.repeat (List.length reactions) 1)
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
        List.indexedMap
            (\i (( emoji, count ) as reaction) ->
                let
                    arc =
                        reactionSegment i reaction
                in
                    Svg.g [ SA.class "reveal" ]
                        [ Svg.path
                            [ SA.d (VS.arc arc)
                            , SA.fill ("rgba(255, 255, 255, .3)")
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
            )
            reactions


nodeLabelArcs : Graph.NodeContext GitHub.Issue () -> List (Svg Msg)
nodeLabelArcs nc =
    let
        issue =
            nc.node.label

        labels =
            issue.labels

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


viewIssueFlair : Graph.Node (FG.ForceNode IssueNode) -> Svg Msg
viewIssueFlair { label } =
    let
        x =
            label.x

        y =
            label.y

        issue =
            label.value.issue
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            ]
            label.value.flair


viewIssueNode : Graph.Node (FG.ForceNode IssueNode) -> Svg Msg
viewIssueNode { label } =
    let
        x =
            label.x

        y =
            label.y

        issue =
            label.value.issue
    in
        Svg.g
            [ SA.transform ("translate(" ++ toString x ++ ", " ++ toString y ++ ")")
            ]
            [ Svg.a
                [ SA.xlinkHref issue.htmlURL
                , SA.target "_blank"
                ]
                ([ Svg.circle
                    [ SA.r (toString label.value.radii.base)
                    , SA.fill <|
                        if issue.isPullRequest then
                            "#28a745"
                        else
                            "#fff"
                    ]
                    []
                 , Svg.text_
                    [ SA.textAnchor "middle"
                    , SA.alignmentBaseline "middle"
                    , SA.fill <|
                        if issue.isPullRequest then
                            "#fff"
                        else
                            "#C6A49A"
                    ]
                    [ Svg.text (toString issue.number)
                    ]
                 ]
                    ++ label.value.labels
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


isOrgMember : Maybe (List GitHub.User) -> GitHub.User -> Bool
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


issueNodeBounds : Graph.NodeContext (FG.ForceNode IssueNode) () -> ( Float, Float, Float, Float )
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
