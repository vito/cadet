-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.EnterpriseServerUserAccountEmailOrderField exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| Properties by which Enterprise Server user account email connections can be ordered.

  - Email - Order emails by email

-}
type EnterpriseServerUserAccountEmailOrderField
    = Email


list : List EnterpriseServerUserAccountEmailOrderField
list =
    [ Email ]


decoder : Decoder EnterpriseServerUserAccountEmailOrderField
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "EMAIL" ->
                        Decode.succeed Email

                    _ ->
                        Decode.fail ("Invalid EnterpriseServerUserAccountEmailOrderField type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representating the Enum to a string that the GraphQL server will recognize.
-}
toString : EnterpriseServerUserAccountEmailOrderField -> String
toString enum =
    case enum of
        Email ->
            "EMAIL"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe EnterpriseServerUserAccountEmailOrderField
fromString enumString =
    case enumString of
        "EMAIL" ->
            Just Email

        _ ->
            Nothing
