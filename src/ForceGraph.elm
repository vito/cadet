module ForceGraph exposing (ForceGraph, ForceNode, fromGraph, isCompleted, member, tick, update)

import Force
import Graph exposing (Graph)
import Random


type alias ForceGraph n =
    { graph : Graph (ForceNode n) ()
    , simulation : Force.State Graph.NodeId
    }


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
                            Debug.todo "impossible: unknown target"
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
                fg.graph
    }


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
            Force.tick simulation (List.map .label (Graph.nodes graph))
    in
    { graph = updateGraphWithList graph list
    , simulation = newState
    }


isCompleted : ForceGraph n -> Bool
isCompleted =
    .simulation >> Force.isCompleted


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
