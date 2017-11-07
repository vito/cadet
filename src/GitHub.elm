module GitHub
    exposing
        ( APIError
        , Repo
        , Issue
        , IssueState(..)
        , IssueLabel
        , Comment
        , TimelineEvent
        , TimelineEventSource
        , TimelineEventRename
        , Milestone
        , User
        , Project
        , ProjectColumn
        , ProjectCard
        , fetchOrgMembers
        , fetchOrgRepos
        , fetchRepoIssues
        , fetchIssue
        , fetchIssueComments
        , fetchIssueTimeline
        , issueScore
        , reactionCodes
        , reactionScore
        , decodeRepo
        , decodeIssue
        , decodeTimelineEvent
        , decodeUser
        )

import Date exposing (Date)
import Dict exposing (Dict)
import Http
import HttpBuilder
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Regex exposing (Regex)
import String
import Task exposing (Task)
import Pagination


type alias Token =
    String


type alias APIError =
    { message : String
    }


type alias Repo =
    { value : JD.Value
    , id : Int
    , url : String
    , htmlURL : String
    , owner : User
    , name : String
    , openIssues : Int
    }


type alias Issue =
    { value : JD.Value
    , id : Int
    , url : String
    , htmlURL : String
    , createdAt : Date
    , updatedAt : Date
    , state : IssueState
    , isPullRequest : Bool
    , user : User
    , number : Int
    , title : String
    , commentCount : Int
    , reactions : Reactions
    , labels : List IssueLabel
    }


type alias IssueLabel =
    { name : String
    , color : String
    }


type IssueState
    = IssueStateOpen
    | IssueStateClosed


type alias Comment =
    { id : Int
    , url : String
    , htmlURL : String
    , createdAt : Date
    , updatedAt : Date
    , user : User
    , reactions : Reactions
    }


type alias TimelineEvent =
    { value : JD.Value
    , event : String
    , createdAt : Maybe Date
    , actor : Maybe User
    , commitId : Maybe String
    , label : Maybe IssueLabel
    , assignee : Maybe User
    , milestone : Maybe Milestone
    , source : Maybe TimelineEventSource
    , rename : Maybe TimelineEventRename
    }


type alias TimelineEventSource =
    { type_ : String
    , issueID : Maybe Int
    }


type alias TimelineEventRename =
    { from : String, to : String }


type alias Milestone =
    { id : Int
    , url : String
    , htmlURL : String
    , number : Int
    , title : String
    , description : String
    }


type alias User =
    { value : JD.Value
    , id : Int
    , url : String
    , htmlURL : String
    , login : String
    , avatar : String
    }


type alias Reactions =
    { plusOne : Int
    , minusOne : Int
    , laugh : Int
    , confused : Int
    , heart : Int
    , hooray : Int
    }


type alias Project =
    { id : Int
    , url : String
    , name : String
    , number : Int
    , htmlURL : String
    , columnsURL : String
    }


type alias ProjectColumn =
    { id : Int
    , url : String
    , name : String
    , cardsURL : String
    }


type alias ProjectCard =
    { id : Int
    , note : Maybe String
    , contentURL : Maybe String
    }


reactionCodes : Reactions -> List ( String, Int )
reactionCodes reactions =
    [ ( "👍", reactions.plusOne )
    , ( "👎", reactions.minusOne )
    , ( "😄", reactions.laugh )
    , ( "😕", reactions.confused )
    , ( "💖", reactions.heart )
    , ( "🎉", reactions.hooray )
    ]


issueScore : Issue -> Int
issueScore { reactions, commentCount, isPullRequest } =
    reactionScore reactions
        + (2 * commentCount)
        + (if isPullRequest then
            1000
           else
            0
          )


reactionScore : Reactions -> Int
reactionScore reactions =
    List.sum
        [ 2 * reactions.plusOne
        , -2 * reactions.minusOne
        , 1 * reactions.laugh
        , -1 * reactions.confused
        , 3 * reactions.heart
        , 3 * reactions.hooray
        ]


auth : String -> List ( String, String )
auth token =
    if token == "" then
        []
    else
        [ ( "Authorization", "token " ++ token ) ]


authHeaders : String -> List Http.Header
authHeaders =
    List.map (uncurry Http.header) << auth


fetchOrgMembers : Token -> String -> Task Http.Error (List User)
fetchOrgMembers token org =
    Pagination.fetchAll
        ("https://api.github.com/orgs/" ++ org ++ "/members?per_page=100")
        (authHeaders token)
        (rfc5988Strategy decodeUser)
        Nothing


fetchOrgRepos : Token -> String -> Task Http.Error (List Repo)
fetchOrgRepos token org =
    Pagination.fetchAll
        ("https://api.github.com/orgs/" ++ org ++ "/repos?per_page=100")
        (authHeaders token)
        (rfc5988Strategy decodeRepo)
        Nothing


fetchRepoIssues : Token -> Repo -> Task Http.Error (List Issue)
fetchRepoIssues token repo =
    if repo.openIssues == 0 then
        Task.succeed []
    else
        Pagination.fetchAll
            ("https://api.github.com/repos/" ++ repo.owner.login ++ "/" ++ repo.name ++ "/issues?per_page=100")
            (Http.header "Accept" "application/vnd.github.squirrel-girl-preview" :: authHeaders token)
            (rfc5988Strategy decodeIssue)
            Nothing


fetchIssue : Token -> Repo -> Int -> Task Http.Error Issue
fetchIssue token repo number =
    HttpBuilder.get ("https://api.github.com/repos/" ++ repo.owner.login ++ "/" ++ repo.name ++ "/issues/" ++ toString number)
        |> HttpBuilder.withHeaders (auth token)
        |> HttpBuilder.withHeader "Accept" "application/vnd.github.squirrel-girl-preview"
        |> HttpBuilder.withExpect (Http.expectJson decodeIssue)
        |> HttpBuilder.toTask


fetchIssueComments : Token -> Issue -> Task Http.Error (List Comment)
fetchIssueComments token issue =
    Pagination.fetchAll
        (issue.url ++ "/comments?per_page=100")
        (Http.header "Accept" "application/vnd.github.squirrel-girl-preview" :: authHeaders token)
        (rfc5988Strategy decodeComment)
        Nothing


fetchIssueTimeline : Token -> Issue -> Task Http.Error (List TimelineEvent)
fetchIssueTimeline token issue =
    Pagination.fetchAll
        (issue.url ++ "/timeline?per_page=100")
        (Http.header "Accept" "application/vnd.github.mockingbird-preview" :: authHeaders token)
        (rfc5988Strategy decodeTimelineEvent)
        Nothing


fetchOrgProjects : Token -> String -> Task Http.Error (List Project)
fetchOrgProjects token org =
    Pagination.fetchAll
        ("https://api.github.com/orgs/" ++ org ++ "/projects?per_page=100")
        (Http.header "Accept" "application/vnd.github.inertia-preview+json" :: authHeaders token)
        (rfc5988Strategy decodeProject)
        Nothing


fetchProjectColumns : Token -> Project -> Task Http.Error (List ProjectColumn)
fetchProjectColumns token project =
    Pagination.fetchAll
        (project.columnsURL ++ "?per_page=100")
        (Http.header "Accept" "application/vnd.github.inertia-preview+json" :: authHeaders token)
        (rfc5988Strategy decodeProjectColumn)
        Nothing


fetchProjectColumnCards : Token -> ProjectColumn -> Task Http.Error (List ProjectCard)
fetchProjectColumnCards token column =
    Pagination.fetchAll
        (column.cardsURL ++ "?per_page=100")
        (Http.header "Accept" "application/vnd.github.inertia-preview+json" :: authHeaders token)
        (rfc5988Strategy decodeProjectCard)
        Nothing


decodeError : JD.Decoder APIError
decodeError =
    JD.map APIError
        (JD.field "message" JD.string)


decodeRepo : JD.Decoder Repo
decodeRepo =
    JD.map7 Repo
        JD.value
        (JD.field "id" JD.int)
        (JD.field "url" JD.string)
        (JD.field "html_url" JD.string)
        (JD.field "owner" decodeUser)
        (JD.field "name" JD.string)
        (JD.field "open_issues_count" JD.int)


decodeIssue : JD.Decoder Issue
decodeIssue =
    JD.succeed Issue
        |: JD.value
        |: (JD.field "id" JD.int)
        |: (JD.field "url" JD.string)
        |: (JD.field "html_url" JD.string)
        |: (JD.field "created_at" JDE.date)
        |: (JD.field "updated_at" JDE.date)
        |: (JD.field "state" decodeIssueState)
        |: (JD.map ((/=) Nothing) << JD.maybe <| JD.field "pull_request" JD.value)
        |: (JD.field "user" decodeUser)
        |: (JD.field "number" JD.int)
        |: (JD.field "title" JD.string)
        |: (JD.field "comments" JD.int)
        |: (JD.field "reactions" decodeReactions)
        |: (JD.field "labels" <| JD.list decodeIssueLabel)


decodeIssueState : JD.Decoder IssueState
decodeIssueState =
    customDecoder JD.string <|
        \x ->
            case x of
                "open" ->
                    Ok IssueStateOpen

                "closed" ->
                    Ok IssueStateClosed

                _ ->
                    Err ("unknown issue state: " ++ x)


decodeIssueLabel : JD.Decoder IssueLabel
decodeIssueLabel =
    JD.map2 IssueLabel
        (JD.field "name" JD.string)
        (JD.field "color" JD.string)


decodeComment : JD.Decoder Comment
decodeComment =
    JD.map7 Comment
        (JD.field "id" JD.int)
        (JD.field "url" JD.string)
        (JD.field "html_url" JD.string)
        (JD.field "created_at" JDE.date)
        (JD.field "updated_at" JDE.date)
        (JD.field "user" decodeUser)
        (JD.field "reactions" decodeReactions)


decodeTimelineEvent : JD.Decoder TimelineEvent
decodeTimelineEvent =
    JD.succeed TimelineEvent
        |: JD.value
        |: (JD.field "event" JD.string)
        |: (JD.maybe <| JD.field "created_at" JDE.date)
        |: (JD.maybe <| JD.field "actor" decodeUser)
        |: (JD.maybe <| JD.field "commit_id" JD.string)
        |: (JD.maybe <| JD.field "label" decodeIssueLabel)
        |: (JD.maybe <| JD.field "assignee" decodeUser)
        |: (JD.maybe <| JD.field "milestone" decodeMilestone)
        |: (JD.maybe <| JD.field "source" decodeTimelineEventSource)
        |: (JD.maybe <| JD.field "rename" decodeTimelineEventRename)


decodeTimelineEventSource : JD.Decoder TimelineEventSource
decodeTimelineEventSource =
    JD.succeed TimelineEventSource
        |: (JD.field "type" JD.string)
        |: (JD.maybe <| JD.at [ "issue", "id" ] JD.int)


decodeTimelineEventRename : JD.Decoder TimelineEventRename
decodeTimelineEventRename =
    JD.succeed TimelineEventRename
        |: (JD.field "from" JD.string)
        |: (JD.field "to" JD.string)


decodeMilestone : JD.Decoder Milestone
decodeMilestone =
    JD.map6 Milestone
        (JD.field "id" JD.int)
        (JD.field "url" JD.string)
        (JD.field "html_url" JD.string)
        (JD.field "number" JD.int)
        (JD.field "title" JD.string)
        (JD.field "description" JD.string)


decodeUser : JD.Decoder User
decodeUser =
    JD.map6 User
        (JD.value)
        (JD.field "id" JD.int)
        (JD.field "url" JD.string)
        (JD.field "html_url" JD.string)
        (JD.field "login" JD.string)
        (JD.field "avatar_url" JD.string)


decodeReactions : JD.Decoder Reactions
decodeReactions =
    JD.map6 Reactions
        (JD.field "+1" JD.int)
        (JD.field "-1" JD.int)
        (JD.field "laugh" JD.int)
        (JD.field "confused" JD.int)
        (JD.field "heart" JD.int)
        (JD.field "hooray" JD.int)


decodeProject : JD.Decoder Project
decodeProject =
    JD.succeed Project
        |: JD.field "id" JD.int
        |: JD.field "url" JD.string
        |: JD.field "name" JD.string
        |: JD.field "number" JD.int
        |: JD.field "html_url" JD.string
        |: JD.field "columns_url" JD.string


decodeProjectColumn : JD.Decoder ProjectColumn
decodeProjectColumn =
    JD.succeed ProjectColumn
        |: JD.field "id" JD.int
        |: JD.field "url" JD.string
        |: JD.field "name" JD.string
        |: JD.field "cards_url" JD.string


decodeProjectCard : JD.Decoder ProjectCard
decodeProjectCard =
    JD.succeed ProjectCard
        |: JD.field "id" JD.int
        |: JD.maybe (JD.field "note" JD.string)
        |: JD.maybe (JD.field "content_url" JD.string)


rfc5988Strategy : JD.Decoder a -> Pagination.Strategy Int a
rfc5988Strategy decode =
    { onPage = flip addParams
    , nextPage =
        parseLink nextRel
    , previousPage =
        parseLink previousRel
    , content =
        JD.list decode
    }


parseLink : String -> Http.Response a -> Maybe Int
parseLink rel response =
    Dict.get "link" response.headers
        |> Maybe.andThen
            (\commaSeparatedCraziness ->
                let
                    headers =
                        String.split ", " commaSeparatedCraziness

                    parsed =
                        Dict.fromList <| List.filterMap parseLinkTuple headers
                in
                    Dict.get rel parsed |> Maybe.andThen parseParams
            )


previousRel : String
previousRel =
    "prev"


nextRel : String
nextRel =
    "next"


linkHeaderRegex : Regex
linkHeaderRegex =
    Regex.regex ("<([^>]+)>; rel=\"(" ++ previousRel ++ "|" ++ nextRel ++ ")\"")


parseLinkTuple : String -> Maybe ( String, String )
parseLinkTuple header =
    case Regex.find (Regex.AtMost 1) linkHeaderRegex header of
        [] ->
            Nothing

        { submatches } :: _ ->
            case submatches of
                (Just url) :: (Just rel) :: _ ->
                    Just ( rel, url )

                _ ->
                    Nothing


parseParams : String -> Maybe Int
parseParams =
    fromQuery << Tuple.second << extractQuery


addParams : String -> Int -> String
addParams url page =
    let
        ( baseURL, query ) =
            extractQuery url
    in
        setQuery baseURL (Dict.union query (toQuery page))


extractQuery : String -> ( String, Dict String String )
extractQuery url =
    case String.split "?" url of
        baseURL :: query :: _ ->
            ( baseURL, parseQuery query )

        _ ->
            ( url, Dict.empty )


setQuery : String -> Dict String String -> String
setQuery baseURL query =
    let
        params =
            String.join "&" <|
                List.map (\( k, v ) -> k ++ "=" ++ v) (Dict.toList query)
    in
        if params == "" then
            baseURL
        else
            baseURL ++ "?" ++ params


parseQuery : String -> Dict String String
parseQuery query =
    let
        parseParam p =
            case String.split "=" p of
                k :: vs ->
                    ( k, String.join "=" vs )

                [] ->
                    ( "", "" )
    in
        Dict.fromList <|
            List.map parseParam <|
                String.split "&" query


fromQuery : Dict String String -> Maybe Int
fromQuery query =
    let
        num =
            Maybe.withDefault 1
                (Dict.get "page" query
                    |> Maybe.andThen parseNum
                )
    in
        Just num


toQuery : Int -> Dict String String
toQuery page =
    Dict.singleton "page" (toString page)


parseNum : String -> Maybe Int
parseNum =
    Result.toMaybe << String.toInt


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
