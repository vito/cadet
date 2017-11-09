module GitHubGraph
    exposing
        ( Error
        , ID
        , Repo
        , Issue
        , IssueState(..)
        , Label
        , User
        , Project
        , ProjectColumn
        , ProjectCard
        , PullRequest
        , PullRequestState(..)
        , ReactionGroup
        , ReactionType(..)
        , TimelineEvent(..)
        , fetchOrgRepos
        , fetchOrgProjects
        , fetchRepoIssues
        , fetchRepoPullRequests
        , fetchTimeline
        , issueScore
        , pullRequestScore
        , reactionScore
        , encodeIssue
        , decodeIssue
        , encodePullRequest
        , decodePullRequest
        , encodeUser
        , decodeUser
        )

import Date exposing (Date)
import Dict
import GraphQL.Client.Http as GH
import GraphQL.Request.Builder as GB
import GraphQL.Request.Builder.Arg as GA
import GraphQL.Request.Builder.Variable as GV
import Http
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Json.Encode as JE
import Json.Encode.Extra as JEE
import Task exposing (Task)


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
    }


type alias Issue =
    { id : ID
    , url : String
    , createdAt : Date
    , updatedAt : Date
    , state : IssueState
    , number : Int
    , title : String
    , commentCount : Int
    , reactions : Reactions
    , author : Maybe User
    , labels : List Label
    , cards : List ProjectCard
    }


type IssueState
    = IssueStateOpen
    | IssueStateClosed


type alias PullRequest =
    { id : ID
    , url : String
    , createdAt : Date
    , updatedAt : Date
    , state : PullRequestState
    , number : Int
    , title : String
    , commentCount : Int
    , reactions : Reactions
    , author : Maybe User
    , labels : List Label
    , cards : List ProjectCard
    , additions : Int
    , deletions : Int
    }


type PullRequestState
    = PullRequestStateOpen
    | PullRequestStateClosed
    | PullRequestStateMerged


type alias Label =
    { name : String
    , color : String
    }


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


type alias User =
    { id : ID
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
    , columns : List ProjectColumn
    }


type alias ProjectColumn =
    { id : ID
    , name : String
    }


type alias ProjectCard =
    { id : ID
    , projectID : ID
    , columnID : Maybe ID
    , note : Maybe String
    }


type TimelineEvent
    = IssueCommentEvent (Maybe User) Date
    | CrossReferencedEvent ID


type alias OrgSelector =
    { name : String }


type alias RepoSelector =
    { owner : String, name : String }


type alias IDSelector =
    { id : ID }


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


fetchRepoIssues : Token -> RepoSelector -> Task Error (List Issue)
fetchRepoIssues token repo =
    fetchPaged issuesQuery token { selector = repo, after = Nothing }


fetchRepoPullRequests : Token -> RepoSelector -> Task Error (List PullRequest)
fetchRepoPullRequests token repo =
    fetchPaged pullRequestsQuery token { selector = repo, after = Nothing }


fetchTimeline : Token -> IDSelector -> Task Error (List TimelineEvent)
fetchTimeline token issue =
    fetchPaged timelineQuery token { selector = issue, after = Nothing }


issueScore : Issue -> Int
issueScore { reactions, commentCount } =
    reactionScore reactions
        + (2 * commentCount)


pullRequestScore : PullRequest -> Int
pullRequestScore { reactions, commentCount } =
    1000
        + reactionScore reactions
        + (2 * commentCount)


reactionScore : Reactions -> Int
reactionScore reactions =
    List.sum <|
        flip List.map reactions <|
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


auth : String -> List ( String, String )
auth token =
    if token == "" then
        []
    else
        [ ( "Authorization", "token " ++ token ) ]


authHeaders : String -> List Http.Header
authHeaders =
    List.map (uncurry Http.header) << auth


authedOptions : Token -> GH.RequestOptions
authedOptions token =
    { method = "POST"
    , headers = authHeaders token
    , url = "https://api.github.com/graphql"
    , timeout = Nothing
    , withCredentials = False
    }


fetchPaged : GB.Document GB.Query (PagedResult a) (PagedSelector s) -> Token -> PagedSelector s -> Task Error (List a)
fetchPaged doc token psel =
    let
        fetchNextPage { content, pageInfo } =
            if pageInfo.hasNextPage then
                fetchPaged doc token { psel | after = pageInfo.endCursor }
                    |> Task.map ((++) content)
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


reactionTypes : List ( String, ReactionType )
reactionTypes =
    [ ( "THUMBS_UP", ReactionTypeThumbsUp )
    , ( "THUMBS_DOWN", ReactionTypeThumbsDown )
    , ( "LAUGH", ReactionTypeLaugh )
    , ( "HOORAY", ReactionTypeHooray )
    , ( "CONFUSED", ReactionTypeConfused )
    , ( "HEART", ReactionTypeHeart )
    ]


reposQuery : GB.Document GB.Query (PagedResult Repo) (PagedSelector OrgSelector)
reposQuery =
    let
        orgNameVar =
            GV.required "orgName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        repo =
            GB.object Repo
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "url" [] GB.string)
                |> GB.with (GB.field "owner" [] (GB.extract (GB.field "login" [] GB.string)))
                |> GB.with (GB.field "name" [] GB.string)

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
                |> GB.with (GB.field "nodes" [] (GB.list repo))
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


projectsQuery : GB.Document GB.Query (PagedResult Project) (PagedSelector OrgSelector)
projectsQuery =
    let
        orgNameVar =
            GV.required "orgName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        column =
            GB.object ProjectColumn
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "name" [] GB.string)

        project =
            GB.object Project
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "url" [] GB.string)
                |> GB.with (GB.field "name" [] GB.string)
                |> GB.with (GB.field "number" [] GB.int)
                |> GB.with (GB.field "columns" [] (GB.extract (GB.field "nodes" [] (GB.list column))))

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
                |> GB.with (GB.field "nodes" [] (GB.list project))
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


issuesQuery : GB.Document GB.Query (PagedResult Issue) (PagedSelector RepoSelector)
issuesQuery =
    let
        orgNameVar =
            GV.required "orgName" (.owner << .selector) GV.string

        repoNameVar =
            GV.required "repoName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        author =
            GB.assume
                (GB.inlineFragment (Just <| GB.onType "User")
                    (GB.object User
                        |> GB.with (GB.field "id" [] GB.string)
                        |> GB.with (GB.field "url" [] GB.string)
                        |> GB.with (GB.field "login" [] GB.string)
                        |> GB.with (GB.field "avatarUrl" [] GB.string)
                    )
                )

        reactionGroup =
            GB.object ReactionGroup
                |> GB.with (GB.field "content" [] (GB.enum reactionTypes))
                |> GB.with (GB.field "users" [] (GB.extract (GB.field "totalCount" [] GB.int)))

        label =
            GB.object Label
                |> GB.with (GB.field "name" [] GB.string)
                |> GB.with (GB.field "color" [] GB.string)

        projectCard =
            GB.object ProjectCard
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "project" [] (GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.field "column" [] (GB.nullable <| GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.field "note" [] (GB.nullable GB.string))

        issue =
            GB.object Issue
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "url" [] GB.string)
                |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.date))
                |> GB.with (GB.field "updatedAt" [] (GB.customScalar DateType JDE.date))
                |> GB.with (GB.field "state" [] (GB.enum issueStates))
                |> GB.with (GB.field "number" [] GB.int)
                |> GB.with (GB.field "title" [] GB.string)
                |> GB.with (GB.field "comments" [] (GB.extract (GB.field "totalCount" [] GB.int)))
                |> GB.with (GB.field "reactionGroups" [] (GB.list reactionGroup))
                |> GB.with (GB.field "author" [] (GB.nullable (GB.extract author)))
                |> GB.with (GB.field "labels" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list label)))
                |> GB.with (GB.field "projectCards" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list projectCard)))

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "states", GA.list [ GA.enum "OPEN" ] )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list issue))
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


pullRequestsQuery : GB.Document GB.Query (PagedResult PullRequest) (PagedSelector RepoSelector)
pullRequestsQuery =
    let
        orgNameVar =
            GV.required "orgName" (.owner << .selector) GV.string

        repoNameVar =
            GV.required "repoName" (.name << .selector) GV.string

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        author =
            GB.assume
                (GB.inlineFragment (Just <| GB.onType "User")
                    (GB.object User
                        |> GB.with (GB.field "id" [] GB.string)
                        |> GB.with (GB.field "url" [] GB.string)
                        |> GB.with (GB.field "login" [] GB.string)
                        |> GB.with (GB.field "avatarUrl" [] GB.string)
                    )
                )

        reactionGroup =
            GB.object ReactionGroup
                |> GB.with (GB.field "content" [] (GB.enum reactionTypes))
                |> GB.with (GB.field "users" [] (GB.extract (GB.field "totalCount" [] GB.int)))

        label =
            GB.object Label
                |> GB.with (GB.field "name" [] GB.string)
                |> GB.with (GB.field "color" [] GB.string)

        projectCard =
            GB.object ProjectCard
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "project" [] (GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.field "column" [] (GB.nullable <| GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.field "note" [] (GB.nullable GB.string))

        issue =
            GB.object PullRequest
                |> GB.with (GB.field "id" [] GB.string)
                |> GB.with (GB.field "url" [] GB.string)
                |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.date))
                |> GB.with (GB.field "updatedAt" [] (GB.customScalar DateType JDE.date))
                |> GB.with (GB.field "state" [] (GB.enum pullRequestStates))
                |> GB.with (GB.field "number" [] GB.int)
                |> GB.with (GB.field "title" [] GB.string)
                |> GB.with (GB.field "comments" [] (GB.extract (GB.field "totalCount" [] GB.int)))
                |> GB.with (GB.field "reactionGroups" [] (GB.list reactionGroup))
                |> GB.with (GB.field "author" [] (GB.nullable (GB.extract author)))
                |> GB.with (GB.field "labels" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list label)))
                |> GB.with (GB.field "projectCards" [ ( "first", GA.int 10 ) ] (GB.extract <| GB.field "nodes" [] (GB.list projectCard)))
                |> GB.with (GB.field "additions" [] GB.int)
                |> GB.with (GB.field "deletions" [] GB.int)

        pageArgs =
            [ ( "first", GA.int 100 )
            , ( "states", GA.list [ GA.enum "OPEN" ] )
            , ( "after", GA.variable afterVar )
            ]

        pageInfo =
            GB.object PageInfo
                |> GB.with (GB.field "endCursor" [] (GB.nullable GB.string))
                |> GB.with (GB.field "hasNextPage" [] GB.bool)

        paged =
            GB.object PagedResult
                |> GB.with (GB.field "nodes" [] (GB.list issue))
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


timelineQuery : GB.Document GB.Query (PagedResult TimelineEvent) (PagedSelector IDSelector)
timelineQuery =
    let
        issueIdVar =
            GV.required "issueId" (.id << .selector) GV.id

        afterVar =
            GV.required "after" .after (GV.nullable GV.string)

        author =
            GB.assume
                (GB.inlineFragment (Just <| GB.onType "User")
                    (GB.object User
                        |> GB.with (GB.field "id" [] GB.string)
                        |> GB.with (GB.field "url" [] GB.string)
                        |> GB.with (GB.field "login" [] GB.string)
                        |> GB.with (GB.field "avatarUrl" [] GB.string)
                    )
                )

        issueCommentEvent =
            GB.object IssueCommentEvent
                |> GB.with (GB.field "author" [] (GB.nullable (GB.extract author)))
                |> GB.with (GB.field "createdAt" [] (GB.customScalar DateType JDE.date))

        sourceID =
            GB.object pickEnum2
                |> GB.with (GB.inlineFragment (Just (GB.onType "Issue")) (GB.extract <| GB.field "id" [] GB.string))
                |> GB.with (GB.inlineFragment (Just (GB.onType "PullRequest")) (GB.extract <| GB.field "id" [] GB.string))

        crossReferencedEvent =
            GB.object CrossReferencedEvent
                |> GB.with (GB.assume <| GB.field "source" [] sourceID)

        event =
            GB.object pickEnum2
                |> GB.with (GB.inlineFragment (Just (GB.onType "IssueComment")) issueCommentEvent)
                |> GB.with (GB.inlineFragment (Just (GB.onType "CrossReferencedEvent")) crossReferencedEvent)

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
            (GB.extract (GB.field "timeline" pageArgs paged))

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


pickEnum2 : Maybe a -> Maybe a -> Maybe a
pickEnum2 ma mb =
    case ma of
        Just x ->
            Just x

        _ ->
            mb


decodeRepo : JD.Decoder Repo
decodeRepo =
    JD.succeed Repo
        |: (JD.field "id" JD.string)
        |: (JD.field "url" JD.string)
        |: (JD.field "owner" JD.string)
        |: (JD.field "name" JD.string)


decodeIssue : JD.Decoder Issue
decodeIssue =
    JD.succeed Issue
        |: (JD.field "id" JD.string)
        |: (JD.field "url" JD.string)
        |: (JD.field "created_at" JDE.date)
        |: (JD.field "updated_at" JDE.date)
        |: (JD.field "state" decodeIssueState)
        |: (JD.field "number" JD.int)
        |: (JD.field "title" JD.string)
        |: (JD.field "comment_count" JD.int)
        |: (JD.field "reactions" <| JD.list decodeReactionGroup)
        |: (JD.field "author" (JD.maybe decodeUser))
        |: (JD.field "labels" <| JD.list decodeLabel)
        |: (JD.field "cards" <| JD.list decodeProjectCard)


decodePullRequest : JD.Decoder PullRequest
decodePullRequest =
    JD.succeed PullRequest
        |: (JD.field "id" JD.string)
        |: (JD.field "url" JD.string)
        |: (JD.field "created_at" JDE.date)
        |: (JD.field "updated_at" JDE.date)
        |: (JD.field "state" decodePullRequestState)
        |: (JD.field "number" JD.int)
        |: (JD.field "title" JD.string)
        |: (JD.field "comment_count" JD.int)
        |: (JD.field "reactions" <| JD.list decodeReactionGroup)
        |: (JD.field "author" (JD.maybe decodeUser))
        |: (JD.field "labels" <| JD.list decodeLabel)
        |: (JD.field "cards" <| JD.list decodeProjectCard)
        |: (JD.field "additions" JD.int)
        |: (JD.field "deletions" JD.int)


decodeLabel : JD.Decoder Label
decodeLabel =
    JD.succeed Label
        |: (JD.field "name" JD.string)
        |: (JD.field "color" JD.string)


decodeReactionGroup : JD.Decoder ReactionGroup
decodeReactionGroup =
    JD.succeed ReactionGroup
        |: (JD.field "type_" decodeReactionType)
        |: (JD.field "count" JD.int)


decodeReactionType : JD.Decoder ReactionType
decodeReactionType =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList reactionTypes) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to ReactionType. Pattern: " ++ (toString string))
    in
        customDecoder JD.string decodeToType


decodeUser : JD.Decoder User
decodeUser =
    JD.succeed User
        |: (JD.field "id" JD.string)
        |: (JD.field "url" JD.string)
        |: (JD.field "login" JD.string)
        |: (JD.field "avatar" JD.string)


decodeProject : JD.Decoder Project
decodeProject =
    JD.succeed Project
        |: (JD.field "id" JD.string)
        |: (JD.field "url" JD.string)
        |: (JD.field "name" JD.string)
        |: (JD.field "number" JD.int)
        |: (JD.field "columns" <| JD.list decodeProjectColumn)


decodeProjectColumn : JD.Decoder ProjectColumn
decodeProjectColumn =
    JD.succeed ProjectColumn
        |: (JD.field "id" JD.string)
        |: (JD.field "name" JD.string)


decodeProjectCard : JD.Decoder ProjectCard
decodeProjectCard =
    JD.succeed ProjectCard
        |: (JD.field "id" JD.string)
        |: (JD.field "project_id" JD.string)
        |: (JD.field "column_id" <| JD.maybe JD.string)
        |: (JD.field "note" <| JD.maybe JD.string)


decodeRepoSelector : JD.Decoder RepoSelector
decodeRepoSelector =
    JD.succeed RepoSelector
        |: (JD.field "owner" JD.string)
        |: (JD.field "name" JD.string)


decodeOrgSelector : JD.Decoder OrgSelector
decodeOrgSelector =
    JD.succeed OrgSelector
        |: (JD.field "name" JD.string)


decodePullRequestState : JD.Decoder PullRequestState
decodePullRequestState =
    let
        decodeToType string =
            case Dict.get string (Dict.fromList pullRequestStates) of
                Just type_ ->
                    Result.Ok type_

                Nothing ->
                    Result.Err ("Not valid pattern for decoder to PullRequestState. Pattern: " ++ (toString string))
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
                    Result.Err ("Not valid pattern for decoder to IssueState. Pattern: " ++ (toString string))
    in
        customDecoder JD.string decodeToType


encodeRepo : Repo -> JE.Value
encodeRepo record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "owner", JE.string record.owner )
        , ( "name", JE.string record.name )
        ]


encodeIssue : Issue -> JE.Value
encodeIssue record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "created_at", JE.string (toString record.createdAt) )
        , ( "updated_at", JE.string (toString record.updatedAt) )
        , ( "state", encodeIssueState record.state )
        , ( "number", JE.int record.number )
        , ( "title", JE.string record.title )
        , ( "comment_count", JE.int record.commentCount )
        , ( "reactions", JE.list (List.map encodeReactionGroup record.reactions) )
        , ( "author", JEE.maybe encodeUser record.author )
        , ( "labels", JE.list <| List.map encodeLabel record.labels )
        , ( "cards", JE.list <| List.map encodeProjectCard record.cards )
        ]


encodePullRequest : PullRequest -> JE.Value
encodePullRequest record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "url", JE.string record.url )
        , ( "created_at", JE.string (toString record.createdAt) )
        , ( "updated_at", JE.string (toString record.updatedAt) )
        , ( "state", encodePullRequestState record.state )
        , ( "number", JE.int record.number )
        , ( "title", JE.string record.title )
        , ( "comment_count", JE.int record.commentCount )
        , ( "reactions", JE.list (List.map encodeReactionGroup record.reactions) )
        , ( "author", JEE.maybe encodeUser record.author )
        , ( "labels", JE.list <| List.map encodeLabel record.labels )
        , ( "cards", JE.list <| List.map encodeProjectCard record.cards )
        , ( "additions", JE.int record.additions )
        , ( "deletions", JE.int record.deletions )
        ]


encodeLabel : Label -> JE.Value
encodeLabel record =
    JE.object
        [ ( "name", JE.string record.name )
        , ( "color", JE.string record.color )
        ]


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
        , ( "url", JE.string record.url )
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
        , ( "columns", JE.list <| List.map encodeProjectColumn record.columns )
        ]


encodeProjectColumn : ProjectColumn -> JE.Value
encodeProjectColumn record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "name", JE.string record.name )
        ]


encodeProjectCard : ProjectCard -> JE.Value
encodeProjectCard record =
    JE.object
        [ ( "id", JE.string record.id )
        , ( "project_id", JE.string record.projectID )
        , ( "column_id", JEE.maybe JE.string record.columnID )
        , ( "note", JEE.maybe JE.string record.note )
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
