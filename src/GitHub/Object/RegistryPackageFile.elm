-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.RegistryPackageFile exposing (..)

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


{-| A unique identifier for this file.
-}
guid : SelectionSet (Maybe String) GitHub.Object.RegistryPackageFile
guid =
    Object.selectionForField "(Maybe String)" "guid" [] (Decode.string |> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.RegistryPackageFile
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Identifies the md5.
-}
md5 : SelectionSet (Maybe String) GitHub.Object.RegistryPackageFile
md5 =
    Object.selectionForField "(Maybe String)" "md5" [] (Decode.string |> Decode.nullable)


{-| URL to download the asset metadata.
-}
metadataUrl : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.RegistryPackageFile
metadataUrl =
    Object.selectionForField "ScalarCodecs.Uri" "metadataUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| Name of the file
-}
name : SelectionSet String GitHub.Object.RegistryPackageFile
name =
    Object.selectionForField "String" "name" [] Decode.string


{-| The package version this file belongs to.
-}
packageVersion :
    SelectionSet decodesTo GitHub.Object.RegistryPackageVersion
    -> SelectionSet decodesTo GitHub.Object.RegistryPackageFile
packageVersion object_ =
    Object.selectionForCompositeField "packageVersion" [] object_ identity


{-| Identifies the sha1.
-}
sha1 : SelectionSet (Maybe String) GitHub.Object.RegistryPackageFile
sha1 =
    Object.selectionForField "(Maybe String)" "sha1" [] (Decode.string |> Decode.nullable)


{-| Identifies the sha256.
-}
sha256 : SelectionSet (Maybe String) GitHub.Object.RegistryPackageFile
sha256 =
    Object.selectionForField "(Maybe String)" "sha256" [] (Decode.string |> Decode.nullable)


{-| Identifies the size.
-}
size : SelectionSet (Maybe Int) GitHub.Object.RegistryPackageFile
size =
    Object.selectionForField "(Maybe Int)" "size" [] (Decode.int |> Decode.nullable)


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.RegistryPackageFile
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| URL to download the asset.
-}
url : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.RegistryPackageFile
url =
    Object.selectionForField "ScalarCodecs.Uri" "url" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)
