-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.Label exposing (..)

import GitHub.Enum.IssueState
import GitHub.Enum.PullRequestState
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


{-| Identifies the label color.
-}
color : SelectionSet String GitHub.Object.Label
color =
    Object.selectionForField "String" "color" [] Decode.string


{-| Identifies the date and time when the label was created.
-}
createdAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.Label
createdAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| A brief description of this label.
-}
description : SelectionSet (Maybe String) GitHub.Object.Label
description =
    Object.selectionForField "(Maybe String)" "description" [] (Decode.string |> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.Label
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Indicates whether or not this is a default label.
-}
isDefault : SelectionSet Bool GitHub.Object.Label
isDefault =
    Object.selectionForField "Bool" "isDefault" [] Decode.bool


type alias IssuesOptionalArguments =
    { orderBy : OptionalArgument GitHub.InputObject.IssueOrder
    , labels : OptionalArgument (List String)
    , states : OptionalArgument (List GitHub.Enum.IssueState.IssueState)
    , filterBy : OptionalArgument GitHub.InputObject.IssueFilters
    , after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| A list of issues associated with this label.

  - orderBy - Ordering options for issues returned from the connection.
  - labels - A list of label names to filter the pull requests by.
  - states - A list of states to filter the issues by.
  - filterBy - Filtering options for issues returned from the connection.
  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
issues :
    (IssuesOptionalArguments -> IssuesOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.IssueConnection
    -> SelectionSet decodesTo GitHub.Object.Label
issues fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { orderBy = Absent, labels = Absent, states = Absent, filterBy = Absent, after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeIssueOrder, Argument.optional "labels" filledInOptionals.labels (Encode.string |> Encode.list), Argument.optional "states" filledInOptionals.states (Encode.enum GitHub.Enum.IssueState.toString |> Encode.list), Argument.optional "filterBy" filledInOptionals.filterBy GitHub.InputObject.encodeIssueFilters, Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "issues" optionalArgs object_ identity


{-| Identifies the label name.
-}
name : SelectionSet String GitHub.Object.Label
name =
    Object.selectionForField "String" "name" [] Decode.string


type alias PullRequestsOptionalArguments =
    { states : OptionalArgument (List GitHub.Enum.PullRequestState.PullRequestState)
    , labels : OptionalArgument (List String)
    , headRefName : OptionalArgument String
    , baseRefName : OptionalArgument String
    , orderBy : OptionalArgument GitHub.InputObject.IssueOrder
    , after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| A list of pull requests associated with this label.

  - states - A list of states to filter the pull requests by.
  - labels - A list of label names to filter the pull requests by.
  - headRefName - The head ref name to filter the pull requests by.
  - baseRefName - The base ref name to filter the pull requests by.
  - orderBy - Ordering options for pull requests returned from the connection.
  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
pullRequests :
    (PullRequestsOptionalArguments -> PullRequestsOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.PullRequestConnection
    -> SelectionSet decodesTo GitHub.Object.Label
pullRequests fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { states = Absent, labels = Absent, headRefName = Absent, baseRefName = Absent, orderBy = Absent, after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "states" filledInOptionals.states (Encode.enum GitHub.Enum.PullRequestState.toString |> Encode.list), Argument.optional "labels" filledInOptionals.labels (Encode.string |> Encode.list), Argument.optional "headRefName" filledInOptionals.headRefName Encode.string, Argument.optional "baseRefName" filledInOptionals.baseRefName Encode.string, Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeIssueOrder, Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "pullRequests" optionalArgs object_ identity


{-| The repository associated with this label.
-}
repository :
    SelectionSet decodesTo GitHub.Object.Repository
    -> SelectionSet decodesTo GitHub.Object.Label
repository object_ =
    Object.selectionForCompositeField "repository" [] object_ identity


{-| The HTTP path for this label.
-}
resourcePath : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.Label
resourcePath =
    Object.selectionForField "ScalarCodecs.Uri" "resourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| Identifies the date and time when the label was last updated.
-}
updatedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.Label
updatedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| The HTTP URL for this label.
-}
url : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.Label
url =
    Object.selectionForField "ScalarCodecs.Uri" "url" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)
