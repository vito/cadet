module Backend
    exposing
        ( Data
        , Me
        , User
        , ActorEvent
        , emptyData
        , fetchData
        , pollData
        , refreshCards
        , refreshRepo
        , refreshIssue
        , refreshPR
        , fetchMe
        , encodeActorEvent
        )

import HttpBuilder
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Json.Encode as JE
import Date.Format
import Dict exposing (Dict)
import GitHubGraph
import Task
import Http
import Date exposing (Date)
import Time


type alias Data =
    { repos : Dict GitHubGraph.ID GitHubGraph.Repo
    , issues : Dict GitHubGraph.ID GitHubGraph.Issue
    , prs : Dict GitHubGraph.ID GitHubGraph.PullRequest
    , projects : Dict GitHubGraph.ID GitHubGraph.Project
    , columnCards : Dict GitHubGraph.ID (List GitHubGraph.ProjectColumnCard)
    , references : Dict GitHubGraph.ID (List GitHubGraph.ID)
    , actors : Dict GitHubGraph.ID (List ActorEvent)
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


type alias ActorEvent =
    { actor : GitHubGraph.User
    , createdAt : Date
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
    }


fetchData : (Result Http.Error Data -> msg) -> Cmd msg
fetchData f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


pollData : (Result Http.Error Data -> msg) -> Cmd msg
pollData f =
    HttpBuilder.get "/poll"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.withTimeout (60 * Time.second)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshCards : GitHubGraph.ID -> (Result Http.Error (List GitHubGraph.ProjectColumnCard) -> msg) -> Cmd msg
refreshCards col f =
    HttpBuilder.get ("/refresh?cards=" ++ col)
        |> HttpBuilder.withExpect (Http.expectJson decodeCards)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshRepo : GitHubGraph.RepoSelector -> (Result Http.Error GitHubGraph.Repo -> msg) -> Cmd msg
refreshRepo repo f =
    HttpBuilder.get ("/refresh?repo=" ++ repo.owner ++ "/" ++ repo.name)
        |> HttpBuilder.withExpect (Http.expectJson GitHubGraph.decodeRepo)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshIssue : GitHubGraph.ID -> (Result Http.Error GitHubGraph.Issue -> msg) -> Cmd msg
refreshIssue id f =
    HttpBuilder.get ("/refresh?issue=" ++ id)
        |> HttpBuilder.withExpect (Http.expectJson GitHubGraph.decodeIssue)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshPR : GitHubGraph.ID -> (Result Http.Error GitHubGraph.PullRequest -> msg) -> Cmd msg
refreshPR id f =
    HttpBuilder.get ("/refresh?pr=" ++ id)
        |> HttpBuilder.withExpect (Http.expectJson GitHubGraph.decodePullRequest)
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
        |: (JD.field "actors" <| JD.dict (JD.list decodeActorEvent))


decodeCards : JD.Decoder (List GitHubGraph.ProjectColumnCard)
decodeCards =
    JD.list GitHubGraph.decodeProjectColumnCard


decodeMe : JD.Decoder Me
decodeMe =
    JD.succeed Me
        |: (JD.field "token" JD.string)
        |: (JD.field "user" decodeUser)


decodeUser : JD.Decoder User
decodeUser =
    JD.succeed User
        |: (JD.field "id" JD.int)
        |: (JD.field "login" JD.string)
        |: (JD.field "html_url" JD.string)
        |: (JD.field "avatar_url" JD.string)


decodeActorEvent : JD.Decoder ActorEvent
decodeActorEvent =
    JD.succeed ActorEvent
        |: (JD.field "actor" GitHubGraph.decodeUser)
        |: (JD.field "createdAt" JDE.date)


encodeActorEvent : ActorEvent -> JE.Value
encodeActorEvent { actor, createdAt } =
    JE.object
        [ ( "actor", GitHubGraph.encodeUser actor )
        , ( "createdAt", JE.string (Date.Format.formatISO8601 createdAt) )
        ]
