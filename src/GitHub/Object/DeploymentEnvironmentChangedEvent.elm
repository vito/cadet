-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.DeploymentEnvironmentChangedEvent exposing (..)

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
actor : SelectionSet decodesTo GitHub.Interface.Actor -> SelectionSet (Maybe decodesTo) GitHub.Object.DeploymentEnvironmentChangedEvent
actor object_ =
    Object.selectionForCompositeField "actor" [] object_ (identity >> Decode.nullable)


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.DeploymentEnvironmentChangedEvent
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| The deployment status that updated the deployment environment.
-}
deploymentStatus : SelectionSet decodesTo GitHub.Object.DeploymentStatus -> SelectionSet decodesTo GitHub.Object.DeploymentEnvironmentChangedEvent
deploymentStatus object_ =
    Object.selectionForCompositeField "deploymentStatus" [] object_ identity


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.DeploymentEnvironmentChangedEvent
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| PullRequest referenced by event.
-}
pullRequest : SelectionSet decodesTo GitHub.Object.PullRequest -> SelectionSet decodesTo GitHub.Object.DeploymentEnvironmentChangedEvent
pullRequest object_ =
    Object.selectionForCompositeField "pullRequest" [] object_ identity
