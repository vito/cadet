-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.PushAllowance exposing (..)

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


{-| The actor that can push.
-}
actor :
    SelectionSet decodesTo GitHub.Union.PushAllowanceActor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.PushAllowance
actor object_ =
    Object.selectionForCompositeField "actor" [] object_ (identity >> Decode.nullable)


{-| Identifies the branch protection rule associated with the allowed user or team.
-}
branchProtectionRule :
    SelectionSet decodesTo GitHub.Object.BranchProtectionRule
    -> SelectionSet (Maybe decodesTo) GitHub.Object.PushAllowance
branchProtectionRule object_ =
    Object.selectionForCompositeField "branchProtectionRule" [] object_ (identity >> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.PushAllowance
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)
