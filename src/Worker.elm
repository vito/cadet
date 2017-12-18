port module Main exposing (..)

import Date
import Dict exposing (Dict)
import Platform
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Time exposing (Time)
import Task
import GitHubGraph
import Backend


port setRepos : List JD.Value -> Cmd msg


port setRepo : JD.Value -> Cmd msg


port setProjects : List JD.Value -> Cmd msg


port setIssues : List JD.Value -> Cmd msg


port setIssue : JD.Value -> Cmd msg


port setPullRequests : List JD.Value -> Cmd msg


port setPullRequest : JD.Value -> Cmd msg


port setReferences : ( GitHubGraph.ID, List GitHubGraph.ID ) -> Cmd msg


port setActors : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setReviewers : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setCards : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port refresh : (( String, GitHubGraph.ID ) -> msg) -> Sub msg


port hook : (( String, JD.Value ) -> msg) -> Sub msg


main : Program Flags Model Msg
main =
    Platform.programWithFlags
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
    | Refresh Time
    | PopQueue Time
    | RetryQueue Time
    | RefreshRequested String GitHubGraph.ID
    | HookReceived String JD.Value
    | RepositoriesFetched (Result GitHubGraph.Error (List GitHubGraph.Repo))
    | RepositoryFetched (Result GitHubGraph.Error GitHubGraph.Repo)
    | ProjectsFetched (List GitHubGraph.Project -> Msg) (Result GitHubGraph.Error (List GitHubGraph.Project))
    | FetchCards (List GitHubGraph.Project)
    | CardsFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.ProjectColumnCard))
    | IssuesFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.Issue))
    | IssueFetched (Result GitHubGraph.Error GitHubGraph.Issue)
    | PullRequestsFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.PullRequest))
    | PullRequestFetched (Result GitHubGraph.Error GitHubGraph.PullRequest)
    | IssueTimelineFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.TimelineEvent))
    | PullRequestTimelineAndReviewsFetched GitHubGraph.ID (Result GitHubGraph.Error ( List GitHubGraph.TimelineEvent, List GitHubGraph.PullRequestReview ))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg, skipTimeline, noRefresh } =
    update (Refresh 0)
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
        [ Time.every (100 * Time.millisecond) PopQueue
        , Time.every Time.minute RetryQueue
        , if model.noRefresh then
            Sub.none
          else
            Time.every Time.hour Refresh
        , refresh (uncurry RefreshRequested)
        , hook (uncurry HookReceived)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Refresh now ->
            log "refreshing" now <|
                ( { model | loadQueue = fetchRepos model :: fetchProjects model FetchCards :: model.loadQueue }, Cmd.none )

        PopQueue _ ->
            case model.loadQueue of
                first :: rest ->
                    ( { model | loadQueue = rest }, first )

                _ ->
                    ( model, Cmd.none )

        RetryQueue now ->
            if List.isEmpty model.failedQueue then
                ( model, Cmd.none )
            else
                log "retrying failed fetches" (List.length model.failedQueue) <|
                    ( { model
                        | failedQueue = []
                        , loadQueue = model.failedQueue ++ model.loadQueue
                      }
                    , Cmd.none
                    )

        RefreshRequested "columnCards" colId ->
            ( model, fetchCards model colId )

        RefreshRequested "repo" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "issue" id ->
            ( model, fetchIssue model id )

        RefreshRequested "pr" id ->
            ( model, fetchPullRequest model id )

        RefreshRequested field id ->
            log "cannot refresh" ( field, id ) <|
                ( model, Cmd.none )

        HookReceived "label" payload ->
            log "label hook received; refreshing repo" () <|
                ( decodeAndFetchRepo payload model, Cmd.none )

        HookReceived "issues" payload ->
            log "issue hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchRepoIssue model, Cmd.none )

        HookReceived "issue_comment" payload ->
            log "issue_comment hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchRepoIssueOrPR model, Cmd.none )

        HookReceived "pull_request" payload ->
            log "pull_request hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "pull_request_review" payload ->
            log "pull_request_review hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "pull_request_review_comment" payload ->
            log "pull_request_review_comment hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchRepoPullRequest model, Cmd.none )

        HookReceived "milestone" payload ->
            log "milestone hook received; refreshing repo" () <|
                ( decodeAndFetchRepo payload model, Cmd.none )

        HookReceived "project" payload ->
            log "project hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_column" payload ->
            log "project_column hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_card" payload ->
            log "project_card hook received; refreshing projects and cards" () <|
                case JD.decodeValue decodeAffectedColumnIds payload of
                    Err err ->
                        log "failed to decode column ids" err <|
                            ( model, Cmd.none )

                    Ok ids ->
                        let
                            affectedColumns =
                                List.filter (flip List.member ids << .databaseId) <|
                                    List.concatMap .columns model.projects
                        in
                            ( { model | loadQueue = List.map (fetchCards model << .id) affectedColumns ++ model.loadQueue }
                            , Cmd.none
                            )

        HookReceived "repository" payload ->
            log "repository hook received; refreshing repo" () <|
                ( decodeAndFetchRepo payload model, Cmd.none )

        HookReceived "status" payload ->
            log "status hook received; refreshing associated pr" () <|
                ( decodeAndFetchPRForCommit payload model, Cmd.none )

        HookReceived event payload ->
            log "hook received" ( event, payload ) <|
                ( model, Cmd.none )

        RepositoriesFetched (Ok repos) ->
            log "repositories fetched" (List.map .name repos) <|
                let
                    fetch repo =
                        [ fetchIssues model repo
                        , fetchPullRequests model repo
                        ]
                in
                    ( { model | loadQueue = List.concatMap fetch repos ++ model.loadQueue }
                    , setRepos (List.map GitHubGraph.encodeRepo repos)
                    )

        RepositoriesFetched (Err err) ->
            log "failed to fetch repos" err <|
                backOff model (fetchRepos model)

        RepositoryFetched (Ok repo) ->
            log "repository fetched" repo.name <|
                ( model, setRepo (GitHubGraph.encodeRepo repo) )

        RepositoryFetched (Err err) ->
            log "failed to fetch repos" err <|
                ( model, Cmd.none )

        ProjectsFetched nextMsg (Ok projects) ->
            log "projects fetched" (List.map .name projects) <|
                let
                    ( next, cmd ) =
                        update (nextMsg projects) { model | projects = projects }
                in
                    ( next
                    , Cmd.batch
                        [ setProjects (List.map GitHubGraph.encodeProject projects)
                        ]
                    )

        ProjectsFetched nextMsg (Err err) ->
            log "failed to fetch projects" err <|
                backOff model (fetchProjects model nextMsg)

        FetchCards projects ->
            ( { model | loadQueue = List.concatMap (List.map (fetchCards model << .id) << .columns) projects ++ model.loadQueue }, Cmd.none )

        CardsFetched colId (Ok cards) ->
            log "cards fetched for" colId <|
                ( model
                , setCards ( colId, List.map GitHubGraph.encodeProjectColumnCard cards )
                )

        CardsFetched colId (Err err) ->
            log "failed to fetch cards" ( colId, err ) <|
                backOff model (fetchCards model colId)

        IssuesFetched repo (Ok issues) ->
            let
                fetchTimelines =
                    issues
                        |> List.filter (.state >> (==) GitHubGraph.IssueStateOpen)
                        |> List.map (fetchIssueTimeline model << .id)
            in
                log "issues fetched for" repo.url <|
                    ( { model | loadQueue = model.loadQueue ++ fetchTimelines }
                    , setIssues (List.map GitHubGraph.encodeIssue issues)
                    )

        IssuesFetched repo (Err err) ->
            log "failed to fetch issues" ( repo.url, err ) <|
                backOff model (fetchIssues model repo)

        IssueFetched (Ok issue) ->
            log "issue fetched" issue.url <|
                ( { model | loadQueue = fetchIssueTimeline model issue.id :: model.loadQueue }
                , setIssue (GitHubGraph.encodeIssue issue)
                )

        IssueFetched (Err err) ->
            log "failed to fetch issue" (err) <|
                ( model, Cmd.none )

        PullRequestsFetched repo (Ok prs) ->
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
            in
                log "prs fetched for" repo.url <|
                    ( { model | commitPRs = commitPRs, loadQueue = model.loadQueue ++ fetchTimelines }
                    , setPullRequests (List.map GitHubGraph.encodePullRequest prs)
                    )

        PullRequestsFetched repo (Err err) ->
            log "failed to fetch prs" ( repo.url, err ) <|
                backOff model (fetchPullRequests model repo)

        PullRequestFetched (Ok pr) ->
            log "pr fetched" pr.url <|
                ( { model
                    | commitPRs =
                        case pr.lastCommit of
                            Just { sha } ->
                                Dict.insert sha pr.id model.commitPRs

                            Nothing ->
                                model.commitPRs
                    , loadQueue = fetchPRTimelineAndReviews model pr.id :: model.loadQueue
                  }
                , setPullRequest (GitHubGraph.encodePullRequest pr)
                )

        PullRequestFetched (Err err) ->
            log "failed to fetch pr" (err) <|
                ( model, Cmd.none )

        IssueTimelineFetched id (Ok timeline) ->
            let
                findSource event =
                    case event of
                        GitHubGraph.CrossReferencedEvent id ->
                            Just id

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                actors =
                    List.map Backend.encodeEventActor (List.filterMap eventActor timeline)
            in
                log "timeline fetched for" id <|
                    ( model
                    , Cmd.batch
                        [ setReferences ( id, edges )
                        , setActors ( id, actors )
                        ]
                    )

        IssueTimelineFetched id (Err err) ->
            log "failed to fetch timeline" ( id, err ) <|
                backOff model (fetchIssueTimeline model id)

        PullRequestTimelineAndReviewsFetched id (Ok ( timeline, reviews )) ->
            let
                findSource event =
                    case event of
                        GitHubGraph.CrossReferencedEvent id ->
                            Just id

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
                        |> List.sortBy (.createdAt >> Date.toTime)
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
                log "timeline and reviews fetched for" id <|
                    ( model
                    , Cmd.batch
                        [ setReferences ( id, edges )
                        , setActors ( id, actors )
                        , setReviewers ( id, reviewers )
                        ]
                    )

        PullRequestTimelineAndReviewsFetched id (Err err) ->
            log "failed to fetch timeline and reviews" ( id, err ) <|
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


fetchIssues : Model -> GitHubGraph.Repo -> Cmd Msg
fetchIssues model repo =
    GitHubGraph.fetchRepoIssues model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (IssuesFetched repo)


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


fetchPullRequests : Model -> GitHubGraph.Repo -> Cmd Msg
fetchPullRequests model repo =
    GitHubGraph.fetchRepoPullRequests model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (PullRequestsFetched repo)


fetchRepoPullRequest : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchRepoPullRequest model sel =
    GitHubGraph.fetchRepoPullRequest model.githubToken sel
        |> Task.attempt PullRequestFetched


fetchPullRequest : Model -> GitHubGraph.ID -> Cmd Msg
fetchPullRequest model id =
    GitHubGraph.fetchPullRequest model.githubToken id
        |> Task.attempt PullRequestFetched


fetchRepo : Model -> GitHubGraph.RepoSelector -> Cmd Msg
fetchRepo model sel =
    GitHubGraph.fetchRepo model.githubToken sel
        |> Task.attempt RepositoryFetched


decodeAndFetchRepo : JD.Value -> Model -> Model
decodeAndFetchRepo payload model =
    case JD.decodeValue decodeRepoSelector payload of
        Ok sel ->
            { model | loadQueue = fetchRepo model sel :: model.loadQueue }

        Err err ->
            log "failed to decode repo" ( err, payload ) <|
                model


decodeAndFetchPRForCommit : JD.Value -> Model -> Model
decodeAndFetchPRForCommit payload model =
    case JD.decodeValue (JD.field "sha" JD.string) payload of
        Ok sha ->
            case Dict.get sha model.commitPRs of
                Just id ->
                    log "refreshing pr for commit" ( sha, id ) <|
                        { model | loadQueue = fetchPullRequest model id :: model.loadQueue }

                Nothing ->
                    log "no associated pr to refresh" sha <|
                        model

        Err err ->
            log "failed to decode sha" ( err, payload ) <|
                model


decodeAndFetchIssueOrPR : String -> JD.Value -> (Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg) -> Model -> Model
decodeAndFetchIssueOrPR field payload fetch model =
    case JD.decodeValue (decodeIssueOrPRSelector field) payload of
        Ok sel ->
            { model | loadQueue = fetch model sel :: model.loadQueue }

        Err err ->
            log "failed to decode issue or PR" ( err, field, payload ) <|
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
                        |> Task.map ((,) timeline)
                )
            |> Task.attempt (PullRequestTimelineAndReviewsFetched id)


log : String -> a -> b -> b
log msg val =
    flip always (Debug.log msg val)


decodeRepoSelector : JD.Decoder GitHubGraph.RepoSelector
decodeRepoSelector =
    JD.succeed GitHubGraph.RepoSelector
        |: JD.at [ "repository", "owner", "login" ] JD.string
        |: JD.at [ "repository", "name" ] JD.string


decodeIssueOrPRSelector : String -> JD.Decoder GitHubGraph.IssueOrPRSelector
decodeIssueOrPRSelector field =
    JD.succeed GitHubGraph.IssueOrPRSelector
        |: JD.at [ "repository", "owner", "login" ] JD.string
        |: JD.at [ "repository", "name" ] JD.string
        |: JD.at [ field, "number" ] JD.int


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
            case commit.committer of
                Just committer ->
                    Just { avatar = committer.avatar, user = committer.user, createdAt = commit.committedAt }

                Nothing ->
                    Nothing

        GitHubGraph.CrossReferencedEvent _ ->
            Nothing
