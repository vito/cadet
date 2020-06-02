-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.CommitComment exposing (..)

import GitHub.Enum.CommentAuthorAssociation
import GitHub.Enum.CommentCannotUpdateReason
import GitHub.Enum.ReactionContent
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
author :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.CommitComment
author object_ =
    Object.selectionForCompositeField "author" [] object_ (identity >> Decode.nullable)


{-| Author's association with the subject of the comment.
-}
authorAssociation : SelectionSet GitHub.Enum.CommentAuthorAssociation.CommentAuthorAssociation GitHub.Object.CommitComment
authorAssociation =
    Object.selectionForField "Enum.CommentAuthorAssociation.CommentAuthorAssociation" "authorAssociation" [] GitHub.Enum.CommentAuthorAssociation.decoder


{-| Identifies the comment body.
-}
body : SelectionSet String GitHub.Object.CommitComment
body =
    Object.selectionForField "String" "body" [] Decode.string


{-| The body rendered to HTML.
-}
bodyHTML : SelectionSet GitHub.ScalarCodecs.Html GitHub.Object.CommitComment
bodyHTML =
    Object.selectionForField "ScalarCodecs.Html" "bodyHTML" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecHtml |> .decoder)


{-| The body rendered to text.
-}
bodyText : SelectionSet String GitHub.Object.CommitComment
bodyText =
    Object.selectionForField "String" "bodyText" [] Decode.string


{-| Identifies the commit associated with the comment, if the commit exists.
-}
commit :
    SelectionSet decodesTo GitHub.Object.Commit
    -> SelectionSet (Maybe decodesTo) GitHub.Object.CommitComment
commit object_ =
    Object.selectionForCompositeField "commit" [] object_ (identity >> Decode.nullable)


{-| Identifies the date and time when the object was created.
-}
createdAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.CommitComment
createdAt =
    Object.selectionForField "ScalarCodecs.DateTime" "createdAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| Check if this comment was created via an email reply.
-}
createdViaEmail : SelectionSet Bool GitHub.Object.CommitComment
createdViaEmail =
    Object.selectionForField "Bool" "createdViaEmail" [] Decode.bool


{-| Identifies the primary key from the database.
-}
databaseId : SelectionSet (Maybe Int) GitHub.Object.CommitComment
databaseId =
    Object.selectionForField "(Maybe Int)" "databaseId" [] (Decode.int |> Decode.nullable)


{-| The actor who edited the comment.
-}
editor :
    SelectionSet decodesTo GitHub.Interface.Actor
    -> SelectionSet (Maybe decodesTo) GitHub.Object.CommitComment
editor object_ =
    Object.selectionForCompositeField "editor" [] object_ (identity >> Decode.nullable)


id : SelectionSet GitHub.ScalarCodecs.Id GitHub.Object.CommitComment
id =
    Object.selectionForField "ScalarCodecs.Id" "id" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecId |> .decoder)


{-| Check if this comment was edited and includes an edit with the creation data
-}
includesCreatedEdit : SelectionSet Bool GitHub.Object.CommitComment
includesCreatedEdit =
    Object.selectionForField "Bool" "includesCreatedEdit" [] Decode.bool


{-| Returns whether or not a comment has been minimized.
-}
isMinimized : SelectionSet Bool GitHub.Object.CommitComment
isMinimized =
    Object.selectionForField "Bool" "isMinimized" [] Decode.bool


{-| The moment the editor made the last edit
-}
lastEditedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.CommitComment
lastEditedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "lastEditedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| Returns why the comment was minimized.
-}
minimizedReason : SelectionSet (Maybe String) GitHub.Object.CommitComment
minimizedReason =
    Object.selectionForField "(Maybe String)" "minimizedReason" [] (Decode.string |> Decode.nullable)


{-| Identifies the file path associated with the comment.
-}
path : SelectionSet (Maybe String) GitHub.Object.CommitComment
path =
    Object.selectionForField "(Maybe String)" "path" [] (Decode.string |> Decode.nullable)


{-| Identifies the line position associated with the comment.
-}
position : SelectionSet (Maybe Int) GitHub.Object.CommitComment
position =
    Object.selectionForField "(Maybe Int)" "position" [] (Decode.int |> Decode.nullable)


{-| Identifies when the comment was published at.
-}
publishedAt : SelectionSet (Maybe GitHub.ScalarCodecs.DateTime) GitHub.Object.CommitComment
publishedAt =
    Object.selectionForField "(Maybe ScalarCodecs.DateTime)" "publishedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder |> Decode.nullable)


{-| A list of reactions grouped by content left on the subject.
-}
reactionGroups :
    SelectionSet decodesTo GitHub.Object.ReactionGroup
    -> SelectionSet (Maybe (List decodesTo)) GitHub.Object.CommitComment
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
reactions :
    (ReactionsOptionalArguments -> ReactionsOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.ReactionConnection
    -> SelectionSet decodesTo GitHub.Object.CommitComment
reactions fillInOptionals object_ =
    let
        filledInOptionals =
            fillInOptionals { after = Absent, before = Absent, first = Absent, last = Absent, content = Absent, orderBy = Absent }

        optionalArgs =
            [ Argument.optional "after" filledInOptionals.after Encode.string, Argument.optional "before" filledInOptionals.before Encode.string, Argument.optional "first" filledInOptionals.first Encode.int, Argument.optional "last" filledInOptionals.last Encode.int, Argument.optional "content" filledInOptionals.content (Encode.enum GitHub.Enum.ReactionContent.toString), Argument.optional "orderBy" filledInOptionals.orderBy GitHub.InputObject.encodeReactionOrder ]
                |> List.filterMap identity
    in
    Object.selectionForCompositeField "reactions" optionalArgs object_ identity


{-| The repository associated with this node.
-}
repository :
    SelectionSet decodesTo GitHub.Object.Repository
    -> SelectionSet decodesTo GitHub.Object.CommitComment
repository object_ =
    Object.selectionForCompositeField "repository" [] object_ identity


{-| The HTTP path permalink for this commit comment.
-}
resourcePath : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.CommitComment
resourcePath =
    Object.selectionForField "ScalarCodecs.Uri" "resourcePath" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecUri |> .decoder)


{-| Identifies the date and time when the object was last updated.
-}
updatedAt : SelectionSet GitHub.ScalarCodecs.DateTime GitHub.Object.CommitComment
updatedAt =
    Object.selectionForField "ScalarCodecs.DateTime" "updatedAt" [] (GitHub.ScalarCodecs.codecs |> GitHub.Scalar.unwrapCodecs |> .codecDateTime |> .decoder)


{-| The HTTP URL permalink for this commit comment.
-}
url : SelectionSet GitHub.ScalarCodecs.Uri GitHub.Object.CommitComment
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
userContentEdits :
    (UserContentEditsOptionalArguments -> UserContentEditsOptionalArguments)
    -> SelectionSet decodesTo GitHub.Object.UserContentEditConnection
    -> SelectionSet (Maybe decodesTo) GitHub.Object.CommitComment
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
viewerCanDelete : SelectionSet Bool GitHub.Object.CommitComment
viewerCanDelete =
    Object.selectionForField "Bool" "viewerCanDelete" [] Decode.bool


{-| Check if the current viewer can minimize this object.
-}
viewerCanMinimize : SelectionSet Bool GitHub.Object.CommitComment
viewerCanMinimize =
    Object.selectionForField "Bool" "viewerCanMinimize" [] Decode.bool


{-| Can user react to this subject
-}
viewerCanReact : SelectionSet Bool GitHub.Object.CommitComment
viewerCanReact =
    Object.selectionForField "Bool" "viewerCanReact" [] Decode.bool


{-| Check if the current viewer can update this object.
-}
viewerCanUpdate : SelectionSet Bool GitHub.Object.CommitComment
viewerCanUpdate =
    Object.selectionForField "Bool" "viewerCanUpdate" [] Decode.bool


{-| Reasons why the current viewer can not update this comment.
-}
viewerCannotUpdateReasons : SelectionSet (List GitHub.Enum.CommentCannotUpdateReason.CommentCannotUpdateReason) GitHub.Object.CommitComment
viewerCannotUpdateReasons =
    Object.selectionForField "(List Enum.CommentCannotUpdateReason.CommentCannotUpdateReason)" "viewerCannotUpdateReasons" [] (GitHub.Enum.CommentCannotUpdateReason.decoder |> Decode.list)


{-| Did the viewer author this comment.
-}
viewerDidAuthor : SelectionSet Bool GitHub.Object.CommitComment
viewerDidAuthor =
    Object.selectionForField "Bool" "viewerDidAuthor" [] Decode.bool
