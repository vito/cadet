module Backend
    exposing
        ( ColumnCard
        , Data
        , EventActor
        , Indexed
        , Me
        , User
        , emptyData
        , encodeEventActor
        , fetchData
        , fetchMe
        , pollData
        , refreshCards
        , refreshIssue
        , refreshPR
        , refreshRepo
        )

import Date exposing (Date)
import Date.Format
import Dict exposing (Dict)
import GitHubGraph
import Http
import HttpBuilder
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Json.Encode as JE
import Json.Encode.Extra as JEE
import Task
import Time


type alias Indexed a =
    { index : Int
    , value : a
    }


type alias Data =
    { repos : Dict GitHubGraph.ID GitHubGraph.Repo
    , issues : Dict GitHubGraph.ID GitHubGraph.Issue
    , prs : Dict GitHubGraph.ID GitHubGraph.PullRequest
    , projects : Dict GitHubGraph.ID GitHubGraph.Project
    , columnCards : Dict GitHubGraph.ID (List ColumnCard)
    , references : Dict GitHubGraph.ID (List GitHubGraph.ID)
    , actors : Dict GitHubGraph.ID (List EventActor)
    , reviewers : Dict GitHubGraph.ID (List GitHubGraph.PullRequestReview)
    }


type alias Me =
    { token : String
    , user : User
    }


type alias User =
    { id : Int
    , login : String
    , url : String
    , avatar : String
    }


type alias EventActor =
    { user : Maybe GitHubGraph.User
    , avatar : String
    , createdAt : Date
    }


type alias ColumnCard =
    { id : GitHubGraph.ID
    , contentId : Maybe GitHubGraph.ID
    , note : Maybe String
    }


emptyData : Data
emptyData =
    { repos = Dict.empty
    , issues = Dict.empty
    , prs = Dict.empty
    , projects = Dict.empty
    , columnCards = Dict.empty
    , references = Dict.empty
    , actors = Dict.empty
    , reviewers = Dict.empty
    }


expectJsonWithIndex : JD.Decoder a -> Http.Expect (Indexed a)
expectJsonWithIndex decoder =
    Http.expectStringResponse <|
        \{ body, headers } ->
            case ( JD.decodeString decoder body, Maybe.map String.toInt (Dict.get "x-data-index" headers) ) of
                ( Ok value, Just (Ok index) ) ->
                    Ok { index = index, value = value }

                ( Ok value, _ ) ->
                    Ok { index = 1, value = value }

                ( Err msg, _ ) ->
                    Err msg


fetchData : (Result Http.Error (Indexed Data) -> msg) -> Cmd msg
fetchData f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


pollData : (Result Http.Error (Indexed Data) -> msg) -> Cmd msg
pollData f =
    HttpBuilder.get "/poll"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeData)
        |> HttpBuilder.withTimeout (60 * Time.second)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshCards : GitHubGraph.ID -> (Result Http.Error (Indexed (List ColumnCard)) -> msg) -> Cmd msg
refreshCards col f =
    HttpBuilder.get ("/refresh?columnCards=" ++ col)
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeCards)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshRepo : GitHubGraph.RepoSelector -> (Result Http.Error (Indexed GitHubGraph.Repo) -> msg) -> Cmd msg
refreshRepo repo f =
    HttpBuilder.get ("/refresh?repo=" ++ repo.owner ++ "/" ++ repo.name)
        |> HttpBuilder.withExpect (expectJsonWithIndex GitHubGraph.decodeRepo)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshIssue : GitHubGraph.ID -> (Result Http.Error (Indexed GitHubGraph.Issue) -> msg) -> Cmd msg
refreshIssue id f =
    HttpBuilder.get ("/refresh?issue=" ++ id)
        |> HttpBuilder.withExpect (expectJsonWithIndex GitHubGraph.decodeIssue)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshPR : GitHubGraph.ID -> (Result Http.Error (Indexed GitHubGraph.PullRequest) -> msg) -> Cmd msg
refreshPR id f =
    HttpBuilder.get ("/refresh?pr=" ++ id)
        |> HttpBuilder.withExpect (expectJsonWithIndex GitHubGraph.decodePullRequest)
        |> HttpBuilder.toTask
        |> Task.attempt f


fetchMe : (Result Http.Error (Maybe Me) -> msg) -> Cmd msg
fetchMe f =
    HttpBuilder.get "/me"
        |> HttpBuilder.withExpect (Http.expectJson (JD.maybe decodeMe))
        |> HttpBuilder.toTask
        |> Task.attempt f


decodeData : JD.Decoder Data
decodeData =
    JD.succeed Data
        |: (JD.field "repos" <| JD.dict GitHubGraph.decodeRepo)
        |: (JD.field "issues" <| JD.dict GitHubGraph.decodeIssue)
        |: (JD.field "prs" <| JD.dict GitHubGraph.decodePullRequest)
        |: (JD.field "projects" <| JD.dict GitHubGraph.decodeProject)
        |: (JD.field "columnCards" <| JD.dict decodeCards)
        |: (JD.field "references" <| JD.dict (JD.list JD.string))
        |: (JD.field "actors" <| JD.dict (JD.list decodeEventActor))
        |: (JD.field "reviewers" <| JD.dict (JD.list GitHubGraph.decodePullRequestReview))


decodeCards : JD.Decoder (List ColumnCard)
decodeCards =
    JD.list decodeColumnCard


decodeColumnCard : JD.Decoder ColumnCard
decodeColumnCard =
    JD.succeed ColumnCard
        |: JD.field "id" JD.string
        |: (JD.maybe <| JD.field "contentId" JD.string)
        |: (JD.maybe <| JD.field "note" JD.string)


decodeMe : JD.Decoder Me
decodeMe =
    JD.succeed Me
        |: JD.field "token" JD.string
        |: JD.field "user" decodeUser


decodeUser : JD.Decoder User
decodeUser =
    JD.succeed User
        |: JD.field "id" JD.int
        |: JD.field "login" JD.string
        |: JD.field "html_url" JD.string
        |: JD.field "avatar_url" JD.string


decodeEventActor : JD.Decoder EventActor
decodeEventActor =
    JD.succeed EventActor
        |: JD.field "user" (JD.maybe GitHubGraph.decodeUser)
        |: JD.field "avatar" JD.string
        |: JD.field "createdAt" JDE.date


encodeEventActor : EventActor -> JE.Value
encodeEventActor { user, avatar, createdAt } =
    JE.object
        [ ( "user", JEE.maybe GitHubGraph.encodeUser user )
        , ( "avatar", JE.string avatar )
        , ( "createdAt", JE.string (Date.Format.formatISO8601 createdAt) )
        ]
