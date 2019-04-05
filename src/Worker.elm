port module Main exposing (main)

import Backend
import Card exposing (Card)
import Dict exposing (Dict)
import ForceGraph exposing (ForceGraph)
import GitHub
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


port setRepoCommits : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoLabels : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoMilestones : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoReleases : ( GitHub.ID, JD.Value ) -> Cmd msg


port setReferences : ( GitHub.ID, List GitHub.ID ) -> Cmd msg


port setActors : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setReviewers : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setCards : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setGraphs : JD.Value -> Cmd msg


port refresh : (( String, GitHub.ID ) -> msg) -> Sub msg


port refreshGraph : (( List GitHub.ID, List ( GitHub.ID, List GitHub.ID ) ) -> msg) -> Sub msg


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
    , projects : List GitHub.Project
    , commitPRs : Dict String GitHub.ID
    }


type Msg
    = Noop
    | Refresh
    | PopQueue
    | RetryQueue
    | RefreshRequested String GitHub.ID
    | GraphRefreshRequested (List GitHub.ID) (List ( GitHub.ID, List GitHub.ID ))
    | HookReceived String JD.Value
    | RepositoriesFetched (Result GitHub.Error (List GitHub.Repo))
    | RepositoryFetched (GitHub.Repo -> Msg) (Result GitHub.Error GitHub.Repo)
    | ProjectsFetched (List GitHub.Project -> Msg) (Result GitHub.Error (List GitHub.Project))
    | FetchCards (List GitHub.Project)
    | CardsFetched GitHub.ID (Result GitHub.Error (List GitHub.ProjectColumnCard))
    | IssuesPageFetched (GitHub.PagedSelector GitHub.RepoSelector) (Result GitHub.Error ( List GitHub.Issue, GitHub.PageInfo ))
    | IssueFetched (Result GitHub.Error GitHub.Issue)
    | PullRequestsPageFetched (GitHub.PagedSelector GitHub.RepoSelector) (Result GitHub.Error ( List GitHub.PullRequest, GitHub.PageInfo ))
    | RepoCommitsPageFetched GitHub.Repo (GitHub.PagedSelector GitHub.RefSelector) (List GitHub.Release) (List GitHub.Commit) (Result GitHub.Error ( List GitHub.Commit, GitHub.PageInfo ))
    | FetchRepoLabels GitHub.Repo
    | RepoLabelsFetched GitHub.Repo (Result GitHub.Error (List GitHub.Label))
    | FetchRepoMilestones GitHub.Repo
    | RepoMilestonesFetched GitHub.Repo (Result GitHub.Error (List GitHub.Milestone))
    | FetchRepoReleases GitHub.Repo
    | RepoReleasesFetched GitHub.Repo (Result GitHub.Error (List GitHub.Release))
    | PullRequestFetched (Result GitHub.Error GitHub.PullRequest)
    | IssueTimelineFetched GitHub.ID (Result GitHub.Error (List GitHub.TimelineEvent))
    | PullRequestTimelineAndReviewsFetched GitHub.ID (Result GitHub.Error ( List GitHub.TimelineEvent, List GitHub.PullRequestReview ))


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
                ( decodeAndFetchRepo FetchRepoLabels payload model, Cmd.none )

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
                ( decodeAndFetchRepo FetchRepoMilestones payload model, Cmd.none )

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
                ( decodeAndFetchRepo FetchRepoReleases payload model, Cmd.none )

        HookReceived "release" payload ->
            Log.debug "release hook received; refreshing repo" () <|
                ( decodeAndFetchRepo FetchRepoReleases payload model, Cmd.none )

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
                            sel =
                                { owner = repo.owner, name = repo.name }

                            psel =
                                { selector = sel
                                , after = Nothing
                                }
                        in
                        [ fetchIssuesPage model psel
                        , fetchPullRequestsPage model psel
                        , fetchRepoLabels model repo
                        , fetchRepoMilestones model repo
                        , fetchRepoReleases model repo
                        ]
                in
                ( { model | loadQueue = List.concatMap fetch activeRepos ++ model.loadQueue }
                , setRepos (List.map GitHub.encodeRepo activeRepos)
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
                ( next, Cmd.batch [ cmd, setRepo (GitHub.encodeRepo repo) ] )

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
                    , setProjects (List.map GitHub.encodeProject projects)
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
                , setCards ( colId, List.map GitHub.encodeProjectColumnCard cards )
                )

        CardsFetched colId (Err err) ->
            Log.debug "failed to fetch cards" ( colId, err ) <|
                backOff model (fetchCards model colId)

        IssuesPageFetched psel (Ok ( issues, pageInfo )) ->
            let
                fetchTimelines =
                    issues
                        |> List.filter (.state >> (==) GitHub.IssueStateOpen)
                        |> List.map (fetchIssueTimeline model << .id)

                fetchNext =
                    if pageInfo.hasNextPage then
                        fetchIssuesPage model { psel | after = pageInfo.endCursor }

                    else
                        Cmd.none
            in
            Log.debug "issues fetched for" psel <|
                ( { model | loadQueue = fetchNext :: model.loadQueue ++ fetchTimelines }
                , setIssues (List.map GitHub.encodeIssue issues)
                )

        IssuesPageFetched psel (Err err) ->
            Log.debug "failed to fetch issues" ( psel, err ) <|
                backOff model (fetchIssuesPage model psel)

        IssueFetched (Ok issue) ->
            Log.debug "issue fetched" issue.url <|
                ( { model | loadQueue = model.loadQueue ++ [ fetchIssueTimeline model issue.id ] }
                , setIssue (GitHub.encodeIssue issue)
                )

        IssueFetched (Err err) ->
            Log.debug "failed to fetch issue" err <|
                ( model, Cmd.none )

        PullRequestsPageFetched psel (Ok ( prs, pageInfo )) ->
            let
                openPRs =
                    List.filter (.state >> (==) GitHub.PullRequestStateOpen) prs

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
                , setPullRequests (List.map GitHub.encodePullRequest prs)
                )

        PullRequestsPageFetched psel (Err err) ->
            Log.debug "failed to fetch prs" ( psel, err ) <|
                backOff model (fetchPullRequestsPage model psel)

        FetchRepoLabels repo ->
            ( { model | loadQueue = fetchRepoLabels model repo :: model.loadQueue }, Cmd.none )

        RepoLabelsFetched repo (Err err) ->
            Log.debug "failed to fetch labels" ( repo.url, err ) <|
                backOff model (fetchRepoLabels model repo)

        RepoLabelsFetched repo (Ok labels) ->
            Log.debug "labels fetched for" repo.url <|
                ( model
                , setRepoLabels ( repo.id, JE.list GitHub.encodeLabel labels )
                )

        FetchRepoMilestones repo ->
            ( { model | loadQueue = fetchRepoMilestones model repo :: model.loadQueue }, Cmd.none )

        RepoMilestonesFetched repo (Err err) ->
            Log.debug "failed to fetch milestones" ( repo.url, err ) <|
                backOff model (fetchRepoMilestones model repo)

        RepoMilestonesFetched repo (Ok milestones) ->
            Log.debug "milestones fetched for" repo.url <|
                ( model
                , setRepoMilestones ( repo.id, JE.list GitHub.encodeMilestone milestones )
                )

        FetchRepoReleases repo ->
            ( { model | loadQueue = fetchRepoReleases model repo :: model.loadQueue }, Cmd.none )

        RepoReleasesFetched repo (Err err) ->
            Log.debug "failed to fetch releases" ( repo.url, err ) <|
                backOff model (fetchRepoReleases model repo)

        RepoReleasesFetched repo (Ok releases) ->
            Log.debug "releases fetched for" repo.url <|
                ( model
                , Cmd.batch
                    [ setRepoReleases ( repo.id, JE.list GitHub.encodeRelease releases )
                    , let
                        refSel =
                            { repo = { owner = repo.owner, name = repo.name }, qualifiedName = "refs/heads/master" }
                      in
                      fetchRepoCommits model repo { selector = refSel, after = Nothing } releases []
                    ]
                )

        RepoCommitsPageFetched repo psel releases commitsSoFar (Err err) ->
            Log.debug "failed to fetch commits" ( psel, err ) <|
                backOff model (fetchRepoCommits model repo psel releases commitsSoFar)

        RepoCommitsPageFetched repo psel releases commitsSoFar (Ok ( commits, pageInfo )) ->
            Log.debug "commits fetched for" psel <|
                ( model
                , let
                    isForCommit commit release =
                        case release.tag of
                            Nothing ->
                                False

                            Just t ->
                                t.target.oid == commit.sha

                    ( newCommitsSoFar, reachedRelease ) =
                        List.foldl
                            (\commit ( soFar, f ) ->
                                if f || List.any (isForCommit commit) releases then
                                    ( soFar, True )

                                else
                                    ( commit :: soFar, False )
                            )
                            ( commitsSoFar, False )
                            commits
                  in
                  if reachedRelease then
                    setRepoCommits ( repo.id, JE.list GitHub.encodeCommit newCommitsSoFar )

                  else
                    fetchRepoCommits model repo { psel | after = pageInfo.endCursor } releases newCommitsSoFar
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
                , setPullRequest (GitHub.encodePullRequest pr)
                )

        PullRequestFetched (Err err) ->
            Log.debug "failed to fetch pr" err <|
                ( model, Cmd.none )

        IssueTimelineFetched id (Ok timeline) ->
            let
                findSource event =
                    case event of
                        GitHub.CrossReferencedEvent eid ->
                            Just eid

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                actors =
                    timeline
                        |> List.filterMap eventActor
                        |> List.map Backend.encodeEventActor
                        |> List.reverse
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
                        GitHub.CrossReferencedEvent eid ->
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
                        |> List.reverse

                reviewers =
                    List.foldl
                        (\r ->
                            case r.state of
                                GitHub.PullRequestReviewStatePending ->
                                    Dict.insert r.author.id r

                                GitHub.PullRequestReviewStateCommented ->
                                    identity

                                GitHub.PullRequestReviewStateApproved ->
                                    Dict.insert r.author.id r

                                GitHub.PullRequestReviewStateChangesRequested ->
                                    Dict.insert r.author.id r

                                GitHub.PullRequestReviewStateDismissed ->
                                    Dict.remove r.author.id
                        )
                        Dict.empty
                        reviews
                        |> Dict.values
                        |> List.map GitHub.encodePullRequestReview
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
        GitHub.fetchOrgRepos model.githubToken { name = model.githubOrg }


fetchProjects : Model -> (List GitHub.Project -> Msg) -> Cmd Msg
fetchProjects model nextMsg =
    Task.attempt (ProjectsFetched nextMsg) <|
        GitHub.fetchOrgProjects model.githubToken { name = model.githubOrg }


fetchCards : Model -> GitHub.ID -> Cmd Msg
fetchCards model colId =
    Task.attempt (CardsFetched colId) <|
        GitHub.fetchProjectColumnCards model.githubToken { id = colId }


fetchIssuesPage : Model -> GitHub.PagedSelector GitHub.RepoSelector -> Cmd Msg
fetchIssuesPage model psel =
    GitHub.fetchRepoIssuesPage model.githubToken psel (IssuesPageFetched psel)


fetchRepoIssue : Model -> GitHub.IssueOrPRSelector -> Cmd Msg
fetchRepoIssue model sel =
    GitHub.fetchRepoIssue model.githubToken sel
        |> Task.attempt IssueFetched


fetchIssue : Model -> GitHub.ID -> Cmd Msg
fetchIssue model id =
    GitHub.fetchIssue model.githubToken id
        |> Task.attempt IssueFetched


fetchRepoIssueOrPR : Model -> GitHub.IssueOrPRSelector -> Cmd Msg
fetchRepoIssueOrPR model sel =
    Cmd.batch
        [ fetchRepoIssue model sel
        , fetchRepoPullRequest model sel
        ]


fetchPullRequestsPage : Model -> GitHub.PagedSelector GitHub.RepoSelector -> Cmd Msg
fetchPullRequestsPage model psel =
    GitHub.fetchRepoPullRequestsPage model.githubToken psel (PullRequestsPageFetched psel)


fetchRepoCommits : Model -> GitHub.Repo -> GitHub.PagedSelector GitHub.RefSelector -> List GitHub.Release -> List GitHub.Commit -> Cmd Msg
fetchRepoCommits model repo psel releases commitsSoFar =
    GitHub.fetchRepoCommitsPage model.githubToken psel (RepoCommitsPageFetched repo psel releases commitsSoFar)


fetchRepoLabels : Model -> GitHub.Repo -> Cmd Msg
fetchRepoLabels model repo =
    GitHub.fetchRepoLabels model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (RepoLabelsFetched repo)


fetchRepoMilestones : Model -> GitHub.Repo -> Cmd Msg
fetchRepoMilestones model repo =
    GitHub.fetchRepoMilestones model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (RepoMilestonesFetched repo)


fetchRepoReleases : Model -> GitHub.Repo -> Cmd Msg
fetchRepoReleases model repo =
    GitHub.fetchRepoReleases model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (RepoReleasesFetched repo)


fetchRepoPullRequest : Model -> GitHub.IssueOrPRSelector -> Cmd Msg
fetchRepoPullRequest model sel =
    GitHub.fetchRepoPullRequest model.githubToken sel
        |> Task.attempt PullRequestFetched


fetchPullRequest : Model -> GitHub.ID -> Cmd Msg
fetchPullRequest model id =
    GitHub.fetchPullRequest model.githubToken id
        |> Task.attempt PullRequestFetched


fetchRepo : Model -> (GitHub.Repo -> Msg) -> GitHub.RepoSelector -> Cmd Msg
fetchRepo model nextMsg sel =
    GitHub.fetchRepo model.githubToken sel
        |> Task.attempt (RepositoryFetched nextMsg)


decodeAndFetchRepo : (GitHub.Repo -> Msg) -> JD.Value -> Model -> Model
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


decodeAndFetchIssueOrPR : String -> JD.Value -> (Model -> GitHub.IssueOrPRSelector -> Cmd Msg) -> Model -> Model
decodeAndFetchIssueOrPR field payload fetch model =
    case JD.decodeValue (decodeIssueOrPRSelector field) payload of
        Ok sel ->
            { model | loadQueue = fetch model sel :: model.loadQueue }

        Err err ->
            Log.debug "failed to decode issue or PR" ( err, field, payload ) <|
                model


fetchIssueTimeline : Model -> GitHub.ID -> Cmd Msg
fetchIssueTimeline model id =
    if model.skipTimeline then
        Cmd.none

    else
        GitHub.fetchTimeline model.githubToken { id = id }
            |> Task.attempt (IssueTimelineFetched id)


fetchPRTimelineAndReviews : Model -> GitHub.ID -> Cmd Msg
fetchPRTimelineAndReviews model id =
    let
        fetchTimeline =
            if model.skipTimeline then
                Task.succeed []

            else
                GitHub.fetchTimeline model.githubToken { id = id }
    in
    fetchTimeline
        |> Task.andThen
            (\timeline ->
                GitHub.fetchPullRequestReviews model.githubToken { id = id }
                    |> Task.map (\b -> ( timeline, b ))
            )
        |> Task.attempt (PullRequestTimelineAndReviewsFetched id)


decodeRepoSelector : JD.Decoder GitHub.RepoSelector
decodeRepoSelector =
    JD.succeed GitHub.RepoSelector
        |> andMap (JD.at [ "repository", "owner", "login" ] JD.string)
        |> andMap (JD.at [ "repository", "name" ] JD.string)


decodeIssueOrPRSelector : String -> JD.Decoder GitHub.IssueOrPRSelector
decodeIssueOrPRSelector field =
    JD.succeed GitHub.IssueOrPRSelector
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


eventActor : GitHub.TimelineEvent -> Maybe Backend.EventActor
eventActor event =
    case event of
        GitHub.IssueCommentEvent muser date ->
            case muser of
                Just user ->
                    Just { user = Just user, avatar = user.avatar, createdAt = date }

                Nothing ->
                    Nothing

        GitHub.CommitEvent commit ->
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

        GitHub.PullRequestReviewEvent { author, createdAt } ->
            Just { avatar = author.avatar, user = Just author, createdAt = createdAt }

        GitHub.CrossReferencedEvent _ ->
            Nothing


maybeOr : Maybe a -> Maybe a -> Maybe a
maybeOr ma mb =
    case ma of
        Just _ ->
            ma

        Nothing ->
            mb


cardRadiusBase : Int -> Int -> Float
cardRadiusBase incomingCount outgoingCount =
    20
        + ((toFloat incomingCount / 2) + toFloat (outgoingCount * 2))


computeGraph : List GitHub.ID -> List ( GitHub.ID, List GitHub.ID ) -> List (ForceGraph GitHub.ID)
computeGraph cardIdStrs references =
    let
        bump n i =
            IntDict.update i (Just << (+) n << Maybe.withDefault 0)

        ( allEdges, incoming, outgoing ) =
            List.foldl
                (\( targetIdStr, sourceIdStrs ) ( es, i, o ) ->
                    let
                        targetId =
                            Hash.hash targetIdStr

                        sourceIds =
                            List.map Hash.hash sourceIdStrs
                    in
                    ( List.map (\sourceId -> ( sourceId, targetId )) sourceIds
                        ++ es
                    , bump (List.length sourceIds) targetId i
                    , List.foldl (bump 1) o sourceIds
                    )
                )
                ( [], IntDict.empty, IntDict.empty )
                references

        mass id =
            cardRadiusBase
                (Maybe.withDefault 0 (IntDict.get id incoming))
                (Maybe.withDefault 0 (IntDict.get id outgoing))

        ( allNodes, cardIds ) =
            List.foldl
                (\gId ( ns, is ) ->
                    let
                        id =
                            Hash.hash gId
                    in
                    ( IntDict.insert id { value = gId, mass = mass id } ns
                    , id :: is
                    )
                )
                ( IntDict.empty, [] )
                cardIdStrs

        ( connectedEdges, connectedNodes ) =
            List.foldl
                (\( from, to ) ( es, ns ) ->
                    if IntDict.member from allNodes && IntDict.member to allNodes then
                        ( ( from, to ) :: es, Set.insert from (Set.insert to ns) )

                    else
                        ( es, ns )
                )
                ( [], Set.empty )
                allEdges

        singletonGraph id n =
            ForceGraph.fromGraph (IntDict.singleton id n) []

        singletonGraphs =
            List.filterMap
                (\id ->
                    if not (Set.member id connectedNodes) then
                        Maybe.map (singletonGraph id) (IntDict.get id allNodes)

                    else
                        Nothing
                )
                cardIds

        subEdgeNodes =
            List.foldl (\( from, to ) set -> Set.insert from (Set.insert to set)) Set.empty

        graphFromEdges es =
            let
                nodes =
                    subEdgeNodes es

                subNodes =
                    IntDict.filter (\i _ -> Set.member i nodes) allNodes
            in
            ForceGraph.fromGraph subNodes es

        connectedGraphs =
            List.map graphFromEdges (subEdges connectedEdges)
    in
    connectedGraphs ++ singletonGraphs


subEdges : List ( comparable, comparable ) -> List (List ( comparable, comparable ))
subEdges =
    let
        edgesRelated ( from1, to1 ) =
            List.any (\( from2, to2 ) -> from1 == from2 || from1 == to2 || to1 == from2 || to1 == to2)

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
