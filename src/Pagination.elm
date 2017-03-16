module Pagination exposing (Paginated, Pagination, Strategy, fetch, fetchAll)

import Http
import Json.Decode
import Task exposing (Task)


type alias Paginated page a =
    { content : List a
    , pagination : Pagination page
    }


type alias Strategy page a =
    { onPage : page -> String -> String
    , nextPage : Http.Response String -> Maybe page
    , previousPage : Http.Response String -> Maybe page
    , content : Json.Decode.Decoder (List a)
    }


type alias Pagination page =
    { previousPage : Maybe page
    , nextPage : Maybe page
    }


fetch : String -> List Http.Header -> Strategy page a -> Maybe page -> Task Http.Error (Paginated page a)
fetch url headers strategy mpage =
  Http.toTask <|
    Http.request
      { method = "GET"
      , headers = headers
      , url =
          case mpage of
            Nothing ->
              url
            Just page ->
              strategy.onPage page url
      , body = Http.emptyBody
      , expect = Http.expectStringResponse (parsePagination strategy)
      , timeout = Nothing
      , withCredentials = False
      }


parsePagination : Strategy page a -> Http.Response String -> Result String (Paginated page a)
parsePagination strategy response =
    let
        decoded =
            Json.Decode.decodeString strategy.content response.body
    in
        case decoded of
            Err err ->
                Err err

            Ok content ->
                Ok
                  { content = content
                  , pagination =
                      { previousPage = strategy.previousPage response
                      , nextPage = strategy.nextPage response
                      }
                  }


fetchAll : String -> List Http.Header -> Strategy page a -> Maybe page -> Task Http.Error (List a)
fetchAll url headers strategy mpage =
    fetch url headers strategy mpage
        |> Task.andThen
            (\paginated ->
                case paginated.pagination.nextPage of
                    Nothing ->
                        Task.succeed paginated.content

                    Just next ->
                        Task.map ((++) paginated.content) (fetchAll url headers strategy (Just next))
            )
