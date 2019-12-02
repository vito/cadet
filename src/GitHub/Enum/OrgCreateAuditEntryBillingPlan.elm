-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.OrgCreateAuditEntryBillingPlan exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| The billing plans available for organizations.

  - Free - Free Plan
  - Business - Team Plan
  - BusinessPlus - Enterprise Cloud Plan
  - Unlimited - Legacy Unlimited Plan
  - TieredPerSeat - Tiered Per Seat Plan

-}
type OrgCreateAuditEntryBillingPlan
    = Free
    | Business
    | BusinessPlus
    | Unlimited
    | TieredPerSeat


list : List OrgCreateAuditEntryBillingPlan
list =
    [ Free, Business, BusinessPlus, Unlimited, TieredPerSeat ]


decoder : Decoder OrgCreateAuditEntryBillingPlan
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "FREE" ->
                        Decode.succeed Free

                    "BUSINESS" ->
                        Decode.succeed Business

                    "BUSINESS_PLUS" ->
                        Decode.succeed BusinessPlus

                    "UNLIMITED" ->
                        Decode.succeed Unlimited

                    "TIERED_PER_SEAT" ->
                        Decode.succeed TieredPerSeat

                    _ ->
                        Decode.fail ("Invalid OrgCreateAuditEntryBillingPlan type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representating the Enum to a string that the GraphQL server will recognize.
-}
toString : OrgCreateAuditEntryBillingPlan -> String
toString enum =
    case enum of
        Free ->
            "FREE"

        Business ->
            "BUSINESS"

        BusinessPlus ->
            "BUSINESS_PLUS"

        Unlimited ->
            "UNLIMITED"

        TieredPerSeat ->
            "TIERED_PER_SEAT"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe OrgCreateAuditEntryBillingPlan
fromString enumString =
    case enumString of
        "FREE" ->
            Just Free

        "BUSINESS" ->
            Just Business

        "BUSINESS_PLUS" ->
            Just BusinessPlus

        "UNLIMITED" ->
            Just Unlimited

        "TIERED_PER_SEAT" ->
            Just TieredPerSeat

        _ ->
            Nothing
