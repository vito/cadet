port module Main exposing (..)

import Dict exposing (Dict)
import Platform
import Json.Decode
import Time exposing (Time)
import Task
import Process
import Http
import GitHub
import Date


port setIssues : ( Int, List Json.Decode.Value ) -> Cmd msg


port setReferences : ( Int, List Int ) -> Cmd msg


port setActors : ( Int, List ActorEvent ) -> Cmd msg


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
    , repos : List GitHub.Repo
    , issues : Dict Int (List GitHub.Issue)
    , timelines : Dict Int (List GitHub.TimelineEvent)
    , failedQueue : List (Cmd Msg)
    }


type alias ActorEvent =
    { actor : Json.Decode.Value
    , created_at : Time
    }


type Msg
    = Refresh
    | Retry
    | RepositoriesFetched (Result Http.Error (List GitHub.Repo))
    | IssuesFetched GitHub.Repo (Result Http.Error (List GitHub.Issue))
    | TimelineFetched GitHub.Issue (Result Http.Error (List GitHub.TimelineEvent))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg } =
    update Refresh
        { githubToken = githubToken
        , githubOrg = githubOrg
        , repos = []
        , issues = Dict.empty
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
                staggeredIssuesFetch i =
                    fetchIssues model (toFloat i * 100 * Time.millisecond)

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
                    setIssues ( repo.id, List.map .value issues )

                staggeredTimelineFetch i =
                    fetchTimeline model (toFloat i * 100 * Time.millisecond)

                fetch =
                    List.indexedMap staggeredTimelineFetch issues
            in
                ( { model | issues = Dict.insert repo.id issues model.issues }
                , Cmd.batch (updateData :: fetch)
                )

        IssuesFetched repo (Err err) ->
            flip always (Debug.log ("failed to fetch issues for " ++ repo.htmlURL) err) <|
                ( { model | failedQueue = fetchIssues model 0 repo :: model.failedQueue }, Cmd.none )

        TimelineFetched issue (Ok timeline) ->
            let
                findSource event =
                    case event.source of
                        Just { type_, issueID } ->
                            issueID

                        _ ->
                            Nothing

                edges =
                    List.filterMap findSource timeline

                commentActor event =
                    case ( event.event, event.createdAt, event.actor ) of
                        ( "commented", Just createdAt, Just actor ) ->
                            Just
                                { actor = actor.value
                                , created_at = Date.toTime createdAt
                                }

                        _ ->
                            Nothing

                actors =
                    List.filterMap commentActor timeline
            in
                ( model
                , Cmd.batch
                    [ setReferences ( issue.id, edges )
                    , setActors ( issue.id, actors )
                    ]
                )

        TimelineFetched issue (Err err) ->
            flip always (Debug.log ("failed to fetch timeline for " ++ issue.htmlURL) err) <|
                ( { model | failedQueue = fetchTimeline model 0 issue :: model.failedQueue }, Cmd.none )


fetchRepos : Model -> Cmd Msg
fetchRepos model =
    Task.attempt RepositoriesFetched <|
        GitHub.fetchOrgRepos model.githubToken model.githubOrg


fetchIssues : Model -> Time -> GitHub.Repo -> Cmd Msg
fetchIssues model delay repo =
    Process.sleep delay
        |> Task.andThen (\_ -> GitHub.fetchRepoIssues model.githubToken repo)
        |> Task.attempt (IssuesFetched repo)


fetchTimeline : Model -> Time -> GitHub.Issue -> Cmd Msg
fetchTimeline model delay issue =
    Process.sleep delay
        |> Task.andThen (\_ -> GitHub.fetchIssueTimeline model.githubToken issue)
        |> Task.attempt (TimelineFetched issue)
