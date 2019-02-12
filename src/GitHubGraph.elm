module GitHubGraph exposing
    ( CardContent(..)
    , CardLocation
    , Error
    , ID
    , Issue
    , IssueOrPRSelector
    , IssueState(..)
    , Label
    , MergeableState(..)
    , Milestone
    , MilestoneState(..)
    , PageInfo
    , PagedSelector
    , Project
    , ProjectColumn
    , ProjectColumnCard
    , PullRequest
    , PullRequestReview
    , PullRequestReviewState(..)
    , PullRequestState(..)
    , ReactionGroup
    , ReactionType(..)
    , Reactions
    , Repo
    , RepoLocation
    , RepoSelector
    , StatusState(..)
    , TimelineEvent(..)
    , User
    , V3Commit
    , V3Comparison
    , V3File
    , addContentCard
    , addContentCardAfter
    , addIssueLabels
    , addPullRequestLabels
    , closeIssue
    , closeRepoMilestone
    , compareRepoRefs
    , createRepoLabel
    , createRepoMilestone
    , decodeIssue
    , decodeProject
    , decodeProjectColumnCard
    , decodePullRequest
    , decodePullRequestReview
    , decodeRepo
    , decodeUser
    , decodeV3Comparison
    , deleteRepoLabel
    , deleteRepoMilestone
    , encodeIssue
    , encodeProject
    , encodeProjectColumnCard
    , encodePullRequest
    , encodePullRequestReview
    , encodeRepo
    , encodeUser
    , encodeV3Comparison
    , fetchIssue
    , fetchOrgProject
    , fetchOrgProjects
    , fetchOrgRepos
    , fetchProjectColumnCards
    , fetchPullRequest
    , fetchPullRequestReviews
    , fetchRepo
    , fetchRepoIssue
    , fetchRepoIssues
    , fetchRepoIssuesPage
    , fetchRepoPullRequest
    , fetchRepoPullRequests
    , fetchRepoPullRequestsPage
    , fetchTimeline
    , issueScore
    , labelEq
    , moveCardAfter
    , pullRequestScore
    , reactionScore
    , removeIssueLabel
    , removePullRequestLabel
    , reopenIssue
    , setIssueMilestone
    , setPullRequestMilestone
    , updateRepoLabel
    )

import Dict
import GraphQL.Client.Http as GH
import GraphQL.Request.Builder as GB
import GraphQL.Request.Builder.Arg as GA
import GraphQL.Request.Builder.Variable as GV
import Http
import HttpBuilder
import Iso8601
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Json.Encode.Extra as JEE
import Log
import Task exposing (Task)
import Time


type alias Token =
    String


type alias Error =
    GH.Error


type alias ID =
    String


type alias Repo =
    { id : ID
    , url : String
    , owner : String
    , name : String
    , isArchived : Bool
    , labels : List Label
    , milestones : List Milestone
    , releases : List Release
    }


type alias Release =
    { id : ID
    , url : String
    , name : Maybe String
    , tag : Maybe Tag
    }


type alias Tag =
    { name : String
    , target : GitObject
    }


type alias GitObject =
    { url : String
    , oid : String
    }


type alias V3Comparison =
    { url : String
    , status : String
    , baseCommit : V3Commit
    , mergeBaseCommit : V3Commit
    , aheadBy : Int
    , behindBy : Int
    , totalCommits : Int
    , commits : List V3Commit
    , files : List V3File
    }


type alias V3Commit =
    { url : String
    , sha : String
    }


type alias V3File =
    { sha : String
    , filename : String
    , status : String
    }


type alias Issue =
    { id : ID
    , url : String
    , createdAt : Time.Posix
    , updatedAt : Time.Posix
    , state : IssueState
    , repo : RepoLocation
    , number : Int
    , title : String
    , commentCount : Int
    , reactions : Reactions
    , author : Maybe User
    , labels : List Label
    , cards : List CardLocation
    , milestone : Maybe Milestone
    }


type IssueState
    = IssueStateOpen
    | IssueStateClosed


type alias PullRequest =
    { id : ID
    , url : String
    , createdAt : Time.Posix
    , updatedAt : Time.Posix
    , state : PullRequestState
    , repo : RepoLocation
    , number : Int
    , title : String
    , commentCount : Int
    , reactions : Reactions
    , author : Maybe User
    , labels : List Label
    , cards : List CardLocation
    , additions : Int
    , deletions : Int
    , milestone : Maybe Milestone
    , mergeable : MergeableState
    , lastCommit : Maybe Commit
    , mergeCommit : Maybe Commit
    }


type alias Commit =
    { sha : String
    , status : Maybe Status
    , author : Maybe GitActor
    , committer : Maybe GitActor
    , authoredAt : Time.Posix
    , committedAt : Time.Posix
    }


type alias GitActor =
    { email : String
    , name : String
    , avatar : String
    , user : Maybe User
    }


type alias Status =
    { state : StatusState
    , contexts : List StatusContext
    }


type alias StatusContext =
    { state : StatusState
    , context : String
    , targetUrl : Maybe String
    , creator : Actor
    }


type alias Actor =
    { url : String
    , login : String
    , avatar : String
    }


type StatusState
    = StatusStateExpected
    | StatusStateError
    | StatusStateFailure
    | StatusStatePending
    | StatusStateSuccess


type MergeableState
    = MergeableStateMergeable
    | MergeableStateConflicting
    | MergeableStateUnknown


type PullRequestState
    = PullRequestStateOpen
    | PullRequestStateClosed
    | PullRequestStateMerged


type alias RepoLocation =
    { id : ID
    , url : String
    , owner : String
    , name : String
    }


type alias Label =
    { id : ID
    , name : String
    , color : String
    }


type alias Milestone =
    { id : ID
    , number : Int
    , title : String
    , state : MilestoneState
    , description : Maybe String
    }


type MilestoneState
    = MilestoneStateOpen
    | MilestoneStateClosed


type alias ReactionGroup =
    { type_ : ReactionType
    , count : Int
    }


type ReactionType
    = ReactionTypeThumbsUp
    | ReactionTypeThumbsDown
    | ReactionTypeLaugh
    | ReactionTypeHooray
    | ReactionTypeConfused
    | ReactionTypeHeart
    | ReactionTypeRocket
    | ReactionTypeEyes


type alias User =
    { id : ID
    , databaseId : Int
    , url : String
    , login : String
    , avatar : String
    }


type alias Reactions =
    List ReactionGroup


type alias Project =
    { id : ID
    , url : String
    , name : String
    , number : Int
    , body : String
    , columns : List ProjectColumn
    }


type alias ProjectColumn =
    { id : ID
    , name : String

    -- used to cross-reference with v3 hooks API
    , databaseId : Int
    }


type alias ProjectColumnCard =
    { id : ID
    , url : String
    , content : Maybe CardContent
    , note : Maybe String
    }


type CardContent
    = IssueCardContent Issue
    | PullRequestCardContent PullRequest


type alias ProjectLocation =
    { id : ID
    , url : String
    , name : String
    , number : Int
    }


type alias CardLocation =
    { id : ID
    , url : String
    , project : ProjectLocation
    , column : Maybe ProjectColumn
    }


type TimelineEvent
    = IssueCommentEvent (Maybe User) Time.Posix
    | CrossReferencedEvent ID
    | CommitEvent Commit


type alias PullRequestReview =
    { author : User
    , state : PullRequestReviewState
    , createdAt : Time.Posix
    }


type PullRequestReviewState
    = PullRequestReviewStatePending
    | PullRequestReviewStateCommented
    | PullRequestReviewStateApproved
    | PullRequestReviewStateChangesRequested
    | PullRequestReviewStateDismissed


type alias OrgSelector =
    { name : String }


type alias RepoSelector =
    { owner : String, name : String }


type alias ProjectSelector =
    { owner : String, number : Int }


type alias IDSelector =
    { id : ID }


type alias IssueOrPRSelector =
    { owner : String, repo : String, number : Int }


type alias PagedSelector a =
    { selector : a, after : Maybe ID }


type alias PagedResult a =
    { content : List a
    , pageInfo : PageInfo
    }


type alias PageInfo =
    { endCursor : Maybe ID
    , hasNextPage : Bool
    }


fetchOrgRepos : Token -> OrgSelector -> Task Error (List Repo)
fetchOrgRepos token org =
    fetchPaged reposQuery token { selector = org, after = Nothing }


fetchOrgProjects : Token -> OrgSelector -> Task Error (List Project)
fetchOrgProjects token org =
    fetchPaged projectsQuery token { selector = org, after = Nothing }


fetchOrgProject : Token -> ProjectSelector -> Task Error Project
fetchOrgProject token project =
    projectQuery
        |> GB.request project
        |> GH.customSendQuery (authedOptions token)


fetchProjectColumnCards : Token -> IDSelector -> Task Error (List ProjectColumnCard)
fetchProjectColumnCards token col =
    fetchPaged cardsQuery token { selector = col, after = Nothing }


fetchRepo : Token -> RepoSelector -> Task Error Repo
fetchRepo token repo =
    repoQuery
        |> GB.request repo
        |> GH.customSendQuery (authedOptions token)


fetchRepoIssues : Token -> RepoSelector -> Task Error (List Issue)
fetchRepoIssues token repo =
    fetchPaged issuesQuery token { selector = repo, after = Nothing }


fetchRepoIssuesPage : Token -> PagedSelector RepoSelector -> (Result Error ( List Issue, PageInfo ) -> msg) -> Cmd msg
fetchRepoIssuesPage token psel msg =
    fetchPage issuesQuery token psel msg


compareRepoRefs : Token -> RepoSelector -> String -> String -> Task Error V3Comparison
compareRepoRefs token repo base mergeBase =
    HttpBuilder.get ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/compare/" ++ base ++ "..." ++ mergeBase)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withExpectJson decodeV3Comparison
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


fetchRepoIssue : Token -> IssueOrPRSelector -> Task Error Issue
fetchRepoIssue token sel =
    issueQuery
        |> GB.request sel
        |> GH.customSendQuery (authedOptions token)


fetchRepoPullRequests : Token -> RepoSelector -> Task Error (List PullRequest)
fetchRepoPullRequests token repo =
    fetchPaged pullRequestsQuery token { selector = repo, after = Nothing }


fetchRepoPullRequestsPage : Token -> PagedSelector RepoSelector -> (Result Error ( List PullRequest, PageInfo ) -> msg) -> Cmd msg
fetchRepoPullRequestsPage token psel msg =
    fetchPage pullRequestsQuery token psel msg


fetchRepoPullRequest : Token -> IssueOrPRSelector -> Task Error PullRequest
fetchRepoPullRequest token sel =
    pullRequestQuery
        |> GB.request sel
        |> GH.customSendQuery (authedOptions token)


fetchIssue : Token -> ID -> Task Error Issue
fetchIssue token id =
    objectQuery "Issue" issueObject
        |> GB.request { id = id }
        |> GH.customSendQuery (authedOptions token)


fetchPullRequest : Token -> ID -> Task Error PullRequest
fetchPullRequest token id =
    objectQuery "PullRequest" prObject
        |> GB.request { id = id }
        |> GH.customSendQuery (authedOptions token)


fetchPullRequestReviews : Token -> IDSelector -> Task Error (List PullRequestReview)
fetchPullRequestReviews token pr =
    fetchPaged prReviewQuery token { selector = pr, after = Nothing }


fetchTimeline : Token -> IDSelector -> Task Error (List TimelineEvent)
fetchTimeline token issue =
    fetchPaged timelineQuery token { selector = issue, after = Nothing }


moveCardAfter : Token -> ID -> ID -> Maybe ID -> Task Error ProjectColumnCard
moveCardAfter token columnID cardID mafterID =
    moveCardMutation
        |> GB.request { columnId = columnID, cardId = cardID, afterId = mafterID }
        |> GH.customSendMutation (authedOptions token)


addContentCard : Token -> ID -> ID -> Task Error ProjectColumnCard
addContentCard token columnID contentID =
    addCardMutation
        |> GB.request { columnId = columnID, contentId = contentID }
        |> GH.customSendMutation (authedOptions token)


addContentCardAfter : Token -> ID -> ID -> Maybe ID -> Task Error ProjectColumnCard
addContentCardAfter token columnID contentID mafterID =
    addContentCard token columnID contentID
        |> Task.andThen (\{ id } -> moveCardAfter token columnID id mafterID)


createRepoLabel : Token -> Repo -> String -> String -> Task Error ()
createRepoLabel token repo name color =
    HttpBuilder.post ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/labels")
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (encodeLabelPatch name color)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


deleteRepoLabel : Token -> Repo -> String -> Task Error ()
deleteRepoLabel token repo name =
    HttpBuilder.delete ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/labels/" ++ name)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


updateRepoLabel : Token -> Repo -> Label -> String -> String -> Task Error ()
updateRepoLabel token repo label name color =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/labels/" ++ label.name)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (encodeLabelPatch name color)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


createRepoMilestone : Token -> Repo -> String -> Task Error ()
createRepoMilestone token repo title =
    HttpBuilder.post ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/milestones")
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "title", JE.string title ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


closeRepoMilestone : Token -> Repo -> Milestone -> Task Error ()
closeRepoMilestone token repo milestone =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/milestones/" ++ String.fromInt milestone.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "state", JE.string "closed" ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


deleteRepoMilestone : Token -> Repo -> Milestone -> Task Error ()
deleteRepoMilestone token repo milestone =
    HttpBuilder.delete ("https://api.github.com/repos/" ++ repo.owner ++ "/" ++ repo.name ++ "/milestones/" ++ String.fromInt milestone.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


closeIssue : Token -> Issue -> Task Error ()
closeIssue token issue =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "state", JE.string "closed" ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


reopenIssue : Token -> Issue -> Task Error ()
reopenIssue token issue =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "state", JE.string "open" ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


addIssueLabels : Token -> Issue -> List String -> Task Error ()
addIssueLabels token issue names =
    HttpBuilder.post ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number ++ "/labels")
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.list JE.string names)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


removeIssueLabel : Token -> Issue -> String -> Task Error ()
removeIssueLabel token issue name =
    HttpBuilder.delete ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number ++ "/labels/" ++ name)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


setIssueMilestone : Token -> Issue -> Maybe Milestone -> Task Error ()
setIssueMilestone token issue mmilestone =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "milestone", JEE.maybe JE.int (Maybe.map .number mmilestone) ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


addPullRequestLabels : Token -> PullRequest -> List String -> Task Error ()
addPullRequestLabels token issue names =
    HttpBuilder.post ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number ++ "/labels")
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.list JE.string names)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


removePullRequestLabel : Token -> PullRequest -> String -> Task Error ()
removePullRequestLabel token issue name =
    HttpBuilder.delete ("https://api.github.com/repos/" ++ issue.repo.owner ++ "/" ++ issue.repo.name ++ "/issues/" ++ String.fromInt issue.number ++ "/labels/" ++ name)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


setPullRequestMilestone : Token -> PullRequest -> Maybe Milestone -> Task Error ()
setPullRequestMilestone token pr mmilestone =
    HttpBuilder.patch ("https://api.github.com/repos/" ++ pr.repo.owner ++ "/" ++ pr.repo.name ++ "/issues/" ++ String.fromInt pr.number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withJsonBody (JE.object [ ( "milestone", JEE.maybe JE.int (Maybe.map .number mmilestone) ) ])
        |> HttpBuilder.toTask
        |> Task.mapError GH.HttpError


encodeLabelPatch : String -> String -> JE.Value
encodeLabelPatch name color =
    JE.object
        [ ( "name", JE.string name )
        , ( "color", JE.string color )
        ]


moveCardMutation : GB.Document GB.Mutation ProjectColumnCard { columnId : ID, cardId : ID, afterId : Maybe ID }
moveCardMutation =
    let
        columnIDVar =
            GV.required "columnId" .columnId GV.id

        cardIDVar =
            GV.required "cardId" .cardId GV.id

        afterIDVar =
            GV.required "afterId" .afterId (GV.nullable GV.id)
    in
    GB.mutationDocument <|
        GB.extract <|
            GB.field "moveProjectCard"
                [ ( "input"
                  , GA.object
                        [ ( "columnId", GA.variable columnIDVar )
                        , ( "cardId", GA.variable cardIDVar )
                        , ( "afterCardId", GA.variable afterIDVar )
                        ]
                  )
                ]
                (GB.extract <|
                    GB.field "cardEdge"
                        []
                        (GB.extract <|
                            GB.field "node" [] projectColumnCardObject
                        )
                )


addCardMutation : GB.Document GB.Mutation ProjectColumnCard { columnId : ID, contentId : ID }
addCardMutation =
    let
        columnIDVar =
            GV.required "columnId" .columnId GV.id

        contentIDVar =
            GV.required "contentId" .contentId GV.id
    in
    GB.mutationDocument <|
        GB.extract <|
            GB.field "addProjectCard"
                [ ( "input"
                  , GA.object
                        [ ( "projectColumnId", GA.variable columnIDVar )
                        , ( "contentId", GA.variable contentIDVar )
                        ]
                  )
                ]
                (GB.extract <|
                    GB.field "cardEdge"
                        []
                        (GB.extract <|
                            GB.field "node" [] projectColumnCardObject
                        )
                )


issueScore : { a | reactions : Reactions, commentCount : Int } -> Int
issueScore { reactions, commentCount } =
    reactionScore reactions
        + (2 * commentCount)


pullRequestScore : { a | reactions : Reactions, commentCount : Int } -> Int
pullRequestScore { reactions, commentCount } =
    1000
        + reactionScore reactions
        + (2 * commentCount)


reactionScore : Reactions -> Int
reactionScore reactions =
    List.sum <|
        (\a -> List.map a reactions) <|
            \{ type_, count } ->
                case type_ of
                    ReactionTypeThumbsUp ->
                        2 * count

                    ReactionTypeThumbsDown ->
                        -2 * count

                    ReactionTypeLaugh ->
                        count

                    ReactionTypeConfused ->
                        -count

                    ReactionTypeHeart ->
                        3 * count

                    ReactionTypeHooray ->
                        3 * count

                    ReactionTypeRocket ->
                        3 * count

                    ReactionTypeEyes ->
                        2 * count


labelEq : Label -> Label -> Bool
labelEq a b =
    a.name == b.name && String.toLower a.color == String.toLower b.color


auth : String -> List ( String, String )
auth token =
    if token == "" then
        []

    else
        [ ( "Authorization", "token " ++ token ) ]


authHeaders : String -> List Http.Header
authHeaders =
    List.map (\( a, b ) -> Http.header a b) << auth


authedOptions : Token -> GH.RequestOptions
authedOptions token =
    { method = "POST"
    , headers = authHeaders token
    , url = "https://api.github.com/graphql"
    , timeout = Nothing
    , withCredentials = False
    }


fetchPage : GB.Document GB.Query (PagedResult a) (PagedSelector s) -> Token -> PagedSelector s -> (Result Error ( List a, PageInfo ) -> msg) -> Cmd msg
fetchPage doc token psel msg =
    let
        fetchNextPage res =
            case res of
                Ok { content, pageInfo } ->
                    msg (Ok ( content, pageInfo ))

                Err err ->
                    msg (Err err)
    in
    doc
        |> GB.request psel
        |> GH.customSendQuery (authedOptions token)
        |> Task.attempt fetchNextPage


fetchPaged : GB.Document GB.Query (PagedResult a) (PagedSelector s) -> Token -> PagedSelector s -> Task Error (List a)
fetchPaged doc token psel =
    let
        fetchNextPage { content, pageInfo } =
            if pageInfo.hasNextPage then
                Log.debug "has next page" psel <|
                    Task.map ((++) content) <|
                        fetchPaged doc token { psel | after = pageInfo.endCursor }

            else
                Task.succeed content
    in
    doc
        |> GB.request psel
        |> GH.customSendQuery (authedOptions token)
        |> Task.andThen fetchNextPage


type DateType
    = DateType


issueStates : List ( String, IssueState )
issueStates =
    [ ( "OPEN", IssueStateOpen )
    , ( "CLOSED", IssueStateClosed )
    ]


pullRequestStates : List ( String, PullRequestState )
pullRequestStates =
    [ ( "OPEN", PullRequestStateOpen )
    , ( "CLOSED", PullRequestStateClosed )
    , ( "MERGED", PullRequestStateMerged )
    ]


statusStates : List ( String, StatusState )
statusStates =
    [ ( "EXPECTED", StatusStateExpected )
    , ( "ERROR", StatusStateError )
    , ( "FAILURE", StatusStateFailure )
    , ( "PENDING", StatusStatePending )
    , ( "SUCCESS", StatusStateSuccess )
    ]


mergeableStates : List ( String, MergeableState )
mergeableStates =
    [ ( "MERGEABLE", MergeableStateMergeable )
    , ( "CONFLICTING", MergeableStateConflicting )
    , ( "UNKNOWN", MergeableStateUnknown )
    ]


pullRequestReviewStates : List ( String, PullRequestReviewState )
pullRequestReviewStates =
    [ ( "PENDING", PullRequestReviewStatePending )
    , ( "COMMENTED", PullRequestReviewStateCommented )
    , ( "APPROVED", PullRequestReviewStateApproved )
    , ( "CHANGES_REQUESTED", PullRequestReviewStateChangesRequested )
    , ( "DISMISSED", PullRequestReviewStateDismissed )
    ]


milestoneStates : List ( String, MilestoneState )
milestoneStates =
    [ ( "OPEN", MilestoneStateOpen )
    , ( "CLOSED", MilestoneStateClosed )
    ]


reactionTypes : List ( String, ReactionType )
reactionTypes =
    [ ( "THUMBS_UP", ReactionTypeThumbsUp )
    , ( "THUMBS_DOWN", ReactionTypeThumbsDown )
    , ( "LAUGH", ReactionTypeLaugh )
    , ( "HOORAY", ReactionTypeHooray )
    , ( "CONFUSED", ReactionTypeConfused )
    , ( "HEART", ReactionTypeHeart )
    , ( "ROCKET", ReactionTypeRocket )
    , ( "EYES", ReactionTypeEyes )
    ]


repoObject : GB.ValueSpec GB.NonNull GB.ObjectType Repo vars
repoObject =
    GB.object Repo
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "owner" [] (GB.extract (GB.field "login" [] GB.string)))
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "isArchived" [] GB.bool)
        |> GB.with (GB.field "labels" [ ( "first", GA.int 100 ) ] (GB.extract <| GB.field "nodes" [] (GB.list labelObject)))
        |> GB.with (GB.field "milestones" [ ( "first", GA.int 100 ) ] (GB.extract <| GB.field "nodes" [] (GB.list milestoneObject)))
        |> GB.with (GB.field "releases" [ ( "first", GA.int 100 ), ( "orderBy", GA.object [ ( "field", GA.enum "CREATED_AT" ), ( "direction", GA.enum "DESC" ) ] ) ] (GB.extract <| GB.field "nodes" [] (GB.list releaseObject)))


repoQuery : GB.Document GB.Query Repo RepoSelector
repoQuery =
    let
        ownerVar =
            GV.required "owner" .owner GV.string

        nameVar =
            GV.required "name" .name GV.string

        queryRoot =
            GB.extract <|
                GB.field "repository"
                    [ ( "owner", GA.variable ownerVar )
                    , ( "name", GA.variable nameVar )
                    ]
                    repoObject
    in
    GB.queryDocument queryRoot


reposQuery : GB.Document GB.Query (PagedResult Repo) (PagedSelector OrgSelector)
reposQuery =
    let
        orgNameVar =
            GV.required "orgName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list repoObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        queryRoot =
            GB.extract <|
                GB.field "organization"
                    [ ( "login", GA.variable orgNameVar )
                    ]
                <|
                    GB.extract (GB.field "repositories" pageArgs paged)
    in
    GB.queryDocument queryRoot


projectObject : GB.ValueSpec GB.NonNull GB.ObjectType Project vars
projectObject =
    GB.object Project
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "number" [] GB.int)
        |> GB.with (GB.field "body" [] GB.string)
        |> GB.with (GB.field "columns" [ ( "first", GA.int 50 ) ] (GB.extract (GB.field "nodes" [] (GB.list columnObject))))


projectQuery : GB.Document GB.Query Project ProjectSelector
projectQuery =
    let
        orgNameVar =
            GV.required "orgName" .owner GV.string

        projectNumberVar =
            GV.required "projectNumber" .number GV.int

        queryRoot =
            GB.extract <|
                GB.field "organization"
                    [ ( "login", GA.variable orgNameVar )
                    ]
                <|
                    GB.extract (GB.field "project" [ ( "number", GA.variable projectNumberVar ) ] projectObject)
    in
    GB.queryDocument queryRoot


projectsQuery : GB.Document GB.Query (PagedResult Project) (PagedSelector OrgSelector)
projectsQuery =
    let
        orgNameVar =
            GV.required "orgName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            , ( "states", GA.list [ GA.enum "OPEN" ] )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list projectObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        queryRoot =
            GB.extract <|
                GB.field "organization"
                    [ ( "login", GA.variable orgNameVar )
                    ]
                <|
                    GB.extract (GB.field "projects" pageArgs paged)
    in
    GB.queryDocument queryRoot


cardsQuery : GB.Document GB.Query (PagedResult ProjectColumnCard) (PagedSelector IDSelector)
cardsQuery =
    let
        idVar =
            GV.required "id" (.id << .selector) GV.id

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list projectColumnCardObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        cards =
            GB.extract (GB.field "cards" pageArgs paged)

        queryRoot =
            GB.extract <|
                GB.assume <|
                    GB.field "node"
                        [ ( "id", GA.variable idVar )
                        ]
                        (GB.extract <| GB.inlineFragment (Just <| GB.onType "ProjectColumn") cards)
    in
    GB.queryDocument queryRoot


projectLocationObject : GB.ValueSpec GB.NonNull GB.ObjectType ProjectLocation vars
projectLocationObject =
    GB.object ProjectLocation
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "number" [] GB.int)


labelObject : GB.ValueSpec GB.NonNull GB.ObjectType Label vars
labelObject =
    GB.object Label
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "color" [] GB.string)


milestoneObject : GB.ValueSpec GB.NonNull GB.ObjectType Milestone vars
milestoneObject =
    GB.object Milestone
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "number" [] GB.int)
        |> GB.with (GB.field "title" [] GB.string)
        |> GB.with (GB.field "state" [] (GB.enum milestoneStates))
        |> GB.with (GB.field "description" [] (GB.nullable GB.string))


releaseObject : GB.ValueSpec GB.NonNull GB.ObjectType Release vars
releaseObject =
    GB.object Release
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "name" [] (GB.nullable GB.string))
        |> GB.with (GB.field "tag" [] (GB.nullable tagObject))


tagObject : GB.ValueSpec GB.NonNull GB.ObjectType Tag vars
tagObject =
    GB.object Tag
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "target" [] gitObjectObject)


gitObjectObject : GB.ValueSpec GB.NonNull GB.ObjectType GitObject vars
gitObjectObject =
    GB.object GitObject
        |> GB.with (GB.field "commitUrl" [] GB.string)
        |> GB.with (GB.field "oid" [] GB.string)


columnObject : GB.ValueSpec GB.NonNull GB.ObjectType ProjectColumn vars
columnObject =
    GB.object ProjectColumn
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "databaseId" [] GB.int)


userObject : GB.ValueSpec GB.NonNull GB.ObjectType User vars
userObject =
    GB.object User
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "databaseId" [] GB.int)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "login" [] GB.string)
        |> GB.with (GB.field "avatarUrl" [] GB.string)


authorObject : GB.ValueSpec GB.NonNull GB.ObjectType (Maybe User) vars
authorObject =
    GB.object pickEnum2
        |> GB.with (GB.inlineFragment (Just <| GB.onType "User") userObject)
        |> GB.with (GB.inlineFragment (Just <| GB.onType "Bot") userObject)


projectCardObject : GB.ValueSpec GB.NonNull GB.ObjectType CardLocation vars
projectCardObject =
    GB.object CardLocation
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "project" [] projectLocationObject)
        |> GB.with (GB.field "column" [] (GB.nullable columnObject))


projectColumnCardObject : GB.ValueSpec GB.NonNull GB.ObjectType ProjectColumnCard vars
projectColumnCardObject =
    let
        content =
            GB.object pickEnum2
                |> GB.with (GB.inlineFragment (Just (GB.onType "Issue")) (GB.map IssueCardContent issueObject))
                |> GB.with (GB.inlineFragment (Just (GB.onType "PullRequest")) (GB.map PullRequestCardContent prObject))
    in
    GB.object ProjectColumnCard
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "content" [] content)
        |> GB.with (GB.field "note" [] (GB.nullable GB.string))


reactionGroupObject : GB.ValueSpec GB.NonNull GB.ObjectType ReactionGroup vars
reactionGroupObject =
    GB.object ReactionGroup
        |> GB.with (GB.field "content" [] (GB.enum reactionTypes))
        |> GB.with (GB.field "users" [] (GB.extract (GB.field "totalCount" [] GB.int)))


issueObject : GB.ValueSpec GB.NonNull GB.ObjectType Issue vars
issueObject =
    GB.object Issue
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.datetime))
        |> GB.with (GB.field "updatedAt" [] (GB.customScalar DateType JDE.datetime))
        |> GB.with (GB.aliasAs "issueState" <| GB.field "state" [] (GB.enum issueStates))
        |> GB.with (GB.field "repository" [] repoLocationObject)
        |> GB.with (GB.field "number" [] GB.int)
        |> GB.with (GB.field "title" [] GB.string)
        |> GB.with (GB.field "comments" [] (GB.extract (GB.field "totalCount" [] GB.int)))
        |> GB.with (GB.field "reactionGroups" [] (GB.list reactionGroupObject))
        |> GB.with (GB.field "author" [] authorObject)
        |> GB.with (GB.field "labels" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list labelObject)))
        |> GB.with (GB.field "projectCards" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (nullableList projectCardObject)))
        |> GB.with (GB.field "milestone" [] (GB.nullable milestoneObject))


actorObject : GB.ValueSpec GB.NonNull GB.ObjectType Actor vars
actorObject =
    GB.object Actor
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "login" [] GB.string)
        |> GB.with (GB.field "avatarUrl" [] GB.string)


statusContextObject : GB.ValueSpec GB.NonNull GB.ObjectType StatusContext vars
statusContextObject =
    GB.object StatusContext
        |> GB.with (GB.field "state" [] (GB.enum statusStates))
        |> GB.with (GB.field "context" [] GB.string)
        |> GB.with (GB.field "targetUrl" [] (GB.nullable GB.string))
        |> GB.with (GB.field "creator" [] actorObject)


statusObject : GB.ValueSpec GB.NonNull GB.ObjectType Status vars
statusObject =
    GB.object Status
        |> GB.with (GB.field "state" [] (GB.enum statusStates))
        |> GB.with (GB.field "contexts" [] (GB.list statusContextObject))


nullableList : GB.ValueSpec GB.NonNull coreType result vars -> GB.ValueSpec GB.NonNull (GB.ListType GB.Nullable coreType) (List result) vars
nullableList o =
    GB.map (List.filterMap identity) (GB.list (GB.nullable o))


prObject : GB.ValueSpec GB.NonNull GB.ObjectType PullRequest vars
prObject =
    GB.object PullRequest
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.datetime))
        |> GB.with (GB.field "updatedAt" [] (GB.customScalar DateType JDE.datetime))
        |> GB.with (GB.aliasAs "prState" <| GB.field "state" [] (GB.enum pullRequestStates))
        |> GB.with (GB.field "repository" [] repoLocationObject)
        |> GB.with (GB.field "number" [] GB.int)
        |> GB.with (GB.field "title" [] GB.string)
        |> GB.with (GB.field "comments" [] (GB.extract (GB.field "totalCount" [] GB.int)))
        |> GB.with (GB.field "reactionGroups" [] (GB.list reactionGroupObject))
        |> GB.with (GB.field "author" [] authorObject)
        |> GB.with (GB.field "labels" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list labelObject)))
        |> GB.with (GB.field "projectCards" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (nullableList projectCardObject)))
        |> GB.with (GB.field "additions" [] GB.int)
        |> GB.with (GB.field "deletions" [] GB.int)
        |> GB.with (GB.field "milestone" [] (GB.nullable milestoneObject))
        |> GB.with (GB.field "mergeable" [] (GB.enum mergeableStates))
        |> GB.with
            (GB.field "commits"
                [ ( "last", GA.int 1 ) ]
                (GB.map List.head <|
                    GB.extract (GB.field "nodes" [] (GB.list (GB.extract (GB.field "commit" [] commitObject))))
                )
            )
        |> GB.with (GB.field "mergeCommit" [] (GB.nullable commitObject))


commitObject : GB.ValueSpec GB.NonNull GB.ObjectType Commit vars
commitObject =
    GB.object Commit
        |> GB.with (GB.field "oid" [] GB.string)
        |> GB.with (GB.field "status" [] (GB.nullable statusObject))
        |> GB.with (GB.field "author" [] (GB.nullable gitActorObject))
        |> GB.with (GB.field "committer" [] (GB.nullable gitActorObject))
        |> GB.with (GB.field "authoredDate" [] (GB.customScalar DateType JDE.datetime))
        |> GB.with (GB.field "committedDate" [] (GB.customScalar DateType JDE.datetime))


gitActorObject : GB.ValueSpec GB.NonNull GB.ObjectType GitActor vars
gitActorObject =
    GB.object GitActor
        |> GB.with (GB.field "email" [] GB.string)
        |> GB.with (GB.field "name" [] GB.string)
        |> GB.with (GB.field "avatarUrl" [] GB.string)
        |> GB.with (GB.field "user" [] (GB.nullable userObject))


prReviewObject : GB.ValueSpec GB.NonNull GB.ObjectType PullRequestReview vars
prReviewObject =
    GB.object PullRequestReview
        |> GB.with (GB.assume <| GB.field "author" [] authorObject)
        |> GB.with (GB.field "state" [] (GB.enum pullRequestReviewStates))
        |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.datetime))


repoLocationObject : GB.ValueSpec GB.NonNull GB.ObjectType RepoLocation vars
repoLocationObject =
    GB.object RepoLocation
        |> GB.with (GB.field "id" [] GB.string)
        |> GB.with (GB.field "url" [] GB.string)
        |> GB.with (GB.field "owner" [] (GB.extract (GB.field "login" [] GB.string)))
        |> GB.with (GB.field "name" [] GB.string)


issuesQuery : GB.Document GB.Query (PagedResult Issue) (PagedSelector RepoSelector)
issuesQuery =
    let
        orgNameVar =
            GV.required "orgName" (.owner << .selector) GV.string

        repoNameVar =
            GV.required "repoName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list issueObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        queryRoot =
            GB.extract <|
                GB.field "repository"
                    [ ( "owner", GA.variable orgNameVar )
                    , ( "name", GA.variable repoNameVar )
                    ]
                <|
                    GB.extract (GB.field "issues" pageArgs paged)
    in
    GB.queryDocument queryRoot


issueQuery : GB.Document GB.Query Issue IssueOrPRSelector
issueQuery =
    let
        orgNameVar =
            GV.required "orgName" .owner GV.string

        repoNameVar =
            GV.required "repoName" .repo GV.string

        numberVar =
            GV.required "number" .number GV.int

        queryRoot =
            GB.extract <|
                GB.field "repository"
                    [ ( "owner", GA.variable orgNameVar )
                    , ( "name", GA.variable repoNameVar )
                    ]
                <|
                    GB.extract (GB.field "issue" [ ( "number", GA.variable numberVar ) ] issueObject)
    in
    GB.queryDocument queryRoot


pullRequestsQuery : GB.Document GB.Query (PagedResult PullRequest) (PagedSelector RepoSelector)
pullRequestsQuery =
    let
        orgNameVar =
            GV.required "orgName" (.owner << .selector) GV.string

        repoNameVar =
            GV.required "repoName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        pageArgs =
            [ ( "first", GA.int 10 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list prObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        queryRoot =
            GB.extract <|
                GB.field "repository"
                    [ ( "owner", GA.variable orgNameVar )
                    , ( "name", GA.variable repoNameVar )
                    ]
                <|
                    GB.extract (GB.field "pullRequests" pageArgs paged)
    in
    GB.queryDocument queryRoot


pullRequestQuery : GB.Document GB.Query PullRequest IssueOrPRSelector
pullRequestQuery =
    let
        orgNameVar =
            GV.required "orgName" .owner GV.string

        repoNameVar =
            GV.required "repoName" .repo GV.string

        numberVar =
            GV.required "number" .number GV.int

        queryRoot =
            GB.extract <|
                GB.field "repository"
                    [ ( "owner", GA.variable orgNameVar )
                    , ( "name", GA.variable repoNameVar )
                    ]
                <|
                    GB.extract (GB.field "pullRequest" [ ( "number", GA.variable numberVar ) ] prObject)
    in
    GB.queryDocument queryRoot


objectQuery : String -> GB.ValueSpec GB.NonNull GB.ObjectType a IDSelector -> GB.Document GB.Query a IDSelector
objectQuery t obj =
    let
        idVar =
            GV.required "id" .id GV.id

        queryRoot =
            GB.extract <|
                GB.assume <|
                    GB.field "node" [ ( "id", GA.variable idVar ) ] <|
                        GB.extract (GB.inlineFragment (Just (GB.onType t)) obj)
    in
    GB.queryDocument queryRoot


timelineQuery : GB.Document GB.Query (PagedResult TimelineEvent) (PagedSelector IDSelector)
timelineQuery =
    let
        issueIdVar =
            GV.required "issueId" (.id << .selector) GV.id

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        issueCommentEvent =
            GB.object IssueCommentEvent
                |> GB.with (GB.field "author" [] authorObject)
                |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.datetime))

        sourceID =
            GB.object pickEnum2
                |> GB.with (GB.inlineFragment (Just (GB.onType "Issue")) (GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.inlineFragment (Just (GB.onType "PullRequest")) (GB.extract <| GB.field "id" [] GB.string))

        crossReferencedEvent =
            GB.object CrossReferencedEvent
                |> GB.with (GB.assume <| GB.field "source" [] sourceID)

        commitEvent =
            GB.map CommitEvent commitObject

        event =
            GB.object pickEnum3
                |> GB.with (GB.inlineFragment (Just (GB.onType "IssueComment")) issueCommentEvent)
                |> GB.with (GB.inlineFragment (Just (GB.onType "CrossReferencedEvent")) crossReferencedEvent)
                |> GB.with (GB.inlineFragment (Just (GB.onType "Commit")) commitEvent)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.map (List.filterMap identity) (GB.list event)))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        timeline =
            GB.extract (GB.field "timeline" pageArgs paged)

        issueOrPRTimeline =
            GB.object pickEnum2
                |> GB.with (GB.inlineFragment (Just <| GB.onType "Issue") timeline)
                |> GB.with (GB.inlineFragment (Just <| GB.onType "PullRequest") timeline)

        queryRoot =
            GB.extract <|
                GB.assume <|
                    GB.field "node"
                        [ ( "id", GA.variable issueIdVar )
                        ]
                        issueOrPRTimeline
    in
    GB.queryDocument queryRoot


prReviewQuery : GB.Document GB.Query (PagedResult PullRequestReview) (PagedSelector IDSelector)
prReviewQuery =
    let
        idVar =
            GV.required "id" (.id << .selector) GV.id

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        issueCommentEvent =
            GB.object IssueCommentEvent
                |> GB.with (GB.field "author" [] authorObject)
                |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.datetime))

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list prReviewObject))
                |> GB.with (GB.field "pageInfo" [] pageInfo)

        reviews =
            GB.extract (GB.field "reviews" pageArgs paged)

        queryRoot =
            GB.extract <|
                GB.assume <|
                    GB.field "node"
                        [ ( "id", GA.variable idVar )
                        ]
                        (GB.extract <| GB.inlineFragment (Just <| GB.onType "PullRequest") reviews)
    in
    GB.queryDocument queryRoot


pickEnum2 : Maybe a -> Maybe a -> Maybe a
pickEnum2 ma mb =
    case ma of
        Just x ->
            Just x

        Nothing ->
            mb


pickEnum3 : Maybe a -> Maybe a -> Maybe a -> Maybe a
pickEnum3 ma mb mc =
    pickEnum2 ma (pickEnum2 mb mc)


decodeRepo : JD.Decoder Repo
decodeRepo =
    JD.succeed Repo
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "owner" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "is_archived" JD.bool)
        |> andMap (JD.field "labels" (JD.list decodeLabel))
        |> andMap (JD.field "milestones" (JD.list decodeMilestone))
        |> andMap (JD.field "releases" (JD.list decodeRelease))


decodeRelease : JD.Decoder Release
decodeRelease =
    JD.succeed Release
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "name" (JD.maybe JD.string))
        |> andMap (JD.field "tag" (JD.maybe decodeTag))


decodeTag : JD.Decoder Tag
decodeTag =
    JD.succeed Tag
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "target" decodeGitObject)


decodeGitObject : JD.Decoder GitObject
decodeGitObject =
    JD.succeed GitObject
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "oid" JD.string)


decodeIssue : JD.Decoder Issue
decodeIssue =
    JD.succeed Issue
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "created_at" JDE.datetime)
        |> andMap (JD.field "updated_at" JDE.datetime)
        |> andMap (JD.field "state" decodeIssueState)
        |> andMap (JD.field "repo" decodeRepoLocation)
        |> andMap (JD.field "number" JD.int)
        |> andMap (JD.field "title" JD.string)
        |> andMap (JD.field "comment_count" JD.int)
        |> andMap (JD.field "reactions" <| JD.list decodeReactionGroup)
        |> andMap (JD.field "author" (JD.maybe decodeUser))
        |> andMap (JD.field "labels" <| JD.list decodeLabel)
        |> andMap (JD.field "cards" <| JD.list decodeCardLocation)
        |> andMap (JD.field "milestone" <| JD.maybe decodeMilestone)


decodePullRequest : JD.Decoder PullRequest
decodePullRequest =
    JD.succeed PullRequest
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "created_at" JDE.datetime)
        |> andMap (JD.field "updated_at" JDE.datetime)
        |> andMap (JD.field "state" decodePullRequestState)
        |> andMap (JD.field "repo" decodeRepoLocation)
        |> andMap (JD.field "number" JD.int)
        |> andMap (JD.field "title" JD.string)
        |> andMap (JD.field "comment_count" JD.int)
        |> andMap (JD.field "reactions" <| JD.list decodeReactionGroup)
        |> andMap (JD.field "author" (JD.maybe decodeUser))
        |> andMap (JD.field "labels" <| JD.list decodeLabel)
        |> andMap (JD.field "cards" <| JD.list decodeCardLocation)
        |> andMap (JD.field "additions" JD.int)
        |> andMap (JD.field "deletions" JD.int)
        |> andMap (JD.field "milestone" <| JD.maybe decodeMilestone)
        |> andMap (JD.field "mergeable" decodeMergeableState)
        |> andMap (JD.field "last_commit" <| JD.maybe decodeCommit)
        |> andMap (JD.field "merge_commit" <| JD.maybe decodeCommit)


decodeCommit : JD.Decoder Commit
decodeCommit =
    JD.succeed Commit
        |> andMap (JD.field "sha" JD.string)
        |> andMap (JD.field "status" (JD.maybe decodeStatus))
        |> andMap (JD.field "author" (JD.maybe decodeGitActor))
        |> andMap (JD.field "committer" (JD.maybe decodeGitActor))
        |> andMap (JD.field "authored_at" JDE.datetime)
        |> andMap (JD.field "committed_at" JDE.datetime)


decodeGitActor : JD.Decoder GitActor
decodeGitActor =
    JD.succeed GitActor
        |> andMap (JD.field "email" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "avatar" JD.string)
        |> andMap (JD.field "user" (JD.maybe decodeUser))


decodePullRequestReview : JD.Decoder PullRequestReview
decodePullRequestReview =
    JD.succeed PullRequestReview
        |> andMap (JD.field "author" decodeUser)
        |> andMap (JD.field "state" decodePullRequestReviewState)
        |> andMap (JD.field "created_at" JDE.datetime)


decodeRepoLocation : JD.Decoder RepoLocation
decodeRepoLocation =
    JD.succeed RepoLocation
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "owner" JD.string)
        |> andMap (JD.field "name" JD.string)


decodeLabel : JD.Decoder Label
decodeLabel =
    JD.succeed Label
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "color" JD.string)


decodeMilestone : JD.Decoder Milestone
decodeMilestone =
    JD.succeed Milestone
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "number" JD.int)
        |> andMap (JD.field "title" JD.string)
        |> andMap (JD.field "state" decodeMilestoneState)
        |> andMap (JD.field "description" (JD.maybe JD.string))


decodeReactionGroup : JD.Decoder ReactionGroup
decodeReactionGroup =
    JD.succeed ReactionGroup
        |> andMap (JD.field "type_" decodeReactionType)
        |> andMap (JD.field "count" JD.int)


decodeReactionType : JD.Decoder ReactionType
decodeReactionType =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList reactionTypes) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to ReactionType. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodeMilestoneState : JD.Decoder MilestoneState
decodeMilestoneState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList milestoneStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to MilestoneState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodeUser : JD.Decoder User
decodeUser =
    JD.succeed User
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "database_id" JD.int)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "login" JD.string)
        |> andMap (JD.field "avatar" JD.string)


decodeStatus : JD.Decoder Status
decodeStatus =
    JD.succeed Status
        |> andMap (JD.field "state" decodeStatusState)
        |> andMap (JD.field "contexts" (JD.list decodeStatusContext))


decodeStatusContext : JD.Decoder StatusContext
decodeStatusContext =
    JD.succeed StatusContext
        |> andMap (JD.field "state" decodeStatusState)
        |> andMap (JD.field "context" JD.string)
        |> andMap (JD.field "target_url" (JD.maybe JD.string))
        |> andMap (JD.field "creator" decodeActor)


decodeActor : JD.Decoder Actor
decodeActor =
    JD.succeed Actor
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "login" JD.string)
        |> andMap (JD.field "avatar" JD.string)


decodeProject : JD.Decoder Project
decodeProject =
    JD.succeed Project
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "number" JD.int)
        |> andMap (JD.field "body" JD.string)
        |> andMap (JD.field "columns" <| JD.list decodeProjectColumn)


decodeProjectLocation : JD.Decoder ProjectLocation
decodeProjectLocation =
    JD.succeed ProjectLocation
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "number" JD.int)


decodeProjectColumn : JD.Decoder ProjectColumn
decodeProjectColumn =
    JD.succeed ProjectColumn
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "name" JD.string)
        |> andMap (JD.field "database_id" JD.int)


decodeProjectColumnCard : JD.Decoder ProjectColumnCard
decodeProjectColumnCard =
    JD.succeed ProjectColumnCard
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "content" <| JD.maybe decodeCardContent)
        |> andMap (JD.field "note" <| JD.maybe JD.string)


decodeCardContent : JD.Decoder CardContent
decodeCardContent =
    JD.oneOf
        [ JD.field "issue" (JD.map IssueCardContent decodeIssue)
        , JD.field "pull_request" (JD.map PullRequestCardContent decodePullRequest)
        ]


decodeCardLocation : JD.Decoder CardLocation
decodeCardLocation =
    JD.succeed CardLocation
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.field "url" JD.string)
        |> andMap (JD.field "project" decodeProjectLocation)
        |> andMap (JD.field "column" <| JD.maybe decodeProjectColumn)


decodeRepoSelector : JD.Decoder RepoSelector
decodeRepoSelector =
    JD.succeed RepoSelector
        |> andMap (JD.field "owner" JD.string)
        |> andMap (JD.field "name" JD.string)


decodeOrgSelector : JD.Decoder OrgSelector
decodeOrgSelector =
    JD.succeed OrgSelector
        |> andMap (JD.field "name" JD.string)


decodeV3Comparison : JD.Decoder V3Comparison
decodeV3Comparison =
    JD.succeed V3Comparison
        |> andMap (JD.field "html_url" JD.string)
        |> andMap (JD.field "status" JD.string)
        |> andMap (JD.field "base_commit" decodeV3Commit)
        |> andMap (JD.field "merge_base_commit" decodeV3Commit)
        |> andMap (JD.field "ahead_by" JD.int)
        |> andMap (JD.field "behind_by" JD.int)
        |> andMap (JD.field "total_commits" JD.int)
        |> andMap (JD.field "commits" (JD.list decodeV3Commit))
        |> andMap (JD.field "files" (JD.list decodeV3File))


decodeV3Commit : JD.Decoder V3Commit
decodeV3Commit =
    JD.succeed V3Commit
        |> andMap (JD.field "html_url" JD.string)
        |> andMap (JD.field "sha" JD.string)


decodeV3File : JD.Decoder V3File
decodeV3File =
    JD.succeed V3File
        |> andMap (JD.field "sha" JD.string)
        |> andMap (JD.field "filename" JD.string)
        |> andMap (JD.field "status" JD.string)


decodePullRequestState : JD.Decoder PullRequestState
decodePullRequestState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList pullRequestStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to PullRequestState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodeIssueState : JD.Decoder IssueState
decodeIssueState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList issueStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to IssueState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodeMergeableState : JD.Decoder MergeableState
decodeMergeableState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList mergeableStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to MergeableState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodePullRequestReviewState : JD.Decoder PullRequestReviewState
decodePullRequestReviewState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList pullRequestReviewStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to PullRequestReviewState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


decodeStatusState : JD.Decoder StatusState
decodeStatusState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList statusStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to StatusState. Pattern: " ++ string)
    in
    customDecoder JD.string decodeToType


encodeRepo : Repo -> JE.Value
encodeRepo record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "owner", JE.string record.owner )
        , ( "name", JE.string record.name )
        , ( "is_archived", JE.bool record.isArchived )
        , ( "labels", JE.list encodeLabel record.labels )
        , ( "milestones", JE.list encodeMilestone record.milestones )
        , ( "releases", JE.list encodeRelease record.releases )
        ]


encodeV3Comparison : V3Comparison -> JE.Value
encodeV3Comparison record =
    JE.object
        [ ( "html_url", JE.string record.url )
        , ( "status", JE.string record.status )
        , ( "base_commit", encodeV3Commit record.baseCommit )
        , ( "merge_base_commit", encodeV3Commit record.mergeBaseCommit )
        , ( "ahead_by", JE.int record.aheadBy )
        , ( "behind_by", JE.int record.behindBy )
        , ( "total_commits", JE.int record.totalCommits )
        , ( "commits", JE.list encodeV3Commit record.commits )
        , ( "files", JE.list encodeV3File record.files )
        ]


encodeV3Commit : V3Commit -> JE.Value
encodeV3Commit record =
    JE.object
        [ ( "html_url", JE.string record.url )
        , ( "sha", JE.string record.sha )
        ]


encodeV3File : V3File -> JE.Value
encodeV3File record =
    JE.object
        [ ( "sha", JE.string record.sha )
        , ( "filename", JE.string record.filename )
        , ( "status", JE.string record.status )
        ]


encodeIssue : Issue -> JE.Value
encodeIssue record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "created_at", JE.string (Iso8601.fromTime record.createdAt) )
        , ( "updated_at", JE.string (Iso8601.fromTime record.updatedAt) )
        , ( "state", encodeIssueState record.state )
        , ( "repo", encodeRepoLocation record.repo )
        , ( "number", JE.int record.number )
        , ( "title", JE.string record.title )
        , ( "comment_count", JE.int record.commentCount )
        , ( "reactions", JE.list encodeReactionGroup record.reactions )
        , ( "author", JEE.maybe encodeUser record.author )
        , ( "labels", JE.list encodeLabel record.labels )
        , ( "cards", JE.list encodeCardLocation record.cards )
        , ( "milestone", JEE.maybe encodeMilestone record.milestone )
        ]


encodePullRequest : PullRequest -> JE.Value
encodePullRequest record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "created_at", JE.string (Iso8601.fromTime record.createdAt) )
        , ( "updated_at", JE.string (Iso8601.fromTime record.updatedAt) )
        , ( "state", encodePullRequestState record.state )
        , ( "repo", encodeRepoLocation record.repo )
        , ( "number", JE.int record.number )
        , ( "title", JE.string record.title )
        , ( "comment_count", JE.int record.commentCount )
        , ( "reactions", JE.list encodeReactionGroup record.reactions )
        , ( "author", JEE.maybe encodeUser record.author )
        , ( "labels", JE.list encodeLabel record.labels )
        , ( "cards", JE.list encodeCardLocation record.cards )
        , ( "additions", JE.int record.additions )
        , ( "deletions", JE.int record.deletions )
        , ( "milestone", JEE.maybe encodeMilestone record.milestone )
        , ( "mergeable", encodeMergeableState record.mergeable )
        , ( "last_commit", JEE.maybe encodeCommit record.lastCommit )
        , ( "merge_commit", JEE.maybe encodeCommit record.mergeCommit )
        ]


encodeCommit : Commit -> JE.Value
encodeCommit record =
    JE.object
        [ ( "sha", JE.string record.sha )
        , ( "status", JEE.maybe encodeStatus record.status )
        , ( "author", JEE.maybe encodeGitActor record.author )
        , ( "committer", JEE.maybe encodeGitActor record.author )
        , ( "authored_at", JE.string (Iso8601.fromTime record.authoredAt) )
        , ( "committed_at", JE.string (Iso8601.fromTime record.committedAt) )
        ]


encodeGitActor : GitActor -> JE.Value
encodeGitActor record =
    JE.object
        [ ( "email", JE.string record.email )
        , ( "name", JE.string record.name )
        , ( "avatar", JE.string record.avatar )
        , ( "user", JEE.maybe encodeUser record.user )
        ]


encodePullRequestReview : PullRequestReview -> JE.Value
encodePullRequestReview record =
    JE.object
        [ ( "author", encodeUser record.author )
        , ( "state", encodePullRequestReviewState record.state )
        , ( "created_at", JE.string (Iso8601.fromTime record.createdAt) )
        ]


encodeRepoLocation : RepoLocation -> JE.Value
encodeRepoLocation record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "owner", JE.string record.owner )
        , ( "name", JE.string record.name )
        ]


encodeLabel : Label -> JE.Value
encodeLabel record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "name", JE.string record.name )
        , ( "color", JE.string record.color )
        ]


encodeRelease : Release -> JE.Value
encodeRelease record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "name", JEE.maybe JE.string record.name )
        , ( "tag", JEE.maybe encodeTag record.tag )
        ]


encodeTag : Tag -> JE.Value
encodeTag record =
    JE.object
        [ ( "name", JE.string record.name )
        , ( "target", encodeGitObject record.target )
        ]


encodeGitObject : GitObject -> JE.Value
encodeGitObject record =
    JE.object
        [ ( "url", JE.string record.url )
        , ( "oid", JE.string record.oid )
        ]


encodeMilestone : Milestone -> JE.Value
encodeMilestone record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "number", JE.int record.number )
        , ( "title", JE.string record.title )
        , ( "state", encodeMilestoneState record.state )
        , ( "description", JEE.maybe JE.string record.description )
        ]


encodeMilestoneState : MilestoneState -> JE.Value
encodeMilestoneState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            milestoneStates


encodeReactionGroup : ReactionGroup -> JE.Value
encodeReactionGroup record =
    JE.object
        [ ( "type_", encodeReactionType record.type_ )
        , ( "count", JE.int record.count )
        ]


encodeReactionType : ReactionType -> JE.Value
encodeReactionType item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            reactionTypes


encodeUser : User -> JE.Value
encodeUser record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "database_id", JE.int record.databaseId )
        , ( "url", JE.string record.url )
        , ( "login", JE.string record.login )
        , ( "avatar", JE.string record.avatar )
        ]


encodeStatus : Status -> JE.Value
encodeStatus record =
    JE.object
        [ ( "state", encodeStatusState record.state )
        , ( "contexts", JE.list encodeStatusContext record.contexts )
        ]


encodeStatusContext : StatusContext -> JE.Value
encodeStatusContext record =
    JE.object
        [ ( "state", encodeStatusState record.state )
        , ( "context", JE.string record.context )
        , ( "target_url", JEE.maybe JE.string record.targetUrl )
        , ( "creator", encodeActor record.creator )
        ]


encodeActor : Actor -> JE.Value
encodeActor record =
    JE.object
        [ ( "url", JE.string record.url )
        , ( "login", JE.string record.login )
        , ( "avatar", JE.string record.avatar )
        ]


encodeProject : Project -> JE.Value
encodeProject record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "name", JE.string record.name )
        , ( "number", JE.int record.number )
        , ( "body", JE.string record.body )
        , ( "columns", JE.list encodeProjectColumn record.columns )
        ]


encodeProjectLocation : ProjectLocation -> JE.Value
encodeProjectLocation record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "name", JE.string record.name )
        , ( "number", JE.int record.number )
        ]


encodeProjectColumn : ProjectColumn -> JE.Value
encodeProjectColumn record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "name", JE.string record.name )
        , ( "database_id", JE.int record.databaseId )
        ]


encodeProjectColumnCard : ProjectColumnCard -> JE.Value
encodeProjectColumnCard record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "content"
          , case record.content of
                Just (IssueCardContent issue) ->
                    JE.object [ ( "issue", encodeIssue issue ) ]

                Just (PullRequestCardContent pr) ->
                    JE.object [ ( "pull_request", encodePullRequest pr ) ]

                Nothing ->
                    JE.null
          )
        , ( "note", JEE.maybe JE.string record.note )
        ]


encodeCardLocation : CardLocation -> JE.Value
encodeCardLocation record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "project", encodeProjectLocation record.project )
        , ( "column", JEE.maybe encodeProjectColumn record.column )
        ]


encodeRepoSelector : RepoSelector -> JE.Value
encodeRepoSelector record =
    JE.object
        [ ( "owner", JE.string record.owner )
        , ( "name", JE.string record.name )
        ]


encodeOrgSelector : OrgSelector -> JE.Value
encodeOrgSelector record =
    JE.object
        [ ( "name", JE.string record.name )
        ]


encodeIssueState : IssueState -> JE.Value
encodeIssueState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            issueStates


encodePullRequestState : PullRequestState -> JE.Value
encodePullRequestState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            pullRequestStates


encodeStatusState : StatusState -> JE.Value
encodeStatusState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            statusStates


encodeMergeableState : MergeableState -> JE.Value
encodeMergeableState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            mergeableStates


encodePullRequestReviewState : PullRequestReviewState -> JE.Value
encodePullRequestReviewState item =
    JE.string <|
        List.foldl
            (\( a, b ) default ->
                if b == item then
                    a

                else
                    default
            )
            "UNKNOWN"
            pullRequestReviewStates


customDecoder : JD.Decoder b -> (b -> Result String a) -> JD.Decoder a
customDecoder decoder toResult =
    JD.andThen
        (\a ->
            case toResult a of
                Ok b ->
                    JD.succeed b

                Err err ->
                    JD.fail err
        )
        decoder
