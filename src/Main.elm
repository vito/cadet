module Main exposing (..)

import Dict exposing (Dict)
import Html exposing (Html, div, pre, text, a, span)
import Html.Lazy
import Html.Attributes exposing (class, href)
import Html.App as Html
import Http
import Task exposing (Task)

import GitHub
import Tracker

type alias Model =
  { config : Config
  , stories : List Tracker.Story
  , issues : List GitHub.Issue
  , error : Maybe String
  }

type alias Config =
  { githubToken : String
  , githubOrganization : String
  , trackerToken : String
  , trackerProject : Int
  }

main : Program Config
main =
  Html.programWithFlags
    { init = init
    , update = update
    , view = Html.Lazy.lazy view
    , subscriptions = always Sub.none
    }

type Msg
  = Noop
  | IssuesAndStoriesFetched (List Tracker.Story) (List GitHub.Issue)
  | APIError Http.Error

init : Config -> (Model, Cmd Msg)
init config =
  ( { config = config
    , stories = []
    , issues = []
    , error = Nothing
    }
  , fetchStoriesAndIssues config
  )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Noop ->
      (model, Cmd.none)

    IssuesAndStoriesFetched stories issues ->
      ({ model | error = Nothing, stories = stories, issues = issues }, Cmd.none)

    APIError e ->
      ({ model | error = Just (toString e) }, Cmd.none)

view : Model -> Html Msg
view model =
  case model.error of
    Just msg ->
      pre [] [text msg]

    Nothing ->
      let
        topics =
          groupByTopic model.stories model.issues

        (scheduled, unscheduled) =
          List.partition topicIsScheduled topics
      in
        div [class "columns"] [
          div [class "column triaged"] [
            div [class "cell backlog"] <|
              List.map viewTopic scheduled,
            div [class "cell icebox"] <|
              List.map viewTopic unscheduled
          ]
        ]

viewStory : Tracker.Story -> Html Msg
viewStory story =
  div [class "story"] [
    div [class "story-summary"] [
      a [href story.url, class "story-location"] [
        text story.summary
      ]
    ]
  ]


viewIssue : GitHub.Issue -> Html Msg
viewIssue issue =
  div [class "issue"] [
    div [class "issue-summary"] [
      a [href issue.url, class "issue-location"] [
        text (issue.repo.owner ++ "/" ++ issue.repo.name ++ " #" ++ toString issue.number)
      ],

      span [class "issue-title"] [
        text issue.title
      ]
    ]
  ]

viewTopic : Topic -> Html Msg
viewTopic {stories, issues} =
  div [class "topic"] [
    div [class "topic-stories"]
      (List.map viewStory stories),
    div [class "topic-issues"]
      (List.map viewIssue issues)
  ]

fetchStoriesAndIssues : Config -> Cmd Msg
fetchStoriesAndIssues config =
  Task.perform APIError (uncurry IssuesAndStoriesFetched) <|
    fetchStories config `Task.andThen` \stories ->
      fetchIssues config `Task.andThen` \issues ->
        Task.succeed (stories, issues)

fetchIssues : Config -> Task Http.Error (List GitHub.Issue)
fetchIssues config =
  GitHub.fetchOrgIssues
    config.githubToken
    config.githubOrganization

fetchStories : Config -> Task Http.Error (List Tracker.Story)
fetchStories config =
  Tracker.fetchProjectStories
    config.trackerToken
    config.trackerProject

type alias Topic =
  { stories : List Tracker.Story
  , issues : List GitHub.Issue
  }

groupByTopic : List Tracker.Story -> List GitHub.Issue -> List Topic
groupByTopic stories issues =
  let
    story2Issues =
      List.foldl (\story -> Dict.insert story.id (storyIssues story issues)) Dict.empty stories

    issue2Stories =
      List.foldl (\issue -> Dict.insert issue.id (issueStories issue stories)) Dict.empty issues
  in
    Dict.values story2Issues
      |> List.map (expandTopic issue2Stories story2Issues)
      |> List.filter (not << topicIsBlank)
      |> List.map (\topic -> (topicID topic, topic))
      |> Dict.fromList
      |> Dict.values

expandTopic : Dict Int (List Tracker.Story) -> Dict Int (List GitHub.Issue) -> List GitHub.Issue -> Topic
expandTopic i2s s2i i1 =
  let
    s1 =
      allRelated i1 i2s

    i2 =
      allRelated s1 s2i

    s2 =
      allRelated i2 i2s
  in
    { stories = s2, issues = i2 }

allRelated : List { a | id : Int } -> Dict Int (List { b | id : Int }) -> List { b | id : Int }
allRelated xs x2ys =
  Dict.values <| List.foldl Dict.union Dict.empty <|
    List.map (\x ->
      case Dict.get x.id x2ys of
        Nothing ->
          Dict.empty

        Just ys ->
          Dict.fromList (List.map (\y -> (y.id, y)) ys)) xs

storyIssues : Tracker.Story -> List GitHub.Issue -> List GitHub.Issue
storyIssues story issues =
  List.filter (storyIsForIssue story) issues

storyIsForIssue : Tracker.Story -> GitHub.Issue -> Bool
storyIsForIssue story issue =
  List.member (issueLabel issue) story.labels

issueStories : GitHub.Issue -> List Tracker.Story -> List Tracker.Story
issueStories issue stories =
  List.filter (flip storyIsForIssue issue) stories

issueLabel : GitHub.Issue -> String
issueLabel issue =
  issue.repo.owner ++ "/" ++ issue.repo.name ++ "#" ++ toString issue.number

topicIsBlank : Topic -> Bool
topicIsBlank {stories, issues} =
  List.isEmpty stories && List.isEmpty issues

topicID : Topic -> (List Int, List Int)
topicID {stories, issues} =
  ( List.sort (List.map .id stories)
  , List.sort (List.map .id issues)
  )

topicIsScheduled : Topic -> Bool
topicIsScheduled {stories} =
  List.any Tracker.storyIsScheduled stories
