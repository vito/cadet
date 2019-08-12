module CardOperations exposing
    ( anticipatedCards
    , applyLabelOperations
    , clearSelectedCards
    , deselectCard
    , dropCard
    , isAnticipated
    , selectAnticipatedCards
    , selectCard
    , selectedCards
    , view
    )

import Card exposing (Card)
import CardView
import Dict
import Drag
import Effects
import Events
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Label
import Model exposing (Model, Msg(..))
import Octicons
import OrderedSet
import Set


view : Model -> Html Msg
view model =
    if OrderedSet.isEmpty model.selectedCards && Set.isEmpty model.anticipatedCards then
        Html.text ""

    else
        Html.div [ HA.class "main-sidebar" ]
            [ viewControls model
            , Html.div [ HA.class "cards selected" ] <|
                List.map (viewCardEntry model) (selectedCards model)
            , Html.div [ HA.class "cards anticipated" ] <|
                List.map (viewCardEntry model) (anticipatedCards model)
            ]


viewCardEntry : Model -> Card -> Html Msg
viewCardEntry model card =
    let
        anticipated =
            isAnticipated model card

        controls =
            if not anticipated then
                [ Html.span
                    [ Events.onClickNoBubble (DeselectCard card.id)
                    ]
                    [ Octicons.x Octicons.defaultOptions ]
                ]

            else
                []

        cardView =
            CardView.viewCard model controls card

        dragSource =
            Model.NewContentCardSource { contentId = card.id }
    in
    Drag.draggable model.projectDrag ProjectDrag dragSource <|
        cardView


viewControls : Model -> Html Msg
viewControls model =
    let
        viewLabelOperation name color =
            let
                ( checkClass, icon, clickOperation ) =
                    case Dict.get name model.cardLabelOperations of
                        Just Model.AddLabelOperation ->
                            ( "checked", Octicons.check Octicons.defaultOptions, SetLabelOperation name Model.RemoveLabelOperation )

                        Just Model.RemoveLabelOperation ->
                            ( "unhecked", Octicons.plus Octicons.defaultOptions, UnsetLabelOperation name )

                        Nothing ->
                            let
                                cards =
                                    selectedCards model
                            in
                            if not (List.isEmpty cards) && List.all (Label.cardHasLabel model name) cards then
                                ( "checked", Octicons.check Octicons.defaultOptions, SetLabelOperation name Model.RemoveLabelOperation )

                            else if List.any (Label.cardHasLabel model name) cards then
                                ( "mixed", Octicons.dash Octicons.defaultOptions, SetLabelOperation name Model.AddLabelOperation )

                            else
                                ( "unchecked", Octicons.plus Octicons.defaultOptions, SetLabelOperation name Model.AddLabelOperation )
            in
            Html.div [ HA.class "label-operation" ]
                [ Html.span [ HA.class ("checkbox " ++ checkClass), HE.onClick clickOperation ]
                    [ icon ]
                , Html.span
                    ([ HA.class "label"
                     , HE.onClick (AddFilter (Model.HasLabelFilter name color))
                     ]
                        ++ Label.colorStyles model color
                    )
                    [ Html.span [ HA.class "label-text" ]
                        [ Html.text name ]
                    ]
                ]

        labelOptions =
            if model.showLabelOperations then
                Dict.keys model.reposByLabel
                    |> List.filter (String.contains model.labelSearch << Tuple.first)
                    |> List.map (\( a, b ) -> viewLabelOperation a b)

            else
                []
    in
    Html.div [ HA.class "sidebar-controls" ]
        [ Html.div [ HA.class "control-knobs" ]
            [ Html.span [ HA.class "controls-label" ] [ Html.text "change:" ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.showLabelOperations ) ]
                , HE.onClick ToggleLabelOperations
                ]
                [ Octicons.tag Octicons.defaultOptions
                , Html.text "labels"
                ]
            , Html.span
                [ HE.onClick ClearSelectedCards
                , HA.class "clear-selected"
                ]
                [ Octicons.x Octicons.defaultOptions ]
            ]
        , Html.div [ HA.classList [ ( "label-operations", True ), ( "visible", model.showLabelOperations ) ] ]
            [ Html.input [ HA.type_ "text", HA.placeholder "search labels", HE.onInput SetLabelSearch ] []
            , Html.div [ HA.class "label-options" ] labelOptions
            , Html.div [ HA.class "buttons" ]
                [ Html.div [ HA.class "button cancel", HE.onClick ToggleLabelOperations ]
                    [ Octicons.x Octicons.defaultOptions
                    , Html.text "cancel"
                    ]
                , Html.div [ HA.class "button apply", HE.onClick ApplyLabelOperations ]
                    [ Octicons.check Octicons.defaultOptions
                    , Html.text "apply"
                    ]
                ]
            ]
        ]


selectedCards : Model -> List Card
selectedCards model =
    OrderedSet.toList model.selectedCards
        |> List.filterMap (\a -> Dict.get a model.cards)


anticipatedCards : Model -> List Card
anticipatedCards model =
    Set.toList model.anticipatedCards
        |> List.filter (not << (\a -> OrderedSet.member a model.selectedCards))
        |> List.filterMap (\a -> Dict.get a model.cards)


isAnticipated : Model -> Card -> Bool
isAnticipated model card =
    Set.member card.id model.anticipatedCards && not (OrderedSet.member card.id model.selectedCards)


selectCard : GitHub.ID -> Model -> Model
selectCard id model =
    { model | selectedCards = OrderedSet.insert id model.selectedCards }


deselectCard : GitHub.ID -> Model -> Model
deselectCard id model =
    { model | selectedCards = OrderedSet.remove id model.selectedCards }


clearSelectedCards : Model -> Model
clearSelectedCards model =
    { model | selectedCards = OrderedSet.empty }


selectAnticipatedCards : Model -> Model
selectAnticipatedCards model =
    { model
        | anticipatedCards = Set.empty
        , selectedCards = Set.foldl OrderedSet.insert model.selectedCards model.anticipatedCards
    }


applyLabelOperations : Model -> Cmd Msg
applyLabelOperations model =
    let
        cards =
            List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)

        ( addPairs, removePairs ) =
            Dict.toList model.cardLabelOperations
                |> List.partition ((==) Model.AddLabelOperation << Tuple.second)

        labelsToAdd =
            List.map Tuple.first addPairs

        labelsToRemove =
            List.map Tuple.first removePairs

        adds =
            List.map
                (\card ->
                    case card.content of
                        GitHub.IssueCardContent issue ->
                            Effects.addIssueLabels model issue labelsToAdd

                        GitHub.PullRequestCardContent pr ->
                            Effects.addPullRequestLabels model pr labelsToAdd
                )
                cards

        removals =
            List.concatMap
                (\name ->
                    List.filterMap
                        (\card ->
                            if Label.cardHasLabel model name card then
                                case card.content of
                                    GitHub.IssueCardContent issue ->
                                        Just (Effects.removeIssueLabel model issue name)

                                    GitHub.PullRequestCardContent pr ->
                                        Just (Effects.removePullRequestLabel model pr name)

                            else
                                Nothing
                        )
                        cards
                )
                labelsToRemove
    in
    Cmd.batch (adds ++ removals)


dropCard : Model -> GitHub.ID -> GitHub.ProjectColumnCard -> Drag.DropState Model.CardSource Model.CardDestination Msg -> ( Model, Cmd Msg )
dropCard model targetCol card drop =
    let
        colCard =
            { id = card.id
            , isArchived = card.isArchived
            , contentId =
                case card.content of
                    Just (GitHub.IssueCardContent { id }) ->
                        Just id

                    Just (GitHub.PullRequestCardContent { id }) ->
                        Just id

                    Nothing ->
                        Nothing
            , note = card.note
            }

        removeCard =
            List.filter ((/=) card.id << .id)

        removeCardFromOldColumn =
            case drop.source of
                Model.FromColumnCardSource cs ->
                    Dict.update cs.columnId (Maybe.map removeCard)

                Model.NewContentCardSource _ ->
                    identity

        insertAfter id new cards =
            case cards of
                c :: rest ->
                    if c.id == id then
                        c :: new :: rest

                    else
                        c :: insertAfter id new rest

                [] ->
                    -- this shouldn't really happen
                    [ new ]

        insertCard cards =
            case drop.target.afterId of
                Nothing ->
                    colCard :: cards

                Just cardId ->
                    insertAfter cardId colCard cards

        addCardToNewColumn =
            Dict.update targetCol (Maybe.map insertCard)

        movedOptimistically =
            { model | columnCards = addCardToNewColumn (removeCardFromOldColumn model.columnCards) }
    in
    ( { movedOptimistically | projectDrag = Drag.complete model.projectDrag }
    , Cmd.batch
        [ Effects.refreshColumnCards targetCol
        , case card.content of
            Just (GitHub.IssueCardContent issue) ->
                Effects.refreshIssue issue.id

            Just (GitHub.PullRequestCardContent pr) ->
                Effects.refreshPR pr.id

            Nothing ->
                Cmd.none
        , case drop.source of
            Model.FromColumnCardSource cs ->
                if cs.columnId == targetCol then
                    Cmd.none

                else
                    Effects.refreshColumnCards cs.columnId

            Model.NewContentCardSource _ ->
                Cmd.none
        ]
    )
