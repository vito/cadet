module Model exposing
    ( ArchiveEvent
    , CardDestination
    , CardEdge
    , CardLabelOperation(..)
    , CardNode
    , CardNodeState
    , CardSource(..)
    , GraphFilter(..)
    , GraphSort(..)
    , Model
    , Msg(..)
    , Page(..)
    , PendingAssignments
    , Progress(..)
    , ProgressState
    , ProjectLane
    , ProjectLanes
    , ReleaseStatus
    , StatefulGraph
    , empty
    , whenLoggedIn
    )

import Backend
import Browser
import Browser.Navigation as Nav
import Card exposing (Card)
import Dict exposing (Dict)
import Drag
import ForceGraph exposing (ForceGraph)
import GitHub
import Html exposing (Html)
import Http
import OrderedSet exposing (OrderedSet)
import Set exposing (Set)
import Time
import Url exposing (Url)


type alias Model =
    -- nav/user/global state
    { key : Nav.Key
    , page : Page
    , me : Maybe Backend.Me
    , currentTime : Time.Posix
    , currentZone : Time.Zone

    -- progress for a given object
    , progress : ProgressState

    -- data from backend
    , dataIndex : Int
    , assignableUsers : List GitHub.User
    , orgProjects : List GitHub.Project
    , repos : Dict GitHub.ID GitHub.Repo
    , repoProjects : Dict GitHub.ID (List GitHub.Project)
    , repoCommits : Dict GitHub.ID (Dict String Backend.CommitsSinceLastRelease)
    , repoLabels : Dict GitHub.ID (List GitHub.Label)
    , repoMilestones : Dict GitHub.ID (List GitHub.Milestone)
    , repoReleases : Dict GitHub.ID (List GitHub.Release)
    , columnCards : Dict GitHub.ID (List Backend.ColumnCard)
    , graphs : List (ForceGraph GitHub.ID)
    , issues : Dict GitHub.ID GitHub.Issue
    , prs : Dict GitHub.ID GitHub.PullRequest
    , cardEvents : Dict GitHub.ID (List Backend.CardEvent)
    , cardClosers : Dict GitHub.ID (List GitHub.ID)
    , cardRotations : Dict GitHub.ID (List Backend.Rotation)
    , prReviewers : Dict GitHub.ID (List GitHub.PullRequestReview)
    , archive : List ArchiveEvent

    -- 'views' into data
    , allLabels : Dict GitHub.ID GitHub.Label
    , cards : Dict GitHub.ID Card
    , reposByName : Dict String GitHub.ID
    , projects : Dict GitHub.ID GitHub.Project
    , idsByUrl : Dict String GitHub.ID
    , reposByLabel : Dict ( String, String ) (List GitHub.ID)
    , labelToRepoToId : Dict String (Dict GitHub.ID GitHub.ID)
    , openPRsByRepo : Dict GitHub.ID (List GitHub.ID)
    , cardsByMilestone : Dict GitHub.ID (List GitHub.ID)
    , repoReleaseStatuses : Dict GitHub.ID (List ReleaseStatus)
    , lastPaired : Dict (List GitHub.ID) Time.Posix
    , inFlight : List ProjectLanes
    , repoProjectTemplates : Dict GitHub.ID (List GitHub.Project)
    , cardProjects : Dict GitHub.ID GitHub.ID

    -- cache of computed lightness values for each color; used for determining
    -- whether label text should be white or dark
    , colorLightnessCache : Dict String Bool

    -- card dragging in projects
    , projectDrag : Drag.Model CardSource CardDestination Msg
    , assignUserDrag : Drag.Model GitHub.User (List Card) Msg
    , reassignUserDrag : Drag.Model ( GitHub.User, List Card ) (List Card) Msg
    , assignOnlyUsersDrag : Drag.Model Card (List GitHub.User) Msg

    -- sidebar card search/selecting state
    , cardSearch : String
    , selectedCards : OrderedSet GitHub.ID
    , anticipatedCards : Set GitHub.ID

    -- sidebar label operations
    , labelSearch : String
    , showLabelOperations : Bool
    , cardLabelOperations : Dict String CardLabelOperation

    -- card/node hover state
    , highlightedCard : Maybe GitHub.ID
    , highlightedNode : Maybe GitHub.ID

    -- card graph state
    , statefulGraphs : List StatefulGraph
    , baseGraphFilter : Maybe GraphFilter
    , graphFilters : List GraphFilter
    , graphSort : GraphSort
    , showLabelFilters : Bool

    -- card tabbed view state
    , suggestedLabels : List String

    -- column note adding state
    , addingColumnNotes : Dict GitHub.ID String

    -- cards being deleted from a project
    , deletingCards : Set GitHub.ID

    -- card note editing state
    , editingCardNotes : Dict GitHub.ID String
    , showArchivedCards : Set GitHub.ID

    -- assigning state
    , outUsers : Set GitHub.ID
    , pendingAssignments : Dict GitHub.ID PendingAssignments

    -- projectifying state
    , projectifyingCards : Set GitHub.ID
    }


type alias ProjectLanes =
    { project : GitHub.Project
    , lanes : List ProjectLane
    }


type alias ProjectLane =
    { assignees : List GitHub.User
    , cards : List Card
    }


type alias PendingAssignments =
    { assign : List GitHub.User
    , unassign : List GitHub.User
    }


type Msg
    = Noop
    | LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | Poll
    | SetCurrentTime Time.Posix
    | SetCurrentZone Time.Zone
    | ProjectDrag (Drag.Msg CardSource CardDestination Msg)
    | MoveCardAfter CardSource CardDestination
    | CardMoved GitHub.ID (Result GitHub.Error GitHub.ProjectColumnCard)
    | AssignUserDrag (Drag.Msg GitHub.User (List Card) Msg)
    | AssignUser GitHub.User (List Card)
    | AssignOnlyUsersDrag (Drag.Msg Card (List GitHub.User) Msg)
    | AssignOnlyUsers Card (List GitHub.User)
    | ReassignUserDrag (Drag.Msg ( GitHub.User, List Card ) (List Card) Msg)
    | ReassignUser ( GitHub.User, List Card ) (List Card)
    | UnassignUser GitHub.User (List Card)
    | AssigneesUpdated (Result GitHub.Error (Maybe GitHub.Assignable))
    | AssignPairs
    | CommitAssignments
    | ResetAssignments
    | RefreshQueued (Result Http.Error ())
    | MeFetched (Result Http.Error (Maybe Backend.Me))
    | DataFetched (Result Http.Error (Backend.Indexed Backend.Data))
    | EventReceived ( String, String, String )
    | CardDataFetched (Result Http.Error (Backend.Indexed Backend.CardData))
    | GraphsFetched (Result Http.Error (Backend.Indexed (List (ForceGraph GitHub.ID))))
    | SelectCard GitHub.ID
    | DeselectCard GitHub.ID
    | HighlightNode GitHub.ID
    | UnhighlightNode
    | AnticipateCardFromNode GitHub.ID
    | UnanticipateCardFromNode GitHub.ID
    | SearchCards String
    | SelectAnticipatedCards
    | ClearSelectedCards
    | LabelCard Card String
    | UnlabelCard Card String
    | RefreshIssue GitHub.ID
    | RefreshPullRequest GitHub.ID
    | RefreshColumn GitHub.ID
    | AddFilter GraphFilter
    | RemoveFilter GraphFilter
    | SetGraphSort GraphSort
    | ToggleLabelFilters
    | SetLabelSearch String
    | ToggleLabelOperations
    | SetLabelOperation String CardLabelOperation
    | UnsetLabelOperation String
    | ApplyLabelOperations
    | DataChanged (Cmd Msg) (Result GitHub.Error ())
    | SetCreatingColumnNote GitHub.ID String
    | CancelCreatingColumnNote GitHub.ID
    | CreateColumnNote GitHub.ID
    | ConfirmDeleteCard GitHub.ID
    | CancelDeleteCard GitHub.ID
    | DeleteCard GitHub.ID GitHub.ID
    | SetEditingCardNote GitHub.ID String
    | CancelEditingCardNote GitHub.ID
    | ConvertEditingCardNoteToIssue GitHub.ID GitHub.ID
    | UpdateCardNote GitHub.ID
    | SetCardArchived GitHub.ID Bool
    | ToggleShowArchivedCards GitHub.ID
    | SetLoading (List GitHub.ID) (Cmd Msg)
    | SetUserOut GitHub.User
    | SetUserIn GitHub.User
    | StartProjectifying GitHub.ID
    | StopProjectifying GitHub.ID
    | Projectify Card GitHub.Project


type Page
    = AllProjectsPage
    | GlobalGraphPage
    | ProjectPage GitHub.ID
    | ReleasesPage
    | ReleasePage String (Maybe String) (Maybe String) (Maybe Int)
    | PullRequestsPage
    | ArchivePage
    | PairsPage
    | BouncePage


type Progress
    = ProgressLoading
    | ProgressFailed String


type alias ProgressState =
    Dict GitHub.ID Progress


type CardLabelOperation
    = AddLabelOperation
    | RemoveLabelOperation


type CardSource
    = FromColumnCardSource { columnId : GitHub.ID, cardId : GitHub.ID }
    | NewContentCardSource { contentId : GitHub.ID }


type alias CardDestination =
    { projectId : GitHub.ID
    , columnId : GitHub.ID
    , afterId : Maybe GitHub.ID
    }


type alias ReleaseStatus =
    { repo : GitHub.Repo
    , ref : Maybe String
    , lastRelease : Maybe GitHub.Release
    , milestone : Maybe GitHub.Milestone
    , issue : Maybe Card
    , totalCommits : Int
    , openPRs : List Card
    , mergedPRs : List Card
    , openIssues : List Card
    , closedIssues : List Card
    , doneCards : List Card
    , documentedCards : List Card
    , undocumentedCards : List Card
    , noImpactCards : List Card
    }


type alias ArchiveEvent =
    { cardId : GitHub.ID
    , event : Backend.CardEvent
    }


type alias StatefulGraph =
    { state : CardNodeState
    , nodes : List CardNode
    , edges : List CardEdge
    , matches : Set Int
    }


type alias CardNodeState =
    { allLabels : Dict GitHub.ID GitHub.Label
    , prReviewers : Dict GitHub.ID (List GitHub.PullRequestReview)
    , currentTime : Time.Posix
    , selectedCards : OrderedSet GitHub.ID
    , anticipatedCards : Set GitHub.ID
    , highlightedNode : Maybe GitHub.ID
    }


type alias CardNode =
    { card : Card
    , x : Float
    , y : Float
    , mass : Float
    , filteredOut : Bool
    }


type alias CardEdge =
    { source : CardEdgePoint
    , target : CardEdgePoint
    , filteredOut : Bool
    }


type GraphFilter
    = ExcludeAllFilter
    | InProjectFilter GitHub.ID
    | HasLabelFilter String String
    | InvolvesUserFilter String
    | IssuesFilter
    | PullRequestsFilter
    | UntriagedFilter


type GraphSort
    = ImpactSort
    | AllActivitySort


type alias CardEdgePoint =
    { x : Float
    , y : Float
    }


empty : Nav.Key -> Model
empty key =
    { key = key
    , page = GlobalGraphPage
    , me = Nothing
    , progress = Dict.empty
    , graphs = []
    , dataIndex = 0
    , assignableUsers = []
    , orgProjects = []
    , repos = Dict.empty
    , repoProjects = Dict.empty
    , repoCommits = Dict.empty
    , repoLabels = Dict.empty
    , repoMilestones = Dict.empty
    , repoReleases = Dict.empty
    , reposByLabel = Dict.empty
    , reposByName = Dict.empty
    , projects = Dict.empty
    , columnCards = Dict.empty
    , labelToRepoToId = Dict.empty
    , openPRsByRepo = Dict.empty
    , cardsByMilestone = Dict.empty
    , repoReleaseStatuses = Dict.empty
    , issues = Dict.empty
    , prs = Dict.empty
    , cardEvents = Dict.empty
    , cardClosers = Dict.empty
    , cardRotations = Dict.empty
    , prReviewers = Dict.empty
    , idsByUrl = Dict.empty
    , archive = []
    , cards = Dict.empty
    , allLabels = Dict.empty
    , colorLightnessCache = Dict.empty
    , cardSearch = "is:open "
    , selectedCards = OrderedSet.empty
    , anticipatedCards = Set.empty
    , highlightedCard = Nothing
    , highlightedNode = Nothing
    , currentTime = Time.millisToPosix 0
    , currentZone = Time.utc
    , statefulGraphs = []
    , baseGraphFilter = Nothing
    , graphFilters = []
    , graphSort = ImpactSort
    , projectDrag = Drag.init
    , assignUserDrag = Drag.init
    , reassignUserDrag = Drag.init
    , assignOnlyUsersDrag = Drag.init
    , showLabelFilters = False
    , labelSearch = ""
    , suggestedLabels = []
    , showLabelOperations = False
    , cardLabelOperations = Dict.empty
    , addingColumnNotes = Dict.empty
    , deletingCards = Set.empty
    , editingCardNotes = Dict.empty
    , showArchivedCards = Set.empty
    , outUsers = Set.empty
    , pendingAssignments = Dict.empty
    , inFlight = []
    , lastPaired = Dict.empty
    , repoProjectTemplates = Dict.empty
    , cardProjects = Dict.empty
    , projectifyingCards = Set.empty
    }


whenLoggedIn : Model -> Html Msg -> Html Msg
whenLoggedIn model html =
    case model.me of
        Nothing ->
            Html.text ""

        Just _ ->
            html
