-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.MergedEvent exposing (..)

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


{-| Identifies the actor who performed the event.
-}
actor : SelectionSet decodesTo GitHub.Interface.Actor -> SelectionSet (Maybe decodesTo) GitHub.Object.MergedEvent
actor object_ =
    Object.selectionForCompositeField "actor" [] object_ (identity >> Decode.nullable)


{-| Identifies the commit associated with the `merge` event.
-}
commit : SelectionSet decodesTo GitHub.Object.Commit -> SelectionSet (Maybe decodesTo) GitHub.Object.MergedEvent
commit object_ =
    Object.selectionForCompositeField "commit" [] object_ (identity >> Decode.nullable)


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.MergedEvent
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.MergedEvent
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Identifies the Ref associated with the `merge` event.
-}
mergeRef : SelectionSet decodesTo GitHub.Object.Ref -> SelectionSet (Maybe decodesTo) GitHub.Object.MergedEvent
mergeRef object_ =
    Object.selectionForCompositeField "mergeRef" [] object_ (identity >> Decode.nullable)


{-| Identifies the name of the Ref associated with the `merge` event.
-}
mergeRefName : SelectionSet String GitHub.Object.MergedEvent
mergeRefName =
    Object.selectionForField "String" "mergeRefName" [] Decode.string


{-| PullRequest referenced by event.
-}
pullRequest : SelectionSet decodesTo GitHub.Object.PullRequest -> SelectionSet decodesTo GitHub.Object.MergedEvent
pullRequest object_ =
    Object.selectionForCompositeField "pullRequest" [] object_ identity


{-| The HTTP path for this merged event.
-}
resourcePath : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.MergedEvent
resourcePath =
    Object.selectionForField "ScalarCodecs.Uri" "resourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| The HTTP URL for this merged event.
-}
url : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.MergedEvent
url =
    Object.selectionForField "ScalarCodecs.Uri" "url" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)
