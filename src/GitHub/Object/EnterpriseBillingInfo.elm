-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.EnterpriseBillingInfo exposing (..)

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


{-| The number of licenseable users/emails across the enterprise.
-}
allLicensableUsersCount : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
allLicensableUsersCount =
    Object.selectionForField "Int" "allLicensableUsersCount" [] Decode.int


{-| The number of data packs used by all organizations owned by the enterprise.
-}
assetPacks : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
assetPacks =
    Object.selectionForField "Int" "assetPacks" [] Decode.int


{-| The number of available seats across all owned organizations based on the unique number of billable users.
-}
availableSeats : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
availableSeats =
    Object.selectionForField "Int" "availableSeats" [] Decode.int


{-| The bandwidth quota in GB for all organizations owned by the enterprise.
-}
bandwidthQuota : SelectionSet Float GitHub.Object.EnterpriseBillingInfo
bandwidthQuota =
    Object.selectionForField "Float" "bandwidthQuota" [] Decode.float


{-| The bandwidth usage in GB for all organizations owned by the enterprise.
-}
bandwidthUsage : SelectionSet Float GitHub.Object.EnterpriseBillingInfo
bandwidthUsage =
    Object.selectionForField "Float" "bandwidthUsage" [] Decode.float


{-| The bandwidth usage as a percentage of the bandwidth quota.
-}
bandwidthUsagePercentage : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
bandwidthUsagePercentage =
    Object.selectionForField "Int" "bandwidthUsagePercentage" [] Decode.int


{-| The total seats across all organizations owned by the enterprise.
-}
seats : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
seats =
    Object.selectionForField "Int" "seats" [] Decode.int


{-| The storage quota in GB for all organizations owned by the enterprise.
-}
storageQuota : SelectionSet Float GitHub.Object.EnterpriseBillingInfo
storageQuota =
    Object.selectionForField "Float" "storageQuota" [] Decode.float


{-| The storage usage in GB for all organizations owned by the enterprise.
-}
storageUsage : SelectionSet Float GitHub.Object.EnterpriseBillingInfo
storageUsage =
    Object.selectionForField "Float" "storageUsage" [] Decode.float


{-| The storage usage as a percentage of the storage quota.
-}
storageUsagePercentage : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
storageUsagePercentage =
    Object.selectionForField "Int" "storageUsagePercentage" [] Decode.int


{-| The number of available licenses across all owned organizations based on the unique number of billable users.
-}
totalAvailableLicenses : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
totalAvailableLicenses =
    Object.selectionForField "Int" "totalAvailableLicenses" [] Decode.int


{-| The total number of licenses allocated.
-}
totalLicenses : SelectionSet Int GitHub.Object.EnterpriseBillingInfo
totalLicenses =
    Object.selectionForField "Int" "totalLicenses" [] Decode.int
