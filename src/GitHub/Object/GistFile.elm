-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.GistFile exposing (..)

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


{-| The file name encoded to remove characters that are invalid in URL paths.
-}
encodedName : SelectionSet (Maybe String) GitHub.Object.GistFile
encodedName =
    Object.selectionForField "(Maybe String)" "encodedName" [] (Decode.string |> Decode.nullable)


{-| The gist file encoding.
-}
encoding : SelectionSet (Maybe String) GitHub.Object.GistFile
encoding =
    Object.selectionForField "(Maybe String)" "encoding" [] (Decode.string |> Decode.nullable)


{-| The file extension from the file name.
-}
extension : SelectionSet (Maybe String) GitHub.Object.GistFile
extension =
    Object.selectionForField "(Maybe String)" "extension" [] (Decode.string |> Decode.nullable)


{-| Indicates if this file is an image.
-}
isImage : SelectionSet Bool GitHub.Object.GistFile
isImage =
    Object.selectionForField "Bool" "isImage" [] Decode.bool


{-| Whether the file's contents were truncated.
-}
isTruncated : SelectionSet Bool GitHub.Object.GistFile
isTruncated =
    Object.selectionForField "Bool" "isTruncated" [] Decode.bool


{-| The programming language this file is written in.
-}
language :
    SelectionSet decodesTo GitHub.Object.Language
    -> SelectionSet (Maybe decodesTo) GitHub.Object.GistFile
language object_ =
    Object.selectionForCompositeField "language" [] object_ (identity >> Decode.nullable)


{-| The gist file name.
-}
name : SelectionSet (Maybe String) GitHub.Object.GistFile
name =
    Object.selectionForField "(Maybe String)" "name" [] (Decode.string |> Decode.nullable)


{-| The gist file size in bytes.
-}
size : SelectionSet (Maybe Int) GitHub.Object.GistFile
size =
    Object.selectionForField "(Maybe Int)" "size" [] (Decode.int |> Decode.nullable)


type alias TextOptionalArguments =
    { truncate : OptionalArgument Int }


{-| UTF8 text data or null if the file is binary

  - truncate - Optionally truncate the returned file to this length.

-}
text :
    (TextOptionalArguments -> TextOptionalArguments)
    -> SelectionSet (Maybe String) GitHub.Object.GistFile
text fillInOptionals =
    let
        filledInOptionals =
            fillInOptionals { truncate = Absent }

        optionalArgs =
            [ Argument.optional "truncate" filledInOptionals.truncate Encode.int ]
                |> List.filterMap identity
    in
    Object.selectionForField "(Maybe String)" "text" optionalArgs (Decode.string |> Decode.nullable)
