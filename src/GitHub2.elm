module GitHub2 exposing (..)

import Graphql.Http as GH
import Graphql.SelectionSet as GS exposing (SelectionSet)
import Graphql.Operation as GO
import GitHub.Object as GHO
import GitHub.Scalar as GHS
import GitHub.Object.Repository as GHR
import GitHub.Interface.RepositoryOwner as GHO
import GitHub.Query as GHQ
import Task exposing (Task)

type alias Token =
    String

type alias Error a =
    GH.Error a

type alias RepoSelector =
    { owner : String, name : String }

type alias ID =
  String

type alias Repo =
    { id : ID
    , url : String
    , owner : String
    , name : String
    , isArchived : Bool
    }

extractId : GS.SelectionSet GHS.Id b -> GS.SelectionSet String b
extractId = GS.map (\(GHS.Id x) -> x)
extractUri : GS.SelectionSet GHS.Uri b -> GS.SelectionSet String b
extractUri = GS.map (\(GHS.Uri x) -> x)
repoSelection : GS.SelectionSet Repo GHO.Repository
repoSelection =
  GS.succeed Repo
    |> GS.with (extractId GHR.id)
    |> GS.with (extractUri GHR.url)
    |> GS.with (GHR.owner GHO.login)
    |> GS.with GHR.name
    |> GS.with GHR.isArchived

fetchRepo : Token -> RepoSelector -> (Result (Error Repo) Repo -> msg) -> Cmd msg
fetchRepo token repo msg =
  GHQ.repository repo repoSelection
    |> gitHubQuery token
        |> GH.send msg

gitHubQuery : Token -> SelectionSet decodesTo GO.RootQuery -> GH.Request decodesTo
gitHubQuery token sel =
  let
      addToken =
        if token == "" then
          identity
        else
          GH.withHeader "Authorization" ("token " ++ token)
  in
  GH.queryRequest "https://api.github.com/graphql" sel
    |> addToken
