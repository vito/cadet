module ForceGraph exposing
    ( ForceGraph
    , ForceNode
    , NodeId
    , decode
    , encode
    , fold
    , fromGraph
    , get
    , size
    )

import Force
import IntDict exposing (IntDict)
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Random


type alias ForceGraph n =
    { nodes : IntDict (ForceNode n)
    , edges : List ( NodeId, NodeId )
    }


type alias NodeId =
    Int


type alias ForceNode n =
    Force.Entity NodeId { mass : Float, value : n }


type alias DecodedNode n =
    { id : NodeId
    , x : Float
    , y : Float
    , vy : Float
    , vx : Float
    , mass : Float
    , value : n
    }


fromGraph : IntDict { value : value, mass : Float } -> List ( NodeId, NodeId ) -> ForceGraph value
fromGraph nodes edges =
    let
        link ( from, to ) =
            let
                distance =
                    case ( IntDict.get from nodes, IntDict.get to nodes ) of
                        ( Just f, Just t ) ->
                            20 + ceiling (f.mass + t.mass)

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
            , Force.manyBodyStrength -200 (IntDict.keys nodes)
            ]

        nodeCount =
            IntDict.size nodes

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

        addNode id { mass, value } acc =
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
            , mass = mass
            , value = value
            }
                :: acc

        simulated =
            Force.computeSimulation newSimulation (IntDict.foldl addNode [] nodes)
    in
    { nodes = List.foldl (\n ns -> IntDict.insert n.id n ns) IntDict.empty simulated
    , edges = edges
    }


get : NodeId -> ForceGraph n -> Maybe (ForceNode n)
get id { nodes } =
    IntDict.get id nodes


size : ForceGraph n -> Int
size { nodes } =
    IntDict.size nodes


fold : (ForceNode n -> acc -> acc) -> acc -> ForceGraph n -> acc
fold f init { nodes } =
    IntDict.foldl (\_ -> f) init nodes


encode : (n -> JE.Value) -> ForceGraph n -> JE.Value
encode encoder graph =
    let
        encodeNode { id, x, y, value, mass } =
            JE.object
                [ ( "id", JE.int id )
                , ( "x", JE.float x )
                , ( "y", JE.float y )
                , ( "mass", JE.float mass )
                , ( "value", encoder value )
                ]

        encodeEdge ( from, to ) =
            JE.object
                [ ( "from", JE.int from )
                , ( "to", JE.int to )
                ]
    in
    JE.object
        [ ( "nodes", JE.list encodeNode (IntDict.values graph.nodes) )
        , ( "edges", JE.list encodeEdge graph.edges )
        ]


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
                |> andMap (JD.field "mass" JD.float)
                |> andMap (JD.field "value" decoder)

        decodeEdge =
            JD.succeed Tuple.pair
                |> andMap (JD.field "from" JD.int)
                |> andMap (JD.field "to" JD.int)

        toDict =
            List.foldl (\n ns -> IntDict.insert n.id n ns) IntDict.empty
    in
    JD.succeed ForceGraph
        |> andMap (JD.field "nodes" (JD.map toDict (JD.list decodeNode)))
        |> andMap (JD.field "edges" (JD.list decodeEdge))
