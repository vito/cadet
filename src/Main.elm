module Main exposing (..)

import Date
import Dict exposing (Dict)
import Html exposing (Html, h1, h2, div, pre, text, a, span, i)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, classList, href, style, target)
import ParseInt
import Regex exposing (Regex)
import Set exposing (Set)
import String
import Task exposing (Task)
import Time exposing (Time)
import GitHub


type alias Config =
    { githubToken : String
    , githubOrganization : String
    }


type alias Model =
    { config : Config
    , error : Maybe String
    , repositories : List GitHub.Repo
    , members : Maybe (List GitHub.User)
    , issues : List GitHub.Issue
    , reposLoadingIssues : Set Int
    , themWaiting : Set Int
    }


main : Program Config Model Msg
main =
    Html.programWithFlags
        { init = init
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }


type Msg
    = Noop
    | MembersFetched (List GitHub.User)
    | RepositoriesFetched (List GitHub.Repo)
    | IssuesFetched GitHub.Repo (List GitHub.Issue)
    | IssueTimelineFetched GitHub.Issue (List GitHub.TimelineEvent)
    | Error String


init : Config -> ( Model, Cmd Msg )
init config =
    ( { config = config
      , error = Nothing
      , repositories = []
      , members = Nothing
      , issues = []
      , reposLoadingIssues = Set.empty
      , themWaiting = Set.empty
      }
    , Cmd.batch
        [ fetchRepositories config
        , fetchMembers config
        ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        MembersFetched members ->
            processIfReady { model | members = Just members }

        RepositoriesFetched repos ->
            ( { model
                | repositories = repos
                , reposLoadingIssues = Set.fromList (List.map .id repos)
              }
            , Cmd.batch <|
                List.map (fetchIssues model.config) repos
            )

        IssuesFetched repo issues ->
            processIfReady
                { model
                    | issues = issues ++ model.issues
                    , reposLoadingIssues = Set.remove repo.id model.reposLoadingIssues
                }

        IssueTimelineFetched issue timeline ->
            if lastActivityIsUs model timeline then
                ( model, Cmd.none )
            else
                ( { model | themWaiting = Set.insert issue.id model.themWaiting }, Cmd.none )

        Error msg ->
            ( { model | error = Just msg }, Cmd.none )


lastActivityIsUs : Model -> List GitHub.Comment -> Bool
lastActivityIsUs model timeline =
    let
        withoutBots =
            List.filter (not << flip List.member model.config.botUsers << .login << .user) timeline
    in
        case List.head (List.reverse withoutBots) of
            Just comment ->
                isOrgMember model.members comment.user

            Nothing ->
                False


isOrgMember : Maybe (List GitHub.User) -> GitHub.User -> Bool
isOrgMember users user =
    List.any (\x -> x.id == user.id) (Maybe.withDefault [] users)


processIfReady : Model -> ( Model, Cmd Msg )
processIfReady model =
    if not (List.isEmpty model.repositories) && Set.isEmpty model.reposLoadingIssues then
        case ( model.backlog, model.stories, model.members ) of
            ( Just backlog, Just stories, Just members ) ->
                process model backlog stories model.issues members

            _ ->
                ( model, Cmd.none )
    else
        ( model, Cmd.none )


cell : String -> (a -> Html Msg) -> List a -> Html Msg
cell title viewEntry entries =
    div [ class "cell" ]
        [ h1 [ class "cell-title" ]
            [ text (title ++ " (" ++ toString (List.length entries) ++ ")")
            ]
        , div [ class "cell-content" ] <|
            List.map viewEntry entries
        ]


view : Model -> Html Msg
view model =
    case model.error of
        Just msg ->
            pre [] [ text msg ]

        Nothing ->
            div [ class "columns" ]
                [ div [ class "column" ]
                    [ cell "Backlog" viewIteration model.topicIterations
                    ]
                , div [ class "column" ] <|
                    let
                        ( themWaiting, usWaiting ) =
                            List.partition (List.any (theyAreWaiting model) << .issues) model.unscheduled
                    in
                        [ cell "Triaged (Them Waiting)" viewTopic <|
                            List.reverse (List.sortBy topicActivity themWaiting)
                        , cell "Triaged (Us Waiting)" viewTopic <|
                            List.reverse (List.sortBy topicActivity usWaiting)
                        ]
                , div [ class "column" ] <|
                    let
                        ( themWaiting, usWaiting ) =
                            List.partition (theyAreWaiting model << .issue) model.engaged
                    in
                        [ cell "Them Waiting" viewUntriagedIssue <|
                            List.reverse (List.sortBy untriagedIssueActivity themWaiting)
                        , cell "Us Waiting" viewUntriagedIssue <|
                            List.reverse (List.sortBy untriagedIssueActivity usWaiting)
                        , if not <| List.isEmpty model.orphaned then
                            cell "Orphaned" viewOrphanedStory <|
                                model.orphaned
                          else
                            text ""
                        ]
                , div [ class "column" ]
                    [ cell "Pending By Activity" viewUntriagedIssue <|
                        List.reverse (List.sortBy untriagedIssueActivity model.pending)
                    , cell "Pending By Date" viewUntriagedIssue <|
                        List.reverse (List.sortBy untriagedIssueCreation model.pending)
                    ]
                ]


theyAreWaiting : Model -> GitHub.Issue -> Bool
theyAreWaiting model issue =
    Set.member issue.id model.themWaiting


viewTriagedIssue : GitHub.Issue -> Html Msg
viewTriagedIssue issue =
    viewIssue issue []


viewIssue : GitHub.Issue -> List (Html Msg) -> Html Msg
viewIssue issue extraCells =
    let
        typeCell =
            div [ class "issue-cell issue-type" ]
                [ if issue.isPullRequest then
                    if issue.state == GitHub.IssueStateOpen then
                        i [ class "emoji octicon octicon-git-pull-request gh-open" ] []
                    else
                        i [ class "emoji octicon octicon-git-pull-request gh-closed" ] []
                  else if issue.state == GitHub.IssueStateOpen then
                    i [ class "emoji octicon octicon-issue-opened gh-open" ] []
                  else
                    i [ class "emoji octicon octicon-issue-closed gh-closed" ] []
                ]

        infoCell =
            div [ class "issue-cell issue-info" ]
                [ a [ href issue.url, target "_blank", class "issue-title" ]
                    [ text issue.title
                    ]
                , span [ class "issue-labels" ] <|
                    List.map viewIssueLabel issue.labels
                , div [ class "issue-meta" ]
                    [ a [ href issue.repo.url, target "_blank" ] [ text issue.repo.name ]
                    , text " "
                    , a [ href issue.url, target "_blank" ] [ text ("#" ++ toString issue.number) ]
                    , text " "
                    , text "opened by "
                    , a [ href issue.user.url, target "_blank" ] [ text issue.user.login ]
                    ]
                ]

        flairCell =
            div [ class "issue-cell issue-flair" ] <|
                issueFlair issue

        baseCells =
            [ typeCell, infoCell, flairCell ]

        cells =
            baseCells ++ extraCells
    in
        div [ class "issue-summary" ] cells


hexRegex : Regex
hexRegex =
    Regex.regex "([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"


hexBrightness : Int -> Int
hexBrightness h =
    case compare h (0xFF // 2) of
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
            Just [ Just h1s, Just h2s, Just h3s ] ->
                case List.map ParseInt.parseIntHex [ h1s, h2s, h3s ] of
                    [ Ok h1, Ok h2, Ok h3 ] ->
                        if (hexBrightness h1 + hexBrightness h2 + hexBrightness h3) > 0 then
                            True
                        else
                            False

                    _ ->
                        Debug.crash "invalid hex"

            _ ->
                Debug.crash "invalid hex"


viewIssueLabel : GitHub.IssueLabel -> Html Msg
viewIssueLabel { name, color } =
    span
        [ class "issue-label"
        , style
            [ ( "background-color", "#" ++ color )
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
issueFlair { url, reactions, commentCount } =
    let
        presentReactions =
            List.filter ((/=) 0 << Tuple.second) <|
                GitHub.reactionCodes reactions

        viewReaction ( code, count ) =
            span [ class "reaction" ]
                [ span [ class "emoji" ] [ text code ]
                , span [ class "count" ] [ text <| toString count ]
                ]

        commentsElement =
            span [ class "reaction" ]
                [ span [ class "emoji" ] [ i [ class "octicon octicon-comment" ] [] ]
                , span [ class "count" ] [ text <| toString commentCount ]
                ]

        reactionElements =
            List.map viewReaction presentReactions
    in
        if commentCount > 0 then
            reactionElements ++ [ commentsElement ]
        else
            reactionElements


fetchRepositories : Config -> Cmd Msg
fetchRepositories config =
    Task.attempt (handleErr RepositoriesFetched) <|
        GitHub.fetchOrgRepos
            config.githubToken
            config.githubOrganization


fetchIssues : Config -> GitHub.Repo -> Cmd Msg
fetchIssues config repo =
    Task.attempt (handleErr <| IssuesFetched repo) <|
        GitHub.fetchRepoIssues
            config.githubToken
            repo


fetchMembers : Config -> Cmd Msg
fetchMembers config =
    Task.attempt (handleErr MembersFetched) <|
        GitHub.fetchOrgMembers
            config.githubToken
            config.githubOrganization


handleErr : (a -> Msg) -> Result x a -> Msg
handleErr ok res =
    case res of
        Ok x ->
            ok x

        Err x ->
            Error (toString x)
