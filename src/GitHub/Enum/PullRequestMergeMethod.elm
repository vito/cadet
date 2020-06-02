-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.PullRequestMergeMethod exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| Represents available types of methods to use when merging a pull request.

  - Merge - Add all commits from the head branch to the base branch with a merge commit.
  - Squash - Combine all commits from the head branch into a single commit in the base branch.
  - Rebase - Add all commits from the head branch onto the base branch individually.

-}
type PullRequestMergeMethod
    = Merge
    | Squash
    | Rebase


list : List PullRequestMergeMethod
list =
    [ Merge, Squash, Rebase ]


decoder : Decoder PullRequestMergeMethod
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "MERGE" ->
                        Decode.succeed Merge

                    "SQUASH" ->
                        Decode.succeed Squash

                    "REBASE" ->
                        Decode.succeed Rebase

                    _ ->
                        Decode.fail ("Invalid PullRequestMergeMethod type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representing the Enum to a string that the GraphQL server will recognize.
-}
toString : PullRequestMergeMethod -> String
toString enum =
    case enum of
        Merge ->
            "MERGE"

        Squash ->
            "SQUASH"

        Rebase ->
            "REBASE"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe PullRequestMergeMethod
fromString enumString =
    case enumString of
        "MERGE" ->
            Just Merge

        "SQUASH" ->
            Just Squash

        "REBASE" ->
            Just Rebase

        _ ->
            Nothing
