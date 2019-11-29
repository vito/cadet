module ProgressBar exposing (view)

import Html exposing (Html)
import Html.Attributes as HA
import String


view : List ( String, Int ) -> Html msg
view segments =
    let
        total =
            List.sum (List.map Tuple.second segments)

        width base =
            let
                pct =
                    (toFloat base / toFloat total) * 100
            in
            HA.style "width" (String.fromFloat pct ++ "%")

        segment color val =
            if val == 0 then
                Html.text ""

            else
                Html.div [ HA.class "segment", HA.style "background-color" color, width val ] []
    in
    Html.div [ HA.class "progress-bar" ]
        (List.map (\( c, v ) -> segment c v) segments)
