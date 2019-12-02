-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Interface.RepositoryNode exposing (..)

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
import Graphql.SelectionSet exposing (FragmentSelectionSet(..), SelectionSet(..))
import Json.Decode as Decode


type alias Fragments decodesTo =
    { onCommitComment : SelectionSet decodesTo GitHub.Object.CommitComment
    , onCommitCommentThread : SelectionSet decodesTo GitHub.Object.CommitCommentThread
    , onIssue : SelectionSet decodesTo GitHub.Object.Issue
    , onIssueComment : SelectionSet decodesTo GitHub.Object.IssueComment
    , onPullRequest : SelectionSet decodesTo GitHub.Object.PullRequest
    , onPullRequestCommitCommentThread : SelectionSet decodesTo GitHub.Object.PullRequestCommitCommentThread
    , onPullRequestReview : SelectionSet decodesTo GitHub.Object.PullRequestReview
    , onPullRequestReviewComment : SelectionSet decodesTo GitHub.Object.PullRequestReviewComment
    , onRepositoryVulnerabilityAlert : SelectionSet decodesTo GitHub.Object.RepositoryVulnerabilityAlert
    }


{-| Build an exhaustive selection of type-specific fragments.
-}
fragments :
    Fragments decodesTo
    -> SelectionSet decodesTo GitHub.Interface.RepositoryNode
fragments selections =
    Object.exhuastiveFragmentSelection
        [ Object.buildFragment "CommitComment" selections.onCommitComment
        , Object.buildFragment "CommitCommentThread" selections.onCommitCommentThread
        , Object.buildFragment "Issue" selections.onIssue
        , Object.buildFragment "IssueComment" selections.onIssueComment
        , Object.buildFragment "PullRequest" selections.onPullRequest
        , Object.buildFragment "PullRequestCommitCommentThread" selections.onPullRequestCommitCommentThread
        , Object.buildFragment "PullRequestReview" selections.onPullRequestReview
        , Object.buildFragment "PullRequestReviewComment" selections.onPullRequestReviewComment
        , Object.buildFragment "RepositoryVulnerabilityAlert" selections.onRepositoryVulnerabilityAlert
        ]


{-| Can be used to create a non-exhuastive set of fragments by using the record
update syntax to add `SelectionSet`s for the types you want to handle.
-}
maybeFragments : Fragments (Maybe decodesTo)
maybeFragments =
    { onCommitComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onCommitCommentThread = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssue = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssueComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequest = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestCommitCommentThread = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReview = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onRepositoryVulnerabilityAlert = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    }


{-| The repository associated with this node.
-}
repository : SelectionSet decodesTo GitHub.Object.Repository -> SelectionSet decodesTo GitHub.Interface.RepositoryNode
repository object_ =
    Object.selectionForCompositeField "repository" [] object_ identity
