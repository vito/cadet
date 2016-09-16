module Main exposing (..)

import Date
import Dict exposing (Dict)
import Html exposing (Html, h1, h2, div, pre, text, a, span, i)
import Html.Lazy
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, classList, href, style, target)
import Html.App as Html
import ParseInt
import Regex exposing (Regex)
import Set exposing (Set)
import String
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
  , engaged : List UntriagedIssue
  , pending : List UntriagedIssue
  , orphaned : List OrphanedStory

  , themWaiting : Set Int -- GitHub issue IDs
  }

type alias Topic =
  { stories : List Tracker.Story
  , issues : List GitHub.Issue
  }

type alias UntriagedIssue =
  { story : Tracker.Story
  , issue : GitHub.Issue
  }

type alias OrphanedStory =
  { story : Tracker.Story
  , issue : Maybe GitHub.Issue
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
  | OrphanedStoryIssueFetched Tracker.Story GitHub.Issue
  | OrphanedStoryIssueMissing Tracker.Story
  | IssueCommentsFetched GitHub.Issue (List GitHub.Comment)
  | Engage UntriagedIssue
  | Engaged UntriagedIssue Tracker.Story
  | Disengage UntriagedIssue
  | Disengaged UntriagedIssue Tracker.Story
  | DeleteOrphanedStory OrphanedStory
  | OrphanedStoryDeleted OrphanedStory
  | AcceptOrphanedStory OrphanedStory
  | OrphanedStoryAccepted OrphanedStory
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
    , engaged = []
    , pending = []
    , orphaned = []

    , themWaiting = Set.empty
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

    OrphanedStoryIssueFetched story issue ->
      ({ model | orphaned = { story = story, issue = Just issue } :: model.orphaned }, Cmd.none)

    OrphanedStoryIssueMissing story ->
      ({ model | orphaned = { story = story, issue = Nothing } :: model.orphaned }, Cmd.none)

    IssueCommentsFetched issue comments ->
      if lastActivityIsUs model comments then
        (model, Cmd.none)
      else
        ({ model | themWaiting = Set.insert issue.id model.themWaiting }, Cmd.none)

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
          , engaged = startedIssue :: model.engaged
          }
        , checkEngagement model.config issue.issue
        )

    Disengage issue ->
      (model, disengage model.config issue)

    Disengaged issue _ ->
      let
        removeEngaged =
          List.filter ((/=) issue.issue.id << .id << .issue)
      in
        ( { model | engaged = removeEngaged model.engaged }
        , Cmd.none
        )

    AcceptOrphanedStory orphan ->
      (model, acceptOrphan model.config orphan)

    OrphanedStoryAccepted orphan ->
      let
        remove =
          List.filter ((/=) orphan.story.id << .id << .story)
      in
        ( { model | orphaned = remove model.orphaned }
        , Cmd.none
        )

    DeleteOrphanedStory orphan ->
      (model, deleteStory model.config orphan)

    OrphanedStoryDeleted orphan ->
      let
        removeDeleted =
          List.filter ((/=) orphan.story.id << .id << .story)
      in
        ( { model
          | orphaned = removeDeleted model.orphaned
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

acceptOrphan : Config -> OrphanedStory -> Cmd Msg
acceptOrphan config orphan =
  Task.perform (Error << toString) (always <| OrphanedStoryAccepted orphan) <|
    Tracker.acceptStoryAsChore
      config.trackerToken
      config.trackerProject
      orphan.story.id

deleteStory : Config -> OrphanedStory -> Cmd Msg
deleteStory config orphan =
  Task.perform (Error << toString) (always <| OrphanedStoryDeleted orphan) <|
    Tracker.deleteStory
      config.trackerToken
      config.trackerProject
      orphan.story.id

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

    orphans =
      List.filter (storyIsOrphaned topics) stories

    checkEngagements =
      List.concatMap (List.map (checkEngagement model.config) << .issues) engaged

    checkTriagedEngagements =
      List.concatMap (List.map (checkEngagement model.config) << .issues) unscheduled

    findOrphanedIssues =
      List.map (fetchOrphanedStoryIssue model) orphans
  in
    ( { model |
        error = Nothing

      , topicIterations = topicIterations
      , unscheduled = unscheduled
      , pending = List.map untriaged remaining
      , engaged = List.map untriaged engaged
      }
    , Cmd.batch (checkEngagements ++ checkTriagedEngagements ++ findOrphanedIssues)
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
        div [class "column"] <|
          let
            (themWaiting, usWaiting) =
              List.partition (List.any (theyAreWaiting model) << .issues) model.unscheduled
          in [
            cell "Triaged (Them Waiting)" viewTopic <|
              List.reverse (List.sortBy topicActivity themWaiting),
            cell "Triaged (Us Waiting)" viewTopic <|
              List.reverse (List.sortBy topicActivity usWaiting)
          ],
        div [class "column"] <|
          let
            (themWaiting, usWaiting) =
              List.partition (theyAreWaiting model << .issue) model.engaged
          in [
            cell "Them Waiting" viewUntriagedIssue <|
              List.reverse (List.sortBy untriagedIssueActivity themWaiting),
            cell "Us Waiting" viewUntriagedIssue <|
              List.reverse (List.sortBy untriagedIssueActivity usWaiting),
            if not <| List.isEmpty model.orphaned then
              cell "Orphaned" viewOrphanedStory <|
                model.orphaned
            else
              text ""
          ],
        div [class "column"] [
          cell "Pending By Activity" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueActivity model.pending),
          cell "Pending By Date" viewUntriagedIssue <|
            List.reverse (List.sortBy untriagedIssueCreation model.pending)
        ]
      ]

theyAreWaiting : Model -> GitHub.Issue -> Bool
theyAreWaiting model issue =
  Set.member issue.id model.themWaiting

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
      (List.map viewStory (List.reverse <| List.sortWith Tracker.compareStoryProgress topic.stories))
  ]

viewUntriagedIssue : UntriagedIssue -> Html Msg
viewUntriagedIssue untriagedIssue =
  viewIssue untriagedIssue.issue [
    if Tracker.storyIsInFlight untriagedIssue.story then
      div [
        class "issue-cell issue-engagement",
        onClick (Disengage untriagedIssue)
      ] [ i [class "octicon octicon-x"] [] ]
    else
      div [
        class "issue-cell issue-engagement",
        onClick (Engage untriagedIssue)
      ] [ i [class "octicon octicon-mail-reply"] [] ]
  ]

viewTriagedIssue : GitHub.Issue -> Html Msg
viewTriagedIssue issue =
  viewIssue issue []

viewIssue : GitHub.Issue -> List (Html Msg) -> Html Msg
viewIssue issue extraCells =
  let
    typeCell =
      div [class "issue-cell issue-type"] [
        if issue.isPullRequest then
          if issue.state == GitHub.IssueStateOpen then
            i [class "emoji octicon octicon-git-pull-request gh-open"] []
          else
            i [class "emoji octicon octicon-git-pull-request gh-closed"] []
        else
          if issue.state == GitHub.IssueStateOpen then
            i [class "emoji octicon octicon-issue-opened gh-open"] []
          else
            i [class "emoji octicon octicon-issue-closed gh-closed"] []
      ]

    infoCell =
      div [class "issue-cell issue-info"] [
        a [href issue.url, target "_blank", class "issue-title"] [
          text issue.title
        ],
        span [class "issue-labels"] <|
          List.map viewIssueLabel issue.labels,
        div [class "issue-meta"] [
          a [href issue.repo.url, target "_blank"] [text issue.repo.name],
          text " ",
          a [href issue.url, target "_blank"] [text ("#" ++ toString issue.number)],
          text " ",
          text "opened by ",
          a [href issue.user.url, target "_blank"] [text issue.user.login]
        ]
      ]

    flairCell =
      div [class "issue-cell issue-flair"] <|
        issueFlair issue

    baseCells =
      [typeCell, infoCell, flairCell]

    cells =
      baseCells ++ extraCells
  in
    div [class "issue-summary"] cells

hexRegex : Regex
hexRegex =
  Regex.regex "([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"

hexBrightness : Int -> Int
hexBrightness h =
  case compare h (0xff // 2) of
    LT ->
      -1

    EQ ->
      0

    GT ->
      1

colorIsLight : String -> Bool
colorIsLight hex =
  let
    matches =
      List.head <| Regex.find (Regex.AtMost 1) hexRegex hex
  in
    case Maybe.map .submatches matches of
      Just [Just h1s, Just h2s, Just h3s] ->
        case List.map ParseInt.parseIntHex [h1s, h2s, h3s] of
          [Ok h1, Ok h2, Ok h3] ->
            if (hexBrightness h1 + hexBrightness h2 + hexBrightness h3) > 0 then
              True
            else
              False

          _ ->
            Debug.crash "invalid hex"

      _ ->
        Debug.crash "invalid hex"

viewIssueLabel : GitHub.IssueLabel -> Html Msg
viewIssueLabel {name, color} =
    span
      [ class "issue-label"
      , style
          [ ("background-color", "#" ++ color)
          , ( "color"
            , if colorIsLight color then
                -- GitHub appears to pre-compute a hex code, but this seems to be
                -- pretty much all it's doing
                "rgba(0, 0, 0, .8)"
              else
                -- for darker backgrounds they just do white
                "#fff"
            )
          ]
      ]
      [ text name
      ]

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
  div [class "story-summary"] [
    div [class "story-cell story-type"] [
      case story.type' of
        Tracker.StoryTypeChore ->
          i [class "octicon octicon-gear"] []
        Tracker.StoryTypeFeature ->
          i [class "octicon octicon-star"] []
        Tracker.StoryTypeBug ->
          i [class "octicon octicon-bug"] []
        Tracker.StoryTypeRelease ->
          i [class "octicon octicon-gift"] []
    ],
    div [class "story-cell story-location"] [
      a [href story.url, target "_blank", class "story-location"] [
        text story.summary
      ]
    ],
    div [class "story-cell story-state"] [
      case story.state of
        Tracker.StoryStateUnscheduled ->
          text ""
        Tracker.StoryStateUnstarted ->
          text ""
        Tracker.StoryStateStarted ->
          i [class "octicon octicon-pulse"] []
        Tracker.StoryStateFinished ->
          i [class "octicon octicon-pulse"] []
        Tracker.StoryStateDelivered ->
          i [class "octicon octicon-pulse"] []
        Tracker.StoryStateAccepted ->
          i [class "octicon octicon-check"] []
        Tracker.StoryStateRejected ->
          i [class "octicon octicon-check"] []
    ]
  ]

viewOrphanedStory : OrphanedStory -> Html Msg
viewOrphanedStory orphan =
  div [class "orphaned topic"] <|
    case orphan.issue of
      Just issue ->
        [
          div [class "topic-issues"] [
            viewIssue issue [
              div [
                class "issue-cell issue-engagement",
                onClick (AcceptOrphanedStory orphan)
              ] [ i [class "octicon octicon-x"] [] ]
            ]
          ],
          div [class "topic-stories"] [
            viewStory orphan.story
          ]
        ]

      Nothing ->
        [
          div [class "topic-stories headless"] [
            span [class "delete-story", onClick (DeleteOrphanedStory orphan)] [
              i [class "octicon octicon-trashcan"] []
            ],
            viewStory orphan.story
          ]
        ]

checkEngagement : Config -> GitHub.Issue -> Cmd Msg
checkEngagement config issue =
  Task.perform (Error << toString) (IssueCommentsFetched issue) <|
    GitHub.fetchIssueComments config.githubToken issue

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

fetchOrphanedStoryIssue : Model -> Tracker.Story -> Cmd Msg
fetchOrphanedStoryIssue model story =
  let
    (owner, repoName, num) =
      storyIssueInfo story

    maybeRepo =
      model.repositories
        |> List.filter (\repo -> repo.owner.login == owner && repo.name == repoName)
        |> List.head

  in
    case maybeRepo of
      Just repo ->
        Task.perform (Error << toString) (OrphanedStoryIssueFetched story) <|
          GitHub.fetchIssue
            model.config.githubToken
            repo
            num

      Nothing ->
        -- this is possible if multiple orgs tracksuit into one tracker, or if
        -- a repo is no longer in the organization
        Task.perform (Error << toString) OrphanedStoryIssueMissing <|
          Task.succeed story

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

storyIssueInfo : Tracker.Story -> (String, String, Int)
storyIssueInfo {labels} =
  let
    extractInfo label =
      case Regex.find (Regex.AtMost 1) issueLabelRegex label of
        [] ->
          Nothing

        {submatches} :: _ ->
          case submatches of
            [Just owner, Just repo, Just numstr] ->
              case String.toInt numstr of
                Err _ ->
                  Debug.crash "impossible: non-numeric issue number"

                Ok num ->
                  Just (owner, repo, num)

            _ ->
              Nothing
  in
    case List.filterMap extractInfo labels of
      (info :: _) ->
        info

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
  List.any (\story ->
    Tracker.storyIsScheduled story &&
      not (Tracker.storyIsAccepted story)) stories

topicIsTriaged : Topic -> Bool
topicIsTriaged {stories} =
  List.any ((/=) Tracker.StoryTypeChore) (List.map .type' stories)
