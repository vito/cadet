-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.ProjectTemplate exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| GitHub-provided templates for Projects

  - BasicKanban - Create a board with columns for To do, In progress and Done.
  - AutomatedKanbanV2 - Create a board with v2 triggers to automatically move cards across To do, In progress and Done columns.
  - AutomatedReviewsKanban - Create a board with triggers to automatically move cards across columns with review automation.
  - BugTriage - Create a board to triage and prioritize bugs with To do, priority, and Done columns.

-}
type ProjectTemplate
    = BasicKanban
    | AutomatedKanbanV2
    | AutomatedReviewsKanban
    | BugTriage


list : List ProjectTemplate
list =
    [ BasicKanban, AutomatedKanbanV2, AutomatedReviewsKanban, BugTriage ]


decoder : Decoder ProjectTemplate
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "BASIC_KANBAN" ->
                        Decode.succeed BasicKanban

                    "AUTOMATED_KANBAN_V2" ->
                        Decode.succeed AutomatedKanbanV2

                    "AUTOMATED_REVIEWS_KANBAN" ->
                        Decode.succeed AutomatedReviewsKanban

                    "BUG_TRIAGE" ->
                        Decode.succeed BugTriage

                    _ ->
                        Decode.fail ("Invalid ProjectTemplate type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representating the Enum to a string that the GraphQL server will recognize.
-}
toString : ProjectTemplate -> String
toString enum =
    case enum of
        BasicKanban ->
            "BASIC_KANBAN"

        AutomatedKanbanV2 ->
            "AUTOMATED_KANBAN_V2"

        AutomatedReviewsKanban ->
            "AUTOMATED_REVIEWS_KANBAN"

        BugTriage ->
            "BUG_TRIAGE"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe ProjectTemplate
fromString enumString =
    case enumString of
        "BASIC_KANBAN" ->
            Just BasicKanban

        "AUTOMATED_KANBAN_V2" ->
            Just AutomatedKanbanV2

        "AUTOMATED_REVIEWS_KANBAN" ->
            Just AutomatedReviewsKanban

        "BUG_TRIAGE" ->
            Just BugTriage

        _ ->
            Nothing
