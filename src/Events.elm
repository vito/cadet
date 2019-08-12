module Events exposing (onClickNoBubble, onCtrlEnter)

import Html
import Html.Events as HE
import Json.Decode as JD
import Keyboard.Event
import Keyboard.Key


onClickNoBubble : msg -> Html.Attribute msg
onClickNoBubble msg =
    HE.custom "click" <|
        JD.succeed
            { message = msg
            , stopPropagation = True
            , preventDefault = True
            }


onCtrlEnter : msg -> Html.Attribute msg
onCtrlEnter msg =
    HE.on "keydown"
        << Keyboard.Event.considerKeyboardEvent
    <|
        \event ->
            if (event.ctrlKey || event.metaKey) && event.keyCode == Keyboard.Key.Enter then
                Just msg

            else
                Nothing
