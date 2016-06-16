module Main exposing (..)

import Html exposing (Html, div, pre, text, a, span)
import Html.Attributes exposing (class, href)
import Html.App as Html
import Http
import Task exposing (Task)
import Time

import GitHub
import Tracker

type alias Model =
  { stories : List Tracker.Story
  , issues : List GitHub.Issue
  , error : Maybe String
  }

main : Program Never
main =
  Html.program
    { init = init
    , update = update
    , view = view
    , subscriptions = \_ ->
        Time.every Time.second (always Noop)
    }

type Msg
  = Noop
  | IssuesAndStoriesFetched (List Tracker.Story) (List GitHub.Issue)
  | APIError Http.Error

init : (Model, Cmd Msg)
init =
  ({ stories = [], issues = [], error = Nothing }, fetchStoriesAndIssues)

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
      div [class "columns"] [
        div [class "stories column"]
          (List.map viewStory model.stories),
        div [class "issues column"]
          (List.map viewIssue model.issues)
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

fetchStoriesAndIssues : Cmd Msg
fetchStoriesAndIssues =
  Task.perform APIError (uncurry IssuesAndStoriesFetched) <|
    fetchStories `Task.andThen` \stories ->
      fetchIssues `Task.andThen` \issues ->
        Task.succeed (stories, issues)

fetchIssues : Task Http.Error (List GitHub.Issue)
fetchIssues =
  GitHub.fetchOrgIssues
    "token bfa5d14a30eb1b962a5d26f941b3e9039df21bb2"
    "concourse"

fetchStories : Task Http.Error (List Tracker.Story)
fetchStories =
  Tracker.fetchProjectStories
    "790f312a5aa2a755e7b22539dbd35560"
    1059262
