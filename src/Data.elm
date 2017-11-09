module Data exposing (Data, ActorEvent, fetch, encodeActorEvent)

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
    , references : Dict String (List GitHubGraph.ID)
    , actors : Dict String (List ActorEvent)
    }


type alias ActorEvent =
    { actor : GitHubGraph.User
    , createdAt : Date
    }


fetch : (Result Http.Error Data -> msg) -> Cmd msg
fetch f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


decodeData : JD.Decoder Data
decodeData =
    JD.succeed Data
        |: (JD.field "issues" <| JD.dict (JD.list GitHubGraph.decodeIssue))
        |: (JD.field "references" <| JD.dict (JD.list JD.string))
        |: (JD.field "actors" <| JD.dict (JD.list decodeActorEvent))


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
