module Main exposing (..)

import IntDict
import Debug
import Time
import Graph exposing (Graph)
import AnimationFrame
import Svg exposing (Svg)
import Svg.Attributes as SA
import Html exposing (Html)
import Html.Attributes as HA
import Visualization.Force as VF
import ParseInt
import Regex exposing (Regex)
import Set exposing (Set)
import Task exposing (Task)
import Window
import Random
import GitHub


type alias Config =
    { githubToken : String
    , githubOrganization : String
    , windowSize : Window.Size
    }


type alias Model =
    { config : Config
    , error : Maybe String
    , repositories : List GitHub.Repo
    , members : Maybe (List GitHub.User)
    , issues : List GitHub.Issue
    , reposLoadingIssues : Set Int
    , themWaiting : Set Int
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
    | MembersFetched (List GitHub.User)
    | RepositoriesFetched (List GitHub.Repo)
    | IssuesFetched GitHub.Repo (List GitHub.Issue)
    | IssueTimelineFetched GitHub.Issue (List GitHub.TimelineEvent)
    | Error String


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , error = Nothing
      , repositories = []
      , members = Nothing
      , issues = []
      , reposLoadingIssues = Set.empty
      , themWaiting = Set.empty
      , graph = Graph.empty
      , simulation = VF.simulation []
      }
    , Cmd.batch
        [ fetchRepositories config
        , fetchMembers config
        ]
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


updateGraphWithList : Graph Entity () -> List Entity -> Graph Entity ()
updateGraphWithList =
    let
        graphUpdater value =
            Maybe.map (\ctx -> updateContextWithValue ctx value)
    in
        List.foldr (\node graph -> Graph.update node.id (graphUpdater node) graph)


updateContextWithValue : Graph.NodeContext Entity () -> Entity -> Graph.NodeContext Entity ()
updateContextWithValue nodeCtx value =
    let
        node =
            nodeCtx.node
    in
        { nodeCtx | node = { node | label = value } }


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
                ( { model | graph = updateGraphWithList model.graph list, simulation = newState }, Cmd.none )

        Resize size ->
            let
                newConfig =
                    model.config
            in
                ( { model | config = { newConfig | windowSize = size } }, Cmd.none )

        MembersFetched members ->
            ( { model | members = Just members }, Cmd.none )

        RepositoriesFetched repos ->
            ( { model
                | repositories = repos
                , reposLoadingIssues = Set.fromList (List.map .id repos)
              }
            , Cmd.batch <|
                List.map (fetchIssues model.config) repos
            )

        IssuesFetched repo issues ->
            let
                allIssues =
                    model.issues ++ issues

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

                -- List.foldl
                --     (\issue graph ->
                --         Graph.insert
                --             { node = Graph.Node issue.id (issueEntity (Debug.log "size" <| Graph.size graph) issue)
                --             , incoming = IntDict.empty
                --             , outgoing = IntDict.empty
                --             }
                --             graph
                --     )
                --     model.graph
                --     issues
                link { from, to } =
                    ( from, to )

                forces =
                    [ -- VF.center (screenWidth / 2) (screenHeight / 2)
                      VF.links <| List.map link <| Graph.edges graph
                      -- , VF.manyBodyStrength -5 <| List.map .id <| Graph.nodes graph
                    ]

                simulation =
                    VF.simulation forces

                reposLoadingIssues =
                    Set.remove repo.id model.reposLoadingIssues
            in
                ( { model
                    | issues = allIssues
                    , reposLoadingIssues = reposLoadingIssues
                    , graph = graph
                    , simulation = simulation
                  }
                , if Set.isEmpty reposLoadingIssues then
                    Cmd.batch <|
                        List.map (fetchIssueTimeline model.config) allIssues
                  else
                    Cmd.none
                )

        IssueTimelineFetched issue timeline ->
            let
                references =
                    List.filterMap
                        (\event ->
                            case event.source of
                                Just { type_, issueID } ->
                                    issueID

                                _ ->
                                    Nothing
                        )
                        timeline

                newGraph =
                    List.foldl
                        (\referencer graph ->
                            Graph.mapContexts
                                (\nc ->
                                    if nc.node.id == referencer then
                                        { nc | outgoing = IntDict.insert issue.id () nc.outgoing }
                                    else if nc.node.id == issue.id then
                                        { nc | incoming = IntDict.insert referencer () nc.incoming }
                                    else
                                        nc
                                )
                                graph
                        )
                        model.graph
                        references

                link { from, to } =
                    ( from, to )

                forces =
                    [ -- VF.center (screenWidth / 2) (screenHeight / 2)
                      VF.links <| List.map link <| Graph.edges newGraph
                    , VF.manyBody <| List.map .id <| Graph.nodes newGraph
                    ]

                newSimulation =
                    VF.simulation forces
            in
                ( { model | graph = newGraph, simulation = newSimulation }, Cmd.none )

        Error msg ->
            ( { model | error = Just msg }, Cmd.none )


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



-- lastActivityIsUs : Model -> List GitHub.TimelineEvent -> Bool
-- lastActivityIsUs model timeline =
--     case List.head (List.reverse timeline) of
--         Just event ->
--             isOrgMember model.members event.actor
--         Nothing ->
--             False


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
            [ SA.strokeWidth "2"
            , SA.stroke "#f00"
            , SA.x1 (toString source.x)
            , SA.y1 (toString source.y)
            , SA.x2 (toString target.x)
            , SA.y2 (toString target.y)
            ]
            []


issueNode : Graph.Node Entity -> Svg Msg
issueNode node =
    Svg.a [ SA.xlinkHref node.label.value.htmlURL ]
        [ Svg.circle
            [ SA.r "10"
            , SA.fill "#fff"
            , SA.stroke "#333"
            , SA.strokeWidth "3px"
            , SA.cx (toString node.label.x)
            , SA.cy (toString node.label.y)
            ]
            [ Svg.text (toString node.label.value.number)
            ]
        ]


theyAreWaiting : Model -> GitHub.Issue -> Bool
theyAreWaiting model issue =
    Set.member issue.id model.themWaiting


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


fetchRepositories : Config -> Cmd Msg
fetchRepositories config =
    Task.attempt (handleErr RepositoriesFetched) <|
        GitHub.fetchOrgRepos
            config.githubToken
            config.githubOrganization


fetchIssues : Config -> GitHub.Repo -> Cmd Msg
fetchIssues config repo =
    Task.attempt (handleErr <| IssuesFetched repo) <|
        GitHub.fetchRepoIssues
            config.githubToken
            repo


fetchIssueTimeline : Config -> GitHub.Issue -> Cmd Msg
fetchIssueTimeline config issue =
    Task.attempt (handleErr <| IssueTimelineFetched issue) <|
        GitHub.fetchIssueTimeline
            config.githubToken
            issue


fetchMembers : Config -> Cmd Msg
fetchMembers config =
    Task.attempt (handleErr MembersFetched) <|
        GitHub.fetchOrgMembers
            config.githubToken
            config.githubOrganization


handleErr : (a -> Msg) -> Result x a -> Msg
handleErr ok res =
    case res of
        Ok x ->
            ok x

        Err x ->
            Error (toString x)
