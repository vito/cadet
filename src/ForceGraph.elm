module ForceGraph exposing (ForceGraph, ForceNode, fromGraph, tick, isCompleted)

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
            , VF.manyBodyStrength -120 <| List.map .id <| Graph.nodes graph
            ]

        newSimulation =
            VF.iterations (Graph.size graph * 10) <|
                VF.simulation forces
    in
        { graph = graph, simulation = newSimulation }


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