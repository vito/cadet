module GitHub exposing
  ( APIError
  , Error
  , Repo
  , Issue
  , Comment
  , User
  , fetchOrgMembers
  , fetchOrgRepos
  , fetchRepoIssues
  , fetchIssueComments
  , issueScore
  , reactionCodes
  , reactionScore
  )

import Date exposing (Date)
import Dict exposing (Dict)
import Http
import HttpBuilder
import Json.Decode exposing ((:=))
import Json.Decode.Extra exposing ((|:))
import Regex exposing (Regex)
import String
import Task exposing (Task)

import Pagination

type alias Token = String

type alias APIError =
  { message : String
  }

type alias Error =
  HttpBuilder.Error APIError


type alias Repo =
  { id : Int
  , url : String
  , owner : User
  , name : String
  , openIssues : Int
  }

type alias Issue =
  { repo : Repo
  , id : Int
  , createdAt : Date
  , updatedAt : Date
  , url : String
  , isPullRequest : Bool
  , user : User
  , number : Int
  , title : String
  , commentCount : Int
  , reactions : Reactions
  }

type alias Comment =
  { issue : Issue
  , id : Int
  , createdAt : Date
  , updatedAt : Date
  , url : String
  , user : User
  , reactions : Reactions
  }

type alias User =
  { id : Int
  , url : String
  , login : String
  , avatar : String
  }

type alias Reactions =
  { plusOne : Int
  , minusOne : Int
  , laugh : Int
  , confused : Int
  , heart : Int
  , hooray : Int
  }

reactionCodes : Reactions -> List (String, Int)
reactionCodes reactions =
  [ ("\x1f44d", reactions.plusOne)
  , ("\x1f44e", reactions.minusOne)
  , ("\x1f604", reactions.laugh)
  , ("\x1f615", reactions.confused)
  , ("\x1f389", reactions.heart)
  , ("\x1f496", reactions.hooray)
  ]

issueScore : Issue -> Int
issueScore {reactions, commentCount, isPullRequest} =
  reactionScore reactions + (2 * commentCount) + (if isPullRequest then 1000 else 0)

reactionScore : Reactions -> Int
reactionScore reactions =
  List.sum [
    2 * reactions.plusOne,
    -2 * reactions.minusOne,
    1 * reactions.laugh,
    -1 * reactions.confused,
    3 * reactions.heart,
    3 * reactions.hooray
  ]

fetchOrgMembers : Token -> String -> Task Http.Error (List User)
fetchOrgMembers token org =
  Pagination.fetchAll
    ("https://api.github.com/orgs/" ++ org ++ "/members?per_page=100")
    [("Authorization", "token " ++ token)]
    (rfc5988Strategy decodeUser)
    Nothing

fetchOrgRepos : Token -> String -> Task Http.Error (List Repo)
fetchOrgRepos token org =
  Pagination.fetchAll
    ("https://api.github.com/orgs/" ++ org ++ "/repos?per_page=100")
    [("Authorization", "token " ++ token)]
    (rfc5988Strategy decodeRepo)
    Nothing

fetchRepoIssues : Token -> Repo -> Task Http.Error (List Issue)
fetchRepoIssues token repo =
  if repo.openIssues == 0 then
    Task.succeed []
  else
    Pagination.fetchAll
      ("https://api.github.com/repos/" ++ repo.owner.login ++ "/" ++ repo.name ++ "/issues?per_page=100")
      [("Authorization", "token " ++ token), ("Accept", "application/vnd.github.squirrel-girl-preview")]
      (rfc5988Strategy (decodeIssue repo))
      Nothing

fetchIssue : Token -> Repo -> Int -> Task Error Issue
fetchIssue token repo number =
  HttpBuilder.get ("https://api.github.com/repos/" ++ repo.owner.login ++ "/" ++ repo.name ++ "/issues/" ++ toString number)
    |> HttpBuilder.withHeader "Authorization" ("token " ++ token)
    |> HttpBuilder.withHeader "Accept" "application/vnd.github.squirrel-girl-preview"
    |> HttpBuilder.send (HttpBuilder.jsonReader (decodeIssue repo)) (HttpBuilder.jsonReader decodeError)
    |> Task.map .data

fetchIssueComments : Token -> Issue -> Task Http.Error (List Comment)
fetchIssueComments token issue =
  Pagination.fetchAll
    ("https://api.github.com/repos/" ++ issue.repo.owner.login ++ "/" ++ issue.repo.name ++ "/issues/" ++ toString issue.number ++ "/comments?per_page=100")
    [("Authorization", "token " ++ token), ("Accept", "application/vnd.github.squirrel-girl-preview")]
    (rfc5988Strategy (decodeComment issue))
    Nothing

decodeError : Json.Decode.Decoder APIError
decodeError =
  Json.Decode.object1 APIError
    ("message" := Json.Decode.string)

decodeRepo : Json.Decode.Decoder Repo
decodeRepo =
  Json.Decode.object5 Repo
    ("id" := Json.Decode.int)
    ("html_url" := Json.Decode.string)
    ("owner" := decodeUser)
    ("name" := Json.Decode.string)
    ("open_issues_count" := Json.Decode.int)

decodeIssue : Repo -> Json.Decode.Decoder Issue
decodeIssue repo =
  Json.Decode.succeed (Issue repo)
    |: ("id" := Json.Decode.int)
    |: ("created_at" := Json.Decode.Extra.date)
    |: ("updated_at" := Json.Decode.Extra.date)
    |: ("html_url" := Json.Decode.string)
    |: (Json.Decode.map ((/=) Nothing) << Json.Decode.maybe <| "pull_request" := Json.Decode.value)
    |: ("user" := decodeUser)
    |: ("number" := Json.Decode.int)
    |: ("title" := Json.Decode.string)
    |: ("comments" := excludeTracksuitComment (Json.Decode.int))
    |: ("reactions" := decodeReactions)

decodeComment : Issue -> Json.Decode.Decoder Comment
decodeComment issue =
  Json.Decode.object6 (Comment issue)
    ("id" := Json.Decode.int)
    ("created_at" := Json.Decode.Extra.date)
    ("updated_at" := Json.Decode.Extra.date)
    ("html_url" := Json.Decode.string)
    ("user" := decodeUser)
    ("reactions" := decodeReactions)

decodeUser : Json.Decode.Decoder User
decodeUser =
  Json.Decode.object4 User
    ("id" := Json.Decode.int)
    ("html_url" := Json.Decode.string)
    ("login" := Json.Decode.string)
    ("avatar_url" := Json.Decode.string)

excludeTracksuitComment : Json.Decode.Decoder Int -> Json.Decode.Decoder Int
excludeTracksuitComment =
  Json.Decode.map (flip (-) 1)

decodeReactions : Json.Decode.Decoder Reactions
decodeReactions =
  Json.Decode.object6 Reactions
    ("+1" := Json.Decode.int)
    ("-1" := Json.Decode.int)
    ("laugh" := Json.Decode.int)
    ("confused" := Json.Decode.int)
    ("heart" := Json.Decode.int)
    ("hooray" := Json.Decode.int)

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
