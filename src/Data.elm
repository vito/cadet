module Data exposing (Data, fetch)

import HttpBuilder
import Json.Decode.Extra exposing ((|:))
import Json.Decode
import Dict exposing (Dict)
import GitHub
import Task
import Http


type alias Data =
    { repositories : List GitHub.Repo
    , issues : Dict String (List GitHub.Issue)
    , timelines : Dict String (List GitHub.TimelineEvent)
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
        |: (Json.Decode.field "repositories" <| Json.Decode.list GitHub.decodeRepo)
        |: (Json.Decode.field "issues" <| Json.Decode.dict (Json.Decode.list GitHub.decodeIssue))
        |: (Json.Decode.field "timelines" <| Json.Decode.dict (Json.Decode.list GitHub.decodeTimelineEvent))
