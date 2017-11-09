port module Main exposing (..)

import Dict exposing (Dict)
import Platform
import Json.Decode as JD
import Time exposing (Time)
import Task
import Process
import GitHubGraph
import Data


port setIssues : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setPullRequests : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


port setReferences : ( GitHubGraph.ID, List GitHubGraph.ID ) -> Cmd msg


port setActors : ( GitHubGraph.ID, List JD.Value ) -> Cmd msg


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
    , failedQueue : List (Cmd Msg)
    }


type Msg
    = Refresh
    | Retry
    | RepositoriesFetched (Result GitHubGraph.Error (List GitHubGraph.Repo))
    | IssuesFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.Issue))
    | PullRequestsFetched GitHubGraph.Repo (Result GitHubGraph.Error (List GitHubGraph.PullRequest))
    | TimelineFetched GitHubGraph.ID (Result GitHubGraph.Error (List GitHubGraph.TimelineEvent))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg } =
    update Refresh
        { githubToken = githubToken
        , githubOrg = githubOrg
        , repos = []
        , issues = Dict.empty
        , prs = Dict.empty
        , timelines = Dict.empty
        , failedQueue = []
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every Time.hour (always Refresh)
        , Time.every (10 * Time.second) (always Retry)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Refresh ->
            ( model, fetchRepos model )

        Retry ->
            ( { model | failedQueue = [] }, Cmd.batch model.failedQueue )

        RepositoriesFetched (Ok repos) ->
            let
                staggeredIssuesFetch i repo =
                    Cmd.batch
                        [ fetchIssues model (toFloat i * 100 * Time.millisecond) repo
                        , fetchPullRequests model (toFloat i * 100 * Time.millisecond) repo
                        ]

                fetch =
                    List.indexedMap staggeredIssuesFetch repos
            in
                ( { model | repos = repos }, Cmd.batch fetch )

        RepositoriesFetched (Err err) ->
            flip always (Debug.log "failed to fetch repositories" err) <|
                ( model, Cmd.none )

        IssuesFetched repo (Ok issues) ->
            let
                updateData =
                    setIssues ( repo.id, List.map GitHubGraph.encodeIssue issues )

                staggeredTimelineFetch i =
                    fetchTimeline model (toFloat i * 100 * Time.millisecond) << .id

                fetch =
                    List.indexedMap staggeredTimelineFetch issues
            in
                ( { model | issues = Dict.insert repo.id issues model.issues }
                , Cmd.batch (updateData :: fetch)
                )

        IssuesFetched repo (Err err) ->
            flip always (Debug.log ("failed to fetch issues for " ++ repo.url) err) <|
                ( { model | failedQueue = fetchIssues model 0 repo :: model.failedQueue }, Cmd.none )

        PullRequestsFetched repo (Ok prs) ->
            let
                updateData =
                    setPullRequests ( repo.id, List.map GitHubGraph.encodePullRequest prs )

                staggeredTimelineFetch i =
                    fetchTimeline model (toFloat i * 100 * Time.millisecond) << .id

                fetch =
                    List.indexedMap staggeredTimelineFetch prs
            in
                ( { model | prs = Dict.insert repo.id prs model.prs }
                , Cmd.batch (updateData :: fetch)
                )

        PullRequestsFetched repo (Err err) ->
            flip always (Debug.log ("failed to fetch prs for " ++ repo.url) err) <|
                ( { model | failedQueue = fetchPullRequests model 0 repo :: model.failedQueue }, Cmd.none )

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
                            Just (Data.encodeActorEvent { actor = user, createdAt = date })

                        _ ->
                            Nothing

                actors =
                    List.filterMap commentActor timeline
            in
                ( model
                , Cmd.batch
                    [ setReferences ( id, edges )
                    , setActors ( id, actors )
                    ]
                )

        TimelineFetched id (Err err) ->
            flip always (Debug.log ("failed to fetch timeline for " ++ id) err) <|
                ( { model | failedQueue = fetchTimeline model 0 id :: model.failedQueue }, Cmd.none )


fetchRepos : Model -> Cmd Msg
fetchRepos model =
    Task.attempt RepositoriesFetched <|
        GitHubGraph.fetchOrgRepos model.githubToken { name = model.githubOrg }


fetchIssues : Model -> Time -> GitHubGraph.Repo -> Cmd Msg
fetchIssues model delay repo =
    Process.sleep delay
        |> Task.andThen (always <| GitHubGraph.fetchRepoIssues model.githubToken { owner = repo.owner, name = repo.name })
        |> Task.attempt (IssuesFetched repo)


fetchPullRequests : Model -> Time -> GitHubGraph.Repo -> Cmd Msg
fetchPullRequests model delay repo =
    Process.sleep delay
        |> Task.andThen (always <| GitHubGraph.fetchRepoPullRequests model.githubToken { owner = repo.owner, name = repo.name })
        |> Task.attempt (PullRequestsFetched repo)


fetchTimeline : Model -> Time -> GitHubGraph.ID -> Cmd Msg
fetchTimeline model delay id =
    Process.sleep delay
        |> Task.andThen (\_ -> GitHubGraph.fetchTimeline model.githubToken { id = id })
        |> Task.attempt (TimelineFetched id)
