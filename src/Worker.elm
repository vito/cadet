port module Main exposing (..)

import Dict exposing (Dict)
import Platform
import Json.Decode
import Time
import Task
import Http
import GitHub


port setRepositories : List Json.Decode.Value -> Cmd msg


port setIssues : ( Int, List Json.Decode.Value ) -> Cmd msg


port setTimeline : ( Int, List Json.Decode.Value ) -> Cmd msg


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
    }


type Msg
    = RefreshRepositories
    | RepositoriesFetched (Result Http.Error (List GitHub.Repo))
    | RefreshIssues
    | IssuesFetched GitHub.Repo (Result Http.Error (List GitHub.Issue))
    | RefreshTimelines
    | TimelineFetched GitHub.Issue (Result Http.Error (List GitHub.TimelineEvent))


init : Flags -> ( Model, Cmd Msg )
init { githubToken, githubOrg } =
    update RefreshRepositories
        { githubToken = githubToken
        , githubOrg = githubOrg
        , repos = []
        , issues = Dict.empty
        , timelines = Dict.empty
        }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Time.every Time.hour (always RefreshRepositories)
        , Time.every (5 * Time.minute) (always RefreshIssues)
        , Time.every (10 * Time.minute) (always RefreshTimelines)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        RefreshRepositories ->
            ( model
            , Task.attempt RepositoriesFetched <|
                GitHub.fetchOrgRepos model.githubToken model.githubOrg
            )

        RepositoriesFetched (Ok repos) ->
            let
                ( newModel, newMsg ) =
                    ( { model | repos = repos }, setRepositories (List.map .value repos) )
            in
                if Dict.isEmpty model.issues then
                    let
                        ( refreshModel, refreshMsg ) =
                            update RefreshIssues newModel
                    in
                        ( refreshModel, Cmd.batch [ newMsg, refreshMsg ] )
                else
                    ( newModel, newMsg )

        RepositoriesFetched (Err err) ->
            flip always (Debug.log "failed to fetch repositories" err) <|
                ( model, Cmd.none )

        RefreshIssues ->
            ( model
            , Cmd.batch <|
                List.map
                    (\repo ->
                        Task.attempt (IssuesFetched repo) <|
                            GitHub.fetchRepoIssues model.githubToken repo
                    )
                    model.repos
            )

        IssuesFetched repo (Ok issues) ->
            let
                ( newModel, newMsg ) =
                    ( { model | issues = Dict.insert repo.id issues model.issues }, setIssues ( repo.id, List.map .value issues ) )

                fetchMissingTimelines =
                    List.foldl
                        (\issue msg ->
                            if Dict.member issue.id model.timelines then
                                msg
                            else
                                Cmd.batch
                                    [ msg
                                    , Task.attempt (TimelineFetched issue) <|
                                        GitHub.fetchIssueTimeline model.githubToken issue
                                    ]
                        )
                        newMsg
                        issues
            in
                ( newModel, fetchMissingTimelines )

        IssuesFetched repo (Err err) ->
            flip always (Debug.log ("failed to fetch issues for " ++ repo.htmlURL) err) <|
                ( model, Cmd.none )

        RefreshTimelines ->
            ( model
            , Cmd.batch <|
                List.map
                    (\issue ->
                        Task.attempt (TimelineFetched issue) <|
                            GitHub.fetchIssueTimeline model.githubToken issue
                    )
                    (List.concat (Dict.values model.issues))
            )

        TimelineFetched issue (Ok timeline) ->
            ( model, setTimeline ( issue.id, List.map .value timeline ) )

        TimelineFetched issue (Err err) ->
            flip always (Debug.log ("failed to fetch timeline for " ++ issue.htmlURL) err) <|
                ( model, Cmd.none )
