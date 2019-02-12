module ForceGraph exposing (ForceGraph, ForceNode, decode, encode, fromGraph, member, update)

import Force
import Graph exposing (Graph)
import IntDict exposing (IntDict)
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Random


type alias ForceGraph n =
    Graph (ForceNode n) ()


type alias ForceNode n =
    Force.Entity Graph.NodeId { value : n, size : Float }


fromGraph : Graph { value : n, size : Float } () -> ForceGraph n
fromGraph g =
    let
        graph =
            Graph.mapContexts node g

        link { from, to } =
            let
                distance =
                    case ( Graph.get from graph, Graph.get to graph ) of
                        ( Just fnc, Just tnc ) ->
                            20 + ceiling (tnc.node.label.size + fnc.node.label.size)

                        _ ->
                            0
            in
            { source = from
            , target = to
            , distance = toFloat distance
            , strength = Nothing
            }

        forces =
            [ Force.customLinks 1 <| List.map link <| Graph.edges graph
            , Force.manyBodyStrength -200 <| List.map .id <| Graph.nodes graph
            ]

        size =
            Graph.size graph

        iterations =
            if size == 1 then
                1

            else if size < 5 then
                50

            else
                size * 10

        newSimulation =
            Force.iterations iterations <|
                Force.simulation forces
    in
    computeSimulation newSimulation graph


member : Graph.NodeId -> ForceGraph n -> Bool
member =
    Graph.member


update : Graph.NodeId -> (n -> n) -> ForceGraph n -> ForceGraph n
update id f fg =
    Graph.update id
        (Maybe.map
            (\nc ->
                let
                    ncnode =
                        nc.node

                    label =
                        ncnode.label

                    value =
                        label.value
                in
                { nc | node = { ncnode | label = { label | value = f value } } }
            )
        )
        fg


node : Graph.NodeContext { value : n, size : Float } () -> Graph.NodeContext (ForceNode n) ()
node nc =
    let
        ncnode =
            nc.node

        canvas =
            500

        ( x, s2 ) =
            Random.step (Random.float 0 canvas) (Random.initialSeed ncnode.id)

        ( y, s3 ) =
            Random.step (Random.float 0 canvas) s2
    in
    { incoming = nc.incoming
    , outgoing = nc.outgoing
    , node =
        { id = ncnode.id
        , label =
            { x = x
            , y = y
            , vx = 0.0
            , vy = 0.0
            , id = ncnode.id
            , value = ncnode.label.value
            , size = ncnode.label.size
            }
        }
    }


computeSimulation : Force.State Graph.NodeId -> ForceGraph n -> ForceGraph n
computeSimulation simulation graph =
    updateGraphWithList graph <|
        Force.computeSimulation simulation (List.map .label (Graph.nodes graph))


encode : (n -> JE.Value) -> ForceGraph n -> JE.Value
encode encoder graph =
    let
        encodeNode nc =
            JE.object
                [ ( "id", JE.int nc.node.id )
                , ( "incoming", encodeIntDict nc.incoming )
                , ( "outgoing", encodeIntDict nc.outgoing )
                , ( "value", encoder nc.node.label.value )
                , ( "x", JE.float nc.node.label.x )
                , ( "y", JE.float nc.node.label.y )
                , ( "size", JE.float nc.node.label.size )
                ]

        nodes =
            Graph.fold (\n ns -> encodeNode n :: ns) [] graph
    in
    JE.list identity nodes


encodeIntDict : IntDict () -> JE.Value
encodeIntDict =
    JE.list JE.int << IntDict.keys


decodeIntDict : JD.Decoder (IntDict ())
decodeIntDict =
    JD.map (IntDict.fromList << List.map (\i -> ( i, () ))) <|
        JD.list JD.int


type alias DecodedNode n =
    { id : Int
    , incoming : IntDict ()
    , outgoing : IntDict ()
    , value : n
    , x : Float
    , y : Float
    , size : Float
    }


decode : JD.Decoder n -> JD.Decoder (ForceGraph n)
decode decoder =
    let
        decodeNode =
            JD.succeed DecodedNode
                |> andMap (JD.field "id" JD.int)
                |> andMap (JD.field "incoming" decodeIntDict)
                |> andMap (JD.field "outgoing" decodeIntDict)
                |> andMap (JD.field "value" decoder)
                |> andMap (JD.field "x" JD.float)
                |> andMap (JD.field "y" JD.float)
                |> andMap (JD.field "size" JD.float)

        addGraphNode n g =
            let
                nc =
                    { node =
                        { id = n.id
                        , label =
                            { id = n.id
                            , x = n.x
                            , y = n.y
                            , vx = 0.0
                            , vy = 0.0
                            , size = n.size
                            , value = n.value
                            }
                        }
                    , incoming = n.incoming
                    , outgoing = n.outgoing
                    }
            in
            Graph.insert nc g

        toGraph =
            List.foldl addGraphNode Graph.empty
    in
    JD.list decodeNode
        |> JD.map toGraph


updateGraphWithList : Graph (ForceNode n) () -> List (ForceNode n) -> Graph (ForceNode n) ()
updateGraphWithList =
    let
        graphUpdater value =
            Maybe.map (\ctx -> updateContextWithValue ctx value)
    in
    List.foldr (\ncnode -> Graph.update ncnode.id (graphUpdater ncnode))


updateContextWithValue : Graph.NodeContext (ForceNode n) () -> ForceNode n -> Graph.NodeContext (ForceNode n) ()
updateContextWithValue nc value =
    let
        ncnode =
            nc.node

        label =
            ncnode.label
    in
    { nc | node = { ncnode | label = value } }
