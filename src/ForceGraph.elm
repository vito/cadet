module ForceGraph exposing (ForceGraph, ForceNode, NodeId, decode, encode, fromGraph)

import Dict exposing (Dict)
import Force
import Graph exposing (Graph)
import IntDict exposing (IntDict)
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Log
import Random


type alias ForceGraph n =
    { nodes : List (ForceNode n)
    , edges : List ( NodeId, NodeId )
    }


type alias NodeId =
    Int


type alias ForceNode n =
    Force.Entity NodeId { size : Float, value : n }


type alias DecodedNode n =
    { id : NodeId
    , x : Float
    , y : Float
    , vy : Float
    , vx : Float
    , size : Float
    , value : n
    }


fromGraph : Dict NodeId { value : value, size : Float } -> List ( NodeId, NodeId ) -> ForceGraph value
fromGraph nodes edges =
    let
        link ( from, to ) =
            let
                distance =
                    case ( Dict.get from nodes, Dict.get to nodes ) of
                        ( Just f, Just t ) ->
                            20 + ceiling (f.size + t.size)

                        _ ->
                            0
            in
            { source = from
            , target = to
            , distance = toFloat distance
            , strength = Nothing
            }

        forces =
            [ Force.customLinks 1 (List.map link edges)
            , Force.manyBodyStrength -200 (Dict.keys nodes)
            ]

        nodeCount =
            Dict.size nodes

        iterations =
            if nodeCount == 1 then
                1

            else if nodeCount < 5 then
                50

            else
                nodeCount * 10

        newSimulation =
            Force.iterations iterations <|
                Force.simulation forces

        addNode id { size, value } acc =
            let
                canvas =
                    500

                ( x, s2 ) =
                    Random.step (Random.float 0 canvas) (Random.initialSeed id)

                ( y, s3 ) =
                    Random.step (Random.float 0 canvas) s2
            in
            { id = id
            , x = x
            , y = y
            , vx = 0.0
            , vy = 0.0
            , size = size
            , value = value
            }
                :: acc
    in
    { nodes = Force.computeSimulation newSimulation (Dict.foldl addNode [] nodes)
    , edges = edges
    }


encode : (n -> JE.Value) -> ForceGraph n -> JE.Value
encode encoder graph =
    let
        encodeNode { id, x, y, value, size } =
            JE.object
                [ ( "id", JE.int id )
                , ( "x", JE.float (Log.debug "x" x x) )
                , ( "y", JE.float (Log.debug "WHYYYYYYYYYYYYYYYYYYYYYY" y y) )
                , ( "size", JE.float size )
                , ( "value", encoder value )
                ]

        encodeEdge ( from, to ) =
            JE.object
                [ ( "from", JE.int from )
                , ( "to", JE.int to )
                ]
    in
    JE.object
        [ ( "nodes", JE.list encodeNode graph.nodes )
        , ( "edges", JE.list encodeEdge graph.edges )
        ]


encodeIntDict : IntDict () -> JE.Value
encodeIntDict =
    JE.list JE.int << IntDict.keys


decodeIntDict : JD.Decoder (IntDict ())
decodeIntDict =
    JD.map (IntDict.fromList << List.map (\i -> ( i, () ))) <|
        JD.list JD.int


decode : JD.Decoder n -> JD.Decoder (ForceGraph n)
decode decoder =
    let
        decodeNode =
            JD.succeed DecodedNode
                |> andMap (JD.field "id" JD.int)
                |> andMap (JD.field "x" JD.float)
                |> andMap (JD.field "y" JD.float)
                |> andMap (JD.succeed 0)
                |> andMap (JD.succeed 0)
                |> andMap (JD.field "size" JD.float)
                |> andMap (JD.field "value" decoder)

        decodeEdge =
            JD.succeed Tuple.pair
                |> andMap (JD.field "from" JD.int)
                |> andMap (JD.field "to" JD.int)
    in
    JD.succeed ForceGraph
        |> andMap (JD.field "nodes" (JD.list decodeNode))
        |> andMap (JD.field "edges" (JD.list decodeEdge))
