-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Interface.Comment exposing (..)

import GitHub.Enum.CommentAuthorAssociation
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
    , onIssue : SelectionSet decodesTo GitHub.Object.Issue
    , onIssueComment : SelectionSet decodesTo GitHub.Object.IssueComment
    , onPullRequest : SelectionSet decodesTo GitHub.Object.PullRequest
    , onPullRequestReview : SelectionSet decodesTo GitHub.Object.PullRequestReview
    , onPullRequestReviewComment : SelectionSet decodesTo GitHub.Object.PullRequestReviewComment
    , onTeamDiscussion : SelectionSet decodesTo GitHub.Object.TeamDiscussion
    , onTeamDiscussionComment : SelectionSet decodesTo GitHub.Object.TeamDiscussionComment
    }


{-| Build an exhaustive selection of type-specific fragments.
-}
fragments :
    Fragments decodesTo
    -> SelectionSet decodesTo GitHub.Interface.Comment
fragments selections =
    Object.exhaustiveFragmentSelection
        [ Object.buildFragment "CommitComment" selections.onCommitComment
        , Object.buildFragment "GistComment" selections.onGistComment
        , Object.buildFragment "Issue" selections.onIssue
        , Object.buildFragment "IssueComment" selections.onIssueComment
        , Object.buildFragment "PullRequest" selections.onPullRequest
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
    , onIssue = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onIssueComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequest = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReview = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onPullRequestReviewComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onTeamDiscussion = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    , onTeamDiscussionComment = Graphql.SelectionSet.empty |> Graphql.SelectionSet.map (\_ -> Nothing)
    }


{-| The actor who authored the comment.
-}
author :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Interface.Comment
author object_ =
    Object.selectionForCompositeField "author" [] object_ (identity >> Decode.nullable)


{-| Author's association with the subject of the comment.
-}
authorAssociation : SelectionSet GitHub.Enum.CommentAuthorAssociation.CommentAuthorAssociation GitHub.Interface.Comment
authorAssociation =
    Object.selectionForField "Enum.CommentAuthorAssociation.CommentAuthorAssociation" "authorAssociation" [] GitHub.Enum.CommentAuthorAssociation.decoder


{-| The body as Markdown.
-}
body : SelectionSet String GitHub.Interface.Comment
body =
    Object.selectionForField "String" "body" [] Decode.string


{-| The body rendered to HTML.
-}
bodyHTML : SelectionSet GitHub.ScalarCodecs.Html GitHub.Interface.Comment
bodyHTML =
    Object.selectionForField "ScalarCodecs.Html" "bodyHTML" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecHtml |> .decoder)


{-| The body rendered to text.
-}
bodyText : SelectionSet String GitHub.Interface.Comment
bodyText =
    Object.selectionForField "String" "bodyText" [] Decode.string


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Interface.Comment
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| Check if this comment was created via an email reply.
-}
createdViaEmail : SelectionSet Bool GitHub.Interface.Comment
createdViaEmail =
    Object.selectionForField "Bool" "createdViaEmail" [] Decode.bool


{-| The actor who edited the comment.
-}
editor :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Interface.Comment
editor object_ =
    Object.selectionForCompositeField "editor" [] object_ (identity >> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Interface.Comment
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Check if this comment was edited and includes an edit with the creation data
-}
includesCreatedEdit : SelectionSet Bool GitHub.Interface.Comment
includesCreatedEdit =
    Object.selectionForField "Bool" "includesCreatedEdit" [] Decode.bool


{-| The moment the editor made the last edit
-}
lastEditedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Interface.Comment
lastEditedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "lastEditedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| Identifies when the comment was published at.
-}
publishedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Interface.Comment
publishedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "publishedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Interface.Comment
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


type alias UserContentEditsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    }


{-| A list of edits to this content.

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.

-}
userContentEdits :
    (UserContentEditsOptionalArguments -> UserContentEditsOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.UserContentEditConnection
    -> SelectionSet (Maybe decodesTo) GitHub.Interface.Comment
userContentEdits fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "userContentEdits" optionalArgs object_ (identity >> Decode.nullable)


{-| Did the viewer author this comment.
-}
viewerDidAuthor : SelectionSet Bool GitHub.Interface.Comment
viewerDidAuthor =
    Object.selectionForField "Bool" "viewerDidAuthor" [] Decode.bool
