module Backend exposing
    ( CardData
    , ColumnCard
    , ColumnCardsEvent
    , Data
    , EventActor
    , Indexed
    , Me
    , User
    , decodeActorsEvent
    , decodeColumnCardsEvent
    , decodeComparisonEvent
    , decodeGraphs
    , decodeReviewersEvent
    , encodeEventActor
    , fetchCardData
    , fetchData
    , fetchGraphs
    , fetchMe
    , pollData
    , refreshCards
    , refreshIssue
    , refreshPR
    , refreshRepo
    )

import Dict exposing (Dict)
import ForceGraph exposing (ForceGraph)
import GitHub
import Http
import HttpBuilder
import Iso8601
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing (andMap)
import Json.Encode as JE
import Json.Encode.Extra as JEE
import Task
import Time


type alias Indexed a =
    { index : Int
    , value : a
    }


type alias Data =
    { repos : Dict GitHub.ID GitHub.Repo
    , projects : Dict GitHub.ID GitHub.Project
    , columnCards : Dict GitHub.ID (List ColumnCard)
    , comparisons : Dict GitHub.ID GitHub.V3Comparison
    }


type alias CardData =
    { issues : Dict GitHub.ID GitHub.Issue
    , prs : Dict GitHub.ID GitHub.PullRequest
    , actors : Dict GitHub.ID (List EventActor)
    , reviewers : Dict GitHub.ID (List GitHub.PullRequestReview)
    }


type alias Me =
    { token : String
    , user : User
    }


type alias User =
    { id : Int
    , login : String
    , url : String
    , avatar : String
    }


type alias EventActor =
    { user : Maybe GitHub.User
    , avatar : String
    , createdAt : Time.Posix
    }


type alias ColumnCard =
    { id : GitHub.ID
    , contentId : Maybe GitHub.ID
    , note : Maybe String
    }


expectJsonWithIndex : JD.Decoder a -> Http.Expect (Indexed a)
expectJsonWithIndex decoder =
    Http.expectStringResponse <|
        \{ body, headers } ->
            case ( JD.decodeString decoder body, Maybe.andThen String.toInt (Dict.get "x-data-index" headers) ) of
                ( Ok value, Just index ) ->
                    Ok { index = index, value = value }

                ( Ok value, _ ) ->
                    Ok { index = 1, value = value }

                ( Err msg, _ ) ->
                    Err (JD.errorToString msg)


fetchData : (Result Http.Error (Indexed Data) -> msg) -> Cmd msg
fetchData f =
    HttpBuilder.get "/data"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeData)
        |> HttpBuilder.toTask
        |> Task.attempt f


fetchCardData : (Result Http.Error (Indexed CardData) -> msg) -> Cmd msg
fetchCardData f =
    HttpBuilder.get "/cards"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeCardData)
        |> HttpBuilder.toTask
        |> Task.attempt f


fetchGraphs : (Result Http.Error (Indexed (List (ForceGraph GitHub.ID))) -> msg) -> Cmd msg
fetchGraphs f =
    HttpBuilder.get "/graphs"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeGraphs)
        |> HttpBuilder.toTask
        |> Task.attempt f


pollData : (Result Http.Error (Indexed Data) -> msg) -> Cmd msg
pollData f =
    HttpBuilder.get "/poll"
        |> HttpBuilder.withExpect (expectJsonWithIndex decodeData)
        |> HttpBuilder.withTimeout (60 * 1000)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshCards : GitHub.ID -> (Result Http.Error () -> msg) -> Cmd msg
refreshCards col f =
    HttpBuilder.get ("/refresh?columnCards=" ++ col)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshRepo : GitHub.RepoSelector -> (Result Http.Error () -> msg) -> Cmd msg
refreshRepo repo f =
    HttpBuilder.get ("/refresh?repo=" ++ repo.owner ++ "/" ++ repo.name)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshIssue : GitHub.ID -> (Result Http.Error () -> msg) -> Cmd msg
refreshIssue id f =
    HttpBuilder.get ("/refresh?issue=" ++ id)
        |> HttpBuilder.toTask
        |> Task.attempt f


refreshPR : GitHub.ID -> (Result Http.Error () -> msg) -> Cmd msg
refreshPR id f =
    HttpBuilder.get ("/refresh?pr=" ++ id)
        |> HttpBuilder.toTask
        |> Task.attempt f


fetchMe : (Result Http.Error (Maybe Me) -> msg) -> Cmd msg
fetchMe f =
    HttpBuilder.get "/me"
        |> HttpBuilder.withExpect (Http.expectJson (JD.maybe decodeMe))
        |> HttpBuilder.toTask
        |> Task.attempt f


decodeData : JD.Decoder Data
decodeData =
    JD.succeed Data
        |> andMap (JD.field "repos" <| JD.dict GitHub.decodeRepo)
        |> andMap (JD.field "projects" <| JD.dict GitHub.decodeProject)
        |> andMap (JD.field "columnCards" <| JD.dict decodeColumnCards)
        |> andMap (JD.field "comparisons" <| JD.dict GitHub.decodeV3Comparison)


decodeCardData : JD.Decoder CardData
decodeCardData =
    JD.succeed CardData
        |> andMap (JD.field "issues" <| JD.dict GitHub.decodeIssue)
        |> andMap (JD.field "prs" <| JD.dict GitHub.decodePullRequest)
        |> andMap (JD.field "actors" <| JD.dict (JD.list decodeEventActor))
        |> andMap (JD.field "reviewers" <| JD.dict (JD.list GitHub.decodePullRequestReview))


decodeColumnCards : JD.Decoder (List ColumnCard)
decodeColumnCards =
    JD.list decodeColumnCard


decodeColumnCard : JD.Decoder ColumnCard
decodeColumnCard =
    JD.succeed ColumnCard
        |> andMap (JD.field "id" JD.string)
        |> andMap (JD.maybe <| JD.field "contentId" JD.string)
        |> andMap (JD.maybe <| JD.field "note" JD.string)


decodeMe : JD.Decoder Me
decodeMe =
    JD.succeed Me
        |> andMap (JD.field "token" JD.string)
        |> andMap (JD.field "user" decodeUser)


decodeUser : JD.Decoder User
decodeUser =
    JD.succeed User
        |> andMap (JD.field "id" JD.int)
        |> andMap (JD.field "login" JD.string)
        |> andMap (JD.field "html_url" JD.string)
        |> andMap (JD.field "avatar_url" JD.string)


decodeEventActor : JD.Decoder EventActor
decodeEventActor =
    JD.succeed EventActor
        |> andMap (JD.field "user" (JD.maybe GitHub.decodeUser))
        |> andMap (JD.field "avatar" JD.string)
        |> andMap (JD.field "createdAt" JDE.datetime)


encodeEventActor : EventActor -> JE.Value
encodeEventActor { user, avatar, createdAt } =
    JE.object
        [ ( "user", JEE.maybe GitHub.encodeUser user )
        , ( "avatar", JE.string avatar )
        , ( "createdAt", JE.string (Iso8601.fromTime createdAt) )
        ]


decodeGraphs : JD.Decoder (List (ForceGraph GitHub.ID))
decodeGraphs =
    JD.list (ForceGraph.decode JD.string)


type alias ColumnCardsEvent =
    { columnId : GitHub.ID
    , cards : List ColumnCard
    }


decodeColumnCardsEvent : JD.Decoder ColumnCardsEvent
decodeColumnCardsEvent =
    JD.succeed ColumnCardsEvent
        |> andMap (JD.field "columnId" JD.string)
        |> andMap (JD.field "cards" decodeColumnCards)


type alias ActorsEvent =
    { cardId : GitHub.ID
    , actors : List EventActor
    }


decodeActorsEvent : JD.Decoder ActorsEvent
decodeActorsEvent =
    JD.succeed ActorsEvent
        |> andMap (JD.field "cardId" JD.string)
        |> andMap (JD.field "actors" (JD.list decodeEventActor))


type alias ReviewersEvent =
    { cardId : GitHub.ID
    , reviewers : List GitHub.PullRequestReview
    }


decodeReviewersEvent : JD.Decoder ReviewersEvent
decodeReviewersEvent =
    JD.succeed ReviewersEvent
        |> andMap (JD.field "cardId" JD.string)
        |> andMap (JD.field "reviewers" (JD.list GitHub.decodePullRequestReview))


type alias ComparisonEvent =
    { repoId : GitHub.ID
    , comparison : GitHub.V3Comparison
    }


decodeComparisonEvent : JD.Decoder ComparisonEvent
decodeComparisonEvent =
    JD.succeed ComparisonEvent
        |> andMap (JD.field "repoId" JD.string)
        |> andMap (JD.field "comparison" GitHub.decodeV3Comparison)
