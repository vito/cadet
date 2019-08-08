module Effects exposing
    ( addCard
    , addIssueLabels
    , addNoteCard
    , addPullRequestLabels
    , contentCardId
    , createLabel
    , deleteLabel
    , deleteProjectCard
    , findCardColumns
    , moveCard
    , removeIssueLabel
    , removePullRequestLabel
    , setProjectCardArchived
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


moveCard : Model -> Model.CardDestination -> GitHub.ID -> Cmd Msg
moveCard model { columnId, afterId } cardId =
    withTokenOrLogIn model <|
        \token ->
            GitHub.moveCardAfter token columnId cardId afterId
                |> Task.attempt (CardMoved columnId)


addCard : Model -> Model.CardDestination -> GitHub.ID -> Cmd Msg
addCard model { projectId, columnId, afterId } contentId =
    withTokenOrLogIn model <|
        \token ->
            case contentCardId model projectId contentId of
                Just cardId ->
                    GitHub.moveCardAfter token columnId cardId afterId
                        |> Task.attempt (CardMoved columnId)

                Nothing ->
                    GitHub.addContentCardAfter token columnId contentId afterId
                        |> Task.attempt (CardMoved columnId)


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


findCardColumns : Model -> GitHub.ID -> List GitHub.ID
findCardColumns model cardId =
    Dict.foldl
        (\columnId cards columnIds ->
            if List.any ((==) cardId << .id) cards then
                columnId :: columnIds

            else
                columnIds
        )
        []
        model.columnCards


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


addIssueLabels : Model -> GitHub.Issue -> List String -> Cmd Msg
addIssueLabels model issue labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addIssueLabels token issue labels
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))


addNoteCard : Model -> GitHub.ID -> String -> Cmd Msg
addNoteCard model colId note =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addNoteCard token colId note
                |> Task.map (always ())
                |> Task.attempt (DataChanged (Backend.refreshCards colId RefreshQueued))


updateCardNote : Model -> GitHub.ID -> String -> Cmd Msg
updateCardNote model cardId note =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok { columnId } ->
                            DataChanged (Backend.refreshCards columnId RefreshQueued) (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.updateCardNote token cardId note
                |> Task.attempt refreshColumn


setProjectCardArchived : Model -> GitHub.ID -> Bool -> Cmd Msg
setProjectCardArchived model cardId archived =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok { columnId } ->
                            DataChanged (Backend.refreshCards columnId RefreshQueued) (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.setCardArchived token cardId archived
                |> Task.attempt refreshColumn


deleteProjectCard : Model -> GitHub.ID -> Cmd Msg
deleteProjectCard model cardId =
    withTokenOrLogIn model <|
        \token ->
            let
                refreshColumn res =
                    case res of
                        Ok (Just colId) ->
                            DataChanged (Backend.refreshCards colId RefreshQueued) (Ok ())

                        Ok Nothing ->
                            DataChanged Cmd.none (Ok ())

                        Err msg ->
                            DataChanged Cmd.none (Err msg)
            in
            GitHub.deleteProjectCard token cardId
                |> Task.attempt refreshColumn


removeIssueLabel : Model -> GitHub.Issue -> String -> Cmd Msg
removeIssueLabel model issue label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removeIssueLabel token issue label
                |> Task.attempt (DataChanged (Backend.refreshIssue issue.id RefreshQueued))


addPullRequestLabels : Model -> GitHub.PullRequest -> List String -> Cmd Msg
addPullRequestLabels model pr labels =
    withTokenOrLogIn model <|
        \token ->
            GitHub.addPullRequestLabels token pr labels
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))


removePullRequestLabel : Model -> GitHub.PullRequest -> String -> Cmd Msg
removePullRequestLabel model pr label =
    withTokenOrLogIn model <|
        \token ->
            GitHub.removePullRequestLabel token pr label
                |> Task.attempt (DataChanged (Backend.refreshPR pr.id RefreshQueued))
