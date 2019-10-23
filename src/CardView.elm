module CardView exposing
    ( focusEditNote
    , viewCard
    , viewCardIcon
    , viewNote
    , viewProjectCard
    , viewProjectColumnCard
    )

import Activity
import Backend
import Browser
import Browser.Dom
import Browser.Navigation as Nav
import Card exposing (Card)
import Colors
import DateFormat
import Dict exposing (Dict)
import Drag
import Effects
import Events
import GitHub
import Hash
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Keyboard.Event
import Keyboard.Key
import Label
import List.Extra as LE
import Log
import Markdown
import Maybe.Extra as ME
import Model exposing (Model, Msg(..), Page(..))
import Octicons
import Project
import Query
import ReleaseRepo
import Set exposing (Set)
import StatefulGraph
import Task
import Time
import Url exposing (Url)
import Url.Builder as UB
import Url.Parser as UP exposing ((</>), (<?>))
import Url.Parser.Query as UQ


viewCard : Model -> List (Html Msg) -> Card -> Html Msg
viewCard model controls card =
    Html.div
        [ HA.class "card"
        , HA.classList [ ( "loading", Dict.member card.id model.progress ) ]
        , HA.tabindex 0
        , HA.classList
            [ ( "in-flight", Card.isInFlight card )
            , ( "done", Card.isDone card )
            , ( "icebox", Card.isIcebox card )
            , ( "backlog", Card.isBacklog card )
            , ( "paused", Card.isPaused card )
            , ( "highlighted", model.highlightedCard == Just card.id )
            , ( Activity.class model.currentTime card.updatedAt, Card.isPR card )
            , ( "last-activity-is-me"
              , case model.me of
                    Just { user } ->
                        lastActivityIsByUser model user.login card

                    Nothing ->
                        False
              )
            ]
        , HE.onClick (SelectCard card.id)
        , HE.onMouseOver (HighlightNode card.id)
        , HE.onMouseOut UnhighlightNode
        ]
        [ Html.div [ HA.class "card-icons" ] <|
            List.concat
                [ [ viewCardIcon card ]
                , cardExternalIcons card
                , [ pauseIcon card ]
                , List.map
                    (\{ avatar } ->
                        Html.img [ HA.class "status-actor", HA.src avatar ] []
                    )
                    card.assignees
                , prIcons model card
                ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "card-title", HA.draggable "false" ] <|
                [ Html.a
                    [ HA.class "title-link"
                    , HA.href card.url
                    , HA.target "_blank"
                    ]
                    [ Html.text card.title
                    ]
                ]
            , viewCardMeta card
            , viewCardSquares model card
            ]
        , Html.div [ HA.class "card-controls" ] <|
            Html.span
                [ HE.onClick
                    (if Card.isPR card then
                        RefreshPullRequest card.id

                     else
                        RefreshIssue card.id
                    )
                ]
                [ Octicons.sync Octicons.defaultOptions ]
                :: controls
        ]


viewNote : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> String -> Html Msg
viewNote model project col card text =
    let
        controls =
            [ deleteCardControl model card.id card.id
            , Html.span [ HA.class "edit-note", Events.onClickNoBubble (SetEditingCardNote card.id text) ]
                [ Octicons.pencil Octicons.defaultOptions
                ]
            ]
    in
    if Dict.member card.id model.editingCardNotes then
        viewNoteCard model project col card controls text

    else if String.startsWith "http" text then
        Maybe.map (viewProjectCard model controls) (projectByUrl model text)
            |> ME.orElseLazy (\_ -> Maybe.map (viewCard model controls) (cardByUrl model text))
            |> Maybe.withDefault (viewNoteCard model project col card controls text)

    else
        viewNoteCard model project col card controls text


viewProjectColumnCard : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> Html Msg
viewProjectColumnCard model project col ghCard =
    let
        dropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Just ghCard.id
                }
            }
    in
    case ( ghCard.note, ghCard.contentId ) of
        ( Just n, Nothing ) ->
            viewNote model project col ghCard n

        ( Nothing, Just contentId ) ->
            case Dict.get contentId model.cards of
                Just c ->
                    let
                        controls =
                            if not (Card.isOpen c) then
                                [ deleteCardControl model c.id ghCard.id
                                , if ghCard.isArchived then
                                    unarchiveCardControl ghCard.id

                                  else
                                    archiveCardControl ghCard.id
                                ]

                            else
                                [ deleteCardControl model c.id ghCard.id ]
                    in
                    viewCard model controls c

                Nothing ->
                    viewLoadingCard

        _ ->
            Html.text "impossible: card is neither note nor content"


viewLoadingCard : Html Msg
viewLoadingCard =
    Html.div [ HA.class "card loading" ]
        [ Html.div [ HA.class "card-icons" ] [ Octicons.sync octiconOpts ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "loading-text" ] [ Html.text "loading..." ] ]
        ]


archiveCardControl : GitHub.ID -> Html Msg
archiveCardControl archiveId =
    Html.span
        [ Events.onClickNoBubble (SetCardArchived archiveId True)
        ]
        [ Octicons.archive octiconOpts
        ]


unarchiveCardControl : GitHub.ID -> Html Msg
unarchiveCardControl archiveId =
    Html.span
        [ HA.class "unarchive"
        , Events.onClickNoBubble (SetCardArchived archiveId False)
        ]
        [ Octicons.archive octiconOpts
        ]


lastActivityIsByUser : Model -> String -> Card -> Bool
lastActivityIsByUser model login card =
    lastActiveUser model card
        |> Maybe.map ((==) login << .login)
        |> Maybe.withDefault False


lastActiveUser : Model -> Card -> Maybe GitHub.User
lastActiveUser model card =
    Dict.get card.id model.cardEvents
        |> Maybe.andThen List.head
        |> Maybe.andThen .user


deleteCardControl : Model -> GitHub.ID -> GitHub.ID -> Html Msg
deleteCardControl model selfId deleteId =
    if Set.member selfId model.deletingCards then
        Html.div [ HA.class "with-confirm" ]
            [ Html.span
                [ HA.class "cancel-delete-card"
                , Events.onClickNoBubble (CancelDeleteCard selfId)
                ]
                [ Octicons.x octiconOpts
                ]
            , Html.span
                [ HA.class "inline-confirm"
                , Events.onClickNoBubble (DeleteCard selfId deleteId)
                ]
                [ Octicons.check octiconOpts
                ]
            ]

    else
        Html.span
            [ HA.class "delete-card"
            , Events.onClickNoBubble (ConfirmDeleteCard selfId)
            ]
            [ Octicons.trashcan octiconOpts
            ]


projectByUrl : Model -> String -> Maybe GitHub.Project
projectByUrl model url =
    Dict.get url model.idsByUrl
        |> Maybe.andThen (\id -> Dict.get id model.projects)


cardByUrl : Model -> String -> Maybe Card
cardByUrl model url =
    Dict.get url model.idsByUrl
        |> Maybe.andThen (\id -> Dict.get id model.cards)


focusId : GitHub.ID -> String
focusId id =
    "focus-" ++ id


focusEditNote : GitHub.ID -> Cmd Msg
focusEditNote id =
    Task.attempt (always Noop) (Browser.Dom.focus (focusId id))


viewNoteCard : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> List (Html Msg) -> String -> Html Msg
viewNoteCard model project col card controls text =
    Html.div [ HA.class "editable-card" ]
        [ Html.div
            [ HA.class "card note"
            , HA.classList [ ( "loading", Dict.member card.id model.progress ) ]
            , HA.tabindex 0
            , HA.classList
                [ ( "in-flight", Project.detectColumn.inFlight col )
                , ( "done", Project.detectColumn.done col )
                , ( "backlog", Project.detectColumn.backlog col )
                ]
            ]
            [ Html.div [ HA.class "card-icons" ]
                [ Octicons.note Octicons.defaultOptions
                ]
            , Dict.get card.id model.editingCardNotes
                |> Maybe.withDefault text
                |> Markdown.toHtml [ HA.class "card-info card-note" ]
            , Html.div [ HA.class "card-controls" ] <|
                Html.span
                    [ HA.class "spin-on-column-refresh"
                    , HE.onClick (RefreshColumn col.id)
                    ]
                    [ Octicons.sync Octicons.defaultOptions ]
                    :: controls
            ]
        , case Dict.get card.id model.editingCardNotes of
            Nothing ->
                Html.text ""

            Just val ->
                Html.div
                    [ HA.class "edit-bubble"
                    , HA.draggable "true"
                    , HE.custom "dragstart" (JD.succeed { message = Noop, stopPropagation = True, preventDefault = True })
                    ]
                    [ Html.form [ HA.class "write-note-form", HE.onSubmit (UpdateCardNote card.id) ]
                        [ Html.textarea
                            [ HA.placeholder "Enter a note"
                            , HA.id (focusId card.id)
                            , HE.onInput (SetEditingCardNote card.id)
                            , Events.onCtrlEnter (UpdateCardNote card.id)
                            ]
                            [ Html.text val ]
                        , Html.div [ HA.class "buttons" ]
                            [ Html.button
                                [ HA.class "button cancel"
                                , HA.type_ "reset"
                                , HE.onClick (CancelEditingCardNote card.id)
                                ]
                                [ Octicons.x Octicons.defaultOptions
                                , Html.text "cancel"
                                ]
                            , case project.owner of
                                GitHub.ProjectOwnerRepo repoId ->
                                    Html.button
                                        [ HA.class "button convert-to-issue"
                                        , HA.type_ "button"
                                        , HE.onClick (ConvertEditingCardNoteToIssue card.id repoId)
                                        ]
                                        [ Octicons.issueOpened Octicons.defaultOptions
                                        , Html.text "convert to issue"
                                        ]

                                _ ->
                                    Html.text ""
                            , Html.button
                                [ HA.class "button apply"
                                , HA.type_ "submit"
                                ]
                                [ Octicons.check Octicons.defaultOptions
                                , Html.text "save"
                                ]
                            ]
                        ]
                    ]
        ]


viewProjectCard : Model -> List (Html Msg) -> GitHub.Project -> Html Msg
viewProjectCard model controls project =
    Html.div [ HA.class "card project", HA.tabindex 0 ]
        [ Html.div [ HA.class "card-icons" ]
            [ Octicons.project Octicons.defaultOptions
            , projectExternalIcon project
            ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "card-title", HA.draggable "false" ]
                [ Html.a [ HA.href ("/projects/" ++ project.id) ]
                    [ Html.text project.name ]
                ]
            , if String.isEmpty project.body then
                Html.text ""

              else
                Markdown.toHtml [ HA.class "project-body" ] project.body
            , viewProjectBar model project
            ]
        , Html.div [ HA.class "card-controls" ] controls
        ]


viewProjectBar : Model -> GitHub.Project -> Html Msg
viewProjectBar model project =
    let
        cardCount col =
            Dict.get col.id model.columnCards
                |> Maybe.map List.length
                |> Maybe.withDefault 0

        countPurpose purpose =
            LE.find ((==) (Just purpose) << .purpose) project.columns
                |> Maybe.map cardCount
                |> Maybe.withDefault 0

        toDos =
            countPurpose GitHub.ProjectColumnPurposeToDo

        inProgresses =
            countPurpose GitHub.ProjectColumnPurposeInProgress

        dones =
            countPurpose GitHub.ProjectColumnPurposeDone

        total =
            toDos + inProgresses + dones

        width base =
            let
                pct =
                    (toFloat base / toFloat total) * 100
            in
            HA.style "width" (String.fromFloat pct ++ "%")

        segment name val =
            if val == 0 then
                Html.text ""

            else
                Html.div [ HA.class ("segment " ++ name), width val ] []
    in
    if total > 0 then
        Html.div [ HA.class "project-bar" ]
            [ segment "done" dones
            , segment "in-progress" inProgresses
            , segment "to-do" toDos
            ]

    else
        Html.text ""


viewCardMeta : Card -> Html Msg
viewCardMeta card =
    Html.div [ HA.class "card-meta" ]
        [ Html.a
            [ HA.href card.url
            , HA.target "_blank"
            , HA.draggable "false"
            ]
            [ Html.text ("#" ++ String.fromInt card.number) ]
        , Html.text " "
        , Html.text "opened by "
        , case card.author of
            Just user ->
                Html.a
                    [ HA.href user.url
                    , HA.target "_blank"
                    , HA.draggable "false"
                    ]
                    [ Html.text user.login ]

            _ ->
                Html.text "(deleted user)"
        ]


viewCardSquares : Model -> Card -> Html Msg
viewCardSquares model card =
    Html.div [ HA.class "card-squares" ]
        [ Html.div [ HA.class "card-labels" ] <|
            List.map (searchableLabel model) card.labels
                ++ List.map (viewSuggestedLabel model card) model.suggestedLabels
        , Html.div [ HA.class "card-actors" ] <|
            List.map (viewEventActor model) (recentEvents model card)
        ]


pauseIcon : Card -> Html Msg
pauseIcon card =
    case ( Card.isInFlight card, Card.isPaused card ) of
        ( _, True ) ->
            Html.span
                [ HA.class "pause-toggle"
                , HE.onClick (UnlabelCard card "paused")
                ]
                [ Octicons.bookmark Octicons.defaultOptions
                ]

        ( True, False ) ->
            Html.span
                [ HA.class "pause-toggle paused"
                , HE.onClick (LabelCard card "paused")
                ]
                [ Octicons.bookmark Octicons.defaultOptions
                ]

        _ ->
            Html.text ""


viewCardIcon : Card -> Html Msg
viewCardIcon card =
    if Card.isPR card then
        Octicons.gitPullRequest
            { octiconOpts
                | color =
                    if Card.isMerged card then
                        Colors.purple

                    else if Card.isOpen card then
                        Colors.green

                    else
                        Colors.red
            }

    else if Card.isOpen card then
        Octicons.issueOpened { octiconOpts | color = Colors.green }

    else
        Octicons.issueClosed { octiconOpts | color = Colors.red }


projectExternalIcon : GitHub.Project -> Html Msg
projectExternalIcon project =
    Html.a
        [ HA.target "_blank"
        , HA.class "external-link"
        , HA.href project.url
        ]
        [ Octicons.linkExternal Octicons.defaultOptions ]


cardExternalIcons : Card -> List (Html Msg)
cardExternalIcons card =
    List.map
        (\{ url } ->
            Html.a
                [ HA.target "_blank"
                , HA.class "external-link"
                , HA.href url
                ]
                [ Octicons.linkExternal Octicons.defaultOptions ]
        )
        card.cards


summarizeContexts : List GitHub.StatusContext -> Html Msg
summarizeContexts contexts =
    let
        states =
            List.map .state contexts
    in
    if List.all ((==) GitHub.StatusStateSuccess) states then
        Octicons.check { octiconOpts | color = Colors.green }

    else if List.member GitHub.StatusStateFailure states then
        Octicons.x { octiconOpts | color = Colors.red }

    else if List.member GitHub.StatusStateError states then
        Octicons.alert { octiconOpts | color = Colors.orange }

    else if List.member GitHub.StatusStatePending states then
        Octicons.primitiveDot { octiconOpts | color = Colors.yellow }

    else
        Octicons.question { octiconOpts | color = Colors.purple }


prIcons : Model -> Card -> List (Html Msg)
prIcons model card =
    case card.content of
        GitHub.IssueCardContent _ ->
            []

        GitHub.PullRequestCardContent pr ->
            let
                statusCheck =
                    case Maybe.map .status pr.lastCommit of
                        Just (Just { contexts }) ->
                            Html.span [ HA.class "status-icon" ]
                                [ summarizeContexts contexts
                                ]

                        _ ->
                            Html.text ""

                reviews =
                    Maybe.withDefault [] <| Dict.get card.id model.prReviewers

                reviewStates =
                    List.map
                        (\r ->
                            let
                                reviewClass =
                                    case r.state of
                                        GitHub.PullRequestReviewStatePending ->
                                            "pending"

                                        GitHub.PullRequestReviewStateApproved ->
                                            "success"

                                        GitHub.PullRequestReviewStateChangesRequested ->
                                            "failure"

                                        GitHub.PullRequestReviewStateCommented ->
                                            "commented"

                                        GitHub.PullRequestReviewStateDismissed ->
                                            "dismissed"
                            in
                            Html.img [ HA.class ("status-actor " ++ reviewClass), HA.src r.author.avatar ] []
                        )
                        reviews
            in
            [ Octicons.gitMerge
                { octiconOpts
                    | color =
                        case pr.mergeable of
                            GitHub.MergeableStateMergeable ->
                                Colors.green

                            GitHub.MergeableStateConflicting ->
                                Colors.red

                            GitHub.MergeableStateUnknown ->
                                Colors.yellow
                }
            , statusCheck
            ]
                ++ reviewStates


recentEvents : Model -> Card -> List Backend.CardEvent
recentEvents model card =
    Dict.get card.id model.cardEvents
        |> Maybe.withDefault []
        |> List.take 3
        |> List.reverse


viewSuggestedLabel : Model -> Card -> String -> Html Msg
viewSuggestedLabel model card name =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)

        mlabel =
            mlabelId
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)

        has =
            case mlabelId of
                Just id ->
                    List.member id card.labels

                Nothing ->
                    False
    in
    case mlabel of
        Nothing ->
            Html.text ""

        Just { color } ->
            Html.span
                ([ HA.class "label suggested"
                 , HE.onClick <|
                    if has then
                        UnlabelCard card name

                    else
                        LabelCard card name
                 ]
                    ++ Label.colorStyles model color
                )
                [ if has then
                    Octicons.dash { octiconOpts | color = Colors.white }

                  else
                    Octicons.plus { octiconOpts | color = Colors.white }
                , Html.span [ HA.class "label-text" ]
                    [ Html.text name ]
                ]


viewEventActor : Model -> Backend.CardEvent -> Html Msg
viewEventActor model { createdAt, avatar } =
    Html.img
        [ HA.class ("card-actor " ++ Activity.class model.currentTime createdAt)
        , HA.src <|
            if String.contains "?" avatar then
                avatar ++ "&s=88"

            else
                avatar ++ "?s=88"
        , HA.draggable "false"
        ]
        []


searchableLabel : Model -> GitHub.ID -> Html Msg
searchableLabel model labelId =
    case Dict.get labelId model.allLabels of
        Just label ->
            Html.span [ HE.onClick (Label.search model label.name) ]
                [ Label.view model label
                ]

        Nothing ->
            Html.text ""


octiconOpts =
    Octicons.defaultOptions