module ForceGraph exposing (ForceGraph, ForceNode, fromGraph, member, update, tick, isCompleted)

import Graph exposing (Graph)
import Random
import IntDict
import Visualization.Force as VF


type alias ForceGraph n =
    { graph : Graph (ForceNode n) ()
    , simulation : VF.State Graph.NodeId
    }


type alias ForceNode n =
    VF.Entity Graph.NodeId { value : n }


fromGraph : Graph n () -> ForceGraph n
fromGraph g =
    let
        graph =
            Graph.mapContexts node g

        link { from, to } =
            let
                distance =
                    case ( Graph.get from graph, Graph.get to graph ) of
                        ( Just fnc, Just tnc ) ->
                            40 + (max (IntDict.size tnc.incoming) (IntDict.size fnc.outgoing) * 5)

                        _ ->
                            Debug.crash "impossible: unknown target"
            in
                { source = from
                , target = to
                , distance = toFloat distance
                , strength = Nothing
                }

        forces =
            [ VF.customLinks 1 <| List.map link <| Graph.edges graph
            , VF.manyBodyStrength -200 <| List.map .id <| Graph.nodes graph
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
            VF.iterations iterations <|
                VF.simulation forces
    in
        computeSimulation { graph = graph, simulation = newSimulation }


member : Graph.NodeId -> ForceGraph n -> Bool
member id =
    Graph.member id << .graph


update : Graph.NodeId -> (n -> n) -> ForceGraph n -> ForceGraph n
update id f fg =
    { fg
        | graph =
            Graph.update id
                (Maybe.map
                    (\nc ->
                        let
                            node =
                                nc.node

                            label =
                                node.label

                            value =
                                label.value
                        in
                            { nc | node = { node | label = { label | value = f value } } }
                    )
                )
                fg.graph
    }


node : Graph.NodeContext n () -> Graph.NodeContext (ForceNode n) ()
node nc =
    let
        node =
            nc.node

        canvas =
            500

        ( x, s2 ) =
            Random.step (Random.float 0 canvas) (Random.initialSeed node.id)

        ( y, s3 ) =
            Random.step (Random.float 0 canvas) s2
    in
        { nc
            | node =
                { node
                    | label =
                        { x = x
                        , y = y
                        , vx = 0.0
                        , vy = 0.0
                        , id = node.id
                        , value = node.label
                        }
                }
        }


computeSimulation : ForceGraph n -> ForceGraph n
computeSimulation fg =
    if isCompleted fg then
        fg
    else
        computeSimulation (tick fg)


simulate : Int -> ForceGraph n -> ForceGraph n
simulate num fg =
    if num == 0 then
        fg
    else
        simulate (num - 1) (tick fg)


tick : ForceGraph n -> ForceGraph n
tick { graph, simulation } =
    let
        ( newState, list ) =
            VF.tick simulation (List.map .label (Graph.nodes graph))
    in
        { graph = updateGraphWithList graph list
        , simulation = newState
        }


isCompleted : ForceGraph n -> Bool
isCompleted =
    .simulation >> VF.isCompleted


updateGraphWithList : Graph (ForceNode n) () -> List (ForceNode n) -> Graph (ForceNode n) ()
updateGraphWithList =
    let
        graphUpdater value =
            Maybe.map (\ctx -> updateContextWithValue ctx value)
    in
        List.foldr (\node -> Graph.update node.id (graphUpdater node))


updateContextWithValue : Graph.NodeContext (ForceNode n) () -> ForceNode n -> Graph.NodeContext (ForceNode n) ()
updateContextWithValue nodeCtx value =
    let
        node =
            nodeCtx.node

        label =
            node.label
    in
        { nodeCtx | node = { node | label = value } }
