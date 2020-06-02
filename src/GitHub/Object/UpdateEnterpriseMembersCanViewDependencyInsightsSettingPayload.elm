-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.UpdateEnterpriseMembersCanViewDependencyInsightsSettingPayload exposing (..)

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


{-| A unique identifier for the client performing the mutation.
-}
clientMutationId : SelectionSet (Maybe String) GitHub.Object.UpdateEnterpriseMembersCanViewDependencyInsightsSettingPayload
clientMutationId =
    Object.selectionForField "(Maybe String)" "clientMutationId" [] (Decode.string |> Decode.nullable)


{-| The enterprise with the updated members can view dependency insights setting.
-}
enterprise :
    SelectionSet decodesTo GitHub.Object.Enterprise
    -> SelectionSet (Maybe decodesTo) GitHub.Object.UpdateEnterpriseMembersCanViewDependencyInsightsSettingPayload
enterprise object_ =
    Object.selectionForCompositeField "enterprise" [] object_ (identity >> Decode.nullable)


{-| A message confirming the result of updating the members can view dependency insights setting.
-}
message : SelectionSet (Maybe String) GitHub.Object.UpdateEnterpriseMembersCanViewDependencyInsightsSettingPayload
message =
    Object.selectionForField "(Maybe String)" "message" [] (Decode.string |> Decode.nullable)
