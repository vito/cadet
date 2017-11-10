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
import Hash
import GitHubGraph
import Data exposing (Data)
import ForceGraph as FG exposing (ForceGraph)


type alias Config =
    { initialDate : Time
    }


type alias Model =
    { config : Config
    , allIssueOrPRs : List IssueOrPR
    , issueOrPRActors : Dict GitHubGraph.ID (List Data.ActorEvent)
    , issueOrPRGraphs : List (ForceGraph IssueOrPRNode)
    , selectedIssueOrPRs : List IssueOrPR
    , anticipatedIssueOrPRs : List IssueOrPR
    , currentDate : Date
    }


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
    | Tick Time
    | SetCurrentDate Date
    | DataFetched (Result Http.Error Data)
    | SelectIssueOrPR IssueOrPR
    | DeselectIssueOrPR IssueOrPR
    | AnticipateIssueOrPR IssueOrPR
    | UnanticipateIssueOrPR IssueOrPR
    | SearchIssueOrPRs String
    | SelectAnticipatedIssueOrPRs
    | ClearSelectedIssueOrPRs


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , allIssueOrPRs = []
      , issueOrPRActors = Dict.empty
      , issueOrPRGraphs = []
      , selectedIssueOrPRs = []
      , anticipatedIssueOrPRs = []
      , currentDate = Date.fromTime config.initialDate
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
                        title =
                            case issueOrPR of
                                Issue issue ->
                                    issue.title

                                PR pr ->
                                    pr.title
                    in
                        String.contains (String.toLower query) (String.toLower title)

                foundIssueOrPRs =
                    List.filter issueOrPRMatch model.allIssueOrPRs
            in
                ( { model | anticipatedIssueOrPRs = foundIssueOrPRs }, Cmd.none )

        SelectAnticipatedIssueOrPRs ->
            ( { model
                | anticipatedIssueOrPRs = []
                , selectedIssueOrPRs = model.anticipatedIssueOrPRs ++ model.selectedIssueOrPRs
              }
            , Cmd.none
            )

        SelectIssueOrPR iop ->
            ( { model
                | issueOrPRGraphs = List.map (setIssueOrPRSelected iop True) model.issueOrPRGraphs
                , selectedIssueOrPRs = iop :: model.selectedIssueOrPRs
              }
            , Cmd.none
            )

        ClearSelectedIssueOrPRs ->
            ( { model | selectedIssueOrPRs = [] }, Cmd.none )

        DeselectIssueOrPR iop ->
            ( { model
                | issueOrPRGraphs = List.map (setIssueOrPRSelected iop False) model.issueOrPRGraphs
                , selectedIssueOrPRs = List.filter (not << sameIssueOrPR iop) model.selectedIssueOrPRs
              }
            , Cmd.none
            )

        AnticipateIssueOrPR issue ->
            ( { model | anticipatedIssueOrPRs = issue :: model.anticipatedIssueOrPRs }
            , Cmd.none
            )

        UnanticipateIssueOrPR iop ->
            ( { model | anticipatedIssueOrPRs = List.filter (not << sameIssueOrPR iop) model.anticipatedIssueOrPRs }, Cmd.none )

        DataFetched (Ok data) ->
            computeGraphs model data

        DataFetched (Err msg) ->
            flip always (Debug.log "error" msg) <|
                ( model, Cmd.none )


view : Model -> Html Msg
view model =
    let
        svg =
            Html.div [] <|
                List.map (Html.Lazy.lazy (viewGraph model)) model.issueOrPRGraphs

        anticipatedIssueOrPRs =
            List.map (viewIssueInfo model True) <|
                List.filter (not << flip List.member model.selectedIssueOrPRs) model.anticipatedIssueOrPRs
    in
        Html.div [ HA.class "cadet" ]
            [ svg
            , Html.div [ HA.class "issue-management" ]
                [ Html.div [ HA.class "issues" ] <|
                    anticipatedIssueOrPRs
                        ++ List.map (viewIssueInfo model False) model.selectedIssueOrPRs
                , viewSearch
                ]
            ]


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


setIssueOrPRSelected : IssueOrPR -> Bool -> ForceGraph IssueOrPRNode -> ForceGraph IssueOrPRNode
setIssueOrPRSelected iop val fg =
    let
        id =
            case iop of
                Issue issue ->
                    Hash.hash issue.id

                PR pr ->
                    Hash.hash pr.id

        toggle node =
            { node | selected = val }
    in
        if FG.member id fg then
            FG.update id toggle fg
        else
            fg


computeGraphs : Model -> Data -> ( Model, Cmd Msg )
computeGraphs model data =
    let
        allIssueOrPRs =
            List.map Issue (List.concat (Dict.values data.issues))
                ++ List.map PR (List.concat (Dict.values data.prs))

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
                    (List.map issueOrPRNode allIssueOrPRs)
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
                        , SA.fill "#C6A49A"
                        ]
                        [ Svg.text (toString issue.number)
                        ]
                    ]

                PR pr ->
                    [ Svg.circle
                        [ SA.r (toString label.value.radii.base)
                        , SA.fill "#28a745"
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
            , SE.onMouseOver (AnticipateIssueOrPR issueOrPR)
            , SE.onMouseOut (UnanticipateIssueOrPR issueOrPR)
            , SE.onClick
                (if label.value.selected then
                    DeselectIssueOrPR issueOrPR
                 else
                    SelectIssueOrPR issueOrPR
                )
            ]
            (circleWithNumber ++ label.value.labels)


viewIssueInfo : Model -> Bool -> IssueOrPR -> Html Msg
viewIssueInfo model anticipated iop =
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
    in
        Html.div [ HA.class "issue-controls" ]
            [ Html.div [ HA.class "issue-buttons" ]
                [ if not anticipated then
                    Html.span
                        [ HE.onClick (DeselectIssueOrPR iop)
                        , HA.class "octicon octicon-x"
                        ]
                        [ Html.text "" ]
                  else
                    Html.text ""
                ]
            , Html.div
                [ HA.classList [ ( "issue-info", True ), ( "anticipated", anticipated ) ]
                , HE.onClick (SelectIssueOrPR iop)
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
        [ Html.text name
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
