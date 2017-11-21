module Drag exposing (..)

import DOM
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Json.Decode.Extra as JDE exposing ((|:))
import Mouse
import StrictEvents


type alias StartState =
    { mousePosition : Position
    , elementBounds : DOM.Rectangle
    , elementPosition : Position
    }


type alias Position =
    { x : Float
    , y : Float
    }


type alias DragState source target msg =
    { source : source
    , overlay : Maybe (Html msg)
    , start : StartState
    , mousePosition : Position
    , purposeful : Bool
    , neverLeft : Bool
    , dropCandidate : Maybe (DropCandidate source target msg)
    }


type alias DropCandidate source target msg =
    { target : target, msgFunc : source -> target -> msg }


type alias DropState source target msg =
    { source : source
    , target : target
    , msg : msg
    , start : StartState
    , mousePosition : Position
    , overlay : Maybe (Html msg)
    , landed : Bool
    }


type Msg source target msg
    = Start source (Maybe (Html msg)) StartState
    | At Position
    | Over (Maybe (DropCandidate source target msg))
    | End


type Model source target msg
    = NotDragging
    | Dragging (DragState source target msg)
    | Dropped (DropState source target msg)


onStart : source -> Maybe (Html msg) -> (Msg source target msg -> msg) -> Html.Attribute msg
onStart source overlay f =
    StrictEvents.onLeftMouseDownCapturing decodeStartState (f << Start source overlay)


onDrop : DropCandidate source target dropMsg -> (Msg source target dropMsg -> msg) -> List (Html.Attribute msg)
onDrop candidate f =
    [ HE.onMouseOver (f (Over (Just candidate)))
    , HE.onMouseLeave (f (Over Nothing))
    ]


init : Model source target msg
init =
    NotDragging


subscriptions : Model source target msg -> Sub (Msg source target msg)
subscriptions model =
    case model of
        Dragging _ ->
            Sub.batch [ Mouse.moves (At << floatPos), Mouse.ups (always End) ]

        _ ->
            Sub.none


update : Msg source target msg -> Model source target msg -> Model source target msg
update msg model =
    case model of
        NotDragging ->
            case msg of
                Start source overlay startState ->
                    Dragging
                        { source = source
                        , overlay = overlay
                        , start = startState
                        , mousePosition = startState.mousePosition
                        , purposeful = False
                        , neverLeft = True
                        , dropCandidate = Nothing
                        }

                _ ->
                    NotDragging

        Dragging drag ->
            case msg of
                Start _ _ _ ->
                    -- don't allow concurrent drags
                    model

                At pos ->
                    let
                        purposeful =
                            abs (pos.x - drag.start.mousePosition.x)
                                > purposefulDragTreshold
                                || abs (pos.y - drag.start.mousePosition.y)
                                > purposefulDragTreshold
                    in
                        Dragging
                            { drag
                                | mousePosition = pos
                                , purposeful = drag.purposeful || purposeful
                            }

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
                                , overlay = drag.overlay
                                , start = drag.start
                                , mousePosition = drag.mousePosition
                                , landed = False
                                }

        Dropped _ ->
            model


viewOverlay : Model source target msg -> Html msg
viewOverlay model =
    case model of
        Dragging { purposeful, overlay, start, mousePosition } ->
            case ( purposeful, overlay ) of
                ( True, Just o ) ->
                    Html.div
                        [ HA.class "drag-overlay"
                        , HA.style
                            [ ( "position", "absolute" )
                            , ( "top", toString (mousePosition.y - (start.elementBounds.height / 2)) ++ "px" )
                            , ( "left", toString (mousePosition.x - (start.elementBounds.width / 2)) ++ "px" )
                            ]
                        ]
                        [ o ]

                _ ->
                    Html.text ""

        Dropped { overlay, start, mousePosition } ->
            Html.text ""

        NotDragging ->
            Html.text ""


viewDropArea : Model source target msg -> (Msg source target msg -> msg) -> DropCandidate source target msg -> Maybe source -> Html msg
viewDropArea model wrap candidate ownSource =
    let
        isActive =
            isPurposeful model

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
                            state.neverLeft && state.purposeful && Just state.source == ownSource
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
                            -- drop-area height + 2 * card-margin
                            [ ( "height", toString (60 + (2 * 8) + start.elementBounds.height) ++ "px" ) ]
                        else
                            []

                    Dropped { start } ->
                        if isOver then
                            -- drop-area height + 2 * card-margin
                            [ ( "height", toString (60 + (2 * 8) + start.elementBounds.height) ++ "px" ) ]
                        else
                            []
             ]
                ++ dragEvents
            )
            []


draggable : Model source target msg -> (Msg source target msg -> msg) -> source -> Maybe (Html msg) -> Html msg -> Html msg
draggable model wrap source overlay view =
    Html.div
        [ HA.classList
            [ ( "draggable", True )
            , ( "dragging", isDragging source model )
            ]
        , onStart source overlay wrap
        , nonOverlayStyle source model
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


nonOverlayStyle : source -> Model source target msg -> Html.Attribute msg
nonOverlayStyle source model =
    HA.style <|
        case model of
            NotDragging ->
                []

            Dragging state ->
                if state.source == source && state.purposeful && state.overlay == Nothing then
                    [ ( "position", "absolute" )
                    , ( "top", toString (state.start.elementPosition.y + state.mousePosition.y - state.start.mousePosition.y) ++ "px" )
                    , ( "left", toString (state.start.elementPosition.x + state.mousePosition.x - state.start.mousePosition.x) ++ "px" )
                    ]
                else
                    []

            Dropped state ->
                if state.source == source && state.overlay == Nothing then
                    [ ( "position", "absolute" )
                    , ( "top", toString (state.start.elementPosition.y + state.mousePosition.y - state.start.mousePosition.y) ++ "px" )
                    , ( "left", toString (state.start.elementPosition.x + state.mousePosition.x - state.start.mousePosition.x) ++ "px" )
                    ]
                else
                    []


isPurposeful : Model source target msg -> Bool
isPurposeful model =
    case model of
        Dragging { purposeful } ->
            purposeful

        _ ->
            False


hasNeverLeft : Model source target msg -> Bool
hasNeverLeft model =
    case model of
        Dragging { neverLeft } ->
            neverLeft

        _ ->
            False


purposefulDragTreshold : Float
purposefulDragTreshold =
    10


decodeStartState : JD.Decoder StartState
decodeStartState =
    JD.succeed StartState
        |: JD.map floatPos Mouse.position
        |: JD.field "currentTarget" DOM.boundingClientRect
        |: JD.field "currentTarget" (JD.map2 Position DOM.offsetLeft DOM.offsetTop)


floatPos : Mouse.Position -> Position
floatPos { x, y } =
    Position (toFloat x) (toFloat y)
