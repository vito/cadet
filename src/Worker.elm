port module Worker exposing (main)

import Backend
import Dict exposing (Dict)
import ForceGraph exposing (ForceGraph)
import GitHub
import GraphQL.Client.Http as GH
import Hash
import Http
import IntDict
import Json.Decode as JD
import Json.Decode.Extra exposing (andMap)
import Json.Encode as JE
import List.Extra as LE
import Log
import Maybe.Extra as ME
import Platform
import Set
import Task
import Time


port setRepos : List JD.Value -> Cmd msg


port setRepo : JD.Value -> Cmd msg


port setIssues : List JD.Value -> Cmd msg


port setIssue : JD.Value -> Cmd msg


port setPullRequests : List JD.Value -> Cmd msg


port setPullRequest : JD.Value -> Cmd msg


port setRepoProjects : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoRefs : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoCommits : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoLabels : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoMilestones : ( GitHub.ID, JD.Value ) -> Cmd msg


port setRepoReleases : ( GitHub.ID, JD.Value ) -> Cmd msg


port setReferences : ( GitHub.ID, List GitHub.ID ) -> Cmd msg


port setCardEvents : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setCardClosers : ( GitHub.ID, List GitHub.ID ) -> Cmd msg


port setCardRotations : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setReviewers : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setCards : ( GitHub.ID, List JD.Value ) -> Cmd msg


port setGraphs : JD.Value -> Cmd msg


port setPairingUsers : List JD.Value -> Cmd msg


port setOrgProjects : List JD.Value -> Cmd msg


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
    , columnIDs : Dict Int GitHub.ID
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
    | FetchCards (List GitHub.Project)
    | FetchRepoProjects GitHub.Repo
    | FetchRepoLabels GitHub.Repo
    | FetchRepoMilestones GitHub.Repo
    | FetchRepoReleases GitHub.Repo
    | PairingTeamFetched (Result GitHub.Error GitHub.Team)
    | OrgProjectsFetched (Result GitHub.Error (List GitHub.Project))
    | RepositoriesFetched (Result GitHub.Error (List GitHub.Repo))
    | RepositoryFetched (GitHub.Repo -> Msg) (Result GitHub.Error GitHub.Repo)
    | CardsFetched GitHub.ID (Result GitHub.Error (List GitHub.ProjectColumnCard))
    | IssuesPageFetched (GitHub.PagedSelector GitHub.RepoSelector) (Result GitHub.Error ( List GitHub.Issue, GitHub.PageInfo ))
    | IssueFetched (Result GitHub.Error GitHub.Issue)
    | PullRequestsPageFetched (GitHub.PagedSelector GitHub.RepoSelector) (Result GitHub.Error ( List GitHub.PullRequest, GitHub.PageInfo ))
    | RepoCommitsPageFetched GitHub.Repo (GitHub.PagedSelector GitHub.RefSelector) (List GitHub.Release) (List GitHub.Commit) (Result GitHub.Error ( List GitHub.Commit, GitHub.PageInfo ))
    | RepoProjectsFetched GitHub.Repo (List GitHub.Project -> Msg) (Result GitHub.Error (List GitHub.Project))
    | RepoLabelsFetched GitHub.Repo (Result GitHub.Error (List GitHub.Label))
    | RepoMilestonesFetched GitHub.Repo (Result GitHub.Error (List GitHub.Milestone))
    | RepoReleasesFetched GitHub.Repo (Result GitHub.Error (List GitHub.Release))
    | PullRequestFetched (Result GitHub.Error GitHub.PullRequest)
    | IssueTimelineFetched GitHub.ID (Result GitHub.Error (List GitHub.TimelineEvent))
    | PullRequestTimelineAndReviewsFetched GitHub.ID (Result GitHub.Error ( List GitHub.TimelineEvent, List GitHub.PullRequestReview ))
    | RepoRefsFetched GitHub.Repo (List GitHub.Release) (Result GitHub.Error (List GitHub.Ref))


replay : List Msg -> Model -> ( Model, Cmd Msg )
replay msgs model =
    List.foldl
        (\msg ( m, cmd ) ->
            let
                ( nm, ncmd ) =
                    update msg m
            in
            ( nm, Cmd.batch [ cmd, ncmd ] )
        )
        ( model, Cmd.none )
        msgs


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg, skipTimeline, noRefresh } =
    replay
        [ Refresh
        ]
        { githubToken = githubToken
        , githubOrg = githubOrg
        , skipTimeline = skipTimeline
        , noRefresh = noRefresh
        , loadQueue = []
        , failedQueue = []
        , columnIDs = Dict.empty
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
            ( { model | loadQueue = fetchPairingTeam model :: fetchOrgProjects model :: fetchRepos model :: model.loadQueue }, Cmd.none )

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

        RefreshRequested "pairingUsers" _ ->
            ( model, fetchPairingTeam model )

        RefreshRequested "orgProjects" _ ->
            ( model, fetchOrgProjects model )

        RefreshRequested "columnCards" colId ->
            ( model, fetchCards model colId )

        RefreshRequested "repo" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model (always Noop) { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "repoProjects" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model FetchRepoProjects { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "repoMilestones" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model FetchRepoMilestones { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "repoReleases" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model FetchRepoReleases { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "repoLabels" ownerAndName ->
            case String.split "/" ownerAndName of
                owner :: name :: _ ->
                    ( model, fetchRepo model FetchRepoLabels { owner = owner, name = name } )

                _ ->
                    ( model, Cmd.none )

        RefreshRequested "issue" id ->
            ( model, fetchIssue model id )

        RefreshRequested "pr" id ->
            ( model, fetchPullRequest model id )

        RefreshRequested field id ->
            Log.debug "cannot refresh" ( field, id ) <|
                ( model, Cmd.none )

        HookReceived "membership" payload ->
            Log.debug "membership hook received; refreshing Pairing team" () <|
                ( decodeAndFetchPairingTeam payload model, Cmd.none )

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
                ( decodeAndFetchRepoOrOrgProjects payload model, Cmd.none )

        HookReceived "project_column" payload ->
            Log.debug "project_column hook received; refreshing projects" () <|
                ( decodeAndFetchRepoOrOrgProjects payload model, Cmd.none )

        HookReceived "project_card" payload ->
            Log.debug "project_card hook received; refreshing projects and cards" () <|
                case JD.decodeValue decodeAffectedColumnIds payload of
                    Err err ->
                        Log.debug "failed to decode column ids" err <|
                            ( model, Cmd.none )

                    Ok databaseIDs ->
                        let
                            affectedColumnIDs =
                                List.filterMap (\did -> Dict.get did model.columnIDs) databaseIDs
                        in
                        ( { model | loadQueue = List.map (fetchCards model) affectedColumnIDs ++ model.loadQueue }
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

        PairingTeamFetched (Ok team) ->
            ( model, setPairingUsers (List.map GitHub.encodeUser team.members) )

        PairingTeamFetched (Err err) ->
            Log.debug "failed to fetch pairing members" err <|
                backOff model err (fetchPairingTeam model)

        OrgProjectsFetched (Ok projects) ->
            Log.debug "org projects fetched" (List.map .name projects) <|
                ( fetchAllCards model projects, setOrgProjects (List.map GitHub.encodeProject projects) )

        OrgProjectsFetched (Err err) ->
            Log.debug "failed to fetch org projects" err <|
                backOff model err (fetchOrgProjects model)

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
                        , fetchRepoProjects model repo FetchCards
                        ]
                in
                ( { model | loadQueue = List.concatMap fetch activeRepos ++ model.loadQueue }
                , setRepos (List.map GitHub.encodeRepo activeRepos)
                )

        RepositoriesFetched (Err err) ->
            Log.debug "failed to fetch repos" err <|
                backOff model err (fetchRepos model)

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

        FetchRepoProjects repo ->
            ( { model | loadQueue = fetchRepoProjects model repo (always Noop) :: model.loadQueue }, Cmd.none )

        RepoProjectsFetched repo nextMsg (Ok projects) ->
            Log.debug "projects fetched" (List.map .name projects) <|
                let
                    addColumnIDs project ids =
                        List.foldl (\col -> Dict.insert col.databaseId col.id) ids project.columns

                    ( next, cmd ) =
                        update (nextMsg projects)
                            { model | columnIDs = List.foldl addColumnIDs model.columnIDs projects }
                in
                ( next
                , Cmd.batch
                    [ cmd
                    , setRepoProjects ( repo.id, JE.list GitHub.encodeProject projects )
                    ]
                )

        RepoProjectsFetched repo nextMsg (Err err) ->
            Log.debug "failed to fetch projects" err <|
                backOff model err (fetchRepoProjects model repo nextMsg)

        FetchCards projects ->
            ( fetchAllCards model projects, Cmd.none )

        CardsFetched colId (Ok cards) ->
            Log.debug "cards fetched for" colId <|
                ( model
                , setCards ( colId, List.map GitHub.encodeProjectColumnCard cards )
                )

        CardsFetched colId (Err err) ->
            Log.debug "failed to fetch cards" ( colId, err ) <|
                backOff model err (fetchCards model colId)

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
                backOff model err (fetchIssuesPage model psel)

        IssueFetched (Ok issue) ->
            Log.debug "issue fetched" issue.url <|
                ( { model | loadQueue = fetchIssueTimeline model issue.id :: model.loadQueue }
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
                backOff model err (fetchPullRequestsPage model psel)

        FetchRepoLabels repo ->
            ( { model | loadQueue = fetchRepoLabels model repo :: model.loadQueue }, Cmd.none )

        RepoLabelsFetched repo (Err err) ->
            Log.debug "failed to fetch labels" ( repo.url, err ) <|
                backOff model err (fetchRepoLabels model repo)

        RepoLabelsFetched repo (Ok labels) ->
            Log.debug "labels fetched for" repo.url <|
                ( model
                , setRepoLabels ( repo.id, JE.list GitHub.encodeLabel labels )
                )

        FetchRepoMilestones repo ->
            ( { model | loadQueue = fetchRepoMilestones model repo :: model.loadQueue }, Cmd.none )

        RepoMilestonesFetched repo (Err err) ->
            Log.debug "failed to fetch milestones" ( repo.url, err ) <|
                backOff model err (fetchRepoMilestones model repo)

        RepoMilestonesFetched repo (Ok milestones) ->
            Log.debug "milestones fetched for" repo.url <|
                ( model
                , setRepoMilestones ( repo.id, JE.list GitHub.encodeMilestone milestones )
                )

        FetchRepoReleases repo ->
            ( { model | loadQueue = fetchRepoReleases model repo :: model.loadQueue }, Cmd.none )

        RepoReleasesFetched repo (Err err) ->
            Log.debug "failed to fetch releases" ( repo.url, err ) <|
                backOff model err (fetchRepoReleases model repo)

        RepoReleasesFetched repo (Ok releases) ->
            Log.debug "releases fetched for" repo.url <|
                ( model
                , Cmd.batch
                    [ setRepoReleases ( repo.id, JE.list GitHub.encodeRelease releases )

                    -- if there are no releases, technically *all* commits are
                    -- "since last release" - which would just be noise for
                    -- repos that we don't plan to ship, so don't bother.
                    , if not (List.isEmpty releases) then
                        let
                            nextMinorRefSel =
                                { repo = { owner = repo.owner, name = repo.name }
                                , qualifiedName = "refs/heads/master"
                                }
                        in
                        Cmd.batch
                            [ fetchRepoCommits model repo { selector = nextMinorRefSel, after = Nothing } releases []
                            , fetchRepoReleaseRefs model repo releases
                            ]

                      else
                        Cmd.none
                    ]
                )

        RepoRefsFetched repo releases (Err err) ->
            Log.debug "failed to fetch refs" ( repo.name, err ) <|
                backOff model err (fetchRepoReleaseRefs model repo releases)

        RepoRefsFetched repo releases (Ok refs) ->
            Log.debug "refs fetched for" repo.url <|
                ( model
                , let
                    releaseRefs =
                        List.filter (String.endsWith ".x" << .name) refs

                    fetchRefCommits { name } =
                        fetchRepoCommits model
                            repo
                            { selector =
                                { repo = { owner = repo.owner, name = repo.name }
                                , qualifiedName = "refs/heads/release/" ++ name
                                }
                            , after = Nothing
                            }
                            releases
                            []
                  in
                  Cmd.batch <|
                    setRepoRefs
                        ( repo.id
                        , JE.list JE.string <|
                            -- kinda hacky; have to do this because refs are
                            -- 'synced' to the full set to detect deleted
                            -- branches, but we fetch master separately from
                            -- these
                            "refs/heads/master"
                                :: List.map (\r -> r.prefix ++ r.name) refs
                        )
                        :: List.map fetchRefCommits releaseRefs
                )

        RepoCommitsPageFetched repo psel releases commitsSoFar (Err err) ->
            Log.debug "failed to fetch commits" ( psel, err ) <|
                backOff model err (fetchRepoCommits model repo psel releases commitsSoFar)

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

                    ( newCommitsSoFar, sinceRelease ) =
                        List.foldl
                            (\commit ( soFar, f ) ->
                                case ME.or f (LE.find (isForCommit commit) releases) of
                                    Just release ->
                                        ( soFar, Just release )

                                    _ ->
                                        ( commit :: soFar, Nothing )
                            )
                            ( commitsSoFar, Nothing )
                            commits
                  in
                  case sinceRelease of
                    Just release ->
                        setRepoCommits
                            ( repo.id
                            , JE.object
                                [ ( "ref", JE.string psel.selector.qualifiedName )
                                , ( "commits", JE.list GitHub.encodeCommit newCommitsSoFar )
                                , ( "lastRelease", GitHub.encodeRelease release )
                                ]
                            )

                    Nothing ->
                        if pageInfo.hasNextPage then
                            fetchRepoCommits model repo { psel | after = pageInfo.endCursor } releases newCommitsSoFar

                        else
                            Cmd.none
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
                        GitHub.CrossReferencedEvent ref ->
                            Just ref.source

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                findCloser event =
                    case event of
                        GitHub.CrossReferencedEvent ref ->
                            if ref.willCloseTarget then
                                Just ref.source

                            else
                                Nothing

                        _ ->
                            Nothing

                closers =
                    List.filterMap findCloser timeline

                rotations =
                    Backend.timelineRotations timeline

                events =
                    timeline
                        |> List.filterMap timelineEvent
                        |> List.map Backend.encodeCardEvent
                        |> List.reverse
            in
            Log.debug "timeline fetched for" id <|
                ( model
                , Cmd.batch
                    [ setReferences ( id, edges )
                    , setCardEvents ( id, events )
                    , setCardClosers ( id, closers )
                    , setCardRotations ( id, List.map Backend.encodeRotation rotations )
                    ]
                )

        IssueTimelineFetched id (Err err) ->
            Log.debug "failed to fetch timeline" ( id, err ) <|
                backOff model err (fetchIssueTimeline model id)

        PullRequestTimelineAndReviewsFetched id (Ok ( timeline, reviews )) ->
            let
                findSource event =
                    case event of
                        GitHub.CrossReferencedEvent ref ->
                            Just ref.source

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                findCloser event =
                    case event of
                        GitHub.CrossReferencedEvent ref ->
                            if ref.willCloseTarget then
                                Just ref.source

                            else
                                Nothing

                        _ ->
                            Nothing

                closers =
                    List.filterMap findCloser timeline

                reviewEvent review =
                    { event =
                        case review.state of
                            GitHub.PullRequestReviewStatePending ->
                                "review-pending"

                            GitHub.PullRequestReviewStateCommented ->
                                "review-comment"

                            GitHub.PullRequestReviewStateApproved ->
                                "review-approved"

                            GitHub.PullRequestReviewStateChangesRequested ->
                                "review-changes-requested"

                            GitHub.PullRequestReviewStateDismissed ->
                                "review-dismissed"
                    , url = review.url
                    , user = Just review.author
                    , avatar = review.author.avatar
                    , createdAt = review.createdAt
                    }

                events =
                    (List.filterMap timelineEvent timeline
                        ++ List.map reviewEvent reviews
                    )
                        |> List.sortBy (Time.posixToMillis << .createdAt)
                        |> List.map Backend.encodeCardEvent
                        |> List.reverse

                rotations =
                    Backend.timelineRotations timeline

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
                    , setCardEvents ( id, events )
                    , setCardClosers ( id, closers )
                    , setCardRotations ( id, List.map Backend.encodeRotation rotations )
                    , setReviewers ( id, reviewers )
                    ]
                )

        PullRequestTimelineAndReviewsFetched id (Err err) ->
            Log.debug "failed to fetch timeline and reviews" ( id, err ) <|
                backOff model err (fetchPRTimelineAndReviews model id)


backOff : Model -> GH.Error -> Cmd Msg -> ( Model, Cmd Msg )
backOff model err cmd =
    case err of
        GH.HttpError (Http.BadStatus { status }) ->
            if status.code == 403 || status.code >= 500 then
                ( { model
                    | failedQueue = cmd :: model.loadQueue ++ model.failedQueue
                    , loadQueue = []
                  }
                , Cmd.none
                )

            else
                ( model, Cmd.none )

        _ ->
            ( model, Cmd.none )


fetchRepos : Model -> Cmd Msg
fetchRepos model =
    Task.attempt RepositoriesFetched <|
        GitHub.fetchOrgRepos model.githubToken { name = model.githubOrg }


fetchRepoProjects : Model -> GitHub.Repo -> (List GitHub.Project -> Msg) -> Cmd Msg
fetchRepoProjects model repo nextMsg =
    Task.attempt (RepoProjectsFetched repo nextMsg) <|
        GitHub.fetchRepoProjects model.githubToken { owner = model.githubOrg, name = repo.name }


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


fetchRepoReleaseRefs : Model -> GitHub.Repo -> List GitHub.Release -> Cmd Msg
fetchRepoReleaseRefs model repo releases =
    GitHub.fetchRepoRefs model.githubToken { repo = { owner = repo.owner, name = repo.name }, refPrefix = "refs/heads/release/" }
        |> Task.attempt (RepoRefsFetched repo releases)


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


fetchPairingTeam : Model -> Cmd Msg
fetchPairingTeam model =
    GitHub.fetchTeam model.githubToken { org = model.githubOrg, slug = "pairing" }
        |> Task.attempt PairingTeamFetched


decodeAndFetchRepoOrOrgProjects : JD.Value -> Model -> Model
decodeAndFetchRepoOrOrgProjects payload model =
    case JD.decodeValue (JD.field "repository" (JD.succeed ())) payload of
        Ok _ ->
            case JD.decodeValue decodeRepoSelector payload of
                Ok sel ->
                    { model | loadQueue = fetchRepo model FetchRepoProjects sel :: model.loadQueue }

                Err err ->
                    Log.debug "failed to decode repo" ( err, payload ) <|
                        model

        Err _ ->
            -- 'repository' field is missing; must be for an org
            { model | loadQueue = fetchOrgProjects model :: model.loadQueue }


decodeAndFetchPairingTeam : JD.Value -> Model -> Model
decodeAndFetchPairingTeam payload model =
    case JD.decodeValue decodeTeamSelector payload of
        Ok sel ->
            if sel.slug == "pairing" then
                { model | loadQueue = fetchPairingTeam model :: model.loadQueue }

            else
                model

        Err err ->
            Log.debug "failed to decode team" ( err, payload ) <|
                model


fetchOrgProjects : Model -> Cmd Msg
fetchOrgProjects model =
    GitHub.fetchOrgProjects model.githubToken { name = model.githubOrg }
        |> Task.attempt OrgProjectsFetched


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


decodeTeamSelector : JD.Decoder GitHub.TeamSelector
decodeTeamSelector =
    JD.succeed GitHub.TeamSelector
        |> andMap (JD.at [ "organization", "login" ] JD.string)
        |> andMap (JD.at [ "team", "slug" ] JD.string)


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


timelineEvent : GitHub.TimelineEvent -> Maybe Backend.CardEvent
timelineEvent event =
    case event of
        GitHub.IssueCommentEvent comment ->
            Just
                { event = "comment"
                , url = comment.url
                , user = comment.author
                , avatar = Maybe.withDefault "" <| Maybe.map .avatar comment.author
                , createdAt = comment.createdAt
                }

        GitHub.CommitEvent commit ->
            case ( commit.author, commit.committer ) of
                ( Just author, Just committer ) ->
                    case author.user of
                        Just _ ->
                            Just
                                { event = "commit"
                                , url = commit.url
                                , avatar = author.avatar
                                , user = author.user
                                , createdAt = commit.committedAt
                                }

                        Nothing ->
                            Just
                                { event = "commit"
                                , url = commit.url
                                , avatar = committer.avatar
                                , user = committer.user
                                , createdAt = commit.committedAt
                                }

                ( Nothing, Just committer ) ->
                    Just
                        { event = "commit"
                        , url = commit.url
                        , avatar = committer.avatar
                        , user = committer.user
                        , createdAt = commit.committedAt
                        }

                ( Just author, Nothing ) ->
                    Just
                        { event = "commit"
                        , url = commit.url
                        , avatar = author.avatar
                        , user = author.user
                        , createdAt = commit.committedAt
                        }

                ( Nothing, Nothing ) ->
                    Nothing

        GitHub.CrossReferencedEvent _ ->
            Nothing

        GitHub.AssignedEvent _ ->
            Nothing

        GitHub.UnassignedEvent _ ->
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


fetchAllCards : Model -> List GitHub.Project -> Model
fetchAllCards model projects =
    let
        fetches =
            List.concatMap (List.map (fetchCards model << .id) << .columns) projects
    in
    { model | loadQueue = fetches ++ model.loadQueue }
