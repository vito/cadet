module Backend exposing (Data, Me, User, ActorEvent, emptyData, fetchData, fetchMe, encodeActorEvent)

import HttpBuilder
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Json.Encode as JE
import Dict exposing (Dict)
import GitHubGraph
import Task
import Http
import Date exposing (Date)


type alias Data =
    { issues : Dict String (List GitHubGraph.Issue)
    , prs : Dict String (List GitHubGraph.PullRequest)
    , references : Dict String (List GitHubGraph.ID)
    , actors : Dict String (List ActorEvent)
    , projects : List GitHubGraph.Project
    , cards : Dict String (List GitHubGraph.ProjectColumnCard)
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
    { issues = Dict.empty
    , prs = Dict.empty
    , references = Dict.empty
    , actors = Dict.empty
    , projects = []
    , cards = Dict.empty
    }


fetchData : (Result Http.Error Data -> msg) -> Cmd msg
fetchData f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


fetchMe : (Result Http.Error Me -> msg) -> Cmd msg
fetchMe f =
    HttpBuilder.get "/me"
        |> HttpBuilder.withExpect (Http.expectJson decodeMe)
        |> HttpBuilder.toTask
        |> Task.attempt f


decodeData : JD.Decoder Data
decodeData =
    JD.succeed Data
        |: (JD.field "issues" <| JD.dict (JD.list GitHubGraph.decodeIssue))
        |: (JD.field "prs" <| JD.dict (JD.list GitHubGraph.decodePullRequest))
        |: (JD.field "references" <| JD.dict (JD.list JD.string))
        |: (JD.field "actors" <| JD.dict (JD.list decodeActorEvent))
        |: (JD.field "projects" <| JD.list GitHubGraph.decodeProject)
        |: (JD.field "cards" <| JD.dict (JD.list GitHubGraph.decodeProjectColumnCard))


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
        , ( "createdAt", JE.string (toString createdAt) )
        ]
