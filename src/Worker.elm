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
    , repos : List GitHubGraph.Repo
    , issues : Dict String (List GitHubGraph.Issue)
    , prs : Dict String (List GitHubGraph.PullRequest)
    , timelines : Dict String (List GitHubGraph.TimelineEvent)
    , projects : List GitHubGraph.Project
    , columnCards : Dict String (List GitHubGraph.ProjectColumnCard)
    , loadQueue : List (Cmd Msg)
    , failedQueue : List (Cmd Msg)
    }


type Msg
    = Refresh Time
    | PopQueue Time
    | RetryQueue Time
    | RefreshRequested ( String, GitHubGraph.ID )
    | RepositoriesFetched (Result GitHubGraph.Error (List GitHubGraph.Repo))
    | ProjectsFetched (Result GitHubGraph.Error (List GitHubGraph.Project))
    | CardsFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.ProjectColumnCard))
    | IssuesFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.Issue))
    | PullRequestsFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.PullRequest))
    | TimelineFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.TimelineEvent))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg } =
    update (Refresh 0)
        { githubToken = githubToken
        , githubOrg = githubOrg
        , repos = []
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
        , refresh RefreshRequested
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Refresh now ->
            log "refreshing" now <|
                ( { model | loadQueue = fetchRepos model :: fetchProjects model :: model.loadQueue }, Cmd.none )

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

        RefreshRequested ( "cards", colId ) ->
            ( model, fetchCards model colId )

        RefreshRequested ( field, id ) ->
            log "cannot refresh" ( field, id ) <|
                ( model, Cmd.none )

        RepositoriesFetched (Ok repos) ->
            log "repositories fetched" (List.length repos) <|
                let
                    fetch repo =
                        [ fetchIssues model repo
                        , fetchPullRequests model repo
                        ]
                in
                    ( { model
                        | repos = repos
                        , loadQueue = List.concatMap fetch repos ++ model.loadQueue
                      }
                    , Cmd.none
                    )

        RepositoriesFetched (Err err) ->
            log "failed to fetch repos" err <|
                backOff model (fetchRepos model)

        ProjectsFetched (Ok projects) ->
            log "projects fetched" (List.length projects) <|
                ( { model
                    | projects = projects
                    , loadQueue = List.concatMap (List.map (fetchCards model << .id) << .columns) projects ++ model.loadQueue
                  }
                , setProjects (List.map GitHubGraph.encodeProject projects)
                )

        ProjectsFetched (Err err) ->
            log "failed to fetch projects" err <|
                backOff model (fetchProjects model)

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


fetchProjects : Model -> Cmd Msg
fetchProjects model =
    Task.attempt ProjectsFetched <|
        GitHubGraph.fetchOrgProjects model.githubToken { name = model.githubOrg }


fetchCards : Model -> GitHubGraph.ID -> Cmd Msg
fetchCards model colId =
    Task.attempt (CardsFetched colId) <|
        GitHubGraph.fetchProjectColumnCards model.githubToken { id = colId }


fetchIssues : Model -> GitHubGraph.Repo -> Cmd Msg
fetchIssues model repo =
    GitHubGraph.fetchRepoIssues model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (IssuesFetched repo)


fetchPullRequests : Model -> GitHubGraph.Repo -> Cmd Msg
fetchPullRequests model repo =
    GitHubGraph.fetchRepoPullRequests model.githubToken { owner = repo.owner, name = repo.name }
        |> Task.attempt (PullRequestsFetched repo)


fetchTimeline : Model -> GitHubGraph.ID -> Cmd Msg
fetchTimeline model id =
    GitHubGraph.fetchTimeline model.githubToken { id = id }
        |> Task.attempt (TimelineFetched id)


log : String -> a -> b -> b
log msg val =
    flip always (Debug.log msg val)
