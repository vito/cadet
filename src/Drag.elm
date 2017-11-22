module Drag exposing (..)

import DOM
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))


type alias StartState msg =
    { elementBounds : DOM.Rectangle
    , element : Html msg
    }


type alias DragState source target msg =
    { source : source
    , start : StartState msg
    , neverLeft : Bool
    , dropCandidate : Maybe (DropCandidate source target msg)
    }


type alias DropCandidate source target msg =
    { target : target, msgFunc : source -> target -> msg }


type alias DropState source target msg =
    { source : source
    , target : target
    , msg : msg
    , start : StartState msg
    , landed : Bool
    }


type Msg source target msg
    = Start source (StartState msg)
    | Over (Maybe (DropCandidate source target msg))
    | End


type Model source target msg
    = NotDragging
    | Dragging (DragState source target msg)
    | Dropped (DropState source target msg)


onDrop : DropCandidate source target dropMsg -> (Msg source target dropMsg -> msg) -> List (Html.Attribute msg)
onDrop candidate f =
    [ HE.on "dragenter" (JD.succeed <| f (Over (Just candidate)))
    , HE.on "dragleave" (JD.succeed <| f (Over Nothing))
    , HE.onWithOptions "dragover"
        { stopPropagation = False
        , preventDefault = True
        }
        (JD.succeed <| f (Over (Just candidate)))
    , HE.onWithOptions "drop"
        { stopPropagation = True
        , preventDefault = False
        }
        (JD.succeed (f End))
    ]


init : Model source target msg
init =
    NotDragging


update : Msg source target msg -> Model source target msg -> Model source target msg
update msg model =
    case model of
        NotDragging ->
            case msg of
                Start source startState ->
                    Dragging
                        { source = source
                        , start = startState
                        , neverLeft = True
                        , dropCandidate = Nothing
                        }

                _ ->
                    NotDragging

        Dragging drag ->
            case msg of
                Start _ _ ->
                    -- don't allow concurrent drags
                    model

                Over candidate ->
                    Dragging { drag | dropCandidate = candidate, neverLeft = False }

                End ->
                    case drag.dropCandidate of
                        Nothing ->
                            NotDragging

                        Just { target, msgFunc } ->
                            Dropped
                                { source = drag.source
                                , target = target
                                , msg = msgFunc drag.source target
                                , start = drag.start
                                , landed = False
                                }

        Dropped _ ->
            model


viewDropArea : Model source target msg -> (Msg source target msg -> msg) -> DropCandidate source target msg -> Maybe source -> Html msg
viewDropArea model wrap candidate ownSource =
    let
        isActive =
            case model of
                Dragging _ ->
                    True

                _ ->
                    False

        dragEvents =
            if isActive then
                onDrop candidate wrap
            else
                []

        isOver =
            case model of
                NotDragging ->
                    False

                Dropped { target, landed } ->
                    target == candidate.target && not landed

                Dragging state ->
                    case state.dropCandidate of
                        Just { target } ->
                            target == candidate.target

                        _ ->
                            state.neverLeft && Just state.source == ownSource

        droppedElement =
            case model of
                Dropped { start } ->
                    if isOver then
                        start.element
                    else
                        Html.text ""

                _ ->
                    Html.text ""
    in
        Html.div
            ([ HA.classList
                [ ( "drop-area", True )
                , ( "active", isActive )
                , ( "never-left", hasNeverLeft model )
                , ( "over", isOver )
                ]
             , HA.style <|
                case model of
                    NotDragging ->
                        []

                    Dragging { start } ->
                        if isOver then
                            -- drop-area height + card-margin
                            [ ( "min-height", toString (start.elementBounds.height) ++ "px" ) ]
                        else
                            []

                    Dropped { start } ->
                        if isOver then
                            -- drop-area height + 2 * card-margin
                            [ ( "min-height", toString (start.elementBounds.height) ++ "px" ) ]
                        else
                            []
             ]
                ++ dragEvents
            )
            [ droppedElement ]


draggable : Model source target msg -> (Msg source target msg -> msg) -> source -> Html msg -> Html msg
draggable model wrap source view =
    Html.div
        [ HA.classList
            [ ( "draggable", True )
            , ( "dragging", isDragging source model )
            ]
        , HA.draggable "true"
        , HE.on "dragstart" (JD.map (wrap << Start source) (decodeStartState view))
        , HE.on "dragend" (JD.succeed (wrap End))
        ]
        [ view ]


land : Model source target msg -> Model source target msg
land model =
    case model of
        Dropped state ->
            Dropped { state | landed = True }

        _ ->
            model


complete : Model source target msg -> Model source target msg
complete mode =
    NotDragging


isDragging : source -> Model source target msg -> Bool
isDragging source model =
    case model of
        Dragging state ->
            state.source == source

        Dropped state ->
            state.source == source

        _ ->
            False


hasNeverLeft : Model source target msg -> Bool
hasNeverLeft model =
    case model of
        Dragging { neverLeft } ->
            neverLeft

        _ ->
            False


decodeStartState : Html msg -> JD.Decoder (StartState msg)
decodeStartState view =
    JD.succeed StartState
        |: JD.field "currentTarget" DOM.boundingClientRect
        |: JD.succeed view
