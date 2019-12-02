-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.TeamDiscussion exposing (..)

import GitHub.Enum.CommentAuthorAssociation
import GitHub.Enum.CommentCannotUpdateReason
import GitHub.Enum.ReactionContent
import GitHub.Enum.SubscriptionState
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


{-| The actor who authored the comment.
-}
author : SelectionSet decodesTo GitHub.Interface.Actor -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamDiscussion
author object_ =
    Object.selectionForCompositeField "author" [] object_ (identity >> Decode.nullable)


{-| Author's association with the discussion's team.
-}
authorAssociation : SelectionSet GitHub.Enum.CommentAuthorAssociation.CommentAuthorAssociation GitHub.Object.TeamDiscussion
authorAssociation =
    Object.selectionForField "Enum.CommentAuthorAssociation.CommentAuthorAssociation" "authorAssociation" [] GitHub.Enum.CommentAuthorAssociation.decoder


{-| The body as Markdown.
-}
body : SelectionSet String GitHub.Object.TeamDiscussion
body =
    Object.selectionForField "String" "body" [] Decode.string


{-| The body rendered to HTML.
-}
bodyHTML : SelectionSet GitHub.ScalarCodecs.Html GitHub.Object.TeamDiscussion
bodyHTML =
    Object.selectionForField "ScalarCodecs.Html" "bodyHTML" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecHtml |> .decoder)


{-| The body rendered to text.
-}
bodyText : SelectionSet String GitHub.Object.TeamDiscussion
bodyText =
    Object.selectionForField "String" "bodyText" [] Decode.string


{-| Identifies the discussion body hash.
-}
bodyVersion : SelectionSet String GitHub.Object.TeamDiscussion
bodyVersion =
    Object.selectionForField "String" "bodyVersion" [] Decode.string


type alias CommentsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    , orderBy : OptionalArgument GitHub.InputObject.TeamDiscussionCommentOrder
    , fromComment : OptionalArgument Int
    }


{-| A list of comments on this discussion.

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.
  - orderBy - Order for connection
  - fromComment - When provided, filters the connection such that results begin with the comment with this number.

-}
comments : (CommentsOptionalArguments -> CommentsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.TeamDiscussionCommentConnection -> SelectionSet decodesTo GitHub.Object.TeamDiscussion
comments fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent, orderBy = Absent, fromComment = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int, Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeTeamDiscussionCommentOrder, Argument.optional "fromComment" filledInOptionals.fromComment Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "comments" optionalArgs object_ identity


{-| The HTTP path for discussion comments
-}
commentsResourcePath : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.TeamDiscussion
commentsResourcePath =
    Object.selectionForField "ScalarCodecs.Uri" "commentsResourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| The HTTP URL for discussion comments
-}
commentsUrl : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.TeamDiscussion
commentsUrl =
    Object.selectionForField "ScalarCodecs.Uri" "commentsUrl" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.TeamDiscussion
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| Check if this comment was created via an email reply.
-}
createdViaEmail : SelectionSet Bool GitHub.Object.TeamDiscussion
createdViaEmail =
    Object.selectionForField "Bool" "createdViaEmail" [] Decode.bool


{-| Identifies the primary key from the database.
-}
databaseId : SelectionSet (Maybe Int) GitHub.Object.TeamDiscussion
databaseId =
    Object.selectionForField "(Maybe Int)" "databaseId" [] (Decode.int |> Decode.nullable)


{-| The actor who edited the comment.
-}
editor : SelectionSet decodesTo GitHub.Interface.Actor -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamDiscussion
editor object_ =
    Object.selectionForCompositeField "editor" [] object_ (identity >> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.TeamDiscussion
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Check if this comment was edited and includes an edit with the creation data
-}
includesCreatedEdit : SelectionSet Bool GitHub.Object.TeamDiscussion
includesCreatedEdit =
    Object.selectionForField "Bool" "includesCreatedEdit" [] Decode.bool


{-| Whether or not the discussion is pinned.
-}
isPinned : SelectionSet Bool GitHub.Object.TeamDiscussion
isPinned =
    Object.selectionForField "Bool" "isPinned" [] Decode.bool


{-| Whether or not the discussion is only visible to team members and org admins.
-}
isPrivate : SelectionSet Bool GitHub.Object.TeamDiscussion
isPrivate =
    Object.selectionForField "Bool" "isPrivate" [] Decode.bool


{-| The moment the editor made the last edit
-}
lastEditedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.TeamDiscussion
lastEditedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "lastEditedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| Identifies the discussion within its team.
-}
number : SelectionSet Int GitHub.Object.TeamDiscussion
number =
    Object.selectionForField "Int" "number" [] Decode.int


{-| Identifies when the comment was published at.
-}
publishedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.TeamDiscussion
publishedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "publishedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| A list of reactions grouped by content left on the subject.
-}
reactionGroups : SelectionSet decodesTo GitHub.Object.ReactionGroup -> SelectionSet (Maybe (List decodesTo)) GitHub.Object.TeamDiscussion
reactionGroups object_ =
    Object.selectionForCompositeField "reactionGroups" [] object_ (identity >> Decode.list >> Decode.nullable)


type alias ReactionsOptionalArguments =
    { after : OptionalArgument String
    , before : OptionalArgument String
    , first : OptionalArgument Int
    , last : OptionalArgument Int
    , content : OptionalArgument GitHub.Enum.ReactionContent.ReactionContent
    , orderBy : OptionalArgument GitHub.InputObject.ReactionOrder
    }


{-| A list of Reactions left on the Issue.

  - after - Returns the elements in the list that come after the specified cursor.
  - before - Returns the elements in the list that come before the specified cursor.
  - first - Returns the first _n_ elements from the list.
  - last - Returns the last _n_ elements from the list.
  - content - Allows filtering Reactions by emoji.
  - orderBy - Allows specifying the order in which reactions are returned.

-}
reactions : (ReactionsOptionalArguments -> ReactionsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.ReactionConnection -> SelectionSet decodesTo GitHub.Object.TeamDiscussion
reactions fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent, content = Absent, orderBy = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int, Argument.optional "content" filledInOptionals.content (Encode.enum GitHub.Enum.ReactionContent.toString), Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeReactionOrder ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "reactions" optionalArgs object_ identity


{-| The HTTP path for this discussion
-}
resourcePath : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.TeamDiscussion
resourcePath =
    Object.selectionForField "ScalarCodecs.Uri" "resourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| The team that defines the context of this discussion.
-}
team : SelectionSet decodesTo GitHub.Object.Team -> SelectionSet decodesTo GitHub.Object.TeamDiscussion
team object_ =
    Object.selectionForCompositeField "team" [] object_ identity


{-| The title of the discussion
-}
title : SelectionSet String GitHub.Object.TeamDiscussion
title =
    Object.selectionForField "String" "title" [] Decode.string


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.TeamDiscussion
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| The HTTP URL for this discussion
-}
url : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.TeamDiscussion
url =
    Object.selectionForField "ScalarCodecs.Uri" "url" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


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
userContentEdits : (UserContentEditsOptionalArguments -> UserContentEditsOptionalArguments) -> SelectionSet decodesTo GitHub.Object.UserContentEditConnection -> SelectionSet (Maybe decodesTo) GitHub.Object.TeamDiscussion
userContentEdits fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "userContentEdits" optionalArgs object_ (identity >> Decode.nullable)


{-| Check if the current viewer can delete this object.
-}
viewerCanDelete : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerCanDelete =
    Object.selectionForField "Bool" "viewerCanDelete" [] Decode.bool


{-| Whether or not the current viewer can pin this discussion.
-}
viewerCanPin : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerCanPin =
    Object.selectionForField "Bool" "viewerCanPin" [] Decode.bool


{-| Can user react to this subject
-}
viewerCanReact : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerCanReact =
    Object.selectionForField "Bool" "viewerCanReact" [] Decode.bool


{-| Check if the viewer is able to change their subscription status for the repository.
-}
viewerCanSubscribe : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerCanSubscribe =
    Object.selectionForField "Bool" "viewerCanSubscribe" [] Decode.bool


{-| Check if the current viewer can update this object.
-}
viewerCanUpdate : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerCanUpdate =
    Object.selectionForField "Bool" "viewerCanUpdate" [] Decode.bool


{-| Reasons why the current viewer can not update this comment.
-}
viewerCannotUpdateReasons : SelectionSet (List GitHub.Enum.CommentCannotUpdateReason.CommentCannotUpdateReason) GitHub.Object.TeamDiscussion
viewerCannotUpdateReasons =
    Object.selectionForField "(List Enum.CommentCannotUpdateReason.CommentCannotUpdateReason)" "viewerCannotUpdateReasons" [] (GitHub.Enum.CommentCannotUpdateReason.decoder |> Decode.list)


{-| Did the viewer author this comment.
-}
viewerDidAuthor : SelectionSet Bool GitHub.Object.TeamDiscussion
viewerDidAuthor =
    Object.selectionForField "Bool" "viewerDidAuthor" [] Decode.bool


{-| Identifies if the viewer is watching, not watching, or ignoring the subscribable entity.
-}
viewerSubscription : SelectionSet (Maybe GitHub.Enum.SubscriptionState.SubscriptionState) GitHub.Object.TeamDiscussion
viewerSubscription =
    Object.selectionForField "(Maybe Enum.SubscriptionState.SubscriptionState)" "viewerSubscription" [] (GitHub.Enum.SubscriptionState.decoder |> Decode.nullable)
