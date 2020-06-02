-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.TeamRepositoryEdge exposing (..)

import GitHub.Enum.RepositoryPermission
import GitHub.InputObject
import GitHub.Interface
import GitHub.Object
import GitHub.Scalar
import GitHub.ScalarCodecs
import GitHub.Union
import Graphql.Internal.Builder.Argument as Argument exposing (Argument)
import Graphql.Internal.Builder.Object as Object
import Graphql.Internal.Encode as Encode exposing (Value)
import Graphql.Operation exposing (RootMutation, RootQuery, RootSubscription)
import Graphql.OptionalArgument exposing (OptionalArgument(..))
import Graphql.SelectionSet exposing (SelectionSet)
import Json.Decode as Decode


{-| A cursor for use in pagination.
-}
cursor : SelectionSet String GitHub.Object.TeamRepositoryEdge
cursor =
    Object.selectionForField "String" "cursor" [] Decode.string


node :
    SelectionSet decodesTo GitHub.Object.Repository
    -> SelectionSet decodesTo GitHub.Object.TeamRepositoryEdge
node object_ =
    Object.selectionForCompositeField "node" [] object_ identity


{-| The permission level the team has on the repository

**Upcoming Change on 2020-10-01 UTC**
**Description:** Type for `permission` will change from `RepositoryPermission!` to `String`.
**Reason:** This field may return additional values

-}
permission : SelectionSet GitHub.Enum.RepositoryPermission.RepositoryPermission GitHub.Object.TeamRepositoryEdge
permission =
    Object.selectionForField "Enum.RepositoryPermission.RepositoryPermission" "permission" [] GitHub.Enum.RepositoryPermission.decoder
