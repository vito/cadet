module StatefulGraph exposing (init, update, view)

import Activity
import ForceGraph exposing (ForceGraph)
import Card exposing (Card)
import Colors
import Dict exposing (Dict)
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Html.Keyed
import Html.Lazy
import Label
import Log
import Model exposing (Model, Msg(..))
import Octicons
import OrderedSet exposing (OrderedSet)
import Path
import Set exposing (Set)
import Shape
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Events as SE
import Svg.Keyed
import Svg.Lazy
import Time

init : Model -> Model
init model =
    let
        statefulGraphs =
            List.map (statefulGraph model) model.graphs

        filteredGraphs =
            List.filter (not << Set.isEmpty << .matches) statefulGraphs

        sortFunc a b =
            case model.graphSort of
                Model.ImpactSort ->
                    graphImpactCompare a.nodes b.nodes

                Model.AllActivitySort ->
                    graphAllActivityCompare model a.nodes b.nodes
    in
    { model
        | statefulGraphs =
            filteredGraphs
                |> List.sortWith sortFunc
                |> List.reverse
    }


update : Model -> Model
update model =
    let
        newState =
            { currentTime = model.currentTime
            , selectedCards = model.selectedCards
            , anticipatedCards = model.anticipatedCards
            , highlightedNode = model.highlightedNode
            , allLabels = model.allLabels
            , prReviewers = model.prReviewers
            }

        affectedByState =
            List.any
                (\{ card } ->
                    OrderedSet.member card.id newState.selectedCards
                        || Set.member card.id newState.anticipatedCards
                        || (newState.highlightedNode == Just card.id)
                )
    in
    { model
        | statefulGraphs =
            List.map
                (\sg ->
                    if affectedByState sg.nodes then
                        -- set new state for graph containing
                        -- selected/anticipated/highlighted cards
                        { sg | state = newState }

                    else if isBaseGraphState model sg.state then
                        -- preserve current state
                        sg

                    else
                        -- reset to initial state
                        { sg | state = baseGraphState model }
                )
                model.statefulGraphs
    }

view : Model -> Html Msg
view model =
    Html.div [ HA.class "spatial-graph" ]
        [ viewGraphControls model
        , model.statefulGraphs
            |> List.map (\graph -> ( graphId graph, Html.Lazy.lazy viewGraph graph ))
            |> Html.Keyed.node "div" [ HA.class "graphs" ]
        ]

isBaseGraphState : Model -> Model.CardNodeState -> Bool
isBaseGraphState model state =
    (state.currentTime == model.currentTime)
        && Set.isEmpty state.anticipatedCards
        && OrderedSet.isEmpty state.selectedCards
        && (state.highlightedNode == Nothing)

statefulGraph : Model -> ForceGraph GitHub.ID -> Model.StatefulGraph
statefulGraph model fg =
    let
        allFilters =
            case model.baseGraphFilter of
                Just f ->
                    f :: model.graphFilters

                Nothing ->
                    model.graphFilters

        ( nodes, matches ) =
            ForceGraph.fold
                (\node ( ns, ms ) ->
                    case Dict.get node.value model.cards of
                        Just card ->
                            let
                                satisfies =
                                    satisfiesFilters model allFilters card
                            in
                            ( { card = card
                              , x = node.x
                              , y = node.y
                              , mass = node.mass
                              , filteredOut = not satisfies
                              }
                                :: ns
                            , if satisfies then
                                Set.insert node.id ms

                              else
                                ms
                            )

                        Nothing ->
                            ( ns, ms )
                )
                ( [], Set.empty )
                fg

        edges =
            List.filterMap
                (\( from, to ) ->
                    case ( ForceGraph.get from fg, ForceGraph.get to fg ) of
                        ( Just fromNode, Just toNode ) ->
                            Just
                                { source =
                                    { x = fromNode.x
                                    , y = fromNode.y
                                    }
                                , target =
                                    { x = toNode.x
                                    , y = toNode.y
                                    }
                                , filteredOut =
                                    not (Set.member from matches && Set.member to matches)
                                }

                        _ ->
                            Nothing
                )
                fg.edges
    in
    { state = baseGraphState model
    , nodes = nodes
    , edges = edges
    , matches = matches
    }

baseGraphState : Model -> Model.CardNodeState
baseGraphState model =
    { allLabels = model.allLabels
    , prReviewers = model.prReviewers
    , currentTime = model.currentTime
    , selectedCards = OrderedSet.empty
    , anticipatedCards = Set.empty
    , highlightedNode = Nothing
    }

involvesUser : Model -> String -> Card -> Bool
involvesUser model login card =
    Maybe.withDefault [] (Dict.get card.id model.cardEvents)
        |> List.any (.user >> Maybe.map .login >> (==) (Just login))


satisfiesFilters : Model -> List Model.GraphFilter -> Card -> Bool
satisfiesFilters model filters card =
    List.all (\a -> satisfiesFilter model a card) filters


satisfiesFilter : Model -> Model.GraphFilter -> Card -> Bool
satisfiesFilter model filter card =
    case filter of
        Model.ExcludeAllFilter ->
            False

        Model.InProjectFilter id ->
            isInProject id card

        Model.HasLabelFilter label color ->
            hasLabelAndColor model label color card

        Model.InvolvesUserFilter login ->
            involvesUser model login card

        Model.PullRequestsFilter ->
            Card.isPR card

        Model.IssuesFilter ->
            not (Card.isPR card)

        Model.UntriagedFilter ->
            Card.isUntriaged card

hasLabelAndColor : Model -> String -> String -> Card -> Bool
hasLabelAndColor model name color card =
    let
        matchingLabels =
            model.allLabels
                |> Dict.filter (\_ l -> l.name == name && l.color == color)
    in
    List.any (\a -> Dict.member a matchingLabels) card.labels

isInProject : GitHub.ID -> Card -> Bool
isInProject id card =
    let
        matchesProject { project } =
            project.id == id
    in
    List.any matchesProject card.cards


graphImpactCompare : List Model.CardNode -> List Model.CardNode -> Order
graphImpactCompare a b =
    case compare (List.length a) (List.length b) of
        EQ ->
            let
                graphScore =
                    List.foldl
                        (\{ card } sum -> card.score + sum)
                        0
            in
            compare (graphScore a) (graphScore b)

        x ->
            x


graphAllActivityCompare : Model -> List Model.CardNode -> List Model.CardNode -> Order
graphAllActivityCompare model a b =
    let
        latestActivity =
            List.foldl
                (\{ card } latest ->
                    let
                        mlatest =
                            Dict.get card.id model.cardEvents
                                |> Maybe.andThen List.head
                                |> Maybe.map (.createdAt >> Time.posixToMillis)

                        updated =
                            Time.posixToMillis card.updatedAt
                    in
                    case mlatest of
                        Just activity ->
                            max activity latest

                        Nothing ->
                            max updated latest
                )
                0
    in
    compare (latestActivity a) (latestActivity b)






type alias NodeBounds =
    { x1 : Float
    , y1 : Float
    , x2 : Float
    , y2 : Float
    }


octiconOpts : Octicons.Options
octiconOpts =
    Octicons.defaultOptions



graphId : Model.StatefulGraph -> String
graphId graph =
    List.foldl (\{ card } acc -> max card.id acc) "" graph.nodes


viewGraph : Model.StatefulGraph -> Html Msg
viewGraph graph =
    let
        ( flairs, nodes, bounds ) =
            List.foldl (viewNodeLowerUpper graph.state) ( [], [], [] ) graph.nodes

        padding =
            10

        minX =
            List.foldl (\{ x1 } acc -> min x1 acc) 999999 bounds - padding

        minY =
            List.foldl (\{ y1 } acc -> min y1 acc) 999999 bounds - padding

        maxX =
            List.foldl (\{ x2 } acc -> max x2 acc) 0 bounds + padding

        maxY =
            List.foldl (\{ y2 } acc -> max y2 acc) 0 bounds + padding

        width =
            maxX - minX

        height =
            maxY - minY

        links =
            List.map linkPath graph.edges
    in
    Svg.svg
        [ SA.width (String.fromFloat width ++ "px")
        , SA.style "max-width: 95%"
        , SA.viewBox (String.fromFloat minX ++ " " ++ String.fromFloat minY ++ " " ++ String.fromFloat width ++ " " ++ String.fromFloat height)
        ]
        [ Svg.g [ SA.class "links" ] links
        , Svg.Keyed.node "g" [ SA.class "lower" ] flairs
        , Svg.Keyed.node "g" [ SA.class "upper" ] nodes
        ]


viewGraphControls : Model -> Html Msg
viewGraphControls model =
    let
        labelFilters =
            List.filterMap
                (\filter ->
                    case filter of
                        Model.HasLabelFilter name color ->
                            Just <|
                                Html.div
                                    ([ HA.class "control-setting"
                                     , HE.onClick (RemoveFilter filter)
                                     ]
                                        ++ Label.colorStyles model color
                                    )
                                    [ Octicons.tag octiconOpts
                                    , Html.text name
                                    ]

                        _ ->
                            Nothing
                )
                model.graphFilters

        allLabelFilters =
            (\a -> List.filterMap a (Dict.toList model.reposByLabel)) <|
                \( ( name, color ), _ ) ->
                    if String.contains model.labelSearch name then
                        Just <|
                            Html.div [ HA.class "label-filter" ]
                                [ Html.div
                                    ([ HA.class "label"
                                     , HE.onClick (AddFilter (Model.HasLabelFilter name color))
                                     ]
                                        ++ Label.colorStyles model color
                                    )
                                    [ Octicons.tag octiconOpts
                                    , Html.text name
                                    ]
                                ]

                    else
                        Nothing
    in
    Html.div [ HA.class "graph-controls" ]
        [ Html.div [ HA.class "control-group" ]
            ([ Html.span [ HA.class "controls-label" ] [ Html.text "filter:" ]
             , let
                filter =
                    Model.UntriagedFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.inbox octiconOpts
                , Html.text "untriaged"
                ]
             , let
                filter =
                    Model.IssuesFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.issueOpened octiconOpts
                , Html.text "issues"
                ]
             , let
                filter =
                    Model.PullRequestsFilter
               in
               Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                , HE.onClick <|
                    if hasFilter model filter then
                        RemoveFilter filter

                    else
                        AddFilter filter
                ]
                [ Octicons.gitPullRequest octiconOpts
                , Html.text "pull requests"
                ]
             , case model.me of
                Just { user } ->
                    let
                        filter =
                            Model.InvolvesUserFilter user.login
                    in
                    Html.div
                        [ HA.classList [ ( "control-setting", True ), ( "active", hasFilter model filter ) ]
                        , HE.onClick <|
                            if hasFilter model filter then
                                RemoveFilter filter

                            else
                                AddFilter filter
                        ]
                        [ Octicons.commentDiscussion octiconOpts
                        , Html.text "involving me"
                        ]

                Nothing ->
                    Html.text ""
             , Html.div [ HA.class "label-selection" ]
                [ Html.div [ HA.classList [ ( "label-filters", True ), ( "visible", model.showLabelFilters ) ] ]
                    [ Html.div [ HA.class "label-options" ]
                        allLabelFilters
                    , Html.input [ HA.type_ "text", HE.onInput SetLabelSearch ] []
                    ]
                , Html.div
                    [ HA.classList [ ( "control-setting", True ), ( "active", model.showLabelFilters ) ]
                    , HE.onClick ToggleLabelFilters
                    ]
                    [ Octicons.tag octiconOpts
                    , Html.text "label"
                    ]
                ]
             ]
                ++ labelFilters
            )
        , Html.div [ HA.class "control-group" ]
            [ Html.span [ HA.class "controls-label" ] [ Html.text "sort:" ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.graphSort == Model.ImpactSort ) ]
                , HE.onClick (SetGraphSort Model.ImpactSort)
                ]
                [ Octicons.flame octiconOpts
                , Html.text "impact"
                ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.graphSort == Model.AllActivitySort ) ]
                , HE.onClick (SetGraphSort Model.AllActivitySort)
                ]
                [ Octicons.clock octiconOpts
                , Html.text "all activity"
                ]
            ]
        ]


hasFilter : Model -> Model.GraphFilter -> Bool
hasFilter model filter =
    List.member filter model.graphFilters


viewNodeLowerUpper :
    Model.CardNodeState
    -> Model.CardNode
    -> ( List ( String, Svg Msg ), List ( String, Svg Msg ), List NodeBounds )
    -> ( List ( String, Svg Msg ), List ( String, Svg Msg ), List NodeBounds )
viewNodeLowerUpper state node ( fs, ns, bs ) =
    let
        radiiWithFlair =
            cardRadiusWithFlair node.card node.mass

        bounds =
            { x1 = node.x - radiiWithFlair
            , y1 = node.y - radiiWithFlair
            , x2 = node.x + radiiWithFlair
            , y2 = node.y + radiiWithFlair
            }

        isHighlighted =
            Set.member node.card.id state.anticipatedCards
                || (state.highlightedNode == Just node.card.id)

        isSelected =
            OrderedSet.member node.card.id state.selectedCards
    in
    ( ( node.card.id, Svg.Lazy.lazy4 viewCardFlair node state.currentTime isHighlighted state.prReviewers ) :: fs
    , ( node.card.id, Svg.Lazy.lazy4 viewCardCircle node state.allLabels isHighlighted isSelected ) :: ns
    , bounds :: bs
    )


viewCardFlair : Model.CardNode -> Time.Posix -> Bool -> Dict GitHub.ID (List GitHub.PullRequestReview) -> Svg Msg
viewCardFlair node currentTime isHighlighted prReviewers =
    let
        flairArcs =
            reactionFlairArcs (Maybe.withDefault [] <| Dict.get node.card.id prReviewers) node.card node.mass

        radii =
            { base = node.mass
            , withoutFlair = node.mass
            , withFlair = cardRadiusWithFlair node.card node.mass
            }

        scale =
            if isHighlighted then
                "1.1"

            else if node.filteredOut then
                "0.5"

            else
                "1"

        anticipateRadius =
            if List.isEmpty node.card.labels then
                radii.base + 5

            else
                radii.withoutFlair + 5

        anticipatedHalo =
            if isHighlighted then
                Svg.circle
                    [ SA.r (String.fromFloat anticipateRadius)
                    , SA.class "anticipated-circle"
                    ]
                    []

            else
                Svg.text ""

        classes =
            [ "flair"
            , Activity.class currentTime node.card.updatedAt
            , if node.filteredOut then
                "filtered-out"

              else
                "filtered-in"
            ]
    in
    Svg.g
        [ SA.transform ("translate(" ++ String.fromFloat node.x ++ "," ++ String.fromFloat node.y ++ ") scale(" ++ scale ++ ")")
        , SA.class (String.join " " classes)
        ]
        (flairArcs ++ [ anticipatedHalo ])


viewCardCircle : Model.CardNode -> Dict GitHub.ID GitHub.Label -> Bool -> Bool -> Svg Msg
viewCardCircle node labels isHighlighted isSelected =
    let
        labelArcs =
            cardLabelArcs labels node.card node.mass

        radii =
            { base = node.mass
            , withoutFlair = node.mass
            , withFlair = cardRadiusWithFlair node.card node.mass
            }

        circle =
            Svg.g []
                [ Svg.circle
                    [ SA.r (String.fromFloat radii.base)
                    , SA.fill "#fff"
                    ]
                    []
                , Svg.text_
                    [ SA.textAnchor "middle"
                    , SA.alignmentBaseline "middle"
                    , SA.class "issue-number"
                    ]
                    [ Svg.text ("#" ++ String.fromInt node.card.number)
                    ]
                ]

        card =
            node.card

        scale =
            if isHighlighted then
                "1.1"

            else if node.filteredOut then
                "0.5"

            else
                "1"
    in
    Svg.g
        [ SA.transform ("translate(" ++ String.fromFloat node.x ++ "," ++ String.fromFloat node.y ++ ") scale(" ++ scale ++ ")")
        , if Card.isInFlight card then
            SA.class "in-flight"

          else if Card.isDone card then
            SA.class "done"

          else if Card.isIcebox card then
            SA.class "icebox"

          else if Card.isBacklog card then
            SA.class "backlog"

          else
            SA.class "untriaged"
        , if node.filteredOut then
            SA.class "filtered-out"

          else
            SA.class "filtered-in"
        , SE.onMouseOver (AnticipateCardFromNode card.id)
        , SE.onMouseOut (UnanticipateCardFromNode card.id)
        , SE.onClick
            (if isSelected then
                DeselectCard card.id

             else
                SelectCard card.id
            )
        ]
        (circle :: labelArcs)


linkPath : Model.CardEdge -> Svg Msg
linkPath { source, target, filteredOut } =
    Svg.line
        [ SA.class "graph-edge"
        , if filteredOut then
            SA.class "filtered-out"

          else
            SA.class "filtered-in"
        , SA.x1 (String.fromFloat source.x)
        , SA.y1 (String.fromFloat source.y)
        , SA.x2 (String.fromFloat target.x)
        , SA.y2 (String.fromFloat target.y)
        ]
        []


flairRadiusBase : Float
flairRadiusBase =
    20


cardRadiusWithFlair : Card -> Float -> Float
cardRadiusWithFlair card mass =
    let
        reactionCounts =
            List.map .count card.reactions

        highestFlair =
            List.foldl (\num acc -> max num acc) 0 (card.commentCount :: reactionCounts)
    in
    mass + flairRadiusBase + toFloat highestFlair


reactionFlairArcs : List GitHub.PullRequestReview -> Card -> Float -> List (Svg Msg)
reactionFlairArcs reviews card radius =
    let
        reactionTypeEmoji type_ =
            case type_ of
                GitHub.ReactionTypeThumbsUp ->
                    "👍"

                GitHub.ReactionTypeThumbsDown ->
                    "👎"

                GitHub.ReactionTypeLaugh ->
                    "😄"

                GitHub.ReactionTypeConfused ->
                    "😕"

                GitHub.ReactionTypeHeart ->
                    "💖"

                GitHub.ReactionTypeHooray ->
                    "🎉"

                GitHub.ReactionTypeRocket ->
                    "🚀"

                GitHub.ReactionTypeEyes ->
                    "👀"

        emojiReactions =
            (\a -> List.map a card.reactions) <|
                \{ type_, count } ->
                    ( Html.text (reactionTypeEmoji type_), "reaction", count )

        prSegments =
            case card.content of
                GitHub.IssueCardContent _ ->
                    []

                GitHub.PullRequestCardContent pr ->
                    let
                        statusChecks =
                            case Maybe.map .status pr.lastCommit of
                                Just (Just { contexts }) ->
                                    (\a -> List.map a contexts) <|
                                        \c ->
                                            ( Html.span [ HA.class "status-icon" ]
                                                [ case c.state of
                                                    GitHub.StatusStatePending ->
                                                        Octicons.primitiveDot { octiconOpts | color = Colors.yellow }

                                                    GitHub.StatusStateSuccess ->
                                                        Octicons.check { octiconOpts | color = Colors.green }

                                                    GitHub.StatusStateFailure ->
                                                        Octicons.x { octiconOpts | color = Colors.red }

                                                    GitHub.StatusStateExpected ->
                                                        Octicons.question { octiconOpts | color = Colors.purple }

                                                    GitHub.StatusStateError ->
                                                        Octicons.alert { octiconOpts | color = Colors.orange }
                                                ]
                                            , case c.state of
                                                GitHub.StatusStatePending ->
                                                    "pending"

                                                GitHub.StatusStateSuccess ->
                                                    "success"

                                                GitHub.StatusStateFailure ->
                                                    "failure"

                                                GitHub.StatusStateExpected ->
                                                    "expected"

                                                GitHub.StatusStateError ->
                                                    "error"
                                            , 0
                                            )

                                _ ->
                                    []

                        reviewStates =
                            List.map
                                (\r ->
                                    ( Html.img [ HA.class "status-actor", HA.src r.author.avatar ] []
                                    , case r.state of
                                        GitHub.PullRequestReviewStatePending ->
                                            "pending"

                                        GitHub.PullRequestReviewStateApproved ->
                                            "success"

                                        GitHub.PullRequestReviewStateChangesRequested ->
                                            "failure"

                                        GitHub.PullRequestReviewStateCommented ->
                                            "commented"

                                        GitHub.PullRequestReviewStateDismissed ->
                                            "dismissed"
                                    , 0
                                    )
                                )
                                reviews
                    in
                    ( Html.span [ HA.class "status-icon" ] [ Octicons.gitMerge octiconOpts ]
                    , case pr.mergeable of
                        GitHub.MergeableStateMergeable ->
                            "success"

                        GitHub.MergeableStateConflicting ->
                            "failure"

                        GitHub.MergeableStateUnknown ->
                            "pending"
                    , 0
                    )
                        :: (statusChecks ++ reviewStates)

        flairs =
            prSegments
                ++ (List.filter (\( _, _, count ) -> count > 0) <|
                        (( Octicons.comment octiconOpts, "comments", card.commentCount ) :: emojiReactions)
                   )

        segments =
            Shape.pie
                { startAngle = 0
                , endAngle = 2 * pi
                , padAngle = 0.03
                , sortingFn = Basics.compare
                , valueFn = identity
                , innerRadius = radius
                , outerRadius = radius + flairRadiusBase
                , cornerRadius = 3
                , padRadius = 0
                }
                (List.repeat (List.length flairs) 1)

        reactionSegment i ( _, _, _ ) =
            case List.take 1 (List.drop i segments) of
                [ s ] ->
                    s

                _ ->
                    Log.debug "impossible: empty segments"
                        ( i, segments )
                        emptyArc
    in
    (\a -> List.indexedMap a flairs) <|
        \i (( content, class, count ) as reaction) ->
            let
                segmentArc =
                    reactionSegment i reaction

                arc =
                    { segmentArc | outerRadius = segmentArc.outerRadius + toFloat count }

                ( centroidX, centroidY ) =
                    let
                        r =
                            arc.innerRadius + 12

                        a =
                            (arc.startAngle + arc.endAngle) / 2 - pi / 2
                    in
                    ( cos a * r - 8, sin a * r - 8 )
            in
            Svg.g [ SA.class "reveal" ]
                [ Path.element (Shape.arc arc)
                    [ SA.class ("flair-arc " ++ class)
                    ]
                , Svg.foreignObject
                    [ SA.transform ("translate(" ++ String.fromFloat centroidX ++ "," ++ String.fromFloat centroidY ++ ")")
                    , SA.class "hidden"
                    ]
                    [ content
                    ]
                ]


cardLabelArcs : Dict GitHub.ID GitHub.Label -> Card -> Float -> List (Svg Msg)
cardLabelArcs allLabels card radius =
    let
        labelSegments =
            Shape.pie
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
                (List.repeat (List.length card.labels) 1)
    in
    List.map2
        (\arc label ->
            Path.element (Shape.arc arc)
                [ SA.fill ("#" ++ label.color)
                , SA.class "label-arc"
                ]
        )
        labelSegments
        (List.filterMap (\a -> Dict.get a allLabels) card.labels)


emptyArc : Shape.Arc
emptyArc =
    { startAngle = 0
    , endAngle = 0
    , padAngle = 0
    , innerRadius = 0
    , outerRadius = 0
    , cornerRadius = 0
    , padRadius = 0
    }
