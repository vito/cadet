-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.SavedReply exposing (..)

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


{-| The body of the saved reply.
-}
body : SelectionSet String GitHub.Object.SavedReply
body =
    Object.selectionForField "String" "body" [] Decode.string


{-| The saved reply body rendered to HTML.
-}
bodyHTML : SelectionSet GitHub.ScalarCodecs.Html GitHub.Object.SavedReply
bodyHTML =
    Object.selectionForField "ScalarCodecs.Html" "bodyHTML" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecHtml |> .decoder)


{-| Identifies the primary key from the database.
-}
databaseId : SelectionSet (Maybe Int) GitHub.Object.SavedReply
databaseId =
    Object.selectionForField "(Maybe Int)" "databaseId" [] (Decode.int |> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.SavedReply
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| The title of the saved reply.
-}
title : SelectionSet String GitHub.Object.SavedReply
title =
    Object.selectionForField "String" "title" [] Decode.string


{-| The user that saved this reply.
-}
user :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.SavedReply
user object_ =
    Object.selectionForCompositeField "user" [] object_ (identity >> Decode.nullable)
