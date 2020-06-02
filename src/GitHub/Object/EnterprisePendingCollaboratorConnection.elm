-- Do not manually edit this file, it was auto-generated by dillonkearns/elm-graphql
-- https://github.com/dillonkearns/elm-graphql


module GitHub.Object.EnterprisePendingCollaboratorConnection exposing (..)

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


{-| A list of edges.
-}
edges :
    SelectionSet decodesTo GitHub.Object.EnterprisePendingCollaboratorEdge
    -> SelectionSet (Maybe (List (Maybe decodesTo))) GitHub.Object.EnterprisePendingCollaboratorConnection
edges object_ =
    Object.selectionForCompositeField "edges" [] object_ (identity >> Decode.nullable >> Decode.list >> Decode.nullable)


{-| A list of nodes.
-}
nodes :
    SelectionSet decodesTo GitHub.Object.User
    -> SelectionSet (Maybe (List (Maybe decodesTo))) GitHub.Object.EnterprisePendingCollaboratorConnection
nodes object_ =
    Object.selectionForCompositeField "nodes" [] object_ (identity >> Decode.nullable >> Decode.list >> Decode.nullable)


{-| Information to aid in pagination.
-}
pageInfo :
    SelectionSet decodesTo GitHub.Object.PageInfo
    -> SelectionSet decodesTo GitHub.Object.EnterprisePendingCollaboratorConnection
pageInfo object_ =
    Object.selectionForCompositeField "pageInfo" [] object_ identity


{-| Identifies the total count of items in the connection.
-}
totalCount : SelectionSet Int GitHub.Object.EnterprisePendingCollaboratorConnection
totalCount =
    Object.selectionForField "Int" "totalCount" [] Decode.int
