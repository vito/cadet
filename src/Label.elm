module Label exposing
    ( cacheColorLightness
    , cardHasLabel
    , colorStyles
    , search
    , view
    )

import Card exposing (Card)
import Dict
import GitHub
import Html exposing (Html)
import Html.Attributes as HA
import Log
import Model exposing (Model, Msg(..))
import ParseInt
import Regex exposing (Regex)


view : Model -> GitHub.Label -> Html Msg
view model label =
    Html.span
        (HA.class "label" :: colorStyles model label.color)
        [ Html.span [ HA.class "label-text" ]
            [ Html.text label.name ]
        ]


search : Model -> String -> Msg
search model name =
    SearchCards <|
        if String.isEmpty model.cardSearch then
            "label:" ++ name

        else
            model.cardSearch ++ " label:" ++ name


cardHasLabel : Model -> String -> Card -> Bool
cardHasLabel model name card =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)
    in
    case mlabelId of
        Just id ->
            List.member id card.labels

        Nothing ->
            False




colorStyles : Model -> String -> List (Html.Attribute Msg)
colorStyles model color =
    [ HA.style "background-color" ("#" ++ color)
    , if colorIsLight model color then
        HA.class "light-label"

      else
        HA.class "dark-label"
    ]


colorIsLight : Model -> String -> Bool
colorIsLight model hex =
    case Dict.get hex model.colorLightnessCache of
        Just res ->
            res

        Nothing ->
            Log.debug "color lightness cache miss" hex <|
                computeColorIsLight hex


cacheColorLightness : Model -> Model
cacheColorLightness model =
    { model
        | colorLightnessCache =
            Dict.foldl
                (\_ label -> Dict.update label.color (warmColorLightnessCache label.color))
                model.colorLightnessCache
                model.allLabels
    }


warmColorLightnessCache : String -> Maybe Bool -> Maybe Bool
warmColorLightnessCache color mb =
    case mb of
        Nothing ->
            Just (computeColorIsLight color)

        _ ->
            mb


computeColorIsLight : String -> Bool
computeColorIsLight hex =
    let
        matches =
            List.head <| Regex.find hexRegex hex
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
                    Log.debug "invalid hex" hex <|
                        False

        _ ->
            Log.debug "invalid hex" hex <|
                False


hexRegex : Regex
hexRegex =
    Maybe.withDefault Regex.never <|
        Regex.fromString "([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})"


hexBrightness : Int -> Int
hexBrightness h =
    case compare h (0xFF // 2) of
        LT ->
            -1

        EQ ->
            0

        GT ->
            1
