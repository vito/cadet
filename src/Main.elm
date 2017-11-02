module Main exposing (..)

import IntDict
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
    , error : Maybe String
    , repos : List GitHub.Repo
    , repoIssues : Dict String (List GitHub.Issue)
    , issueTimelines : Dict String (List GitHub.TimelineEvent)
    , graph : Graph Entity ()
    , simulation : VF.State Graph.NodeId
    }


type alias Entity =
    VF.Entity Graph.NodeId { value : GitHub.Issue }


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
      , error = Nothing
      , repos = []
      , repoIssues = Dict.empty
      , issueTimelines = Dict.empty
      , graph = Graph.empty
      , simulation = VF.simulation []
      }
    , fetchData
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Window.resizes Resize
        , if VF.isCompleted model.simulation then
            Sub.none
          else
            AnimationFrame.times Tick
        ]


updateGraphWithList : Window.Size -> Graph Entity () -> List Entity -> Graph Entity ()
updateGraphWithList windowSize =
    let
        graphUpdater value =
            Maybe.map (\ctx -> updateContextWithValue windowSize ctx value)
    in
        List.foldr (\node graph -> Graph.update node.id (graphUpdater node) graph)


bind : Float -> Int -> Float -> Float
bind target size gap =
    if target < gap then
        gap
    else if target > toFloat size - gap then
        toFloat size - gap
    else
        target


updateContextWithValue : Window.Size -> Graph.NodeContext Entity () -> Entity -> Graph.NodeContext Entity ()
updateContextWithValue { width, height } nodeCtx value =
    let
        bounded =
            { value
                | x = bind value.x width 20
                , y = bind value.y height 20
            }

        node =
            nodeCtx.node
    in
        { nodeCtx | node = { node | label = bounded } }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Tick _ ->
            let
                ( newState, list ) =
                    VF.tick model.simulation (List.map .label (Graph.nodes model.graph))
            in
                ( { model | graph = updateGraphWithList model.config.windowSize model.graph list, simulation = newState }, Cmd.none )

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
                                ( [], Random.initialSeed 42 )
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

                newGraph =
                    Graph.fold
                        (\nc g ->
                            if IntDict.isEmpty nc.incoming && IntDict.isEmpty nc.outgoing then
                                g
                            else
                                Graph.insert nc g
                        )
                        Graph.empty
                        wiredGraph

                link { from, to } =
                    { source = from, target = to, distance = 50, strength = Nothing }

                forces =
                    [ VF.customLinks 1 <| List.map link <| Graph.edges wiredGraph
                    , VF.manyBodyStrength -20 <| List.map .id <| Graph.nodes wiredGraph
                    ]

                newSimulation =
                    VF.simulation forces
            in
                ( { model
                    | repos = data.repositories
                    , repoIssues = data.issues
                    , issueTimelines = data.timelines
                    , graph = newGraph
                    , simulation = newSimulation
                  }
                , Cmd.none
                )

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


issueEntity : Random.Seed -> Window.Size -> GitHub.Issue -> ( Entity, Random.Seed )
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
    case model.error of
        Just msg ->
            Html.pre [] [ Html.text msg ]

        Nothing ->
            Svg.svg
                [ SA.width (toString model.config.windowSize.width ++ "px")
                , SA.height (toString model.config.windowSize.height ++ "px")
                ]
                [ Svg.g [ SA.class "links" ] (List.map (linkPath model.graph) (Graph.edges model.graph))
                , Svg.g [ SA.class "nodes" ] (List.map issueNode (Graph.nodes model.graph))
                ]


linkPath : Graph Entity () -> Graph.Edge () -> Svg Msg
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


issueNode : Graph.Node Entity -> Svg Msg
issueNode node =
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
            15

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
                    , SA.fill "#fff"
                    ]
                    []
                 , Svg.text_
                    [ SA.y "4"
                    , SA.textAnchor "middle"
                    , SA.fill "#C6A49A"
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
