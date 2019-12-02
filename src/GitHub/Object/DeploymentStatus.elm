-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.DeploymentStatus exposing (..)

import GitHub.Enum.DeploymentStatusState
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
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.DeploymentStatus
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| Identifies the actor who triggered the deployment.
-}
creator : SelectionSet decodesTo GitHub.Interface.Actor -> SelectionSet (Maybe decodesTo) GitHub.Object.DeploymentStatus
creator object_ =
    Object.selectionForCompositeField "creator" [] object_ (identity >> Decode.nullable)


{-| Identifies the deployment associated with status.
-}
deployment : SelectionSet decodesTo GitHub.Object.Deployment -> SelectionSet decodesTo GitHub.Object.DeploymentStatus
deployment object_ =
    Object.selectionForCompositeField "deployment" [] object_ identity


{-| Identifies the description of the deployment.
-}
description : SelectionSet (Maybe String) GitHub.Object.DeploymentStatus
description =
    Object.selectionForField "(Maybe String)" "description" [] (Decode.string |> Decode.nullable)


{-| Identifies the environment URL of the deployment.
-}
environmentUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.DeploymentStatus
environmentUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "environmentUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.DeploymentStatus
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Identifies the log URL of the deployment.
-}
logUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.DeploymentStatus
logUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "logUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| Identifies the current state of the deployment.
-}
state : SelectionSet GitHub.Enum.DeploymentStatusState.DeploymentStatusState GitHub.Object.DeploymentStatus
state =
    Object.selectionForField "Enum.DeploymentStatusState.DeploymentStatusState" "state" [] GitHub.Enum.DeploymentStatusState.decoder


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.DeploymentStatus
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)
