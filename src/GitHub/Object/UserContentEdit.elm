-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.UserContentEdit exposing (..)

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


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.UserContentEdit
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| Identifies the date and time when the object was deleted.
-}
deletedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.UserContentEdit
deletedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "deletedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| The actor who deleted this content
-}
deletedBy :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.UserContentEdit
deletedBy object_ =
    Object.selectionForCompositeField "deletedBy" [] object_ (identity >> Decode.nullable)


{-| A summary of the changes for this edit
-}
diff : SelectionSet (Maybe String) GitHub.Object.UserContentEdit
diff =
    Object.selectionForField "(Maybe String)" "diff" [] (Decode.string |> Decode.nullable)


{-| When this content was edited
-}
editedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.UserContentEdit
editedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "editedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| The actor who edited this content
-}
editor :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.UserContentEdit
editor object_ =
    Object.selectionForCompositeField "editor" [] object_ (identity >> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.UserContentEdit
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.UserContentEdit
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)
