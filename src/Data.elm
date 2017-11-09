module Data exposing (Data, fetch)

import HttpBuilder
import Json.Decode.Extra exposing ((|:))
import Json.Decode
import Dict exposing (Dict)
import GitHubGraph
import Task
import Http


type alias Data =
    { issues : Dict String (List GitHubGraph.Issue)
    , references : Dict String (List GitHubGraph.ID)
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
        |: (Json.Decode.field "issues" <| Json.Decode.dict (Json.Decode.list GitHubGraph.decodeIssue))
        |: (Json.Decode.field "references" <| Json.Decode.dict (Json.Decode.list Json.Decode.string))
