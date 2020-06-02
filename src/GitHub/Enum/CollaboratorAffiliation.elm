-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.CollaboratorAffiliation exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| Collaborators affiliation level with a subject.

  - Outside - All outside collaborators of an organization-owned subject.
  - Direct - All collaborators with permissions to an organization-owned subject, regardless of organization membership status.
  - All - All collaborators the authenticated user can see.

-}
type CollaboratorAffiliation
    = Outside
    | Direct
    | All


list : List CollaboratorAffiliation
list =
    [ Outside, Direct, All ]


decoder : Decoder CollaboratorAffiliation
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "OUTSIDE" ->
                        Decode.succeed Outside

                    "DIRECT" ->
                        Decode.succeed Direct

                    "ALL" ->
                        Decode.succeed All

                    _ ->
                        Decode.fail ("Invalid CollaboratorAffiliation type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representing the Enum to a string that the GraphQL server will recognize.
-}
toString : CollaboratorAffiliation -> String
toString enum =
    case enum of
        Outside ->
            "OUTSIDE"

        Direct ->
            "DIRECT"

        All ->
            "ALL"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe CollaboratorAffiliation
fromString enumString =
    case enumString of
        "OUTSIDE" ->
            Just Outside

        "DIRECT" ->
            Just Direct

        "ALL" ->
            Just All

        _ ->
            Nothing
