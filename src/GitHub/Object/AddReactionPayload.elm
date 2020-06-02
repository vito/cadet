-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.AddReactionPayload exposing (..)

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
clientMutationId : SelectionSet (Maybe String) GitHub.Object.AddReactionPayload
clientMutationId =
    Object.selectionForField "(Maybe String)" "clientMutationId" [] (Decode.string |> Decode.nullable)


{-| The reaction object.
-}
reaction :
    SelectionSet decodesTo GitHub.Object.Reaction
    -> SelectionSet (Maybe decodesTo) GitHub.Object.AddReactionPayload
reaction object_ =
    Object.selectionForCompositeField "reaction" [] object_ (identity >> Decode.nullable)


{-| The reactable subject.
-}
subject :
    SelectionSet decodesTo GitHub.Interface.Reactable
    -> SelectionSet (Maybe decodesTo) GitHub.Object.AddReactionPayload
subject object_ =
    Object.selectionForCompositeField "subject" [] object_ (identity >> Decode.nullable)
