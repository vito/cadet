-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.TeamChangeParentTeamAuditEntry exposing (..)

import GitHub.Enum.OperationType
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


{-| The action name
-}
action : SelectionSet String GitHub.Object.TeamChangeParentTeamAuditEntry
action =
    Object.selectionForField "String" "action" [] Decode.string


{-| The user who initiated the action
-}
actor : SelectionSet decodesTo GitHub.Union.AuditEntryActor -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
actor object_ =
    Object.selectionForCompositeField "actor" [] object_ (identity >> Decode.nullable)


{-| The IP address of the actor
-}
actorIp : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
actorIp =
    Object.selectionForField "(Maybe String)" "actorIp" [] (Decode.string |> Decode.nullable)


{-| A readable representation of the actor's location
-}
actorLocation : SelectionSet decodesTo GitHub.Object.ActorLocation -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
actorLocation object_ =
    Object.selectionForCompositeField "actorLocation" [] object_ (identity >> Decode.nullable)


{-| The username of the user who initiated the action
-}
actorLogin : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
actorLogin =
    Object.selectionForField "(Maybe String)" "actorLogin" [] (Decode.string |> Decode.nullable)


{-| The HTTP path for the actor.
-}
actorResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
actorResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "actorResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for the actor.
-}
actorUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
actorUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "actorUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The time the action was initiated
-}
createdAt : SelectionSet GitHub.ScalarCodecs.PreciseDateTime GitHub.Object.TeamChangeParentTeamAuditEntry
createdAt =
    Object.selectionForField "ScalarCodecs.PreciseDateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecPreciseDateTime |> .decoder)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.TeamChangeParentTeamAuditEntry
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Whether the team was mapped to an LDAP Group.
-}
isLdapMapped : SelectionSet (Maybe Bool) GitHub.Object.TeamChangeParentTeamAuditEntry
isLdapMapped =
    Object.selectionForField "(Maybe Bool)" "isLdapMapped" [] (Decode.bool |> Decode.nullable)


{-| The corresponding operation type for the action
-}
operationType : SelectionSet (Maybe GitHub.Enum.OperationType.OperationType) GitHub.Object.TeamChangeParentTeamAuditEntry
operationType =
    Object.selectionForField "(Maybe Enum.OperationType.OperationType)" "operationType" [] (GitHub.Enum.OperationType.decoder |> Decode.nullable)


{-| The Organization associated with the Audit Entry.
-}
organization : SelectionSet decodesTo GitHub.Object.Organization -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
organization object_ =
    Object.selectionForCompositeField "organization" [] object_ (identity >> Decode.nullable)


{-| The name of the Organization.
-}
organizationName : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
organizationName =
    Object.selectionForField "(Maybe String)" "organizationName" [] (Decode.string |> Decode.nullable)


{-| The HTTP path for the organization
-}
organizationResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
organizationResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "organizationResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for the organization
-}
organizationUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
organizationUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "organizationUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The new parent team.
-}
parentTeam : SelectionSet decodesTo GitHub.Object.Team -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeam object_ =
    Object.selectionForCompositeField "parentTeam" [] object_ (identity >> Decode.nullable)


{-| The name of the new parent team
-}
parentTeamName : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamName =
    Object.selectionForField "(Maybe String)" "parentTeamName" [] (Decode.string |> Decode.nullable)


{-| The name of the former parent team
-}
parentTeamNameWas : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamNameWas =
    Object.selectionForField "(Maybe String)" "parentTeamNameWas" [] (Decode.string |> Decode.nullable)


{-| The HTTP path for the parent team
-}
parentTeamResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "parentTeamResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for the parent team
-}
parentTeamUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "parentTeamUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The former parent team.
-}
parentTeamWas : SelectionSet decodesTo GitHub.Object.Team -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamWas object_ =
    Object.selectionForCompositeField "parentTeamWas" [] object_ (identity >> Decode.nullable)


{-| The HTTP path for the previous parent team
-}
parentTeamWasResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamWasResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "parentTeamWasResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for the previous parent team
-}
parentTeamWasUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
parentTeamWasUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "parentTeamWasUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The team associated with the action
-}
team : SelectionSet decodesTo GitHub.Object.Team -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
team object_ =
    Object.selectionForCompositeField "team" [] object_ (identity >> Decode.nullable)


{-| The name of the team
-}
teamName : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
teamName =
    Object.selectionForField "(Maybe String)" "teamName" [] (Decode.string |> Decode.nullable)


{-| The HTTP path for this team
-}
teamResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
teamResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "teamResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for this team
-}
teamUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
teamUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "teamUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The user affected by the action
-}
user : SelectionSet decodesTo GitHub.Object.User -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamChangeParentTeamAuditEntry
user object_ =
    Object.selectionForCompositeField "user" [] object_ (identity >> Decode.nullable)


{-| For actions involving two users, the actor is the initiator and the user is the affected user.
-}
userLogin : SelectionSet (Maybe String) GitHub.Object.TeamChangeParentTeamAuditEntry
userLogin =
    Object.selectionForField "(Maybe String)" "userLogin" [] (Decode.string |> Decode.nullable)


{-| The HTTP path for the user.
-}
userResourcePath : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
userResourcePath =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "userResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)


{-| The HTTP URL for the user.
-}
userUrl : SelectionSet (Maybe GitHub.ScalarCodecs.Uri) GitHub.Object.TeamChangeParentTeamAuditEntry
userUrl =
    Object.selectionForField "(Maybe ScalarCodecs.Uri)" "userUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder |> Decode.nullable)
