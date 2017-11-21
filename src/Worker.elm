port module Main exposing (..)

import Dict exposing (Dict)
import Platform
import Json.Decode as JD
import Time exposing (Time)
import Task
import GitHubGraph
import Backend


port setProjects : List JD.Value -> Cmd msg


port setIssues : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setPullRequests : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setReferences : ( GitHubGraph.ID, List GitHubGraph.ID ) -> Cmd msg


port setActors : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


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
    }


type alias Model =
    { githubToken : String
    , githubOrg : String
    , issues : Dict String (List GitHubGraph.Issue)
    , prs : Dict String (List GitHubGraph.PullRequest)
    , timelines : Dict String (List GitHubGraph.TimelineEvent)
    , projects : List GitHubGraph.Project
    , columnCards : Dict String (List GitHubGraph.ProjectColumnCard)
    , loadQueue : List (Cmd Msg)
    , failedQueue : List (Cmd Msg)
    }


type Msg
    = Noop
    | Refresh Time
    | PopQueue Time
    | RetryQueue Time
    | RefreshRequested String GitHubGraph.ID
    | HookReceived String JD.Value
    | RepositoriesFetched (Result GitHubGraph.Error (List GitHubGraph.Repo))
    | ProjectsFetched (List GitHubGraph.Project -> Msg) (Result GitHubGraph.Error (List GitHubGraph.Project))
    | FetchCards (List GitHubGraph.Project)
    | CardsFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.ProjectColumnCard))
    | IssuesFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.Issue))
    | IssueFetched GitHubGraph.IssueOrPRSelector (Result GitHubGraph.Error GitHubGraph.Issue)
    | PullRequestsFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.PullRequest))
    | PullRequestFetched GitHubGraph.IssueOrPRSelector (Result GitHubGraph.Error GitHubGraph.PullRequest)
    | TimelineFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.TimelineEvent))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg } =
    update (Refresh 0)
        { githubToken = githubToken
        , githubOrg = githubOrg
        , issues = Dict.empty
        , prs = Dict.empty
        , timelines = Dict.empty
        , projects = []
        , columnCards = Dict.empty
        , loadQueue = []
        , failedQueue = []
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every (100 * Time.millisecond) PopQueue
        , Time.every (10 * Time.second) RetryQueue
        , Time.every Time.hour Refresh
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
            log "retrying failed fetches" (List.length model.failedQueue) <|
                ( { model
                    | failedQueue = []
                    , loadQueue = model.failedQueue ++ model.loadQueue
                  }
                , Cmd.none
                )

        RefreshRequested "cards" colId ->
            ( model, fetchCards model colId )

        RefreshRequested field id ->
            log "cannot refresh" ( field, id ) <|
                ( model, Cmd.none )

        HookReceived "issues" payload ->
            log "issue hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchIssue model, Cmd.none )

        HookReceived "issue_comment" payload ->
            log "issue_comment hook received; refreshing issue and timeline" () <|
                ( decodeAndFetchIssueOrPR "issue" payload fetchIssue model, Cmd.none )

        HookReceived "pull_request" payload ->
            log "pull_request hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchIssue model, Cmd.none )

        HookReceived "pull_request_review" payload ->
            log "pull_request_review hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchIssue model, Cmd.none )

        HookReceived "pull_request_review_comment" payload ->
            log "pull_request_review_comment hook received; refreshing pr and timeline" () <|
                ( decodeAndFetchIssueOrPR "pull_request" payload fetchIssue model, Cmd.none )

        HookReceived "milestone" payload ->
            log "milestone hook received; ignoring" () <|
                ( model, Cmd.none )

        HookReceived "project" payload ->
            log "project hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_column" payload ->
            log "project_column hook received; refreshing projects" () <|
                ( { model | loadQueue = fetchProjects model (always Noop) :: model.loadQueue }, Cmd.none )

        HookReceived "project_card" payload ->
            log "project_card hook received; refreshing projects and cards" () <|
                -- TODO: take changes.column_id.from and project_card.column_id
                -- fetch all projects
                -- refresh columns with matching database id
                ( { model | loadQueue = fetchProjects model FetchCards :: model.loadQueue }, Cmd.none )

        HookReceived "repository" payload ->
            log "repository hook received; ignoring" () <|
                ( model, Cmd.none )

        HookReceived "status" payload ->
            log "status hook received; ignoring" () <|
                ( model, Cmd.none )

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
                    , Cmd.none
                    )

        RepositoriesFetched (Err err) ->
            log "failed to fetch repos" err <|
                backOff model (fetchRepos model)

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
            ( { model | loadQueue = List.concatMap (List.map (fetchCards model << .id) << .columns) projects }, Cmd.none )

        CardsFetched colId (Ok cards) ->
            log "cards fetched for" colId <|
                ( { model | columnCards = Dict.insert colId cards model.columnCards }
                , setCards ( colId, List.map GitHubGraph.encodeProjectColumnCard cards )
                )

        CardsFetched colId (Err err) ->
            log "failed to fetch cards" ( colId, err ) <|
                backOff model (fetchCards model colId)

        IssuesFetched repo (Ok issues) ->
            let
                fetchTimelines =
                    List.map (fetchTimeline model << .id) issues
            in
                log "issues fetched for" repo.url <|
                    ( { model
                        | issues = Dict.insert repo.id issues model.issues
                        , loadQueue = model.loadQueue ++ fetchTimelines
                      }
                    , setIssues ( repo.id, List.map GitHubGraph.encodeIssue issues )
                    )

        IssuesFetched repo (Err err) ->
            log "failed to fetch issues" ( repo.url, err ) <|
                backOff model (fetchIssues model repo)

        IssueFetched sel (Ok issue) ->
            log "issue fetched" issue.url <|
                updateIssue issue { model | loadQueue = fetchTimeline model issue.id :: model.loadQueue }

        IssueFetched sel (Err err) ->
            log "failed to fetch issue" ( sel, err ) <|
                backOff model (fetchIssue model sel)

        PullRequestsFetched repo (Ok prs) ->
            let
                fetchTimelines =
                    List.map (fetchTimeline model << .id) prs
            in
                log "prs fetched for" repo.url <|
                    ( { model
                        | prs = Dict.insert repo.id prs model.prs
                        , loadQueue = model.loadQueue ++ fetchTimelines
                      }
                    , setPullRequests ( repo.id, List.map GitHubGraph.encodePullRequest prs )
                    )

        PullRequestsFetched repo (Err err) ->
            log "failed to fetch prs" ( repo.url, err ) <|
                backOff model (fetchPullRequests model repo)

        PullRequestFetched sel (Ok pr) ->
            log "pr fetched" pr.url <|
                updatePullRequest pr { model | loadQueue = fetchTimeline model pr.id :: model.loadQueue }

        PullRequestFetched sel (Err err) ->
            log "failed to fetch pr" ( sel, err ) <|
                backOff model (fetchPullRequest model sel)

        TimelineFetched id (Ok timeline) ->
            let
                findSource event =
                    case event of
                        GitHubGraph.CrossReferencedEvent id ->
                            Just id

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                commentActor event =
                    case event of
                        GitHubGraph.IssueCommentEvent (Just user) date ->
                            Just (Backend.encodeActorEvent { actor = user, createdAt = date })

                        _ ->
                            Nothing

                actors =
                    List.filterMap commentActor timeline
            in
                log "timeline fetched for" id <|
                    ( model
                    , Cmd.batch
                        [ setReferences ( id, edges )
                        , setActors ( id, actors )
                        ]
                    )

        TimelineFetched id (Err err) ->
            log "failed to fetch timeline" ( id, err ) <|
                backOff model (fetchTimeline model id)


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


fetchIssue : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchIssue model sel =
    GitHubGraph.fetchRepoIssue model.githubToken sel
        |> Task.attempt (IssueFetched sel)


fetchPullRequests : Model -> GitHubGraph.Repo -> Cmd Msg
fetchPullRequests model repo =
    GitHubGraph.fetchRepoPullRequests model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (PullRequestsFetched repo)


fetchPullRequest : Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg
fetchPullRequest model sel =
    GitHubGraph.fetchRepoPullRequest model.githubToken sel
        |> Task.attempt (PullRequestFetched sel)


decodeAndFetchIssueOrPR : String -> JD.Value -> (Model -> GitHubGraph.IssueOrPRSelector -> Cmd Msg) -> Model -> Model
decodeAndFetchIssueOrPR field payload fetch model =
    case JD.decodeValue (decodeIssueOrPRSelector field) payload of
        Ok sel ->
            { model | loadQueue = fetch model sel :: model.loadQueue }

        _ ->
            model


fetchTimeline : Model -> GitHubGraph.ID -> Cmd Msg
fetchTimeline model id =
    GitHubGraph.fetchTimeline model.githubToken { id = id }
        |> Task.attempt (TimelineFetched id)


log : String -> a -> b -> b
log msg val =
    flip always (Debug.log msg val)


decodeIssueOrPRSelector : String -> JD.Decoder GitHubGraph.IssueOrPRSelector
decodeIssueOrPRSelector field =
    JD.field field
        (JD.map2 (,) (JD.field "number" JD.int) (JD.field "repository_url" JD.string)
            |> JD.andThen (\( number, repoURL ) -> fromNumberAndURL number repoURL)
        )


fromNumberAndURL : Int -> String -> JD.Decoder GitHubGraph.IssueOrPRSelector
fromNumberAndURL number url =
    case List.reverse (String.split "/" url) of
        repo :: owner :: "repos" :: _ ->
            JD.succeed { owner = owner, repo = repo, number = number }

        _ ->
            JD.fail "invalid repository url"


updateIssue : GitHubGraph.Issue -> Model -> ( Model, Cmd Msg )
updateIssue issue model =
    let
        newIssues =
            Dict.map
                (\_ issues ->
                    List.map
                        (\i ->
                            if i.id == issue.id then
                                issue
                            else
                                i
                        )
                        issues
                )
                model.issues

        setAllIssues =
            Dict.foldl
                (\id issues cmds ->
                    setIssues ( id, List.map GitHubGraph.encodeIssue issues ) :: cmds
                )
                []
                newIssues

        newCards =
            Dict.map
                (\_ cards ->
                    List.map
                        (\c ->
                            case c.content of
                                Just (GitHubGraph.IssueCardContent i) ->
                                    if i.id == issue.id then
                                        { c | content = Just (GitHubGraph.IssueCardContent issue) }
                                    else
                                        c

                                _ ->
                                    c
                        )
                        cards
                )
                model.columnCards

        setAllCards =
            Dict.foldl
                (\id cards cmds ->
                    setCards ( id, List.map GitHubGraph.encodeProjectColumnCard cards ) :: cmds
                )
                []
                newCards
    in
        ( { model | issues = newIssues, columnCards = newCards }
        , Cmd.batch (setAllIssues ++ setAllCards)
        )


updatePullRequest : GitHubGraph.PullRequest -> Model -> ( Model, Cmd Msg )
updatePullRequest pr model =
    let
        newPullRequests =
            Dict.map
                (\_ prs ->
                    List.map
                        (\i ->
                            if i.id == pr.id then
                                pr
                            else
                                i
                        )
                        prs
                )
                model.prs

        setAllPRs =
            Dict.foldl
                (\id prs cmds ->
                    setPullRequests ( id, List.map GitHubGraph.encodePullRequest prs ) :: cmds
                )
                []
                newPullRequests

        newCards =
            Dict.map
                (\_ cards ->
                    List.map
                        (\c ->
                            case c.content of
                                Just (GitHubGraph.PullRequestCardContent i) ->
                                    if i.id == pr.id then
                                        { c | content = Just (GitHubGraph.PullRequestCardContent pr) }
                                    else
                                        c

                                _ ->
                                    c
                        )
                        cards
                )
                model.columnCards

        setAllCards =
            Dict.foldl
                (\id cards cmds ->
                    setCards ( id, List.map GitHubGraph.encodeProjectColumnCard cards ) :: cmds
                )
                []
                newCards
    in
        ( { model | prs = newPullRequests, columnCards = newCards }
        , Cmd.batch (setAllPRs ++ setAllCards)
        )
