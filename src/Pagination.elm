module Pagination exposing (Paginated, Pagination, Strategy, fetch, fetchAll)

import Http
import Json.Decode
import Task exposing (Task)

type alias Paginated page a =
  { content : List a
  , pagination : Pagination page
  }

type alias Strategy page a =
  { onPage : page -> Http.Request -> Http.Request
  , nextPage : Http.Response -> Maybe page
  , previousPage : Http.Response -> Maybe page
  , content : Json.Decode.Decoder (List a)
  }

type alias Pagination page =
  { previousPage : Maybe page
  , nextPage : Maybe page
  }

fetch : String -> List (String, String) -> Strategy page a -> Maybe page -> Task Http.Error (Paginated page a)
fetch url headers strategy mpage =
  let
    request =
      { verb = "GET"
      , headers = headers
      , url = url
      , body = Http.empty
      }

    paginatedRequest =
      case mpage of
        Nothing ->
          request
        Just page ->
          strategy.onPage page request

    get =
      Http.send Http.defaultSettings paginatedRequest
  in
    Task.mapError promoteHttpError get `Task.andThen` \response ->
      case handleResponse response `Result.andThen` decodeBody strategy.content of
        Ok content ->
          Task.succeed
            { content = content
            , pagination =
                { previousPage = strategy.previousPage response
                , nextPage = strategy.nextPage response
                }
            }

        Err err ->
          Task.fail err

decodeBody : Json.Decode.Decoder (List a) -> String -> Result Http.Error (List a)
decodeBody decode body =
  Json.Decode.decodeString decode body
    |> Result.formatError Http.UnexpectedPayload

fetchAll : String -> List (String, String) -> Strategy page a -> Maybe page -> Task Http.Error (List a)
fetchAll url headers strategy mpage =
  fetch url headers strategy mpage `Task.andThen` \paginated ->
    case paginated.pagination.nextPage of
      Nothing ->
        Task.succeed paginated.content

      Just next ->
        Task.map ((++) paginated.content) (fetchAll url headers strategy (Just next))

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
