module Card exposing (Card, ProcessState, State(..), cardProcessState, fromIssue, fromPR, inColumn, isAcceptedPR, isBacklog, isBug, isDone, isEnhancement, isIcebox, isInFlight, isMerged, isOpen, isOpenPR, isPR, isPaused, isUntriaged, isWontfix)

import GitHubGraph
import Project
import Time


type alias Card =
    { id : GitHubGraph.ID
    , content : GitHubGraph.CardContent
    , url : String
    , repo : GitHubGraph.RepoLocation
    , number : Int
    , title : String
    , updatedAt : Time.Posix
    , author : Maybe GitHubGraph.User
    , labels : List GitHubGraph.ID
    , cards : List GitHubGraph.CardLocation
    , commentCount : Int
    , reactions : GitHubGraph.Reactions
    , score : Int
    , state : State
    , milestone : Maybe GitHubGraph.Milestone
    , processState : ProcessState
    }


type alias ProcessState =
    { inIceboxColumn : Bool
    , inInFlightColumn : Bool
    , inBacklogColumn : Bool
    , inDoneColumn : Bool
    , hasEnhancementLabel : Bool
    , hasBugLabel : Bool
    , hasWontfixLabel : Bool
    , hasPausedLabel : Bool
    }


type State
    = IssueState GitHubGraph.IssueState
    | PullRequestState GitHubGraph.PullRequestState


fromIssue : GitHubGraph.Issue -> Card
fromIssue ({ id, url, repo, number, title, updatedAt, author, labels, cards, commentCount, reactions, state, milestone } as issue) =
    { id = id
    , content = GitHubGraph.IssueCardContent issue
    , url = url
    , repo = repo
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , labels = List.map .id labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHubGraph.issueScore issue
    , state = IssueState state
    , milestone = milestone
    , processState = cardProcessState { cards = cards, labels = labels }
    }


fromPR : GitHubGraph.PullRequest -> Card
fromPR ({ id, url, repo, number, title, updatedAt, author, labels, cards, commentCount, reactions, state, milestone } as pr) =
    { id = id
    , content = GitHubGraph.PullRequestCardContent pr
    , url = url
    , repo = repo
    , number = number
    , title = title
    , updatedAt = updatedAt
    , author = author
    , labels = List.map .id labels
    , cards = cards
    , commentCount = commentCount
    , reactions = reactions
    , score = GitHubGraph.pullRequestScore pr
    , state = PullRequestState state
    , milestone = milestone
    , processState = cardProcessState { cards = cards, labels = labels }
    }


isOpen : Card -> Bool
isOpen card =
    case card.state of
        IssueState GitHubGraph.IssueStateOpen ->
            True

        PullRequestState GitHubGraph.PullRequestStateOpen ->
            True

        _ ->
            False


isOpenPR : Card -> Bool
isOpenPR card =
    card.state == PullRequestState GitHubGraph.PullRequestStateOpen


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


inColumn : (String -> Bool) -> List GitHubGraph.CardLocation -> Bool
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
    List.isEmpty card.cards


isMerged : Card -> Bool
isMerged card =
    card.state == PullRequestState GitHubGraph.PullRequestStateMerged


cardProcessState : { cards : List GitHubGraph.CardLocation, labels : List GitHubGraph.Label } -> ProcessState
cardProcessState { cards, labels } =
    { inIceboxColumn = inColumn Project.detectColumn.icebox cards
    , inInFlightColumn = inColumn Project.detectColumn.inFlight cards
    , inBacklogColumn = inColumn Project.detectColumn.backlog cards
    , inDoneColumn = inColumn Project.detectColumn.done cards
    , hasEnhancementLabel = List.any ((==) "enhancement" << .name) labels
    , hasBugLabel = List.any ((==) "bug" << .name) labels
    , hasWontfixLabel = List.any ((==) "wontfix" << .name) labels
    , hasPausedLabel = List.any ((==) "paused" << .name) labels
    }


isEnhancement : Card -> Bool
isEnhancement card =
    card.processState.hasEnhancementLabel


isBug : Card -> Bool
isBug card =
    card.processState.hasBugLabel


isWontfix : Card -> Bool
isWontfix card =
    card.processState.hasWontfixLabel


isPaused : Card -> Bool
isPaused card =
    card.processState.hasPausedLabel


isAcceptedPR : Card -> Bool
isAcceptedPR card =
    (isEnhancement card || isBug card) && isMerged card
