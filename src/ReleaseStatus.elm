module ReleaseStatus exposing (init, view)

import Card exposing (Card)
import Colors
import Dict
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Label
import List.Extra as LE
import Model exposing (Model, Msg)
import Octicons
import ProgressBar
import Url.Builder as UB


minorMilestone : GitHub.Milestone -> Bool
minorMilestone { title } =
    String.startsWith "v" title && String.endsWith ".0" title


init : Model -> GitHub.Repo -> List Model.ReleaseStatus
init model repo =
    -- TODO: include milestones with no corresponding commits
    Dict.get repo.id model.repoCommits
        |> Maybe.withDefault Dict.empty
        |> Dict.map (initReleaseStatus model repo)
        |> Dict.values
        |> List.filter (not << isEmpty)


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


initReleaseStatus : Model -> GitHub.Repo -> String -> List GitHub.Commit -> Model.ReleaseStatus
initReleaseStatus model repo ref commits =
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
        { ref = ref
        , repo = repo
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


view : Model.ReleaseStatus -> Html Msg
view sir =
    let
        refName =
            String.replace "refs/heads/" "" sir.ref
    in
    Html.div [ HA.class "card release" ]
        [ Html.div [ HA.class "card-body" ]
            [ Html.div [ HA.class "release-title" ] <|
                [ case sir.milestone of
                    Just nm ->
                        Html.a
                            [ HA.class "title-link"
                            , HA.href <|
                                UB.absolute [ "releases", sir.repo.name ] [ UB.string "milestone" nm.title ]
                            ]
                            [ Octicons.milestone octiconOpts
                            , Html.text nm.title
                            ]

                    Nothing ->
                        Html.a
                            [ HA.class "title-link"
                            , HA.href <|
                                UB.absolute [ "releases", sir.repo.name ] [ UB.string "ref" sir.ref ]
                            ]
                            [ Octicons.gitBranch octiconOpts
                            , Html.code [] [ Html.text refName ]
                            ]
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
                ]
            , Html.div [ HA.class "release-metrics" ]
                [ case sir.milestone of
                    Just _ ->
                        Html.div [ HA.class "metric" ]
                            [ Octicons.gitBranch octiconOpts
                            , Html.a
                                [ HA.class "title-link"
                                , HA.href <|
                                    UB.absolute [ "releases", sir.repo.name ] [ UB.string "ref" sir.ref ]
                                ]
                                [ Html.code [] [ Html.text refName ] ]
                            ]

                    Nothing ->
                        Html.div [ HA.class "metric" ]
                            [ Octicons.milestone octiconOpts
                            , Html.form [ HA.class "create-milestone" ] <|
                                if refName == "master" then
                                    [ Html.text "v"
                                    , Html.input [ HA.class "inline-major-minor" ] []
                                    , Html.text ".0"
                                    ]

                                else
                                    [ Html.text "v"
                                    , Html.text (refMajorMinor sir.ref)
                                    , Html.text "."
                                    , Html.input [ HA.class "inline-patch" ] []
                                    ]
                            ]
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
                [ ( Colors.green, List.length sir.documentedCards )
                , ( Colors.green, List.length sir.undocumentedCards )
                , ( Colors.green, List.length sir.noImpactCards )
                , ( Colors.purple, List.length sir.doneCards )
                , ( Colors.gray200, List.length sir.openPRs )
                , ( Colors.gray200, List.length sir.openIssues )
                ]
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
