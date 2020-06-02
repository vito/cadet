-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.TreeEntry exposing (..)

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


{-| Entry file mode.
-}
mode : SelectionSet Int GitHub.Object.TreeEntry
mode =
    Object.selectionForField "Int" "mode" [] Decode.int


{-| Entry file name.
-}
name : SelectionSet String GitHub.Object.TreeEntry
name =
    Object.selectionForField "String" "name" [] Decode.string


{-| Entry file object.
-}
object :
    SelectionSet decodesTo GitHub.Interface.GitObject
    -> SelectionSet (Maybe decodesTo) GitHub.Object.TreeEntry
object object_ =
    Object.selectionForCompositeField "object" [] object_ (identity >> Decode.nullable)


{-| Entry file Git object ID.
-}
oid : SelectionSet GitHub.ScalarCodecs.GitObjectID GitHub.Object.TreeEntry
oid =
    Object.selectionForField "ScalarCodecs.GitObjectID" "oid" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecGitObjectID |> .decoder)


{-| The Repository the tree entry belongs to
-}
repository :
    SelectionSet decodesTo GitHub.Object.Repository
    -> SelectionSet decodesTo GitHub.Object.TreeEntry
repository object_ =
    Object.selectionForCompositeField "repository" [] object_ identity


{-| If the TreeEntry is for a directory occupied by a submodule project, this returns the corresponding submodule
-}
submodule :
    SelectionSet decodesTo GitHub.Object.Submodule
    -> SelectionSet (Maybe decodesTo) GitHub.Object.TreeEntry
submodule object_ =
    Object.selectionForCompositeField "submodule" [] object_ (identity >> Decode.nullable)


{-| Entry file type.
-}
type_ : SelectionSet String GitHub.Object.TreeEntry
type_ =
    Object.selectionForField "String" "type" [] Decode.string
