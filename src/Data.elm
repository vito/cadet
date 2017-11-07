module Data exposing (Data, ActorEvent, fetch)

import HttpBuilder
import Json.Decode.Extra exposing ((|:))
import Json.Decode
import Dict exposing (Dict)
import GitHub
import Task
import Http
import Date exposing (Date)


type alias Data =
    { issues : Dict String (List GitHub.Issue)
    , references : Dict String (List Int)
    , actors : Dict String (List ActorEvent)
    }


type alias ActorEvent =
    { createdAt : Date
    , actor : GitHub.User
    }


fetch : (Result Http.Error Data -> msg) -> Cmd msg
fetch f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (Http.expectJson decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


decodeData : Json.Decode.Decoder Data
decodeData =
    Json.Decode.succeed Data
        |: (Json.Decode.field "issues" <| Json.Decode.dict (Json.Decode.list GitHub.decodeIssue))
        |: (Json.Decode.field "references" <| Json.Decode.dict (Json.Decode.list Json.Decode.int))
        |: (Json.Decode.field "actors" <| Json.Decode.dict (Json.Decode.list decodeActorEvent))


decodeActorEvent : Json.Decode.Decoder ActorEvent
decodeActorEvent =
    Json.Decode.succeed ActorEvent
        |: (Json.Decode.field "created_at" (Json.Decode.map Date.fromTime Json.Decode.float))
        |: (Json.Decode.field "actor" GitHub.decodeUser)
