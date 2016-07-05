module Tracker exposing (Story, Iteration, StoryType(..), StoryState(..), fetchProjectStories, fetchProjectBacklog, startStory, storyIsScheduled, storyIsInFlight)

import Dict exposing (Dict)
import Http
import Json.Decode exposing ((:=))
import String
import Task exposing (Task)

import Pagination

type alias Token = String

type alias Story =
  { id : Int
  , url : String
  , summary : String
  , type' : StoryType
  , estimate : Maybe Int
  , state : StoryState
  , labels : List String
  }

type alias Iteration =
  { number : Int
  , stories : List Story
  }

type StoryType
  = StoryTypeChore
  | StoryTypeFeature
  | StoryTypeBug
  | StoryTypeRelease

type StoryState
  = StoryStateUnscheduled
  | StoryStateUnstarted
  | StoryStateStarted
  | StoryStateFinished
  | StoryStateDelivered
  | StoryStateAccepted
  | StoryStateRejected

fetchProjectStories : Token -> Int -> Task Http.Error (List Story)
fetchProjectStories token project =
  Pagination.fetchAll
    ("https://www.pivotaltracker.com/services/v5/projects/" ++ toString project ++ "/stories?envelope=true")
    [("X-TrackerToken", token)]
    (trackerPagination decodeStory)
    Nothing

fetchProjectBacklog : Token -> Int -> Task Http.Error (List Iteration)
fetchProjectBacklog token project =
  Pagination.fetchAll
    ("https://www.pivotaltracker.com/services/v5/projects/" ++ toString project ++ "/iterations?envelope=true&scope=current_backlog")
    [("X-TrackerToken", token)]
    (trackerPagination decodeIteration)
    Nothing

startStory : Token -> Int -> Int -> Task Http.Error Story
startStory token project story =
  let
    start =
      Http.send Http.defaultSettings
        { verb = "PUT"
        , headers =
            [ ("X-TrackerToken", token)
            , ("Content-Type", "application/json")
            ]
        , url = "https://www.pivotaltracker.com/services/v5/projects/" ++ toString project ++ "/stories/" ++ toString story
        , body = Http.string "{\"current_state\":\"started\"}"
        }
  in
    Task.mapError promoteHttpError start `Task.andThen` \response ->
      case handleResponse response `Result.andThen` decodeBody of
        Ok story ->
          Task.succeed story

        Err err ->
          Task.fail err


storyIsScheduled : Story -> Bool
storyIsScheduled {state} =
  state /= StoryStateUnscheduled

storyIsInFlight : Story -> Bool
storyIsInFlight {state} =
  case state of
    StoryStateUnscheduled ->
      False
    StoryStateUnstarted ->
      False
    StoryStateStarted ->
      True
    StoryStateFinished ->
      True
    StoryStateDelivered ->
      True
    StoryStateAccepted ->
      False
    StoryStateRejected ->
      True

decodeBody : String -> Result Http.Error Story
decodeBody body =
  Json.Decode.decodeString decodeStory body
    |> Result.formatError Http.UnexpectedPayload

decodeStory : Json.Decode.Decoder Story
decodeStory =
  Json.Decode.object7 Story
    ("id" := Json.Decode.int)
    ("url" := Json.Decode.string)
    ("name" := Json.Decode.string)
    ("story_type" := decodeStoryType)
    (Json.Decode.maybe ("estimate" := Json.Decode.int))
    ("current_state" := decodeStoryState)
    ("labels" := Json.Decode.list ("name" := Json.Decode.string))

decodeIteration : Json.Decode.Decoder Iteration
decodeIteration =
  Json.Decode.object2 Iteration
    ("number" := Json.Decode.int)
    ("stories" := Json.Decode.list decodeStory)

decodeStoryType : Json.Decode.Decoder StoryType
decodeStoryType =
  Json.Decode.customDecoder Json.Decode.string <| \x ->
    case x of
      "chore" ->
        Ok StoryTypeChore
      "feature" ->
        Ok StoryTypeFeature
      "bug" ->
        Ok StoryTypeBug
      "release" ->
        Ok StoryTypeRelease
      _ ->
        Err ("unknown story type: " ++ x)

decodeStoryState : Json.Decode.Decoder StoryState
decodeStoryState =
  Json.Decode.customDecoder Json.Decode.string <| \x ->
    case x of
      "unscheduled" ->
        Ok StoryStateUnscheduled
      "unstarted" ->
        Ok StoryStateUnstarted
      "started" ->
        Ok StoryStateStarted
      "finished" ->
        Ok StoryStateFinished
      "delivered" ->
        Ok StoryStateDelivered
      "accepted" ->
        Ok StoryStateAccepted
      "rejected" ->
        Ok StoryStateRejected
      _ ->
        Err ("unknown story state: " ++ x)

type Page = Offset Int

trackerPagination : Json.Decode.Decoder a -> Pagination.Strategy Page a
trackerPagination decode =
  { onPage = \page request ->
      { request | url = addParams request.url page }

  , nextPage = \response ->
      case response.value of
        Http.Text body ->
          let
            rtotal =
              Json.Decode.decodeString (Json.Decode.at ["pagination", "total"] Json.Decode.int) body

            roffset =
              Json.Decode.decodeString (Json.Decode.at ["pagination", "offset"] Json.Decode.int) body

            rreturned =
              Json.Decode.decodeString (Json.Decode.at ["pagination", "returned"] Json.Decode.int) body
          in
            case (rtotal, roffset, rreturned) of
              (Ok total, Ok offset, Ok returned) ->
                if offset + returned < total
                  then Just (Offset (offset + returned))
                  else Nothing

              _ ->
                Nothing
        Http.Blob _ ->
          Nothing

  , previousPage =
      always Nothing

  , content =
      ("data" := Json.Decode.list decode)
  }

addParams : String -> Page -> String
addParams url page =
  let
    (baseURL, query) = extractQuery url
  in
    setQuery baseURL (Dict.union query (toQuery page))

extractQuery : String -> (String, Dict String String)
extractQuery url =
  case String.split "?" url of
    baseURL :: query :: _ ->
      (baseURL, parseQuery query)

    _ ->
      (url, Dict.empty)

setQuery : String -> Dict String String -> String
setQuery baseURL query =
  let
    params =
      String.join "&" <|
        List.map (\(k, v) -> k ++ "=" ++ v) (Dict.toList query)
  in
    if params == "" then
      baseURL
    else
      baseURL ++ "?" ++ params

parseQuery : String -> Dict String String
parseQuery query =
  let
    parseParam p =
      case String.split "=" p of
        k :: vs ->
          (k, String.join "=" vs)

        [] ->
          ("", "")
  in
    Dict.fromList <|
      List.map parseParam <|
        String.split "&" query

toQuery : Page -> Dict String String
toQuery (Offset offset) =
  Dict.singleton "offset" (toString offset)

parseNum : String -> Maybe Int
parseNum =
  Result.toMaybe << String.toInt

handleResponse : Http.Response -> Result Http.Error String
handleResponse response =
  if 200 <= response.status && response.status < 300 then
    case response.value of
      Http.Text str ->
        Ok str

      _ ->
        Err (Http.UnexpectedPayload "Response body is a blob, expecting a string.")
  else
    Err (Http.BadResponse response.status response.statusText)

promoteHttpError : Http.RawError -> Http.Error
promoteHttpError rawError =
  case rawError of
    Http.RawTimeout -> Http.Timeout
    Http.RawNetworkError -> Http.NetworkError
