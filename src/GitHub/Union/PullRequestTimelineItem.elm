-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Union.PullRequestTimelineItem exposing (..)

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
    { onCommit : SelectionSet decodesTo GitHub.Object.Commit
    , onCommitCommentThread : SelectionSet decodesTo GitHub.Object.CommitCommentThread
    , onPullRequestReview : SelectionSet decodesTo GitHub.Object.PullRequestReview
    , onPullRequestReviewThread : SelectionSet decodesTo GitHub.Object.PullRequestReviewThread
    , onPullRequestReviewComment : SelectionSet decodesTo GitHub.Object.PullRequestReviewComment
    , onIssueComment : SelectionSet decodesTo GitHub.Object.IssueComment
    , onClosedEvent : SelectionSet decodesTo GitHub.Object.ClosedEvent
    , onReopenedEvent : SelectionSet decodesTo GitHub.Object.ReopenedEvent
    , onSubscribedEvent : SelectionSet decodesTo GitHub.Object.SubscribedEvent
    , onUnsubscribedEvent : SelectionSet decodesTo GitHub.Object.UnsubscribedEvent
    , onMergedEvent : SelectionSet decodesTo GitHub.Object.MergedEvent
    , onReferencedEvent : SelectionSet decodesTo GitHub.Object.ReferencedEvent
    , onCrossReferencedEvent : SelectionSet decodesTo GitHub.Object.CrossReferencedEvent
    , onAssignedEvent : SelectionSet decodesTo GitHub.Object.AssignedEvent
    , onUnassignedEvent : SelectionSet decodesTo GitHub.Object.UnassignedEvent
    , onLabeledEvent : SelectionSet decodesTo GitHub.Object.LabeledEvent
    , onUnlabeledEvent : SelectionSet decodesTo GitHub.Object.UnlabeledEvent
    , onMilestonedEvent : SelectionSet decodesTo GitHub.Object.MilestonedEvent
    , onDemilestonedEvent : SelectionSet decodesTo GitHub.Object.DemilestonedEvent
    , onRenamedTitleEvent : SelectionSet decodesTo GitHub.Object.RenamedTitleEvent
    , onLockedEvent : SelectionSet decodesTo GitHub.Object.LockedEvent
    , onUnlockedEvent : SelectionSet decodesTo GitHub.Object.UnlockedEvent
    , onDeployedEvent : SelectionSet decodesTo GitHub.Object.DeployedEvent
    , onDeploymentEnvironmentChangedEvent : SelectionSet decodesTo GitHub.Object.DeploymentEnvironmentChangedEvent
    , onHeadRefDeletedEvent : SelectionSet decodesTo GitHub.Object.HeadRefDeletedEvent
    , onHeadRefRestoredEvent : SelectionSet decodesTo GitHub.Object.HeadRefRestoredEvent
    , onHeadRefForcePushedEvent : SelectionSet decodesTo GitHub.Object.HeadRefForcePushedEvent
    , onBaseRefForcePushedEvent : SelectionSet decodesTo GitHub.Object.BaseRefForcePushedEvent
    , onReviewRequestedEvent : SelectionSet decodesTo GitHub.Object.ReviewRequestedEvent
    , onReviewRequestRemovedEvent : SelectionSet decodesTo GitHub.Object.ReviewRequestRemovedEvent
    , onReviewDismissedEvent : SelectionSet decodesTo GitHub.Object.ReviewDismissedEvent
    , onUserBlockedEvent : SelectionSet decodesTo GitHub.Object.UserBlockedEvent
    }


{-| Build up a selection for this Union by passing in a Fragments record.
-}
fragments :
    Fragments decodesTo
    -> SelectionSet decodesTo GitHub.Union.PullRequestTimelineItem
fragments selections =
    Object.exhuastiveFragmentSelection
        [ Object.buildFragment "Commit" selections.onCommit
        , Object.buildFragment "CommitCommentThread" selections.onCommitCommentThread
        , Object.buildFragment "PullRequestReview" selections.onPullRequestReview
        , Object.buildFragment "PullRequestReviewThread" selections.onPullRequestReviewThread
        , Object.buildFragment "PullRequestReviewComment" selections.onPullRequestReviewComment
        , Object.buildFragment "IssueComment" selections.onIssueComment
        , Object.buildFragment "ClosedEvent" selections.onClosedEvent
        , Object.buildFragment "ReopenedEvent" selections.onReopenedEvent
        , Object.buildFragment "SubscribedEvent" selections.onSubscribedEvent
        , Object.buildFragment "UnsubscribedEvent" selections.onUnsubscribedEvent
        , Object.buildFragment "MergedEvent" selections.onMergedEvent
        , Object.buildFragment "ReferencedEvent" selections.onReferencedEvent
        , Object.buildFragment "CrossReferencedEvent" selections.onCrossReferencedEvent
        , Object.buildFragment "AssignedEvent" selections.onAssignedEvent
        , Object.buildFragment "UnassignedEvent" selections.onUnassignedEvent
        , Object.buildFragment "LabeledEvent" selections.onLabeledEvent
        , Object.buildFragment "UnlabeledEvent" selections.onUnlabeledEvent
        , Object.buildFragment "MilestonedEvent" selections.onMilestonedEvent
        , Object.buildFragment "DemilestonedEvent" selections.onDemilestonedEvent
        , Object.buildFragment "RenamedTitleEvent" selections.onRenamedTitleEvent
        , Object.buildFragment "LockedEvent" selections.onLockedEvent
        , Object.buildFragment "UnlockedEvent" selections.onUnlockedEvent
        , Object.buildFragment "DeployedEvent" selections.onDeployedEvent
        , Object.buildFragment "DeploymentEnvironmentChangedEvent" selections.onDeploymentEnvironmentChangedEvent
        , Object.buildFragment "HeadRefDeletedEvent" selections.onHeadRefDeletedEvent
        , Object.buildFragment "HeadRefRestoredEvent" selections.onHeadRefRestoredEvent
        , Object.buildFragment "HeadRefForcePushedEvent" selections.onHeadRefForcePushedEvent
        , Object.buildFragment "BaseRefForcePushedEvent" selections.onBaseRefForcePushedEvent
        , Object.buildFragment "ReviewRequestedEvent" selections.onReviewRequestedEvent
        , Object.buildFragment "ReviewRequestRemovedEvent" selections.onReviewRequestRemovedEvent
        , Object.buildFragment "ReviewDismissedEvent" selections.onReviewDismissedEvent
        , Object.buildFragment "UserBlockedEvent" selections.onUserBlockedEvent
        ]


{-| Can be used to create a non-exhuastive set of fragments by using the record
update syntax to add `SelectionSet`s for the types you want to handle.
-}
maybeFragments : Fragments (Maybe decodesTo)
maybeFragments =
    { onCommit = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onCommitCommentThread = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReview = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewThread = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssueComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onClosedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onReopenedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onSubscribedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onUnsubscribedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onMergedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onReferencedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onCrossReferencedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onAssignedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onUnassignedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onLabeledEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onUnlabeledEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onMilestonedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onDemilestonedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onRenamedTitleEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onLockedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onUnlockedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onDeployedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onDeploymentEnvironmentChangedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onHeadRefDeletedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onHeadRefRestoredEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onHeadRefForcePushedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onBaseRefForcePushedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onReviewRequestedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onReviewRequestRemovedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onReviewDismissedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onUserBlockedEvent = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    }
