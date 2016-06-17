module GitHub exposing (Issue, fetchOrgIssues)

import Dict exposing (Dict)
import Http
import Json.Decode exposing ((:=))
import Regex exposing (Regex)
import String
import Task exposing (Task)

import Pagination

type alias Token = String

type alias Issue =
  { repo : Repo
  , id : Int
  , url : String
  , number : Int
  , title : String
  }

type alias Repo =
  { id : Int
  , url : String
  , owner : String
  , name : String
  , openIssues : Int
  }

fetchOrgRepos : Token -> String -> Task Http.Error (List Repo)
fetchOrgRepos token org =
  Pagination.fetchAll
    ("https://api.github.com/orgs/" ++ org ++ "/repos?per_page=100")
    [("Authorization", "token " ++ token)]
    (rfc5988Strategy decodeRepo)
    Nothing

fetchOrgIssues : Token -> String -> Task Http.Error (List Issue)
fetchOrgIssues token org =
  fetchOrgRepos token org `Task.andThen` \repos ->
    Task.map List.concat <| Task.sequence (List.map (fetchRepoIssues token) repos)

fetchRepoIssues : Token -> Repo -> Task Http.Error (List Issue)
fetchRepoIssues token repo =
  if repo.openIssues == 0 then
    Task.succeed []
  else
    Pagination.fetchAll
      ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/issues?per_page=100")
      [("Authorization", "token " ++ token)]
      (rfc5988Strategy (decodeIssue repo))
      Nothing

decodeRepo : Json.Decode.Decoder Repo
decodeRepo =
  Json.Decode.object5 Repo
    ("id" := Json.Decode.int)
    ("html_url" := Json.Decode.string)
    (Json.Decode.at ["owner", "login"] Json.Decode.string)
    ("name" := Json.Decode.string)
    ("open_issues_count" := Json.Decode.int)

decodeIssue : Repo -> Json.Decode.Decoder Issue
decodeIssue repo =
  Json.Decode.object4 (Issue repo)
    ("id" := Json.Decode.int)
    ("html_url" := Json.Decode.string)
    ("number" := Json.Decode.int)
    ("title" := Json.Decode.string)


rfc5988Strategy : Json.Decode.Decoder a -> Pagination.Strategy Int a
rfc5988Strategy decode =
  { onPage = \page request ->
      { request | url = addParams request.url page }

  , nextPage =
      parseLink nextRel

  , previousPage =
      parseLink previousRel

  , content =
      Json.Decode.list decode
  }

parseLink : String -> Http.Response -> Maybe Int
parseLink rel response =
  Dict.get "Link" response.headers `Maybe.andThen` \commaSeparatedCraziness ->
    let
      headers = String.split ", " commaSeparatedCraziness
      parsed = Dict.fromList <| List.filterMap parseLinkTuple headers
    in
      Dict.get rel parsed `Maybe.andThen` parseParams

previousRel : String
previousRel = "prev"

nextRel : String
nextRel = "next"

linkHeaderRegex : Regex
linkHeaderRegex =
  Regex.regex ("<([^>]+)>; rel=\"(" ++ previousRel ++ "|" ++ nextRel ++ ")\"")

parseLinkTuple : String -> Maybe (String, String)
parseLinkTuple header =
  case Regex.find (Regex.AtMost 1) linkHeaderRegex header of
    [] ->
      Nothing

    {submatches} :: _ ->
      case submatches of
        (Just url :: Just rel :: _) ->
          Just (rel, url)

        _ ->
          Nothing

parseParams : String -> Maybe Int
parseParams =
  fromQuery << snd << extractQuery

addParams : String -> Int -> String
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

fromQuery : Dict String String -> Maybe Int
fromQuery query =
  let
    num = Maybe.withDefault 1 <|
      Dict.get "page" query `Maybe.andThen` parseNum
  in
    Just num

toQuery : Int -> Dict String String
toQuery page =
  Dict.singleton "page" (toString page)

parseNum : String -> Maybe Int
parseNum =
  Result.toMaybe << String.toInt
