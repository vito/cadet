module ReleaseStatus exposing (init, view)

import Backend
import Card exposing (Card)
import Colors
import DateFormat
import DateFormat.Relative
import Dict
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Label
import List.Extra as LE
import Maybe.Extra as ME
import Model exposing (Model, Msg)
import Octicons
import ProgressBar
import Time
import Time.Extra as TE
import Url.Builder as UB


minorMilestone : GitHub.Milestone -> Bool
minorMilestone { title } =
    String.startsWith "v" title && String.endsWith ".0" title


init : Model -> GitHub.Repo -> List Model.ReleaseStatus
init model repo =
    let
        refReleases =
            Dict.get repo.id model.repoCommits
                |> Maybe.withDefault Dict.empty
                |> Dict.map (initFromCommits model repo)
                |> Dict.values
                |> List.filter (not << isEmpty)

        alreadyRefMilestone m =
            refReleases
                |> List.map .milestone
                |> ME.values
                |> List.any ((==) m.id << .id)

        nakedMilestones =
            Dict.get repo.id model.repoMilestones
                |> Maybe.withDefault []
                |> List.filter ((==) GitHub.MilestoneStateOpen << .state)
                |> List.filter (not << alreadyRefMilestone)
                |> List.map (initFromMilestone model repo)
    in
    refReleases ++ nakedMilestones


isEmpty : Model.ReleaseStatus -> Bool
isEmpty { milestone, totalCommits } =
    milestone == Nothing && totalCommits == 0


refMajorMinor : String -> String
refMajorMinor =
    String.replace "refs/heads/release/" ""
        >> String.replace ".x" ""


findMatchingMilestone : String -> List GitHub.Milestone -> Maybe GitHub.Milestone
findMatchingMilestone ref milestones =
    let
        titlePrefix =
            "v" ++ refMajorMinor ref
    in
    LE.find (String.startsWith titlePrefix << .title) milestones


initFromCommits : Model -> GitHub.Repo -> String -> Backend.CommitsSinceLastRelease -> Model.ReleaseStatus
initFromCommits model repo ref { lastRelease, commits } =
    let
        openMilestones =
            Dict.get repo.id model.repoMilestones
                |> Maybe.withDefault []
                |> List.filter ((==) GitHub.MilestoneStateOpen << .state)

        milestone =
            if ref == "refs/heads/master" then
                openMilestones
                    |> List.filter minorMilestone
                    |> List.sortBy .title
                    |> List.head

            else
                findMatchingMilestone ref openMilestones

        mergedPRCards =
            commits
                |> List.concatMap .associatedPullRequests
                |> LE.unique
                |> List.filterMap (\id -> Dict.get id model.cards)

        allCards =
            (Maybe.map (milestoneCards model) milestone |> Maybe.withDefault []) ++ mergedPRCards
    in
    List.foldl (categorizeCard model)
        { repo = repo
        , ref = Just ref
        , lastRelease = Just lastRelease
        , milestone = milestone
        , issue = LE.find (Label.cardHasLabel model "release") allCards
        , totalCommits = List.length commits
        , openPRs = []
        , mergedPRs = []
        , openIssues = []
        , closedIssues = []
        , doneCards = []
        , documentedCards = []
        , undocumentedCards = []
        , noImpactCards = []
        }
        allCards


initFromMilestone : Model -> GitHub.Repo -> GitHub.Milestone -> Model.ReleaseStatus
initFromMilestone model repo milestone =
    List.foldl (categorizeCard model)
        { repo = repo
        , ref = Nothing
        , lastRelease = Nothing
        , milestone = Just milestone
        , issue = Nothing
        , totalCommits = 0
        , openPRs = []
        , mergedPRs = []
        , openIssues = []
        , closedIssues = []
        , doneCards = []
        , documentedCards = []
        , undocumentedCards = []
        , noImpactCards = []
        }
        (milestoneCards model milestone)


categorizeByDocumentedState : Model -> Card -> Model.ReleaseStatus -> Model.ReleaseStatus
categorizeByDocumentedState model card sir =
    if Label.cardHasLabel model "release/documented" card then
        { sir | documentedCards = card :: sir.documentedCards }

    else if Label.cardHasLabel model "release/undocumented" card then
        { sir | undocumentedCards = card :: sir.undocumentedCards }

    else if Label.cardHasLabel model "release/no-impact" card then
        { sir | noImpactCards = card :: sir.noImpactCards }

    else
        { sir | doneCards = card :: sir.doneCards }


categorizeByCardState : Card -> Model.ReleaseStatus -> Model.ReleaseStatus
categorizeByCardState card sir =
    case card.state of
        Card.IssueState GitHub.IssueStateOpen ->
            { sir | openIssues = card :: sir.openIssues }

        Card.IssueState GitHub.IssueStateClosed ->
            { sir | closedIssues = card :: sir.closedIssues }

        Card.PullRequestState GitHub.PullRequestStateOpen ->
            { sir | openPRs = card :: sir.openPRs }

        Card.PullRequestState GitHub.PullRequestStateMerged ->
            { sir | mergedPRs = card :: sir.mergedPRs }

        Card.PullRequestState GitHub.PullRequestStateClosed ->
            -- ignored
            sir


categorizeCard : Model -> Card -> Model.ReleaseStatus -> Model.ReleaseStatus
categorizeCard model card sir =
    let
        byState =
            categorizeByCardState card sir
    in
    if Card.isOpen card then
        byState

    else
        categorizeByDocumentedState model card byState


issueOrOpenPR : Model -> GitHub.ID -> Maybe Card
issueOrOpenPR model cardId =
    Dict.get cardId model.cards
        |> Maybe.andThen
            (\card ->
                if Card.isMerged card then
                    -- don't double-count merged PRs - they are collected via the
                    -- commits
                    Nothing

                else
                    Just card
            )


milestoneCards : Model -> GitHub.Milestone -> List Card
milestoneCards model milestone =
    Dict.get milestone.id model.cardsByMilestone
        |> Maybe.withDefault []
        |> List.filterMap (issueOrOpenPR model)


branchName : Model.ReleaseStatus -> String
branchName { ref } =
    ref
        |> Maybe.withDefault "impossible"
        |> String.replace "refs/heads/" ""


view : Model -> Model.ReleaseStatus -> Html Msg
view model sir =
    Html.div [ HA.class "card release" ]
        [ Html.div [ HA.class "card-body" ]
            [ case ( sir.milestone, sir.ref ) of
                ( Just nm, _ ) ->
                    Html.div [ HA.class "release-title" ]
                        [ Octicons.milestone octiconOpts
                        , Html.a
                            [ HA.class "title-link"
                            , HA.href <|
                                UB.absolute [ "releases", sir.repo.name ]
                                    [ UB.string "milestone" nm.title ]
                            ]
                            [ Html.text nm.title
                            ]
                        ]

                ( Nothing, Just ref ) ->
                    Html.div [ HA.class "release-title" ]
                        [ Html.a
                            [ HA.class "title-link"
                            , HA.href <|
                                UB.absolute [ "releases", sir.repo.name ] [ UB.string "ref" ref ]
                            ]
                            [ Octicons.gitBranch octiconOpts
                            , Html.code [] [ Html.text (branchName sir) ]
                            ]
                        ]

                _ ->
                    Html.text "impossible"
            , Html.div [ HA.class "release-ownership" ]
                [ case sir.issue of
                    Nothing ->
                        Html.div [ HA.class "issue-placeholder" ]
                            [ Octicons.person octiconOpts ]

                    Just issue ->
                        Html.div [ HA.class "release-issue" ]
                            [ case issue.author of
                                Nothing ->
                                    Html.text "missing owner"

                                Just user ->
                                    Html.img [ HA.class "release-avatar", HA.src user.avatar ] []
                            , Html.a [ HA.class "issue-number", HA.href issue.url, HA.target "_blank" ]
                                [ Html.text "#"
                                , Html.text (String.fromInt issue.number)
                                ]
                            ]
                ]
            , Html.div [ HA.class "release-metrics" ]
                [ case sir.ref of
                    Just _ ->
                        Html.div [ HA.class "metric" ]
                            [ Octicons.gitBranch octiconOpts
                            , Html.a
                                [ HA.class "title-link"
                                , HA.href (sir.repo.url ++ "/tree/" ++ branchName sir)
                                , HA.target "_blank"
                                ]
                                [ Html.code [] [ Html.text (branchName sir) ] ]
                            ]

                    Nothing ->
                        Html.text ""
                , case Maybe.andThen .dueOn sir.milestone of
                    Just dueOn ->
                        Html.div
                            [ HA.class "metric"
                            , HA.classList
                                [ ( "overdue"
                                  , Time.posixToMillis model.currentTime > Time.posixToMillis dueOn
                                  )
                                ]
                            ]
                            [ Octicons.calendar octiconOpts

                            -- Value from GitHub is UTC; ignore current zone
                            , Html.text (DateFormat.format dueDate Time.utc dueOn)
                            ]

                    Nothing ->
                        Html.text ""
                , case sir.lastRelease of
                    Just rel ->
                        Html.div
                            [ HA.class "metric"
                            , HA.classList
                                [ ( "overdue"
                                  , TE.diff TE.Week Time.utc rel.createdAt model.currentTime >= 3
                                  )
                                ]
                            ]
                            [ Octicons.tag octiconOpts
                            , Html.a
                                [ HA.class "title-link"
                                , HA.href rel.url
                                , HA.target "_blank"
                                ]
                                [ Html.text (releaseName rel) ]
                            , Html.text " was "
                            , Html.text (DateFormat.Relative.relativeTime model.currentTime rel.createdAt)
                            ]

                    Nothing ->
                        Html.text ""
                , viewMetric
                    (Octicons.gitCommit { octiconOpts | color = Colors.gray })
                    sir.totalCommits
                    "commits"
                    "commit"
                    "since last release"
                , viewMetric
                    (Octicons.gitPullRequest { octiconOpts | color = Colors.purple })
                    (List.length sir.doneCards)
                    "issues/PRs need"
                    "issue/PR needs"
                    "documentation"
                , if List.isEmpty sir.openIssues then
                    Html.text ""

                  else
                    viewMetric
                        (Octicons.issueOpened { octiconOpts | color = Colors.gray })
                        (List.length sir.openIssues)
                        "open issues/PRs"
                        "open issue/PR"
                        "in milestone"
                ]
            , ProgressBar.view
                [ ( labelColorByName model "release/no-impact", List.length sir.noImpactCards )
                , ( labelColorByName model "release/undocumented", List.length sir.undocumentedCards )
                , ( labelColorByName model "release/documented", List.length sir.documentedCards )
                , ( Colors.purple, List.length sir.doneCards )
                , ( Colors.gray200, List.length sir.openPRs )
                , ( Colors.gray200, List.length sir.openIssues )
                ]
            ]
        ]


labelColorByName : Model -> String -> String
labelColorByName model name =
    let
        mlabel =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (List.head << Dict.values)
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)
    in
    case mlabel of
        Just label ->
            "#" ++ label.color

        Nothing ->
            "#ff00ff"


octiconOpts : Octicons.Options
octiconOpts =
    Octicons.defaultOptions


viewMetric : Html Msg -> Int -> String -> String -> String -> Html Msg
viewMetric icon count plural singular description =
    Html.div [ HA.class "metric" ]
        [ icon
        , Html.span [ HA.class "count" ] [ Html.text (String.fromInt count) ]
        , Html.text " "
        , Html.text <|
            if count == 1 then
                singular

            else
                plural
        , Html.text " "
        , Html.text description
        ]


dueDate : List DateFormat.Token
dueDate =
    [ DateFormat.monthNameFull
    , DateFormat.text " "
    , DateFormat.dayOfMonthSuffix
    , DateFormat.text " "
    , DateFormat.yearNumber
    ]


releaseName : GitHub.Release -> String
releaseName rel =
    case Maybe.withDefault "" rel.name of
        -- some releases seem to have an empty (but non-Nothing) name
        "" ->
            rel.tag
                |> Maybe.map .name
                |> Maybe.withDefault "release"

        name ->
            name
