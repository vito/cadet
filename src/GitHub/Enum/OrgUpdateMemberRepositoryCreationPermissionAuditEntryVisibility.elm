-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Enum.OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility exposing (..)

import Json.Decode as Decode exposing (Decoder)


{-| The permissions available for repository creation on an Organization.

  - All - All organization members are restricted from creating any repositories.
  - Public - All organization members are restricted from creating public repositories.

-}
type OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility
    = All
    | Public


list : List OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility
list =
    [ All, Public ]


decoder : Decoder OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility
decoder =
    Decode.string
        |> Decode.andThen
            (\string ->
                case string of
                    "ALL" ->
                        Decode.succeed All

                    "PUBLIC" ->
                        Decode.succeed Public

                    _ ->
                        Decode.fail ("Invalid OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility type, " ++ string ++ " try re-running the @dillonkearns/elm-graphql CLI ")
            )


{-| Convert from the union type representating the Enum to a string that the GraphQL server will recognize.
-}
toString : OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility -> String
toString enum =
    case enum of
        All ->
            "ALL"

        Public ->
            "PUBLIC"


{-| Convert from a String representation to an elm representation enum.
This is the inverse of the Enum `toString` function. So you can call `toString` and then convert back `fromString` safely.

    Swapi.Enum.Episode.NewHope
        |> Swapi.Enum.Episode.toString
        |> Swapi.Enum.Episode.fromString
        == Just NewHope

This can be useful for generating Strings to use for <select> menus to check which item was selected.

-}
fromString : String -> Maybe OrgUpdateMemberRepositoryCreationPermissionAuditEntryVisibility
fromString enumString =
    case enumString of
        "ALL" ->
            Just All

        "PUBLIC" ->
            Just Public

        _ ->
            Nothing
