module Main exposing (..)

import Date
import Dict exposing (Dict)
import Html exposing (Html, h1, h2, div, pre, text, a, span, i)
import Html.Lazy
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, classList, href)
import Html.App as Html
import Regex exposing (Regex)
import Set exposing (Set)
import Task exposing (Task)
import Time exposing (Time)

import GitHub
import Tracker

type alias Config =
  { githubToken : String
  , githubOrganization : String
  , trackerToken : String
  , trackerProject : Int
  , tracksuitUser : String
  }

type alias Model =
  { config : Config
  , error : Maybe String

  , repositories : List GitHub.Repo

  , backlog : Maybe (List Tracker.Iteration)
  , stories : Maybe (List Tracker.Story)
  , members : Maybe (List GitHub.User)

  , issues : List GitHub.Issue
  , missingIssues : Set Int

  , topicIterations : List Iteration
  , unscheduled : List Topic

  , themWaiting : List UntriagedIssue
  , usWaiting : List UntriagedIssue

  , pending : List UntriagedIssue

  , orphaned : List Tracker.Story
  }

type alias Topic =
  { stories : List Tracker.Story
  , issues : List GitHub.Issue
  }

type alias UntriagedIssue =
  { story : Tracker.Story
  , issue : GitHub.Issue
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
  | BacklogFetched (List Tracker.Iteration)
  | StoriesFetched (List Tracker.Story)
  | MembersFetched (List GitHub.User)
  | RepositoriesFetched (List GitHub.Repo)
  | IssuesFetched GitHub.Repo (List GitHub.Issue)
  | EngagementCommentsFetched UntriagedIssue (List GitHub.Comment)
  | Engage UntriagedIssue
  | Engaged UntriagedIssue Tracker.Story
  | Disengage UntriagedIssue
  | Disengaged UntriagedIssue Tracker.Story
  | Error String

init : Config -> (Model, Cmd Msg)
init config =
  ( { config = config
    , error = Nothing

    , repositories = []

    , backlog = Nothing
    , stories = Nothing
    , members = Nothing

    , issues = []
    , missingIssues = Set.empty

    , topicIterations = []
    , unscheduled = []
    , themWaiting = []
    , usWaiting = []
    , pending = []
    , orphaned = []
    }
  , fetchBacklogAndStoriesAndIssues config
  )

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Noop ->
      (model, Cmd.none)

    BacklogFetched backlog ->
      processIfReady { model | backlog = Just backlog }

    StoriesFetched stories ->
      processIfReady { model | stories = Just stories }

    MembersFetched members ->
      processIfReady { model | members = Just members }

    RepositoriesFetched repos ->
      ( { model
        | repositories = repos
        , missingIssues = Set.fromList (List.map .id repos)
        }
      , Cmd.batch <|
          List.map (fetchIssues model.config) repos
      )

    IssuesFetched repo issues ->
      processIfReady
        { model
        | issues = issues ++ model.issues
        , missingIssues = Set.remove repo.id model.missingIssues
        }

    EngagementCommentsFetched issue comments ->
      if lastActivityIsUs model comments then
        ({ model | usWaiting = issue :: model.usWaiting }, Cmd.none)
      else
        ({ model | themWaiting = issue :: model.themWaiting }, Cmd.none)

    Engage issue ->
      (model, engage model.config issue)

    Engaged issue startedStory ->
      let
        removeNoLongerPending =
          List.filter ((/=) issue.issue.id << .id << .issue)

        startedIssue =
          { issue | story = startedStory }
      in
        ( { model
          | pending = removeNoLongerPending model.pending
          }
        , checkEngagement model.config startedIssue
        )

    Disengage issue ->
      (model, disengage model.config issue)

    Disengaged issue _ ->
      let
        removeEngaged =
          List.filter ((/=) issue.issue.id << .id << .issue)
      in
        ( { model
          | usWaiting = removeEngaged model.usWaiting
          , themWaiting = removeEngaged model.themWaiting
          }
        , Cmd.none
        )

    Error msg ->
      ({ model | error = Just msg }, Cmd.none)

lastActivityIsUs : Model -> List GitHub.Comment -> Bool
lastActivityIsUs model comments =
  let
    withoutBot =
      List.filter ((/=) model.config.tracksuitUser << .login << .user) comments
  in
    case List.head (List.reverse withoutBot) of
      Just comment ->
        isOrgMember model.members comment.user

      Nothing ->
        False

engage : Config -> UntriagedIssue -> Cmd Msg
engage config issue =
  Task.perform (Error << toString) (Engaged issue) <|
    Tracker.startStory
      config.trackerToken
      config.trackerProject
      issue.story.id

disengage : Config -> UntriagedIssue -> Cmd Msg
disengage config issue =
  Task.perform (Error << toString) (Disengaged issue) <|
    Tracker.acceptStory
      config.trackerToken
      config.trackerProject
      issue.story.id


isOrgMember : Maybe (List GitHub.User) -> GitHub.User -> Bool
isOrgMember users user =
  List.any (\x -> x.id == user.id) (Maybe.withDefault [] users)

processIfReady : Model -> (Model, Cmd Msg)
processIfReady model =
  if not (List.isEmpty model.repositories) && Set.isEmpty model.missingIssues then
    case (model.backlog, model.stories, model.members) of
      (Just backlog, Just stories, Just members) ->
        process model backlog stories model.issues members

      _ ->
        (model, Cmd.none)
  else
    (model, Cmd.none)

process : Model -> List Tracker.Iteration -> List Tracker.Story -> List GitHub.Issue -> List GitHub.User -> (Model, Cmd Msg)
process model backlog stories issues members =
  let
    topics =
      groupByTopic stories issues

    (triaged, pending) =
      List.partition topicIsTriaged topics

    (scheduled, unscheduled) =
      List.partition topicIsScheduled triaged

    (engaged, remaining) =
      List.partition topicIsScheduled pending

    topicIterations =
      groupTopicsByIteration backlog scheduled

    untriaged {stories, issues} =
      case (stories, issues) of
        (story :: _, issue :: _) ->
          { story = story, issue = issue }

        _ ->
          Debug.crash "impossible"

    storyIsOrphaned topics story =
      storyIsForAnyIssue story &&
        not (Tracker.storyIsAccepted story) &&
        not (List.any (topicIsForStory story) topics)

    orphanedStories =
      List.filter (storyIsOrphaned topics) stories

    checkEngagements =
      List.map (checkEngagement model.config << untriaged) engaged
  in
    ( { model |
        error = Nothing

      , themWaiting = []
      , usWaiting = []

      , topicIterations = topicIterations
      , unscheduled = unscheduled

      , pending = List.map untriaged remaining

      , orphaned = orphanedStories
      }
    , Cmd.batch checkEngagements
    )


cell : String -> (a -> Html Msg) -> List a -> Html Msg
cell title viewEntry entries =
  div [class "cell"] [
    h1 [class "cell-title"] [
      text (title ++ " (" ++ toString (List.length entries) ++ ")")
    ],
    div [class "cell-content"] <|
      List.map viewEntry entries
  ]

view : Model -> Html Msg
view model =
  case model.error of
    Just msg ->
      pre [] [text msg]

    Nothing ->
      div [class "columns"] [
        div [class "column"] [
          cell "Backlog" viewIteration model.topicIterations
        ],
        div [class "column"] [
          cell "Icebox" viewTopic <|
            List.reverse (List.sortBy topicActivity model.unscheduled)
        ],
        div [class "column"] [
          cell "Them Waiting" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueActivity model.themWaiting),
          cell "Us Waiting" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueActivity model.usWaiting)
        ],
        div [class "column"] [
          cell "Pending By Activity" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueActivity model.pending),
          cell "Pending By Date" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueCreation model.pending)
        ]
      ]

viewIteration : Iteration -> Html Msg
viewIteration {topics} =
  div [class "iteration"] <|
    List.map viewTopic topics

viewTopic : Topic -> Html Msg
viewTopic topic =
  div [class "topic"] [
    div [class "topic-issues"]
      (List.map viewTriagedIssue topic.issues),
    div [class "topic-stories"]
      (List.map viewStory topic.stories)
  ]

viewUntriagedIssue : UntriagedIssue -> Html Msg
viewUntriagedIssue untriagedIssue =
  viewIssue (Just untriagedIssue) untriagedIssue.issue

viewTriagedIssue : GitHub.Issue -> Html Msg
viewTriagedIssue issue =
  viewIssue Nothing issue

viewIssue : Maybe UntriagedIssue -> GitHub.Issue -> Html Msg
viewIssue maybeUntriagedIssue issue =
  let
    typeCell =
      div [class "issue-cell issue-type"] [
        if issue.isPullRequest then
          i [class "emoji octicon octicon-git-pull-request"] []
        else
          i [class "emoji octicon octicon-issue-opened"] []
      ]

    infoCell =
      div [class "issue-cell issue-info"] [
        a [href issue.url, class "issue-title"] [
          text issue.title
        ],
        div [class "issue-meta"] [
          a [href issue.repo.url] [text issue.repo.name],
          text " ",
          a [href issue.url] [text ("#" ++ toString issue.number)],
          text " ",
          text "opened by ",
          a [href issue.user.url] [text issue.user.login]
        ]
      ]

    flairCell =
      div [class "issue-cell issue-flair"] <|
        issueFlair issue

    engagementCell untriagedIssue =
      div [
        class "issue-cell issue-engagement",
        onClick <|
          if Tracker.storyIsInFlight untriagedIssue.story then
            Disengage untriagedIssue
          else
            Engage untriagedIssue
      ] [
        if Tracker.storyIsInFlight untriagedIssue.story then
          i [class "octicon octicon-x"] []
        else
          i [class "octicon octicon-mail-reply"] []
      ]

    baseCells =
      [typeCell, infoCell, flairCell]

    cells =
      case maybeUntriagedIssue of
        Nothing ->
          baseCells

        Just untriagedIssue ->
          baseCells ++ [engagementCell untriagedIssue]
  in
    div [class "issue-summary"] cells

issueFlair : GitHub.Issue -> List (Html Msg)
issueFlair {url, reactions, commentCount} =
  let
    presentReactions =
      List.filter ((/=) 0 << snd) <|
        GitHub.reactionCodes reactions

    viewReaction (code, count) =
      span [class "reaction"] [
        span [class "emoji"] [text code],
        span [class "count"] [text <| toString count]
      ]

    commentsElement =
      span [class "reaction"] [
        span [class "emoji"] [i [class "octicon octicon-comment"] []],
        span [class "count"] [text <| toString commentCount]
      ]

    reactionElements =
      List.map viewReaction presentReactions
  in
    if commentCount > 0 then
      reactionElements ++ [commentsElement]
    else
      reactionElements

storyClasses : Tracker.Story -> List (String, Bool)
storyClasses story =
  [ ("chore", story.type' == Tracker.StoryTypeChore),
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

viewStory : Tracker.Story -> Html Msg
viewStory story =
  div [classList (("story", True) :: storyClasses story)] [
    div [class "story-summary"] [
      a [href story.url, class "story-location"] [
        text story.summary
      ],
      div [class "story-labels"] <|
        List.map (span [class "story-label"] << (flip (::) []) << text) story.labels
    ]
  ]


checkEngagement : Config -> UntriagedIssue -> Cmd Msg
checkEngagement config issue =
  Task.perform (Error << toString) (EngagementCommentsFetched issue) <|
    GitHub.fetchIssueComments config.githubToken issue.issue

fetchBacklogAndStoriesAndIssues : Config -> Cmd Msg
fetchBacklogAndStoriesAndIssues config =
  Cmd.batch
    [ fetchBacklog config
    , fetchStories config
    , fetchRepositories config
    , fetchMembers config
    ]

fetchBacklog : Config -> Cmd Msg
fetchBacklog config =
  Task.perform (Error << toString) BacklogFetched <|
    Tracker.fetchProjectBacklog
      config.trackerToken
      config.trackerProject

fetchStories : Config -> Cmd Msg
fetchStories config =
  Task.perform (Error << toString) StoriesFetched <|
    Tracker.fetchProjectStories
      config.trackerToken
      config.trackerProject

fetchRepositories : Config -> Cmd Msg
fetchRepositories config =
  Task.perform (Error << toString) RepositoriesFetched <|
    GitHub.fetchOrgRepos
      config.githubToken
      config.githubOrganization

fetchIssues : Config -> GitHub.Repo -> Cmd Msg
fetchIssues config repo =
  Task.perform (Error << toString) (IssuesFetched repo) <|
    GitHub.fetchRepoIssues
      config.githubToken
      repo

fetchMembers : Config -> Cmd Msg
fetchMembers config =
  Task.perform (Error << toString) MembersFetched <|
    GitHub.fetchOrgMembers
      config.githubToken
      config.githubOrganization

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

issueLabelRegex : Regex
issueLabelRegex =
  Regex.regex "([^/]+)/([^#]+)#([0-9]+)"

storyIssueURL : Tracker.Story -> String
storyIssueURL {labels} =
  let
    extractURL label =
      case Regex.find (Regex.AtMost 1) issueLabelRegex label of
        [] ->
          Nothing

        {submatches} :: _ ->
          case submatches of
            [Just owner, Just repo, Just num] ->
              Just ("https://github.com/" ++ owner ++ "/" ++ repo ++ "/issues/" ++ num)

            _ ->
              Nothing
  in
    case List.filterMap extractURL labels of
      (url :: _) ->
        url

      [] ->
        Debug.crash "could not extract story issue URL"

storyIsForAnyIssue : Tracker.Story -> Bool
storyIsForAnyIssue {labels} =
  List.any (Regex.contains issueLabelRegex) labels

issueStories : GitHub.Issue -> List Tracker.Story -> List Tracker.Story
issueStories issue stories =
  List.filter (flip storyIsForIssue issue) stories

issueLabel : GitHub.Issue -> String
issueLabel issue =
  issue.repo.owner.login ++ "/" ++ issue.repo.name ++ "#" ++ toString issue.number

topicActivity : Topic -> Int
topicActivity {issues} =
  List.sum <| List.map GitHub.issueScore issues

untriagedIssueActivity : UntriagedIssue -> Int
untriagedIssueActivity {issue} =
  GitHub.issueScore issue

untriagedIssueCreation : UntriagedIssue -> Time
untriagedIssueCreation {issue} =
  Date.toTime issue.createdAt

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
topicIsPullRequest {issues} =
  List.any .isPullRequest issues

topicIsScheduled : Topic -> Bool
topicIsScheduled {stories} =
  List.any Tracker.storyIsScheduled stories

topicIsTriaged : Topic -> Bool
topicIsTriaged {stories} =
  not <|
    List.all ((==) Tracker.StoryTypeChore) (List.map .type' stories)
