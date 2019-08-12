module ReleaseRepo exposing (init, view)

import Card exposing (Card)
import Colors
import Dict exposing (Dict)
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Label
import List.Extra as LE
import Model exposing (Model, Msg)
import Octicons


init : Model -> GitHub.Repo -> Model.ReleaseRepo
init model repo =
    let
        nextMilestone =
            Dict.get repo.id model.repoMilestones
                |> Maybe.withDefault []
                |> List.filter ((==) GitHub.MilestoneStateOpen << .state)
                |> List.filter (String.startsWith "v" << .title)
                |> List.sortBy .title
                |> List.head

        commitsSinceLastRelease =
            Dict.get repo.id model.repoCommits
                |> Maybe.withDefault []

        mergedPRCards =
            commitsSinceLastRelease
                |> List.concatMap .associatedPullRequests
                |> LE.unique
                |> List.filterMap (\id -> Dict.get id model.cards)

        issueOrOpenPR cardId =
            case Dict.get cardId model.cards of
                Nothing ->
                    Nothing

                Just card ->
                    if Card.isMerged card then
                        -- don't double-count merged PRs - they are collected via the
                        -- commits
                        Nothing

                    else
                        Just card

        milestoneCards =
            case nextMilestone of
                Nothing ->
                    []

                Just nm ->
                    Dict.get nm.id model.cardsByMilestone
                        |> Maybe.withDefault []
                        |> List.filterMap issueOrOpenPR

        allCards =
            milestoneCards ++ mergedPRCards

        categorizeByDocumentedState card sir =
            if Label.cardHasLabel model "release/documented" card then
                { sir | documentedCards = card :: sir.documentedCards }

            else if Label.cardHasLabel model "release/undocumented" card then
                { sir | undocumentedCards = card :: sir.undocumentedCards }

            else if Label.cardHasLabel model "release/no-impact" card then
                { sir | noImpactCards = card :: sir.noImpactCards }

            else
                { sir | doneCards = card :: sir.doneCards }

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

        categorizeCard card sir =
            let
                byState =
                    categorizeByCardState card sir
            in
            if Card.isOpen card then
                byState

            else
                categorizeByDocumentedState card byState
    in
    List.foldl categorizeCard
        { repo = repo
        , nextMilestone = nextMilestone
        , totalCommits = List.length commitsSinceLastRelease
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


view : Model.ReleaseRepo -> Html Msg
view sir =
    Html.div [ HA.class "metrics-item" ]
        [ Html.a [ HA.class "column-title", HA.href ("/release/" ++ sir.repo.name) ]
            [ Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.nextMilestone of
                Just nm ->
                    Html.span []
                        [ Octicons.milestone octiconOpts
                        , Html.text nm.title
                        ]

                Nothing ->
                    Html.text ""
            ]
        , Html.div [ HA.class "metrics" ]
            [ viewMetric
                (Octicons.gitCommit { octiconOpts | color = Colors.gray })
                sir.totalCommits
                "commits"
                "commit"
                "since last release"
            , viewMetric
                (Octicons.gitPullRequest { octiconOpts | color = Colors.purple })
                (List.length sir.mergedPRs)
                "merged PRs"
                "merged PRs"
                "since last release"
            , if List.isEmpty sir.closedIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.check { octiconOpts | color = Colors.green })
                    (List.length sir.closedIssues)
                    "closed issues"
                    "closed issue"
                    "in milestone"
            , if List.isEmpty sir.openIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.issueOpened { octiconOpts | color = Colors.yellow })
                    (List.length sir.openIssues)
                    "open issues"
                    "open issue"
                    "in milestone"
            ]
        ]


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
