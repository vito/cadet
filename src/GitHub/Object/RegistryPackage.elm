-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.RegistryPackage exposing (..)

import GitHub.Enum.RegistryPackageType
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


{-| The package type color
-}
color : SelectionSet String GitHub.Object.RegistryPackage
color =
    Object.selectionForField "String" "color" [] Decode.string


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.RegistryPackage
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Find the latest version for the package.
-}
latestVersion : SelectionSet decodesTo GitHub.Object.RegistryPackageVersion -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
latestVersion object_ =
    Object.selectionForCompositeField "latestVersion" [] object_ (identity >> Decode.nullable)


{-| Identifies the title of the package.
-}
name : SelectionSet String GitHub.Object.RegistryPackage
name =
    Object.selectionForField "String" "name" [] Decode.string


{-| Identifies the title of the package, with the owner prefixed.
-}
nameWithOwner : SelectionSet String GitHub.Object.RegistryPackage
nameWithOwner =
    Object.selectionForField "String" "nameWithOwner" [] Decode.string


type alias PackageFileByGuidRequiredArguments =
    { guid : String }


{-| Find the package file identified by the guid.

  - guid - The unique identifier of the package\_file

-}
packageFileByGuid : PackageFileByGuidRequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageFile -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
packageFileByGuid requiredArgs object_ =
    Object.selectionForCompositeField "packageFileByGuid" [ Argument.required "guid" requiredArgs.guid Encode.string ] object_ (identity >> Decode.nullable)


type alias PackageFileBySha256RequiredArguments =
    { sha256 : String }


{-| Find the package file identified by the sha256.

  - sha256 - The SHA256 of the package\_file

-}
packageFileBySha256 : PackageFileBySha256RequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageFile -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
packageFileBySha256 requiredArgs object_ =
    Object.selectionForCompositeField "packageFileBySha256" [ Argument.required "sha256" requiredArgs.sha256 Encode.string ] object_ (identity >> Decode.nullable)


{-| Identifies the type of the package.
-}
packageType : SelectionSet GitHub.Enum.RegistryPackageType.RegistryPackageType GitHub.Object.RegistryPackage
packageType =
    Object.selectionForField "Enum.RegistryPackageType.RegistryPackageType" "packageType" [] GitHub.Enum.RegistryPackageType.decoder


type alias PreReleaseVersionsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| List the prerelease versions for this package.

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
preReleaseVersions : (PreReleaseVersionsOptionalArguments -> PreReleaseVersionsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersionConnection -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
preReleaseVersions fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "preReleaseVersions" optionalArgs object_ (identity >> Decode.nullable)


{-| The type of the package.
-}
registryPackageType : SelectionSet (Maybe String) GitHub.Object.RegistryPackage
registryPackageType =
    Object.selectionForField "(Maybe String)" "registryPackageType" [] (Decode.string |> Decode.nullable)


{-| repository that the release is associated with
-}
repository : SelectionSet decodesTo GitHub.Object.Repository -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
repository object_ =
    Object.selectionForCompositeField "repository" [] object_ (identity >> Decode.nullable)


{-| Statistics about package activity.
-}
statistics : SelectionSet decodesTo GitHub.Object.RegistryPackageStatistics -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
statistics object_ =
    Object.selectionForCompositeField "statistics" [] object_ (identity >> Decode.nullable)


type alias TagsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| list of tags for this package

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
tags : (TagsOptionalArguments -> TagsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.RegistryPackageTagConnection -> SelectionSet decodesTo GitHub.Object.RegistryPackage
tags fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "tags" optionalArgs object_ identity


type alias TopicsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| List the topics for this package.

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
topics : (TopicsOptionalArguments -> TopicsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.TopicConnection -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
topics fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "topics" optionalArgs object_ (identity >> Decode.nullable)


type alias VersionRequiredArguments =
    { version : String }


{-| Find package version by version string.

  - version - The package version.

-}
version : VersionRequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersion -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
version requiredArgs object_ =
    Object.selectionForCompositeField "version" [ Argument.required "version" requiredArgs.version Encode.string ] object_ (identity >> Decode.nullable)


type alias VersionByPlatformRequiredArguments =
    { version : String
    , platform : String
    }


{-| Find package version by version string.

  - version - The package version.
  - platform - Find a registry package for a specific platform.

-}
versionByPlatform : VersionByPlatformRequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersion -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
versionByPlatform requiredArgs object_ =
    Object.selectionForCompositeField "versionByPlatform" [ Argument.required "version" requiredArgs.version Encode.string, Argument.required "platform" requiredArgs.platform Encode.string ] object_ (identity >> Decode.nullable)


type alias VersionBySha256RequiredArguments =
    { sha256 : String }


{-| Find package version by manifest SHA256.

  - sha256 - The package SHA256 digest.

-}
versionBySha256 : VersionBySha256RequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersion -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
versionBySha256 requiredArgs object_ =
    Object.selectionForCompositeField "versionBySha256" [ Argument.required "sha256" requiredArgs.sha256 Encode.string ] object_ (identity >> Decode.nullable)


type alias VersionsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| list of versions for this package

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
versions : (VersionsOptionalArguments -> VersionsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersionConnection -> SelectionSet decodesTo GitHub.Object.RegistryPackage
versions fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "versions" optionalArgs object_ identity


type alias VersionsByMetadatumOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


type alias VersionsByMetadatumRequiredArguments =
    { metadatum : GitHub.InputObject.RegistryPackageMetadatum }


{-| List package versions with a specific metadatum.

  - metadatum - Filter on a specific metadatum.
  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
versionsByMetadatum : (VersionsByMetadatumOptionalArguments -> VersionsByMetadatumOptionalArguments) -> VersionsByMetadatumRequiredArguments -> SelectionSet decodesTo GitHub.Object.RegistryPackageVersionConnection -> SelectionSet (Maybe decodesTo) GitHub.Object.RegistryPackage
versionsByMetadatum fillInOptionals requiredArgs object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "versionsByMetadatum" (optionalArgs ++ [ Argument.required "metadatum" requiredArgs.metadatum GitHub.InputObject.encodeRegistryPackageMetadatum ]) object_ (identity >> Decode.nullable)
