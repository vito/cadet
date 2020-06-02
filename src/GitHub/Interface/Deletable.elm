-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Interface.Deletable exposing (..)

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
    , onGistComment : SelectionSet decodesTo GitHub.Object.GistComment
    , onIssueComment : SelectionSet decodesTo GitHub.Object.IssueComment
    , onPullRequestReview : SelectionSet decodesTo GitHub.Object.PullRequestReview
    , onPullRequestReviewComment : SelectionSet decodesTo GitHub.Object.PullRequestReviewComment
    , onTeamDiscussion : SelectionSet decodesTo GitHub.Object.TeamDiscussion
    , onTeamDiscussionComment : SelectionSet decodesTo GitHub.Object.TeamDiscussionComment
    }


{-| Build an exhaustive selection of type-specific fragments.
-}
fragments :
    Fragments decodesTo
    -> SelectionSet decodesTo GitHub.Interface.Deletable
fragments selections =
    Object.exhaustiveFragmentSelection
        [ Object.buildFragment "CommitComment" selections.onCommitComment
        , Object.buildFragment "GistComment" selections.onGistComment
        , Object.buildFragment "IssueComment" selections.onIssueComment
        , Object.buildFragment "PullRequestReview" selections.onPullRequestReview
        , Object.buildFragment "PullRequestReviewComment" selections.onPullRequestReviewComment
        , Object.buildFragment "TeamDiscussion" selections.onTeamDiscussion
        , Object.buildFragment "TeamDiscussionComment" selections.onTeamDiscussionComment
        ]


{-| Can be used to create a non-exhaustive set of fragments by using the record
update syntax to add `SelectionSet`s for the types you want to handle.
-}
maybeFragments : Fragments (Maybe decodesTo)
maybeFragments =
    { onCommitComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onGistComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssueComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReview = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onTeamDiscussion = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onTeamDiscussionComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    }


{-| Check if the current viewer can delete this object.
-}
viewerCanDelete : SelectionSet Bool GitHub.Interface.Deletable
viewerCanDelete =
    Object.selectionForField "Bool" "viewerCanDelete" [] Decode.bool
