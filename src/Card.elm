module Card exposing
    ( Card
    , ProcessState
    , State(..)
    , fromIssue
    , fromPR
    , isBacklog
    , isDone
    , isIcebox
    , isInFlight
    , isMerged
    , isOpen
    , isOpenPR
    , isPR
    , isPaused
    , isUntriaged
    )

import GitHub
import Project
import Time


type alias Card =
    { id : GitHub.ID
    , content : GitHub.CardContent
    , url : String
    , repo : GitHub.RepoLocation
    , number : Int
    , title : String
    , updatedAt : Time.Posix
    , author : Maybe GitHub.User
    , assignees : List GitHub.User
    , labels : List GitHub.ID
    , cards : List GitHub.CardLocation
    , commentCount : Int
    , reactions : GitHub.Reactions
    , score : Int
    , state : State
    , milestone : Maybe GitHub.Milestone
    , processState : ProcessState
    }


type alias ProcessState =
    { inIceboxColumn : Bool
    , inInFlightColumn : Bool
    , inBacklogColumn : Bool
    , inDoneColumn : Bool
    , hasPausedLabel : Bool
    , hasTriageLabel : Bool
    }


type State
    = IssueState GitHub.IssueState
    | PullRequestState GitHub.PullRequestState


fromIssue : GitHub.Issue -> Card
fromIssue ({ id, url, repo, number, title, updatedAt, author, assignees, labels, cards, commentCount, reactions, state, milestone } as issue) =
    { id = id
    , content = GitHub.IssueCardContent issue
    , url = url
    , repo = repo
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , assignees = assignees
    , labels = List.map .id labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHub.issueScore issue
    , state = IssueState state
    , milestone = milestone
    , processState = cardProcessState { cards = cards, labels = labels }
    }


fromPR : GitHub.PullRequest -> Card
fromPR ({ id, url, repo, number, title, updatedAt, author, assignees, labels, cards, commentCount, reactions, state, milestone } as pr) =
    { id = id
    , content = GitHub.PullRequestCardContent pr
    , url = url
    , repo = repo
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , assignees = assignees
    , labels = List.map .id labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHub.pullRequestScore pr
    , state = PullRequestState state
    , milestone = milestone
    , processState = cardProcessState { cards = cards, labels = labels }
    }


isOpen : Card -> Bool
isOpen card =
    case card.state of
        IssueState GitHub.IssueStateOpen ->
            True

        PullRequestState GitHub.PullRequestStateOpen ->
            True

        _ ->
            False


isOpenPR : Card -> Bool
isOpenPR card =
    card.state == PullRequestState GitHub.PullRequestStateOpen


isInFlight : Card -> Bool
isInFlight card =
    card.processState.inInFlightColumn


isDone : Card -> Bool
isDone card =
    card.processState.inDoneColumn


isBacklog : Card -> Bool
isBacklog card =
    card.processState.inBacklogColumn


isIcebox : Card -> Bool
isIcebox card =
    card.processState.inIceboxColumn


inColumn : (String -> Bool) -> List GitHub.CardLocation -> Bool
inColumn match =
    List.any (Maybe.withDefault False << Maybe.map (match << .name) << .column)


isPR : Card -> Bool
isPR card =
    case card.state of
        PullRequestState _ ->
            True

        IssueState _ ->
            False


isUntriaged : Card -> Bool
isUntriaged card =
    card.processState.hasTriageLabel


isMerged : Card -> Bool
isMerged card =
    card.state == PullRequestState GitHub.PullRequestStateMerged


cardProcessState : { cards : List GitHub.CardLocation, labels : List GitHub.Label } -> ProcessState
cardProcessState { cards, labels } =
    { inIceboxColumn = inColumn Project.detectColumn.icebox cards
    , inInFlightColumn = inColumn Project.detectColumn.inFlight cards
    , inBacklogColumn = inColumn Project.detectColumn.backlog cards
    , inDoneColumn = inColumn Project.detectColumn.done cards
    , hasPausedLabel = List.any ((==) "paused" << .name) labels
    , hasTriageLabel = List.any ((==) "triage" << .name) labels
    }


isPaused : Card -> Bool
isPaused card =
    card.processState.hasPausedLabel
