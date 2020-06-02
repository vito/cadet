-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Interface.Minimizable exposing (..)

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
    , onPullRequestReviewComment : SelectionSet decodesTo GitHub.Object.PullRequestReviewComment
    }


{-| Build an exhaustive selection of type-specific fragments.
-}
fragments :
    Fragments decodesTo
    -> SelectionSet decodesTo GitHub.Interface.Minimizable
fragments selections =
    Object.exhaustiveFragmentSelection
        [ Object.buildFragment "CommitComment" selections.onCommitComment
        , Object.buildFragment "GistComment" selections.onGistComment
        , Object.buildFragment "IssueComment" selections.onIssueComment
        , Object.buildFragment "PullRequestReviewComment" selections.onPullRequestReviewComment
        ]


{-| Can be used to create a non-exhaustive set of fragments by using the record
update syntax to add `SelectionSet`s for the types you want to handle.
-}
maybeFragments : Fragments (Maybe decodesTo)
maybeFragments =
    { onCommitComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onGistComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssueComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    }


{-| Returns whether or not a comment has been minimized.
-}
isMinimized : SelectionSet Bool GitHub.Interface.Minimizable
isMinimized =
    Object.selectionForField "Bool" "isMinimized" [] Decode.bool


{-| Returns why the comment was minimized.
-}
minimizedReason : SelectionSet (Maybe String) GitHub.Interface.Minimizable
minimizedReason =
    Object.selectionForField "(Maybe String)" "minimizedReason" [] (Decode.string |> Decode.nullable)


{-| Check if the current viewer can minimize this object.
-}
viewerCanMinimize : SelectionSet Bool GitHub.Interface.Minimizable
viewerCanMinimize =
    Object.selectionForField "Bool" "viewerCanMinimize" [] Decode.bool
