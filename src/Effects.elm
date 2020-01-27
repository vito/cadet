module Effects exposing
    ( addCard
    , addIssueLabels
    , addNoteCard
    , addPullRequestLabels
    , assignUsers
    , contentCardId
    , convertNoteToIssue
    , createLabel
    , deleteLabel
    , deleteProjectCard
    , moveCard
    , refreshColumnCards
    , refreshIssue
    , refreshPR
    , removeIssueLabel
    , removePullRequestLabel
    , setProjectCardArchived
    , unassignUsers
    , updateCardNote
    , updateLabel
    )

import Backend
import Browser.Navigation as Nav
import Dict
import GitHub
import Model exposing (Model, Msg(..))
import Task


withTokenOrLogIn : Model -> (String -> Cmd Msg) -> Cmd Msg
withTokenOrLogIn model f =
    case model.me of
        Just { token } ->
            f token

        Nothing ->
            Nav.load "/auth/github"


withSetLoading : List GitHub.ID -> Cmd Msg -> Cmd Msg
withSetLoading ids cmd =
    Task.perform (SetLoading ids) (Task.succeed cmd)


refreshColumnCards : GitHub.ID -> Cmd Msg
refreshColumnCards id =
    Backend.refreshCards id RefreshQueued
        |> withSetLoading [ id ]


refreshIssue : GitHub.ID -> Cmd Msg
refreshIssue id =
    Backend.refreshIssue id RefreshQueued
        |> withSetLoading [ id ]


refreshPR : GitHub.ID -> Cmd Msg
refreshPR id =
    Backend.refreshPR id RefreshQueued
        |> withSetLoading [ id ]


moveCard : Model -> Model.CardDestination -> GitHub.ID -> Cmd Msg
moveCard model { columnId, afterId } cardId =
    withTokenOrLogIn model <|
        \token ->
            GitHub.moveCardAfter token columnId cardId afterId
                |> Task.attempt (CardMoved columnId)
                |> withSetLoading [ columnId ]


addCard : Model -> Model.CardDestination -> GitHub.ID -> Cmd Msg
addCard model { projectId, columnId, afterId } contentId =
    withTokenOrLogIn model <|
        \token ->
            case contentCardId model projectId contentId of
                Just cardId ->
                    GitHub.moveCardAfter token columnId cardId afterId
                        |> Task.attempt (CardMoved columnId)
                        |> withSetLoading [ columnId ]

                Nothing ->
                    GitHub.addContentCardAfter token columnId contentId afterId
                        |> Task.attempt (CardMoved columnId)
                        |> withSetLoading [ columnId ]


unassignUsers : Model -> List GitHub.User -> GitHub.ID -> Cmd Msg
unassignUsers model users id =
    withTokenOrLogIn model <|
        \token ->
            GitHub.unassign token (List.map .id users) id
                |> Task.attempt AssigneesUpdated
                |> withSetLoading [ id ]


assignUsers : Model -> List GitHub.User -> GitHub.ID -> Cmd Msg
assignUsers model users id =
    withTokenOrLogIn model <|
        \token ->
            GitHub.assign token (List.map .id users) id
                |> Task.attempt AssigneesUpdated
                |> withSetLoading [ id ]


createLabel : Model -> GitHub.Repo -> Model.SharedLabel -> Cmd Msg
createLabel model repo label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.createRepoLabel token repo label.name label.color
                |> Task.attempt (LabelChanged repo)


updateLabel : Model -> GitHub.Repo -> GitHub.Label -> Model.SharedLabel -> Cmd Msg
updateLabel model repo label1 label2 =
    withTokenOrLogIn model <|
        \token ->
            GitHub.updateRepoLabel token repo label1 label2.name label2.color
                |> Task.attempt (LabelChanged repo)


deleteLabel : Model -> GitHub.Repo -> GitHub.Label -> Cmd Msg
deleteLabel model repo label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.deleteRepoLabel token repo label.name
                |> Task.attempt (LabelChanged repo)


addNoteCard : Model -> GitHub.ID -> String -> Cmd Msg
addNoteCard model colId note =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addNoteCard token colId note
                |> Task.map (always ())
                |> Task.attempt (DataChanged (Backend.refreshCards colId RefreshQueued))
                |> withSetLoading [ colId ]


updateCardNote : Model -> GitHub.ID -> String -> Cmd Msg
updateCardNote model cardId note =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok { columnId } ->
                            DataChanged (refreshColumnCards columnId) (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.updateCardNote token cardId note
                |> Task.attempt refreshColumn
                |> withSetLoading [ cardId ]


convertNoteToIssue : Model -> GitHub.ID -> GitHub.ID -> String -> String -> Cmd Msg
convertNoteToIssue model cardId repoId title body =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok { columnId } ->
                            DataChanged (refreshColumnCards columnId) (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.convertCardToIssue token cardId repoId title body
                |> Task.attempt refreshColumn
                |> withSetLoading [ cardId ]


setProjectCardArchived : Model -> GitHub.ID -> Bool -> Cmd Msg
setProjectCardArchived model cardId archived =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok { columnId } ->
                            DataChanged (refreshColumnCards columnId) (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.setCardArchived token cardId archived
                |> Task.attempt refreshColumn
                |> withSetLoading [ cardId ]


deleteProjectCard : Model -> GitHub.ID -> Cmd Msg
deleteProjectCard model cardId =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok (Just colId) ->
                            DataChanged (refreshColumnCards colId) (Ok ())

                        Ok Nothing ->
                            DataChanged Cmd.none (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.deleteProjectCard token cardId
                |> Task.attempt refreshColumn
                |> withSetLoading [ cardId ]


addIssueLabels : Model -> GitHub.Issue -> List String -> Cmd Msg
addIssueLabels model issue labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addIssueLabels token issue labels
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))
                |> withSetLoading [ issue.id ]


removeIssueLabel : Model -> GitHub.Issue -> String -> Cmd Msg
removeIssueLabel model issue label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removeIssueLabel token issue label
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))
                |> withSetLoading [ issue.id ]


addPullRequestLabels : Model -> GitHub.PullRequest -> List String -> Cmd Msg
addPullRequestLabels model pr labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addPullRequestLabels token pr labels
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))
                |> withSetLoading [ pr.id ]


removePullRequestLabel : Model -> GitHub.PullRequest -> String -> Cmd Msg
removePullRequestLabel model pr label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removePullRequestLabel token pr label
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))
                |> withSetLoading [ pr.id ]


contentCardId : Model -> GitHub.ID -> GitHub.ID -> Maybe GitHub.ID
contentCardId model projectId contentId =
    case Dict.get contentId model.cards of
        Just card ->
            case List.filter ((==) projectId << .id << .project) card.cards of
                [ c ] ->
                    Just c.id

                _ ->
                    Nothing

        Nothing ->
            Nothing
