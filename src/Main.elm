module Main exposing (..)

import Dict exposing (Dict)
import Html exposing (Html, h1, h2, div, pre, text, a, span)
import Html.Lazy
import Html.Attributes exposing (class, classList, href)
import Html.App as Html
import Http
import Task exposing (Task)

import GitHub
import Tracker

type alias Config =
  { githubToken : String
  , githubOrganization : String
  , trackerToken : String
  , trackerProject : Int
  }

type alias Model =
  { config : Config
  , error : Maybe String

  , topicIterations : List Iteration
  , unscheduled : List Topic
  , themWaiting : List Topic
  , usWaiting : List Topic
  , pendingPullRequests : List Topic
  , pendingIssues : List Topic
  }

type alias Topic =
  { stories : List Tracker.Story
  , issues : List GitHub.Issue
  }

type alias Iteration =
  { number : Int
  , topics : List Topic
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
  | BacklogAndStoriesAndIssuesFetched (List Tracker.Iteration) (List Tracker.Story) (List GitHub.Issue)
  | EngagementCommentsFetched Topic (List GitHub.Comment)
  | APIError Http.Error

init : Config -> (Model, Cmd Msg)
init config =
  ( { config = config
    , error = Nothing

    , topicIterations = []
    , unscheduled = []
    , themWaiting = []
    , usWaiting = []
    , pendingPullRequests = []
    , pendingIssues = []
    }
  , fetchBacklogAndStoriesAndIssues config
  )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Noop ->
      (model, Cmd.none)

    BacklogAndStoriesAndIssuesFetched backlog stories issues ->
      let
        topics =
          groupByTopic stories issues

        (triaged, pending) =
          List.partition topicIsTriaged topics

        (scheduled, unscheduled) =
          List.partition topicIsScheduled triaged

        (engaged, remaining) =
          List.partition topicIsScheduled pending

        (pendingPullRequests, pendingIssues) =
          List.partition topicIsPullRequest pending

        topicIterations =
          groupTopicsByIteration backlog scheduled

        checkEngagements =
          List.map (checkEngagement model.config) engaged
      in
        ( { model |
            error = Nothing

          , topicIterations = topicIterations
          , unscheduled = unscheduled
          , pendingPullRequests = pendingPullRequests
          , pendingIssues = pendingIssues
          }
        , Cmd.batch checkEngagements
        )

    EngagementCommentsFetched topic comments ->
      case List.head (List.reverse comments) of
        Just comment ->
          if comment.user.login == "vito" then
            ({ model | usWaiting = topic :: model.usWaiting }, Cmd.none)
          else
            ({ model | themWaiting = topic :: model.themWaiting }, Cmd.none)

        Nothing ->
          ({ model | themWaiting = topic :: model.themWaiting }, Cmd.none)

    APIError e ->
      ({ model | error = Just (toString e) }, Cmd.none)

view : Model -> Html Msg
view model =
  case model.error of
    Just msg ->
      pre [] [text msg]

    Nothing ->
      div [class "columns"] [
        div [class "column"] [
          div [class "cell"] [
            h1 [class "cell-title"] [text "Backlog"],
            div [class "iterations"] <|
              List.map viewIteration model.topicIterations
          ]
        ],
        div [class "column"] [
          div [class "cell"] [
            h1 [class "cell-title"] [text "Icebox"],
            div [class "topics"] <|
              List.map viewTopic << List.reverse << List.sortBy topicActivity <|
                model.unscheduled
          ]
        ],
        div [class "column"] [
          div [class "cell"] [
            h1 [class "cell-title"] [text "Them Waiting"],
            div [class "topics"] <|
              List.map viewTopic << List.reverse << List.sortBy topicActivity <|
                model.themWaiting
          ],
          div [class "cell"] [
            h1 [class "cell-title"] [text "Us Waiting"],
            div [class "topics"] <|
              List.map viewTopic << List.reverse << List.sortBy topicActivity <|
                model.usWaiting
          ],
          div [class "cell"] [
            h1 [class "cell-title"] [text "Pull Requests"],
            div [class "topics"] <|
              List.map viewTopic << List.reverse << List.sortBy topicActivity <|
                model.pendingPullRequests
          ]
        ],
        div [class "column"] [
          div [class "cell"] [
            h1 [class "cell-title"] [text "Issues"],
            div [class "topics"] <|
              List.map viewTopic << List.reverse << List.sortBy topicActivity <|
                model.pendingIssues
          ]
        ]
      ]

viewStory : Tracker.Story -> Html Msg
viewStory story =
  div [
    classList [
      ("story", True),
      ("chore", story.type' == Tracker.StoryTypeChore),
      ("feature", story.type' == Tracker.StoryTypeFeature),
      ("bug", story.type' == Tracker.StoryTypeBug),
      ("unscheduled", story.state == Tracker.StoryStateUnscheduled),
      ("unstarted", story.state == Tracker.StoryStateUnstarted),
      ("started", story.state == Tracker.StoryStateStarted),
      ("finished", story.state == Tracker.StoryStateFinished),
      ("delivered", story.state == Tracker.StoryStateDelivered),
      ("accepted", story.state == Tracker.StoryStateAccepted),
      ("rejected", story.state == Tracker.StoryStateRejected)
    ]
  ] [
    div [class "story-summary"] [
      a [href story.url, class "story-location"] [
        text story.summary
      ],
      div [class "story-labels"] <|
        List.map (span [class "story-label"] << (flip (::) []) << text) story.labels
    ]
  ]


viewIssue : GitHub.Issue -> Html Msg
viewIssue issue =
  div [class "issue"] [
    div [class "issue-summary"] [
      if issue.commentCount > 0 then
        a [href issue.url, class "issue-comments"] [
          text (toString issue.commentCount)
        ]
      else
        span [] [],
      span [class "issue-reactions"] <|
        List.map (\(code, count) ->
          span [class "reaction"] [
            span [class "emoji"] [text code],
            span [class "count"] [text <| toString count]
          ]) <| List.filter ((/=) 0 << snd) <|
            GitHub.reactionCodes issue.reactions,
      a [href issue.url, class "issue-location"] [
        text (issue.repo.name ++ " #" ++ toString issue.number)
      ]
    ]
  ]

viewIteration : Iteration -> Html Msg
viewIteration {number, topics} =
  div [class "iteration"] [
    h2 [class "iteration-title"] [
      text (toString number)
    ],
    div [class "iteration-topics"] <|
      List.map viewTopic topics
  ]

viewTopic : Topic -> Html Msg
viewTopic {stories, issues} =
  div [class "topic"] [
    div [class "topic-issues"]
      (List.map viewIssue issues),
    div [class "topic-stories"]
      (List.map viewStory stories)
  ]

checkEngagement : Config -> Topic -> Cmd Msg
checkEngagement config topic =
  case topic.issues of
    issue :: _ ->
      Task.perform APIError (EngagementCommentsFetched topic) <|
        GitHub.fetchIssueComments config.githubToken issue

    _ ->
      -- impossible
      Cmd.none

fetchBacklogAndStoriesAndIssues : Config -> Cmd Msg
fetchBacklogAndStoriesAndIssues config =
  Task.perform APIError (\(b, s, i) -> BacklogAndStoriesAndIssuesFetched b s i) <|
    fetchBacklog config `Task.andThen` \backlog ->
      fetchStories config `Task.andThen` \stories ->
        fetchIssues config `Task.andThen` \issues ->
          Task.succeed (backlog, stories, issues)

fetchBacklog : Config -> Task Http.Error (List Tracker.Iteration)
fetchBacklog config =
  Tracker.fetchProjectBacklog
    config.trackerToken
    config.trackerProject

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

groupTopicsByIteration : List Tracker.Iteration -> List Topic -> List Iteration
groupTopicsByIteration iterations topics =
  case iterations of
    [] ->
      []

    i :: is ->
      let
        (inIteration, notInIteration) =
          List.partition (topicIsInIteration i) topics

        ordered =
          List.sortBy (topicIndexInIteration i) inIteration
      in
        { number = i.number, topics = ordered } :: groupTopicsByIteration is notInIteration

topicIsInIteration : Tracker.Iteration -> Topic -> Bool
topicIsInIteration {stories} topic =
  List.any (\ts -> List.any ((==) ts.id << .id) stories) topic.stories

topicIndexInIteration : Tracker.Iteration -> Topic -> Int
topicIndexInIteration {stories} topic =
  let
    max =
      List.length stories

    indices =
      List.indexedMap (\i s -> if topicIsForStory s topic then i else max) stories
  in
    Maybe.withDefault max (List.minimum indices)

topicIsForStory : Tracker.Story -> Topic -> Bool
topicIsForStory story {stories} =
  List.any ((==) story.id << .id) stories

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
  issue.repo.owner.login ++ "/" ++ issue.repo.name ++ "#" ++ toString issue.number

topicActivity : Topic -> Int
topicActivity {issues} =
  List.sum <| List.map GitHub.issueScore issues

topicFlightness : Topic -> Int
topicFlightness {stories} =
  List.length <| List.filter Tracker.storyIsInFlight stories

topicIsBlank : Topic -> Bool
topicIsBlank {stories, issues} =
  List.isEmpty stories && List.isEmpty issues

topicID : Topic -> (List Int, List Int)
topicID {stories, issues} =
  ( List.sort (List.map .id stories)
  , List.sort (List.map .id issues)
  )

topicIsPullRequest : Topic -> Bool
topicIsPullRequest {stories} =
  List.any (List.member "has-pr" << .labels) stories

topicIsScheduled : Topic -> Bool
topicIsScheduled {stories} =
  List.any Tracker.storyIsScheduled stories

topicIsTriaged : Topic -> Bool
topicIsTriaged {stories} =
  not <|
    List.all ((==) Tracker.StoryTypeChore) (List.map .type' stories)
