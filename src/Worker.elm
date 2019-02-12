port module Main exposing (main)

import Backend
import Card exposing (Card)
import Dict exposing (Dict)
import ForceGraph exposing (ForceGraph)
import GitHubGraph
import Graph exposing (Graph)
import Hash
import IntDict exposing (IntDict)
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Log
import Platform
import Set
import Task
import Time


port setRepos : List JD.Value -> Cmd msg


port setRepo : JD.Value -> Cmd msg


port setProjects : List JD.Value -> Cmd msg


port setIssues : List JD.Value -> Cmd msg


port setIssue : JD.Value -> Cmd msg


port setPullRequests : List JD.Value -> Cmd msg


port setPullRequest : JD.Value -> Cmd msg


port setComparison : ( GitHubGraph.ID, JD.Value ) -> Cmd msg


port setReferences : ( GitHubGraph.ID, List GitHubGraph.ID ) -> Cmd msg


port setActors : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setReviewers : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setCards : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setGraphs : JD.Value -> Cmd msg


port refresh : (( String, GitHubGraph.ID ) -> msg) -> Sub msg


port refreshGraph : (( List GitHubGraph.ID, List ( GitHubGraph.ID, List GitHubGraph.ID ) ) -> msg) -> Sub msg


port hook : (( String, JD.Value ) -> msg) -> Sub msg


main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


type alias Flags =
    { githubToken : String
    , githubOrg : String
    , skipTimeline : Bool
    , noRefresh : Bool
    }


type alias Model =
    { githubToken : String
    , githubOrg : String
    , skipTimeline : Bool
    , noRefresh : Bool
    , loadQueue : List (Cmd Msg)
    , failedQueue : List (Cmd Msg)
    , projects : List GitHubGraph.Project
    , commitPRs : Dict String GitHubGraph.ID
    }


type Msg
    = Noop
    | Refresh
    | PopQueue
    | RetryQueue
    | RefreshRequested String GitHubGraph.ID
    | GraphRefreshRequested (List GitHubGraph.ID) (List ( GitHubGraph.ID, List GitHubGraph.ID ))
    | HookReceived String JD.Value
    | RepositoriesFetched (Result GitHubGraph.Error (List GitHubGraph.Repo))
    | RepositoryFetched (GitHubGraph.Repo -> Msg) (Result GitHubGraph.Error GitHubGraph.Repo)
    | ProjectsFetched (List GitHubGraph.Project -> Msg) (Result GitHubGraph.Error (List GitHubGraph.Project))
    | FetchCards (List GitHubGraph.Project)
    | CardsFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.ProjectColumnCard))
    | IssuesPageFetched (GitHubGraph.PagedSelector GitHubGraph.RepoSelector) (Result GitHubGraph.Error ( List GitHubGraph.Issue, GitHubGraph.PageInfo ))
    | IssueFetched (Result GitHubGraph.Error GitHubGraph.Issue)
    | PullRequestsPageFetched (GitHubGraph.PagedSelector GitHubGraph.RepoSelector) (Result GitHubGraph.Error ( List GitHubGraph.PullRequest, GitHubGraph.PageInfo ))
    | FetchComparison GitHubGraph.Repo
    | ComparisonFetched GitHubGraph.Repo (Result GitHubGraph.Error GitHubGraph.V3Comparison)
    | PullRequestFetched (Result GitHubGraph.Error GitHubGraph.PullRequest)
    | IssueTimelineFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.TimelineEvent))
    | PullRequestTimelineAndReviewsFetched GitHubGraph.ID (Result GitHubGraph.Error ( List GitHubGraph.TimelineEvent, List GitHubGraph.PullRequestReview ))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg, skipTimeline, noRefresh } =
    update Refresh
        { githubToken = githubToken
        , githubOrg = githubOrg
        , skipTimeline = skipTimeline
        , noRefresh = noRefresh
        , loadQueue = []
        , failedQueue = []
        , projects = []
        , commitPRs = Dict.empty
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every 500 (always PopQueue)
        , Time.every (60 * 1000) (always RetryQueue)
        , if model.noRefresh then
            Sub.none

          else
            Time.every (60 * 60 * 1000) (always Refresh)
        , refresh (\( a, b ) -> RefreshRequested a b)
        , refreshGraph (\( a, b ) -> GraphRefreshRequested a b)
        , hook (\( a, b ) -> HookReceived a b)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Refresh ->
            ( { model | loadQueue = fetchRepos model :: fetchProjects model FetchCards :: model.loadQueue }, Cmd.none )

        PopQueue ->
            case model.loadQueue of
                first :: rest ->
                    ( { model | loadQueue = rest }, first )

                _ ->
                    ( model, Cmd.none )

        RetryQueue ->
            if List.isEmpty model.failedQueue then
                ( model, Cmd.none )

            else
                Log.debug "retrying failed fetches" (List.length model.failedQueue) <|
                    ( { model
                        | failedQueue = []
                        , loadQueue = model.loadQueue ++ model.failedQueue
                      }
                    , Cmd.none
                    )

        GraphRefreshRequested cardIds references ->
            let
                graphs =
                    computeGraph cardIds references
            in
            Log.debug "computed graphs" (List.length graphs) <|
                ( model
                , setGraphs (JE.list (ForceGraph.encode JE.string) graphs)
                )

        RefreshRequested "columnCards" colId ->
            ( model, fetchCards model colId )

        RefreshRequested "repo" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model (always Noop) { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "issue" id ->
            ( model, fetchIssue model id )

        RefreshRequested "pr" id ->
            ( model, fetchPullRequest model id )

        RefreshRequested field id ->
            Log.debug "cannot refresh" ( field, id ) <|
                ( model, Cmd.none )

        HookReceived "label" payload ->
            Log.debug "label hook received; refreshing repo" () <|
                ( decodeAndFetchRepo (always Noop) payload model, Cmd.none )

        HookReceived "issues" payload ->
            Log.debug "issue hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchRepoIssue model, Cmd.none )

        HookReceived "issue_comment" payload ->
            Log.debug "issue_comment hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchRepoIssueOrPR model, Cmd.none )

        HookReceived "pull_request" payload ->
            Log.debug "pull_request hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "pull_request_review" payload ->
            Log.debug "pull_request_review hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "pull_request_review_comment" payload ->
            Log.debug "pull_request_review_comment hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "milestone" payload ->
            Log.debug "milestone hook received; refreshing repo" () <|
                ( decodeAndFetchRepo (always Noop) payload model, Cmd.none )

        HookReceived "project" payload ->
            Log.debug "project hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_column" payload ->
            Log.debug "project_column hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_card" payload ->
            Log.debug "project_card hook received; refreshing projects and cards" () <|
                case JD.decodeValue decodeAffectedColumnIds payload of
                    Err err ->
                        Log.debug "failed to decode column ids" err <|
                            ( model, Cmd.none )

                    Ok ids ->
                        let
                            affectedColumns =
                                List.filter ((\a -> List.member a ids) << .databaseId) <|
                                    List.concatMap .columns model.projects
                        in
                        ( { model | loadQueue = List.map (fetchCards model << .id) affectedColumns ++ model.loadQueue }
                        , Cmd.none
                        )

        HookReceived "push" payload ->
            Log.debug "push hook received; refreshing repo" () <|
                ( decodeAndFetchRepo FetchComparison payload model, Cmd.none )

        HookReceived "release" payload ->
            Log.debug "release hook received; refreshing repo" () <|
                ( decodeAndFetchRepo FetchComparison payload model, Cmd.none )

        HookReceived "repository" payload ->
            Log.debug "repository hook received; refreshing repo" () <|
                ( decodeAndFetchRepo (always Noop) payload model, Cmd.none )

        HookReceived "status" payload ->
            Log.debug "status hook received; refreshing associated pr" () <|
                ( decodeAndFetchPRForCommit payload model, Cmd.none )

        HookReceived event payload ->
            Log.debug "hook received" ( event, payload ) <|
                ( model, Cmd.none )

        RepositoriesFetched (Ok repos) ->
            Log.debug "repositories fetched" (List.map .name repos) <|
                let
                    activeRepos =
                        List.filter (not << .isArchived) repos

                    fetch repo =
                        let
                            psel =
                                { selector = { owner = repo.owner, name = repo.name }
                                , after = Nothing
                                }
                        in
                        [ fetchIssuesPage model psel
                        , fetchPullRequestsPage model psel
                        , fetchComparison model repo
                        ]
                in
                ( { model | loadQueue = List.concatMap fetch activeRepos ++ model.loadQueue }
                , setRepos (List.map GitHubGraph.encodeRepo activeRepos)
                )

        RepositoriesFetched (Err err) ->
            Log.debug "failed to fetch repos" err <|
                backOff model (fetchRepos model)

        RepositoryFetched nextMsg (Ok repo) ->
            Log.debug "repository fetched" repo.name <|
                let
                    ( next, cmd ) =
                        update (nextMsg repo) model
                in
                ( next, Cmd.batch [ cmd, setRepo (GitHubGraph.encodeRepo repo) ] )

        RepositoryFetched nextMsg (Err err) ->
            Log.debug "failed to fetch repo" err <|
                ( model, Cmd.none )

        ProjectsFetched nextMsg (Ok projects) ->
            Log.debug "projects fetched" (List.map .name projects) <|
                let
                    ( next, cmd ) =
                        update (nextMsg projects) { model | projects = projects }
                in
                ( next
                , Cmd.batch
                    [ cmd
                    , setProjects (List.map GitHubGraph.encodeProject projects)
                    ]
                )

        ProjectsFetched nextMsg (Err err) ->
            Log.debug "failed to fetch projects" err <|
                backOff model (fetchProjects model nextMsg)

        FetchCards projects ->
            ( { model | loadQueue = List.concatMap (List.map (fetchCards model << .id) << .columns) projects ++ model.loadQueue }, Cmd.none )

        CardsFetched colId (Ok cards) ->
            Log.debug "cards fetched for" colId <|
                ( model
                , setCards ( colId, List.map GitHubGraph.encodeProjectColumnCard cards )
                )

        CardsFetched colId (Err err) ->
            Log.debug "failed to fetch cards" ( colId, err ) <|
                backOff model (fetchCards model colId)

        IssuesPageFetched psel (Ok ( issues, pageInfo )) ->
            let
                fetchTimelines =
                    issues
                        |> List.filter (.state >> (==) GitHubGraph.IssueStateOpen)
                        |> List.map (fetchIssueTimeline model << .id)

                fetchNext =
                    if pageInfo.hasNextPage then
                        fetchIssuesPage model { psel | after = pageInfo.endCursor }

                    else
                        Cmd.none
            in
            Log.debug "issues fetched for" psel <|
                ( { model | loadQueue = fetchNext :: model.loadQueue ++ fetchTimelines }
                , setIssues (List.map GitHubGraph.encodeIssue issues)
                )

        IssuesPageFetched psel (Err err) ->
            Log.debug "failed to fetch issues" ( psel, err ) <|
                backOff model (fetchIssuesPage model psel)

        IssueFetched (Ok issue) ->
            Log.debug "issue fetched" issue.url <|
                ( { model | loadQueue = model.loadQueue ++ [ fetchIssueTimeline model issue.id ] }
                , setIssue (GitHubGraph.encodeIssue issue)
                )

        IssueFetched (Err err) ->
            Log.debug "failed to fetch issue" err <|
                ( model, Cmd.none )

        PullRequestsPageFetched psel (Ok ( prs, pageInfo )) ->
            let
                openPRs =
                    List.filter (.state >> (==) GitHubGraph.PullRequestStateOpen) prs

                fetchTimelines =
                    List.map (fetchPRTimelineAndReviews model << .id) openPRs

                commitPRs =
                    List.foldl
                        (\pr ->
                            case pr.lastCommit of
                                Just { sha } ->
                                    Dict.insert sha pr.id

                                Nothing ->
                                    identity
                        )
                        model.commitPRs
                        openPRs

                fetchNext =
                    if pageInfo.hasNextPage then
                        fetchPullRequestsPage model { psel | after = pageInfo.endCursor }

                    else
                        Cmd.none
            in
            Log.debug "prs fetched for" psel <|
                ( { model | commitPRs = commitPRs, loadQueue = fetchNext :: model.loadQueue ++ fetchTimelines }
                , setPullRequests (List.map GitHubGraph.encodePullRequest prs)
                )

        PullRequestsPageFetched psel (Err err) ->
            Log.debug "failed to fetch prs" ( psel, err ) <|
                backOff model (fetchPullRequestsPage model psel)

        FetchComparison repo ->
            ( { model | loadQueue = fetchComparison model repo :: model.loadQueue }, Cmd.none )

        ComparisonFetched repo (Err err) ->
            Log.debug "failed to fetch comparison" ( repo.url, err ) <|
                backOff model (fetchComparison model repo)

        ComparisonFetched repo (Ok comparison) ->
            Log.debug "comparison fetched for" repo.url <|
                ( model
                , setComparison ( repo.id, GitHubGraph.encodeV3Comparison comparison )
                )

        PullRequestFetched (Ok pr) ->
            Log.debug "pr fetched" pr.url <|
                ( { model
                    | commitPRs =
                        case pr.lastCommit of
                            Just { sha } ->
                                Dict.insert sha pr.id model.commitPRs

                            Nothing ->
                                model.commitPRs
                    , loadQueue = model.loadQueue ++ [ fetchPRTimelineAndReviews model pr.id ]
                  }
                , setPullRequest (GitHubGraph.encodePullRequest pr)
                )

        PullRequestFetched (Err err) ->
            Log.debug "failed to fetch pr" err <|
                ( model, Cmd.none )

        IssueTimelineFetched id (Ok timeline) ->
            let
                findSource event =
                    case event of
                        GitHubGraph.CrossReferencedEvent eid ->
                            Just eid

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                actors =
                    List.map Backend.encodeEventActor (List.filterMap eventActor timeline)
            in
            Log.debug "timeline fetched for" id <|
                ( model
                , Cmd.batch
                    [ setReferences ( id, edges )
                    , setActors ( id, actors )
                    ]
                )

        IssueTimelineFetched id (Err err) ->
            Log.debug "failed to fetch timeline" ( id, err ) <|
                backOff model (fetchIssueTimeline model id)

        PullRequestTimelineAndReviewsFetched id (Ok ( timeline, reviews )) ->
            let
                findSource event =
                    case event of
                        GitHubGraph.CrossReferencedEvent eid ->
                            Just eid

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                reviewActor review =
                    { user = Just review.author
                    , avatar = review.author.avatar
                    , createdAt = review.createdAt
                    }

                actors =
                    (List.filterMap eventActor timeline
                        ++ List.map reviewActor reviews
                    )
                        |> List.sortBy (Time.posixToMillis << .createdAt)
                        |> List.map Backend.encodeEventActor

                reviewers =
                    List.foldl
                        (\r ->
                            case r.state of
                                GitHubGraph.PullRequestReviewStatePending ->
                                    Dict.insert r.author.id r

                                GitHubGraph.PullRequestReviewStateCommented ->
                                    identity

                                GitHubGraph.PullRequestReviewStateApproved ->
                                    Dict.insert r.author.id r

                                GitHubGraph.PullRequestReviewStateChangesRequested ->
                                    Dict.insert r.author.id r

                                GitHubGraph.PullRequestReviewStateDismissed ->
                                    Dict.remove r.author.id
                        )
                        Dict.empty
                        reviews
                        |> Dict.values
                        |> List.map GitHubGraph.encodePullRequestReview
            in
            Log.debug "timeline and reviews fetched for" id <|
                ( model
                , Cmd.batch
                    [ setReferences ( id, edges )
                    , setActors ( id, actors )
                    , setReviewers ( id, reviewers )
                    ]
                )

        PullRequestTimelineAndReviewsFetched id (Err err) ->
            Log.debug "failed to fetch timeline and reviews" ( id, err ) <|
                backOff model (fetchPRTimelineAndReviews model id)


backOff : Model -> Cmd Msg -> ( Model, Cmd Msg )
backOff model cmd =
    ( { model
        | failedQueue = cmd :: model.loadQueue ++ model.failedQueue
        , loadQueue = []
      }
    , Cmd.none
    )


fetchRepos : Model -> Cmd Msg
fetchRepos model =
    Task.attempt RepositoriesFetched <|
        GitHubGraph.fetchOrgRepos model.githubToken { name = model.githubOrg }


fetchProjects : Model -> (List GitHubGraph.Project -> Msg) -> Cmd Msg
fetchProjects model nextMsg =
    Task.attempt (ProjectsFetched nextMsg) <|
        GitHubGraph.fetchOrgProjects model.githubToken { name = model.githubOrg }


fetchCards : Model -> GitHubGraph.ID -> Cmd Msg
fetchCards model colId =
    Task.attempt (CardsFetched colId) <|
        GitHubGraph.fetchProjectColumnCards model.githubToken { id = colId }


fetchIssuesPage : Model -> GitHubGraph.PagedSelector GitHubGraph.RepoSelector -> Cmd Msg
fetchIssuesPage model psel =
    GitHubGraph.fetchRepoIssuesPage model.githubToken psel (IssuesPageFetched psel)


fetchRepoIssue : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchRepoIssue model sel =
    GitHubGraph.fetchRepoIssue model.githubToken sel
        |> Task.attempt IssueFetched


fetchIssue : Model -> GitHubGraph.ID -> Cmd Msg
fetchIssue model id =
    GitHubGraph.fetchIssue model.githubToken id
        |> Task.attempt IssueFetched


fetchRepoIssueOrPR : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchRepoIssueOrPR model sel =
    Cmd.batch
        [ fetchRepoIssue model sel
        , fetchRepoPullRequest model sel
        ]


fetchPullRequestsPage : Model -> GitHubGraph.PagedSelector GitHubGraph.RepoSelector -> Cmd Msg
fetchPullRequestsPage model psel =
    GitHubGraph.fetchRepoPullRequestsPage model.githubToken psel (PullRequestsPageFetched psel)


fetchComparison : Model -> GitHubGraph.Repo -> Cmd Msg
fetchComparison model repo =
    let
        findTag releases =
            case releases of
                [] ->
                    -- just yield an empty comparison
                    "HEAD"

                release :: rest ->
                    case release.tag of
                        Just t ->
                            t.name

                        Nothing ->
                            findTag rest

        base =
            findTag repo.releases
    in
    GitHubGraph.compareRepoRefs model.githubToken { owner = repo.owner, name = repo.name } base "HEAD"
        |> Task.attempt (ComparisonFetched repo)


fetchRepoPullRequest : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchRepoPullRequest model sel =
    GitHubGraph.fetchRepoPullRequest model.githubToken sel
        |> Task.attempt PullRequestFetched


fetchPullRequest : Model -> GitHubGraph.ID -> Cmd Msg
fetchPullRequest model id =
    GitHubGraph.fetchPullRequest model.githubToken id
        |> Task.attempt PullRequestFetched


fetchRepo : Model -> (GitHubGraph.Repo -> Msg) -> GitHubGraph.RepoSelector -> Cmd Msg
fetchRepo model nextMsg sel =
    GitHubGraph.fetchRepo model.githubToken sel
        |> Task.attempt (RepositoryFetched nextMsg)


decodeAndFetchRepo : (GitHubGraph.Repo -> Msg) -> JD.Value -> Model -> Model
decodeAndFetchRepo nextMsg payload model =
    case JD.decodeValue decodeRepoSelector payload of
        Ok sel ->
            { model | loadQueue = fetchRepo model nextMsg sel :: model.loadQueue }

        Err err ->
            Log.debug "failed to decode repo" ( err, payload ) <|
                model


decodeAndFetchPRForCommit : JD.Value -> Model -> Model
decodeAndFetchPRForCommit payload model =
    case JD.decodeValue (JD.field "sha" JD.string) payload of
        Ok sha ->
            case Dict.get sha model.commitPRs of
                Just id ->
                    Log.debug "refreshing pr for commit" ( sha, id ) <|
                        { model | loadQueue = fetchPullRequest model id :: model.loadQueue }

                Nothing ->
                    Log.debug "no associated pr to refresh" sha <|
                        model

        Err err ->
            Log.debug "failed to decode sha" ( err, payload ) <|
                model


decodeAndFetchIssueOrPR : String -> JD.Value -> (Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg) -> Model -> Model
decodeAndFetchIssueOrPR field payload fetch model =
    case JD.decodeValue (decodeIssueOrPRSelector field) payload of
        Ok sel ->
            { model | loadQueue = fetch model sel :: model.loadQueue }

        Err err ->
            Log.debug "failed to decode issue or PR" ( err, field, payload ) <|
                model


fetchIssueTimeline : Model -> GitHubGraph.ID -> Cmd Msg
fetchIssueTimeline model id =
    if model.skipTimeline then
        Cmd.none

    else
        GitHubGraph.fetchTimeline model.githubToken { id = id }
            |> Task.attempt (IssueTimelineFetched id)


fetchPRTimelineAndReviews : Model -> GitHubGraph.ID -> Cmd Msg
fetchPRTimelineAndReviews model id =
    let
        fetchTimeline =
            if model.skipTimeline then
                Task.succeed []

            else
                GitHubGraph.fetchTimeline model.githubToken { id = id }
    in
    fetchTimeline
        |> Task.andThen
            (\timeline ->
                GitHubGraph.fetchPullRequestReviews model.githubToken { id = id }
                    |> Task.map (\b -> ( timeline, b ))
            )
        |> Task.attempt (PullRequestTimelineAndReviewsFetched id)


decodeRepoSelector : JD.Decoder GitHubGraph.RepoSelector
decodeRepoSelector =
    JD.succeed GitHubGraph.RepoSelector
        |> andMap (JD.at [ "repository", "owner", "login" ] JD.string)
        |> andMap (JD.at [ "repository", "name" ] JD.string)


decodeIssueOrPRSelector : String -> JD.Decoder GitHubGraph.IssueOrPRSelector
decodeIssueOrPRSelector field =
    JD.succeed GitHubGraph.IssueOrPRSelector
        |> andMap (JD.at [ "repository", "owner", "login" ] JD.string)
        |> andMap (JD.at [ "repository", "name" ] JD.string)
        |> andMap (JD.at [ field, "number" ] JD.int)


decodeAffectedColumnIds : JD.Decoder (List Int)
decodeAffectedColumnIds =
    JD.map2
        (\id from ->
            case from of
                Nothing ->
                    [ id ]

                Just fromId ->
                    [ id, fromId ]
        )
        (JD.at [ "project_card", "column_id" ] JD.int)
        (JD.maybe <| JD.at [ "changes", "column_id", "from" ] JD.int)


eventActor : GitHubGraph.TimelineEvent -> Maybe Backend.EventActor
eventActor event =
    case event of
        GitHubGraph.IssueCommentEvent muser date ->
            case muser of
                Just user ->
                    Just { user = Just user, avatar = user.avatar, createdAt = date }

                Nothing ->
                    Nothing

        GitHubGraph.CommitEvent commit ->
            case ( commit.author, commit.committer ) of
                ( Just author, Just committer ) ->
                    case author.user of
                        Just _ ->
                            Just { avatar = author.avatar, user = author.user, createdAt = commit.committedAt }

                        Nothing ->
                            Just { avatar = committer.avatar, user = committer.user, createdAt = commit.committedAt }

                ( Nothing, Just committer ) ->
                    Just { avatar = committer.avatar, user = committer.user, createdAt = commit.committedAt }

                ( Just author, Nothing ) ->
                    Just { avatar = author.avatar, user = author.user, createdAt = commit.committedAt }

                ( Nothing, Nothing ) ->
                    Nothing

        GitHubGraph.CrossReferencedEvent _ ->
            Nothing


maybeOr : Maybe a -> Maybe a -> Maybe a
maybeOr ma mb =
    case ma of
        Just _ ->
            ma

        Nothing ->
            mb


type alias NodeEdges =
    { incoming : IntDict ()
    , outgoing : IntDict ()
    }


cardRadiusBase : NodeEdges -> Float
cardRadiusBase { incoming, outgoing } =
    20
        + ((toFloat (IntDict.size incoming) / 2) + toFloat (IntDict.size outgoing * 2))


computeGraph : List GitHubGraph.ID -> List ( GitHubGraph.ID, List GitHubGraph.ID ) -> List (ForceGraph GitHubGraph.ID)
computeGraph cardIds references =
    let
        cardEdges =
            List.foldl
                (\( idStr, sourceIds ) refs ->
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
                references

        node cardId context =
            { value = cardId
            , size = cardRadiusBase context
            }

        cardNodeThunks =
            List.map (\cardId -> Graph.Node (Hash.hash cardId) (node cardId)) cardIds

        applyWithContext nc =
            { node = { id = nc.node.id, label = nc.node.label { incoming = nc.incoming, outgoing = nc.outgoing } }
            , incoming = nc.incoming
            , outgoing = nc.outgoing
            }

        graph =
            Graph.mapContexts applyWithContext <|
                Graph.fromNodesAndEdges
                    cardNodeThunks
                    cardEdges
    in
    subGraphs graph
        |> List.map ForceGraph.fromGraph


subGraphs : Graph n e -> List (Graph n e)
subGraphs graph =
    let
        singletonGraphs =
            Graph.fold
                (\nc ncs ->
                    if IntDict.isEmpty nc.incoming && IntDict.isEmpty nc.outgoing then
                        Graph.insert nc Graph.empty :: ncs

                    else
                        ncs
                )
                []
                graph

        subEdgeNodes =
            List.foldl (\edge set -> Set.insert edge.from (Set.insert edge.to set)) Set.empty

        connectedGraphs =
            graph
                |> Graph.edges
                |> subEdges
                |> List.map ((\a -> Graph.inducedSubgraph a graph) << Set.toList << subEdgeNodes)
    in
    connectedGraphs ++ singletonGraphs


subEdges : List (Graph.Edge e) -> List (List (Graph.Edge e))
subEdges =
    let
        edgesRelated edge =
            List.any (\{ from, to } -> from == edge.from || from == edge.to || to == edge.from || to == edge.to)

        go acc edges =
            case edges of
                [] ->
                    acc

                edge :: rest ->
                    let
                        ( connected, disconnected ) =
                            List.partition (edgesRelated edge) acc
                    in
                    case connected of
                        [] ->
                            go ([ edge ] :: acc) rest

                        _ ->
                            go ((edge :: List.concat connected) :: disconnected) rest
    in
    go []
