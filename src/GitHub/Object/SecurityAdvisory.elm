-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.SecurityAdvisory exposing (..)

import GitHub.Enum.SecurityAdvisoryEcosystem
import GitHub.Enum.SecurityAdvisorySeverity
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


{-| Identifies the primary key from the database.
-}
databaseId : SelectionSet (Maybe Int) GitHub.Object.SecurityAdvisory
databaseId =
    Object.selectionForField "(Maybe Int)" "databaseId" [] (Decode.int |> Decode.nullable)


{-| This is a long plaintext description of the advisory
-}
description : SelectionSet String GitHub.Object.SecurityAdvisory
description =
    Object.selectionForField "String" "description" [] Decode.string


{-| The GitHub Security Advisory ID
-}
ghsaId : SelectionSet String GitHub.Object.SecurityAdvisory
ghsaId =
    Object.selectionForField "String" "ghsaId" [] Decode.string


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.SecurityAdvisory
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| A list of identifiers for this advisory
-}
identifiers :
    SelectionSet decodesTo GitHub.Object.SecurityAdvisoryIdentifier
    -> SelectionSet (List decodesTo) GitHub.Object.SecurityAdvisory
identifiers object_ =
    Object.selectionForCompositeField "identifiers" [] object_ (identity >> Decode.list)


{-| The organization that originated the advisory
-}
origin : SelectionSet String GitHub.Object.SecurityAdvisory
origin =
    Object.selectionForField "String" "origin" [] Decode.string


{-| The permalink for the advisory
-}
permalink : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.SecurityAdvisory
permalink =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "permalink" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| When the advisory was published
-}
publishedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.SecurityAdvisory
publishedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "publishedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| A list of references for this advisory
-}
references :
    SelectionSet decodesTo GitHub.Object.SecurityAdvisoryReference
    -> SelectionSet (List decodesTo) GitHub.Object.SecurityAdvisory
references object_ =
    Object.selectionForCompositeField "references" [] object_ (identity >> Decode.list)


{-| The severity of the advisory
-}
severity : SelectionSet GitHub.Enum.SecurityAdvisorySeverity.SecurityAdvisorySeverity GitHub.Object.SecurityAdvisory
severity =
    Object.selectionForField "Enum.SecurityAdvisorySeverity.SecurityAdvisorySeverity" "severity" [] GitHub.Enum.SecurityAdvisorySeverity.decoder


{-| A short plaintext summary of the advisory
-}
summary : SelectionSet String GitHub.Object.SecurityAdvisory
summary =
    Object.selectionForField "String" "summary" [] Decode.string


{-| When the advisory was last updated
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.SecurityAdvisory
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


type alias VulnerabilitiesOptionalArguments =
    { orderBy : OptionalArgument GitHub.InputObject.SecurityVulnerabilityOrder
    , ecosystem : OptionalArgument GitHub.Enum.SecurityAdvisoryEcosystem.SecurityAdvisoryEcosystem
    , package : OptionalArgument String
    , severities : OptionalArgument (List GitHub.Enum.SecurityAdvisorySeverity.SecurityAdvisorySeverity)
    , after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| Vulnerabilities associated with this Advisory

  - orderBy - Ordering options for the returned topics.
  - ecosystem - An ecosystem to filter vulnerabilities by.
  - package - A package name to filter vulnerabilities by.
  - severities - A list of severities to filter vulnerabilities by.
  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
vulnerabilities :
    (VulnerabilitiesOptionalArguments -> VulnerabilitiesOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.SecurityVulnerabilityConnection
    -> SelectionSet decodesTo GitHub.Object.SecurityAdvisory
vulnerabilities fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { orderBy = Absent, ecosystem = Absent, package = Absent, severities = Absent, after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeSecurityVulnerabilityOrder, Argument.optional "ecosystem" filledInOptionals.ecosystem (Encode.enum GitHub.Enum.SecurityAdvisoryEcosystem.toString), Argument.optional "package" filledInOptionals.package Encode.string, Argument.optional "severities" filledInOptionals.severities (Encode.enum GitHub.Enum.SecurityAdvisorySeverity.toString |> Encode.list), Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "vulnerabilities" optionalArgs object_ identity


{-| When the advisory was withdrawn, if it has been withdrawn
-}
withdrawnAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.SecurityAdvisory
withdrawnAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "withdrawnAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)
