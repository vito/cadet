-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.EnterpriseMemberOrderField exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| Properties by which enterprise member connections can be ordered.

  - Login - Order enterprise members by login
  - CreatedAt - Order enterprise members by creation time

-}
type EnterpriseMemberOrderField
    = Login
    | CreatedAt


list : List EnterpriseMemberOrderField
list =
    [ Login, CreatedAt ]


decoder : Decoder EnterpriseMemberOrderField
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "LOGIN" ->
                        Decode.succeed Login

                    "CREATED_AT" ->
                        Decode.succeed CreatedAt

                    _ ->
                        Decode.fail ("Invalid EnterpriseMemberOrderField type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representating the Enum to a string that the GraphQL server will recognize.
-}
toString : EnterpriseMemberOrderField -> String
toString enum =
    case enum of
        Login ->
            "LOGIN"

        CreatedAt ->
            "CREATED_AT"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe EnterpriseMemberOrderField
fromString enumString =
    case enumString of
        "LOGIN" ->
            Just Login

        "CREATED_AT" ->
            Just CreatedAt

        _ ->
            Nothing
