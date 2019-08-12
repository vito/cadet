port module Main exposing (main)

import Activity
import Backend
import Browser
import Browser.Dom
import Browser.Navigation as Nav
import Card exposing (Card)
import Colors
import DateFormat
import Dict exposing (Dict)
import Drag
import Effects
import ForceGraph exposing (ForceGraph)
import GitHub
import Hash
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Keyboard.Event
import Keyboard.Key
import Label
import List.Extra as LE
import Log
import Markdown
import Maybe.Extra as ME
import Model exposing (Model, Msg(..), Page(..))
import Octicons
import OrderedSet
import ParseInt
import Project
import Query
import Random
import Regex exposing (Regex)
import Set exposing (Set)
import Shape
import StatefulGraph
import Task
import Time
import Url exposing (Url)
import Url.Builder as UB
import Url.Parser as UP exposing ((</>), (<?>))
import Url.Parser.Query as UQ


port eventReceived : (( String, String, String ) -> msg) -> Sub msg


type alias Config =
    { initialTime : Int
    }


main : Program Config Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


init : Config -> Url -> Nav.Key -> ( Model, Cmd Msg )
init config url key =
    let
        model =
            Model.empty key

        ( navedModel, navedMsgs ) =
            update (UrlChanged url) model
    in
    ( { navedModel | currentTime = Time.millisToPosix config.initialTime }
    , Cmd.batch
        [ Backend.fetchData DataFetched
        , Backend.fetchMe MeFetched
        , navedMsgs
        , Task.perform SetCurrentZone Time.here
        ]
    )


routeParser : UP.Parser (Page -> a) a
routeParser =
    UP.oneOf
        [ UP.map AllProjectsPage UP.top
        , UP.map AllProjectsPage (UP.s "projects")
        , UP.map ProjectPage (UP.s "projects" </> UP.string)
        , UP.map GlobalGraphPage (UP.s "graph")
        , UP.map LabelsPage (UP.s "labels")
        , UP.map ReleaseRepoPage (UP.s "release" </> UP.string <?> UQ.int "tab")
        , UP.map ReleasePage (UP.s "release")
        , UP.map PullRequestsPage (UP.s "pull-requests")
        , UP.map PullRequestsRepoPage (UP.s "pull-requests" </> UP.string <?> UQ.int "tab")
        , UP.map ArchivePage (UP.s "archive")
        , UP.map BouncePage (UP.s "auth" </> UP.s "github")
        , UP.map BouncePage (UP.s "auth")
        , UP.map BouncePage (UP.s "logout")
        ]


pageRoute : Page -> List String
pageRoute page =
    case page of
        AllProjectsPage ->
            []

        ProjectPage id ->
            [ "projects", id ]

        GlobalGraphPage ->
            [ "graph" ]

        LabelsPage ->
            [ "labels" ]

        ReleaseRepoPage r _ ->
            [ "release", r ]

        ReleasePage ->
            [ "release" ]

        PullRequestsPage ->
            [ "pull-requests" ]

        PullRequestsRepoPage r _ ->
            [ "pull-requests", r ]

        ArchivePage ->
            [ "archive" ]

        BouncePage ->
            []


pageTab : Page -> Int
pageTab page =
    case page of
        ReleaseRepoPage _ mi ->
            Maybe.withDefault 0 mi

        PullRequestsRepoPage _ mi ->
            Maybe.withDefault 0 mi

        _ ->
            0


subscriptions : Model -> Sub Msg
subscriptions _ =
    let
        minute =
            60 * 1000
    in
    Sub.batch
        [ eventReceived EventReceived
        , Time.every minute (always Poll)
        , Time.every (60 * minute) SetCurrentTime
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model, Cmd.none )

        Poll ->
            ( model, Backend.fetchData DataFetched )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            case UP.parse routeParser url of
                Just BouncePage ->
                    ( model, Nav.load (Url.toString url) )

                Just page ->
                    ( { model | page = page }
                        |> computeViewForPage
                    , Cmd.none
                    )

                Nothing ->
                    -- 404 would be nice
                    ( model, Cmd.none )

        SetCurrentTime date ->
            ( StatefulGraph.update { model | currentTime = date }, Cmd.none )

        SetCurrentZone zone ->
            ( { model | currentZone = zone }, Cmd.none )

        SetLoading ids cmd ->
            ( setLoading ids model, cmd )

        ProjectDrag subMsg ->
            let
                dragModel =
                    Drag.update subMsg model.projectDrag

                newModel =
                    { model | projectDrag = dragModel }
            in
            case dragModel of
                Drag.Dropping state ->
                    update state.msg { newModel | projectDrag = Drag.drop newModel.projectDrag }

                _ ->
                    ( newModel, Cmd.none )

        MoveCardAfter source dest ->
            case source of
                Model.FromColumnCardSource { cardId } ->
                    ( model, Effects.moveCard model dest cardId )

                Model.NewContentCardSource { contentId } ->
                    ( model, Effects.addCard model dest contentId )

        CardMoved targetCol (Ok card) ->
            case model.projectDrag of
                Drag.Dropped drag ->
                    let
                        colCard =
                            { id = card.id
                            , isArchived = card.isArchived
                            , contentId =
                                case card.content of
                                    Just (GitHub.IssueCardContent { id }) ->
                                        Just id

                                    Just (GitHub.PullRequestCardContent { id }) ->
                                        Just id

                                    Nothing ->
                                        Nothing
                            , note = card.note
                            }

                        removeCard =
                            List.filter ((/=) card.id << .id)

                        removeCardFromOldColumn =
                            case drag.source of
                                Model.FromColumnCardSource cs ->
                                    Dict.update cs.columnId (Maybe.map removeCard)

                                Model.NewContentCardSource _ ->
                                    identity

                        insertAfter id new cards =
                            case cards of
                                c :: rest ->
                                    if c.id == id then
                                        c :: new :: rest

                                    else
                                        c :: insertAfter id new rest

                                [] ->
                                    -- this shouldn't really happen
                                    [ new ]

                        insertCard cards =
                            case drag.target.afterId of
                                Nothing ->
                                    colCard :: cards

                                Just cardId ->
                                    insertAfter cardId colCard cards

                        addCardToNewColumn =
                            Dict.update targetCol (Maybe.map insertCard)

                        movedOptimistically =
                            { model | columnCards = addCardToNewColumn (removeCardFromOldColumn model.columnCards) }
                    in
                    ( { movedOptimistically | projectDrag = Drag.complete model.projectDrag }
                    , Cmd.batch
                        [ Effects.refreshColumnCards targetCol
                        , case card.content of
                            Just (GitHub.IssueCardContent issue) ->
                                Effects.refreshIssue issue.id

                            Just (GitHub.PullRequestCardContent pr) ->
                                Effects.refreshPR pr.id

                            Nothing ->
                                Cmd.none
                        , case drag.source of
                            Model.FromColumnCardSource cs ->
                                if cs.columnId == targetCol then
                                    Cmd.none

                                else
                                    Effects.refreshColumnCards cs.columnId

                            Model.NewContentCardSource _ ->
                                Cmd.none
                        ]
                    )

                _ ->
                    ( model, Cmd.none )

        CardMoved _ (Err err) ->
            -- TODO: update progress
            Log.debug "failed to move card" err <|
                ( model, Cmd.none )

        RefreshQueued (Ok ()) ->
            Log.debug "refresh queued" () ( model, Cmd.none )

        RefreshQueued (Err err) ->
            Log.debug "refresh failed" err <|
                ( model, Cmd.none )

        SearchCards str ->
            ( StatefulGraph.update
                { model
                    | cardSearch = str
                    , anticipatedCards = searchCards model str
                }
            , Cmd.none
            )

        SelectAnticipatedCards ->
            ( StatefulGraph.update
                { model
                    | anticipatedCards = Set.empty
                    , selectedCards = Set.foldl OrderedSet.insert model.selectedCards model.anticipatedCards
                }
            , Cmd.none
            )

        SelectCard id ->
            ( StatefulGraph.update { model | selectedCards = OrderedSet.insert id model.selectedCards }
            , Cmd.none
            )

        ClearSelectedCards ->
            ( StatefulGraph.update { model | selectedCards = OrderedSet.empty }
            , Cmd.none
            )

        DeselectCard id ->
            ( StatefulGraph.update { model | selectedCards = OrderedSet.remove id model.selectedCards }
            , Cmd.none
            )

        HighlightNode id ->
            ( StatefulGraph.update { model | highlightedNode = Just id }, Cmd.none )

        UnhighlightNode ->
            ( StatefulGraph.update { model | highlightedNode = Nothing }, Cmd.none )

        AnticipateCardFromNode id ->
            ( StatefulGraph.update
                { model
                    | anticipatedCards = Set.insert id model.anticipatedCards
                    , highlightedCard = Just id
                }
            , Cmd.none
            )

        UnanticipateCardFromNode id ->
            ( StatefulGraph.update
                { model
                    | anticipatedCards = Set.remove id model.anticipatedCards
                    , highlightedCard = Nothing
                }
            , Cmd.none
            )

        MeFetched (Ok me) ->
            ( StatefulGraph.update { model | me = me }, Cmd.none )

        MeFetched (Err err) ->
            Log.debug "error fetching self" err <|
                ( model, Cmd.none )

        EventReceived ( event, data, indexStr ) ->
            case String.toInt indexStr of
                Just index ->
                    if index >= model.dataIndex then
                        ( { model | dataIndex = index }
                            |> handleEvent event data index
                            |> computeViewForPage
                        , if index == model.dataIndex + 1 then
                            Cmd.none

                          else
                            Log.debug "skipped a data index; syncing" ( model.dataIndex, index ) <|
                                Backend.fetchData DataFetched
                        )

                    else
                        Log.debug "skipping event for stale index" ( model.dataIndex, index ) <|
                            ( model, Cmd.none )

                Nothing ->
                    Log.debug "invalid event index" indexStr <|
                        ( model, Cmd.none )

        DataFetched (Ok { index, value }) ->
            if index > model.dataIndex then
                ( { model
                    | dataIndex = index
                    , repos = value.repos
                    , repoProjects = value.repoProjects
                    , repoCommits = value.repoCommits
                    , repoLabels = value.repoLabels
                    , repoMilestones = value.repoMilestones
                    , repoReleases = value.repoReleases
                    , columnCards = value.columnCards
                    , progress = finishLoadingData value model.progress
                  }
                    |> computeDataView
                    |> computeViewForPage
                , Backend.fetchCardData CardDataFetched
                )

            else
                Log.debug "ignoring stale index" ( index, model.dataIndex ) <|
                    ( model, Cmd.none )

        DataFetched (Err err) ->
            Log.debug "error fetching data" err <|
                ( model, Cmd.none )

        CardDataFetched (Ok { index, value }) ->
            Log.debug "cards fetched" ( index, Dict.size value.issues + Dict.size value.prs ) <|
                ( { model
                    | issues = value.issues
                    , prs = value.prs
                    , cardEvents = value.cardEvents
                    , prReviewers = value.prReviewers
                    , progress = finishLoadingCardData value model.progress
                  }
                    |> computeCardsView
                    |> computeViewForPage
                , Backend.fetchGraphs GraphsFetched
                )

        CardDataFetched (Err err) ->
            Log.debug "error fetching cards" err <|
                ( model, Cmd.none )

        GraphsFetched (Ok { index, value }) ->
            Log.debug "graphs fetched" ( index, List.length value ) <|
                ( { model | graphs = value }
                    |> StatefulGraph.init
                    |> computeViewForPage
                , Cmd.none
                )

        GraphsFetched (Err err) ->
            Log.debug "error fetching graphs" err <|
                ( model, Cmd.none )

        MirrorLabel newLabel ->
            let
                cmds =
                    Dict.foldl
                        (\_ r acc ->
                            let
                                labels =
                                    Maybe.withDefault [] (Dict.get r.id model.repoLabels)
                            in
                            case List.filter ((==) newLabel.name << .name) labels of
                                [] ->
                                    Effects.createLabel model r newLabel :: acc

                                label :: _ ->
                                    if label.color == newLabel.color then
                                        acc

                                    else
                                        Effects.updateLabel model r label newLabel :: acc
                        )
                        []
                        model.repos
            in
            ( model, Cmd.batch cmds )

        StartDeletingLabel label ->
            ( { model | deletingLabels = Set.insert (labelKey label) model.deletingLabels }, Cmd.none )

        StopDeletingLabel label ->
            ( { model | deletingLabels = Set.remove (labelKey label) model.deletingLabels }, Cmd.none )

        DeleteLabel label ->
            let
                cmds =
                    Dict.foldl
                        (\_ r acc ->
                            let
                                labels =
                                    Maybe.withDefault [] (Dict.get r.id model.repoLabels)
                            in
                            case List.filter (matchesLabel label) labels of
                                [] ->
                                    acc

                                repoLabel :: _ ->
                                    Effects.deleteLabel model r repoLabel :: acc
                        )
                        []
                        model.repos
            in
            ( { model | deletingLabels = Set.remove (labelKey label) model.deletingLabels }, Cmd.batch cmds )

        StartEditingLabel label ->
            ( { model | editingLabels = Dict.insert (labelKey label) label model.editingLabels }, Cmd.none )

        StopEditingLabel label ->
            ( { model | editingLabels = Dict.remove (labelKey label) model.editingLabels }, Cmd.none )

        SetLabelName label newName ->
            ( { model
                | editingLabels =
                    Dict.update (labelKey label) (Maybe.map (\newLabel -> { newLabel | name = newName })) model.editingLabels
              }
            , Cmd.none
            )

        SetLabelColor newColor ->
            let
                newLabel =
                    model.newLabel
            in
            ( { model
                | newLabel =
                    if String.isEmpty newLabel.name then
                        newLabel

                    else
                        { newLabel | color = newColor }
                , newLabelColored = not (String.isEmpty newLabel.name)
                , editingLabels =
                    Dict.map (\_ label -> { label | color = newColor }) model.editingLabels
              }
            , Cmd.none
            )

        RandomizeLabelColor label ->
            case Dict.get (labelKey label) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    ( { model
                        | editingLabels =
                            Dict.insert (labelKey label) (randomizeColor newLabel) model.editingLabels
                      }
                    , Cmd.none
                    )

        EditLabel oldLabel ->
            case Dict.get (labelKey oldLabel) model.editingLabels of
                Nothing ->
                    ( model, Cmd.none )

                Just newLabel ->
                    let
                        cmds =
                            Dict.foldl
                                (\_ r acc ->
                                    let
                                        labels =
                                            Maybe.withDefault [] (Dict.get r.id model.repoLabels)
                                    in
                                    case List.filter (matchesLabel oldLabel) labels of
                                        repoLabel :: _ ->
                                            Effects.updateLabel model r repoLabel newLabel :: acc

                                        _ ->
                                            acc
                                )
                                []
                                model.repos
                    in
                    ( { model | editingLabels = Dict.remove (labelKey oldLabel) model.editingLabels }, Cmd.batch cmds )

        CreateLabel ->
            if model.newLabel.name == "" then
                ( model, Cmd.none )

            else
                update (MirrorLabel model.newLabel)
                    { model
                        | newLabel = { name = "", color = "ffffff" }
                        , newLabelColored = False
                    }

        RandomizeNewLabelColor ->
            ( { model | newLabel = randomizeColor model.newLabel, newLabelColored = True }, Cmd.none )

        SetNewLabelName name ->
            let
                newLabel =
                    model.newLabel

                newColor =
                    if model.newLabelColored then
                        model.newLabel.color

                    else
                        generateColor (Hash.hash name)
            in
            ( { model | newLabel = { newLabel | name = name, color = newColor } }, Cmd.none )

        LabelChanged repo (Ok ()) ->
            -- TODO: progress
            let
                repoSel =
                    { owner = repo.owner, name = repo.name }
            in
            ( model, Backend.refreshRepo repoSel RefreshQueued )

        LabelChanged _ (Err err) ->
            Log.debug "failed to modify labels" err <|
                ( model, Cmd.none )

        LabelCard card label ->
            case card.content of
                GitHub.IssueCardContent issue ->
                    ( model, Effects.addIssueLabels model issue [ label ] )

                GitHub.PullRequestCardContent pr ->
                    ( model, Effects.addPullRequestLabels model pr [ label ] )

        UnlabelCard card label ->
            case card.content of
                GitHub.IssueCardContent issue ->
                    ( model, Effects.removeIssueLabel model issue label )

                GitHub.PullRequestCardContent pr ->
                    ( model, Effects.removePullRequestLabel model pr label )

        DataChanged cb (Ok ()) ->
            ( model, cb )

        DataChanged _ (Err err) ->
            Log.debug "failed to change data" err <|
                ( model, Cmd.none )

        RefreshIssue id ->
            ( model, Effects.refreshIssue id )

        RefreshPullRequest id ->
            ( model, Effects.refreshPR id )

        RefreshColumn id ->
            ( model, Effects.refreshColumnCards id )

        AddFilter filter ->
            ( StatefulGraph.init { model | graphFilters = filter :: model.graphFilters }
            , Cmd.none
            )

        RemoveFilter filter ->
            ( StatefulGraph.init { model | graphFilters = List.filter ((/=) filter) model.graphFilters }
            , Cmd.none
            )

        SetGraphSort sort ->
            ( StatefulGraph.init { model | graphSort = sort }, Cmd.none )

        ToggleLabelFilters ->
            ( StatefulGraph.init { model | showLabelFilters = not model.showLabelFilters }, Cmd.none )

        SetLabelSearch string ->
            ( { model | labelSearch = string }, Cmd.none )

        ToggleLabelOperations ->
            ( if model.showLabelOperations then
                { model
                    | showLabelOperations = False
                    , labelSearch = ""
                    , cardLabelOperations = Dict.empty
                }

              else
                { model | showLabelOperations = True }
            , Cmd.none
            )

        SetLabelOperation name op ->
            ( { model | cardLabelOperations = Dict.insert name op model.cardLabelOperations }, Cmd.none )

        UnsetLabelOperation name ->
            ( { model | cardLabelOperations = Dict.remove name model.cardLabelOperations }, Cmd.none )

        ApplyLabelOperations ->
            ( model, performLabelOperations model )

        SetCreatingColumnNote id note ->
            ( { model | addingColumnNotes = Dict.insert id note model.addingColumnNotes }
            , Task.attempt (always Noop) (Browser.Dom.focus (addNoteTextareaId id))
            )

        CancelCreatingColumnNote id ->
            ( { model | addingColumnNotes = Dict.remove id model.addingColumnNotes }, Cmd.none )

        CreateColumnNote id ->
            -- TODO: progress
            ( { model | addingColumnNotes = Dict.remove id model.addingColumnNotes }
            , case Maybe.withDefault "" <| Dict.get id model.addingColumnNotes of
                "" ->
                    Cmd.none

                note ->
                    Effects.addNoteCard model id note
            )

        ConfirmDeleteCard id ->
            ( { model | deletingCards = Set.insert id model.deletingCards }, Cmd.none )

        CancelDeleteCard id ->
            ( { model | deletingCards = Set.remove id model.deletingCards }, Cmd.none )

        DeleteCard id ghCardId ->
            -- TODO: progress
            ( { model | deletingCards = Set.remove id model.deletingCards }
            , Effects.deleteProjectCard model ghCardId
            )

        SetCardArchived ghCardId archived ->
            ( model, Effects.setProjectCardArchived model ghCardId archived )

        SetEditingCardNote id val ->
            ( { model | editingCardNotes = Dict.insert id val model.editingCardNotes }, Cmd.none )

        CancelEditingCardNote id ->
            ( { model | editingCardNotes = Dict.remove id model.editingCardNotes }, Cmd.none )

        UpdateCardNote id ->
            ( { model | editingCardNotes = Dict.remove id model.editingCardNotes }
            , case Maybe.withDefault "" <| Dict.get id model.editingCardNotes of
                "" ->
                    Cmd.none

                note ->
                    Effects.updateCardNote model id note
            )

        ConvertEditingCardNoteToIssue id repoId ->
            ( { model | editingCardNotes = Dict.remove id model.editingCardNotes }
            , let
                note =
                    Maybe.withDefault "" <| Dict.get id model.editingCardNotes

                lines =
                    String.lines note
              in
              case lines of
                [] ->
                    Cmd.none

                title :: rest ->
                    let
                        body =
                            String.trim (String.join "\n" rest)
                    in
                    Effects.convertNoteToIssue model id repoId title body
            )

        ToggleShowArchivedCards id ->
            ( { model
                | showArchivedCards =
                    if Set.member id model.showArchivedCards then
                        Set.remove id model.showArchivedCards

                    else
                        Set.insert id model.showArchivedCards
              }
            , Cmd.none
            )


view : Model -> Browser.Document Msg
view model =
    { title = pageTitle model
    , body = [ viewCadet model ]
    }


performLabelOperations : Model -> Cmd Msg
performLabelOperations model =
    let
        cards =
            List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)

        ( addPairs, removePairs ) =
            Dict.toList model.cardLabelOperations
                |> List.partition ((==) Model.AddLabelOperation << Tuple.second)

        labelsToAdd =
            List.map Tuple.first addPairs

        labelsToRemove =
            List.map Tuple.first removePairs

        adds =
            List.map
                (\card ->
                    case card.content of
                        GitHub.IssueCardContent issue ->
                            Effects.addIssueLabels model issue labelsToAdd

                        GitHub.PullRequestCardContent pr ->
                            Effects.addPullRequestLabels model pr labelsToAdd
                )
                cards

        removals =
            List.concatMap
                (\name ->
                    List.filterMap
                        (\card ->
                            if hasLabel model name card then
                                case card.content of
                                    GitHub.IssueCardContent issue ->
                                        Just (Effects.removeIssueLabel model issue name)

                                    GitHub.PullRequestCardContent pr ->
                                        Just (Effects.removePullRequestLabel model pr name)

                            else
                                Nothing
                        )
                        cards
                )
                labelsToRemove
    in
    Cmd.batch (adds ++ removals)


searchCards : Model -> String -> Set GitHub.ID
searchCards model str =
    let
        tokens =
            String.split " " str

        ( filterTokens, rest ) =
            List.partition (String.contains ":") tokens

        filters =
            List.map (String.split ":" >> searchFilter model) filterTokens

        query =
            String.toLower (String.join " " rest)

        titleMatch t _ =
            Query.matchWords query t /= Nothing
    in
    if String.length query < 2 then
        -- don't bother querying with so few characters
        Set.empty

    else
        filteredCardsByTitle model filters
            |> Dict.filter titleMatch
            |> Dict.foldl (\_ -> Set.insert) Set.empty


searchFilter : Model -> List String -> Card -> Bool
searchFilter model filter card =
    case filter of
        [ "label", name ] ->
            hasLabel model name card

        [ "is", "pr" ] ->
            Card.isPR card

        [ "is", "issue" ] ->
            not (Card.isPR card)

        [ "is", "open" ] ->
            Card.isOpen card

        [ "is", "closed" ] ->
            not (Card.isOpen card)

        _ ->
            False


filteredCardsByTitle : Model -> List (Card -> Bool) -> Dict String GitHub.ID
filteredCardsByTitle model filters =
    Dict.foldl
        (\_ card ->
            if List.all (\f -> f card) filters then
                Dict.insert (String.toLower card.title) card.id

            else
                identity
        )
        Dict.empty
        model.cards


addToList : x -> Maybe (List x) -> Maybe (List x)
addToList x entry =
    case entry of
        Nothing ->
            Just [ x ]

        Just xs ->
            Just (x :: xs)


computeViewForPage : Model -> Model
computeViewForPage model =
    let
        reset =
            { model
                | baseGraphFilter = Nothing
                , suggestedLabels = []
            }
    in
    case model.page of
        GlobalGraphPage ->
            reset
                |> StatefulGraph.init
                |> StatefulGraph.update

        ProjectPage id ->
            case Dict.get id model.projects of
                Just project ->
                    { reset | baseGraphFilter = Just (Model.InProjectFilter project.id) }
                        |> StatefulGraph.init
                        |> StatefulGraph.update

                Nothing ->
                    reset

        ReleasePage ->
            reset
                |> computeReleaseRepos

        ReleaseRepoPage _ _ ->
            { reset
                | suggestedLabels =
                    [ "release/documented"
                    , "release/undocumented"
                    , "release/no-impact"
                    ]
            }
                |> computeReleaseRepos

        PullRequestsRepoPage _ _ ->
            { reset
                | suggestedLabels =
                    [ "needs-test"
                    , "blocked"
                    ]
            }

        _ ->
            reset


computeDataView : Model -> Model
computeDataView model =
    let
        reposByName =
            Dict.foldl (\id { name } -> Dict.insert name id) Dict.empty model.repos

        allProjects =
            model.repoProjects
                |> Dict.values
                |> List.concat

        projects =
            List.foldl (\project -> Dict.insert project.id project) Dict.empty allProjects

        idsByUrl =
            List.foldl (\{ id, url } -> Dict.insert url id) model.idsByUrl allProjects

        allLabels =
            Dict.foldl
                (\_ labels als ->
                    List.foldl
                        (\label -> Dict.insert label.id { label | color = String.toLower label.color })
                        als
                        labels
                )
                Dict.empty
                model.repoLabels

        groupRepoLabels =
            Dict.foldl
                (\repoId labels cbn ->
                    List.foldl
                        (\label -> Dict.update ( label.name, String.toLower label.color ) (addToList repoId))
                        cbn
                        labels
                )
                Dict.empty
                model.repoLabels

        setRepoLabelId label repoId mrc =
            case mrc of
                Just rc ->
                    Just (Dict.insert repoId label.id rc)

                Nothing ->
                    Just (Dict.singleton repoId label.id)

        groupLabelsToRepoToId =
            Dict.foldl
                (\repoId labels lrc ->
                    List.foldl
                        (\label -> Dict.update label.name (setRepoLabelId label repoId))
                        lrc
                        labels
                )
                Dict.empty
                model.repoLabels
    in
    Label.cacheColorLightness
        { model
            | reposByName = reposByName
            , projects = projects
            , idsByUrl = idsByUrl
            , reposByLabel = groupRepoLabels
            , labelToRepoToId = groupLabelsToRepoToId
            , allLabels = allLabels
        }


computeCardsView : Model -> Model
computeCardsView model =
    let
        cards =
            Dict.union
                (Dict.map (always Card.fromIssue) model.issues)
                (Dict.map (always Card.fromPR) model.prs)

        idsByUrl =
            Dict.foldl (\_ { id, url } -> Dict.insert url id) model.idsByUrl cards

        openPRsByRepo =
            Dict.foldl
                (\_ pr prs ->
                    if pr.state == GitHub.PullRequestStateOpen then
                        Dict.update pr.repo.id (addToList pr.id) prs

                    else
                        prs
                )
                Dict.empty
                model.prs

        cardsByMilestone =
            Dict.foldl
                (\id card cbm ->
                    case card.milestone of
                        Just milestone ->
                            Dict.update milestone.id (addToList id) cbm

                        Nothing ->
                            cbm
                )
                Dict.empty
                cards
    in
    { model
        | cards = cards
        , idsByUrl = idsByUrl
        , openPRsByRepo = openPRsByRepo
        , cardsByMilestone = cardsByMilestone
        , archive = computeArchive model cards
    }


makeReleaseRepo : Model -> GitHub.Repo -> Model.ReleaseRepo
makeReleaseRepo model repo =
    let
        nextMilestone =
            Dict.get repo.id model.repoMilestones
                |> Maybe.withDefault []
                |> List.filter ((==) GitHub.MilestoneStateOpen << .state)
                |> List.filter (String.startsWith "v" << .title)
                |> List.sortBy .title
                |> List.head

        commitsSinceLastRelease =
            Dict.get repo.id model.repoCommits
                |> Maybe.withDefault []

        mergedPRCards =
            commitsSinceLastRelease
                |> List.concatMap .associatedPullRequests
                |> LE.unique
                |> List.filterMap (\id -> Dict.get id model.cards)

        issueOrOpenPR cardId =
            case Dict.get cardId model.cards of
                Nothing ->
                    Nothing

                Just card ->
                    if Card.isMerged card then
                        -- don't double-count merged PRs - they are collected via the
                        -- commits
                        Nothing

                    else
                        Just card

        milestoneCards =
            case nextMilestone of
                Nothing ->
                    []

                Just nm ->
                    Dict.get nm.id model.cardsByMilestone
                        |> Maybe.withDefault []
                        |> List.filterMap issueOrOpenPR

        allCards =
            milestoneCards ++ mergedPRCards

        categorizeByDocumentedState card sir =
            if hasLabel model "release/documented" card then
                { sir | documentedCards = card :: sir.documentedCards }

            else if hasLabel model "release/undocumented" card then
                { sir | undocumentedCards = card :: sir.undocumentedCards }

            else if hasLabel model "release/no-impact" card then
                { sir | noImpactCards = card :: sir.noImpactCards }

            else
                { sir | doneCards = card :: sir.doneCards }

        categorizeByCardState card sir =
            case card.state of
                Card.IssueState GitHub.IssueStateOpen ->
                    { sir | openIssues = card :: sir.openIssues }

                Card.IssueState GitHub.IssueStateClosed ->
                    { sir | closedIssues = card :: sir.closedIssues }

                Card.PullRequestState GitHub.PullRequestStateOpen ->
                    { sir | openPRs = card :: sir.openPRs }

                Card.PullRequestState GitHub.PullRequestStateMerged ->
                    { sir | mergedPRs = card :: sir.mergedPRs }

                Card.PullRequestState GitHub.PullRequestStateClosed ->
                    -- ignored
                    sir

        categorizeCard card sir =
            let
                byState =
                    categorizeByCardState card sir
            in
            if Card.isOpen card then
                byState

            else
                categorizeByDocumentedState card byState
    in
    List.foldl categorizeCard
        { repo = repo
        , nextMilestone = nextMilestone
        , totalCommits = List.length commitsSinceLastRelease
        , openPRs = []
        , mergedPRs = []
        , openIssues = []
        , closedIssues = []
        , doneCards = []
        , documentedCards = []
        , undocumentedCards = []
        , noImpactCards = []
        }
        allCards


computeReleaseRepos : Model -> Model
computeReleaseRepos model =
    let
        addReleaseRepo _ repo acc =
            let
                releaseRepo =
                    makeReleaseRepo model repo
            in
            case ( releaseRepo.nextMilestone, releaseRepo.totalCommits ) of
                ( Nothing, 0 ) ->
                    acc

                _ ->
                    Dict.insert repo.name releaseRepo acc
    in
    { model | releaseRepos = Dict.foldl addReleaseRepo Dict.empty model.repos }


titleSuffix : String -> String
titleSuffix s =
    s ++ " - Cadet"


pageTitle : Model -> String
pageTitle model =
    titleSuffix <|
        case model.page of
            AllProjectsPage ->
                "Projects"

            GlobalGraphPage ->
                "Graph"

            ProjectPage id ->
                Dict.get id model.projects
                    |> Maybe.map .name
                    |> Maybe.withDefault "Unknown Project"

            LabelsPage ->
                "Labels"

            ReleasePage ->
                "Releases"

            ReleaseRepoPage repoName _ ->
                repoName ++ " Release"

            PullRequestsPage ->
                "Pull Requests"

            PullRequestsRepoPage repoName _ ->
                repoName ++ "Pull Requests"

            ArchivePage ->
                "Archive"

            BouncePage ->
                "Bounce"


viewCadet : Model -> Html Msg
viewCadet model =
    Html.div [ HA.class "cadet" ]
        [ viewNavBar model
        , Html.div [ HA.class "side-by-side" ]
            [ viewPage model
            , viewSidebar model
            ]
        ]


viewPage : Model -> Html Msg
viewPage model =
    Html.div [ HA.class "main-content" ]
        [ case model.page of
            AllProjectsPage ->
                viewAllProjectsPage model

            GlobalGraphPage ->
                viewGlobalGraphPage model

            ProjectPage id ->
                case Dict.get id model.projects of
                    Just project ->
                        viewProjectPage model project

                    Nothing ->
                        Html.text "project not found"

            LabelsPage ->
                viewLabelsPage model

            ReleasePage ->
                viewReleasePage model

            ReleaseRepoPage repoName _ ->
                case Dict.get repoName model.releaseRepos of
                    Just sir ->
                        viewReleaseRepoPage model sir

                    Nothing ->
                        Html.text "repo not found"

            PullRequestsPage ->
                viewPullRequestsPage model

            PullRequestsRepoPage repoName _ ->
                viewRepoPullRequestsPage model repoName

            ArchivePage ->
                viewArchivePage model

            BouncePage ->
                Html.text "you shouldn't see this"
        ]


viewSidebar : Model -> Html Msg
viewSidebar model =
    let
        anticipatedCards =
            Set.toList model.anticipatedCards
                |> List.filter (not << (\a -> OrderedSet.member a model.selectedCards))
                |> List.filterMap (\a -> Dict.get a model.cards)
                |> List.map (viewCardEntry model)

        selectedCards =
            OrderedSet.toList model.selectedCards
                |> List.filterMap (\a -> Dict.get a model.cards)
                |> List.map (viewCardEntry model)

        sidebarCards =
            selectedCards ++ anticipatedCards
    in
    if List.isEmpty sidebarCards then
        Html.text ""

    else
        Html.div [ HA.class "main-sidebar" ]
            [ viewSidebarControls model
            , Html.div [ HA.class "cards" ] sidebarCards
            ]


viewSidebarControls : Model -> Html Msg
viewSidebarControls model =
    let
        viewLabelOperation name color =
            let
                ( checkClass, icon, clickOperation ) =
                    case Dict.get name model.cardLabelOperations of
                        Just Model.AddLabelOperation ->
                            ( "checked", Octicons.check octiconOpts, SetLabelOperation name Model.RemoveLabelOperation )

                        Just Model.RemoveLabelOperation ->
                            ( "unhecked", Octicons.plus octiconOpts, UnsetLabelOperation name )

                        Nothing ->
                            let
                                cards =
                                    List.filterMap (\a -> Dict.get a model.cards) (OrderedSet.toList model.selectedCards)
                            in
                            if not (List.isEmpty cards) && List.all (hasLabel model name) cards then
                                ( "checked", Octicons.check octiconOpts, SetLabelOperation name Model.RemoveLabelOperation )

                            else if List.any (hasLabel model name) cards then
                                ( "mixed", Octicons.dash octiconOpts, SetLabelOperation name Model.AddLabelOperation )

                            else
                                ( "unchecked", Octicons.plus octiconOpts, SetLabelOperation name Model.AddLabelOperation )
            in
            Html.div [ HA.class "label-operation" ]
                [ Html.span [ HA.class ("checkbox " ++ checkClass), HE.onClick clickOperation ]
                    [ icon ]
                , Html.span
                    ([ HA.class "label"
                     , HE.onClick (AddFilter (Model.HasLabelFilter name color))
                     ]
                        ++ Label.colorStyles model color
                    )
                    [ Html.span [ HA.class "label-text" ]
                        [ Html.text name ]
                    ]
                ]

        labelOptions =
            if model.showLabelOperations then
                Dict.keys model.reposByLabel
                    |> List.filter (String.contains model.labelSearch << Tuple.first)
                    |> List.map (\( a, b ) -> viewLabelOperation a b)

            else
                []
    in
    Html.div [ HA.class "sidebar-controls" ]
        [ Html.div [ HA.class "control-knobs" ]
            [ Html.span [ HA.class "controls-label" ] [ Html.text "change:" ]
            , Html.div
                [ HA.classList [ ( "control-setting", True ), ( "active", model.showLabelOperations ) ]
                , HE.onClick ToggleLabelOperations
                ]
                [ Octicons.tag octiconOpts
                , Html.text "labels"
                ]
            , Html.span
                [ HE.onClick ClearSelectedCards
                , HA.class "clear-selected"
                ]
                [ Octicons.x octiconOpts ]
            ]
        , Html.div [ HA.classList [ ( "label-operations", True ), ( "visible", model.showLabelOperations ) ] ]
            [ Html.input [ HA.type_ "text", HA.placeholder "search labels", HE.onInput SetLabelSearch ] []
            , Html.div [ HA.class "label-options" ] labelOptions
            , Html.div [ HA.class "buttons" ]
                [ Html.div [ HA.class "button cancel", HE.onClick ToggleLabelOperations ]
                    [ Octicons.x octiconOpts
                    , Html.text "cancel"
                    ]
                , Html.div [ HA.class "button apply", HE.onClick ApplyLabelOperations ]
                    [ Octicons.check octiconOpts
                    , Html.text "apply"
                    ]
                ]
            ]
        ]


viewGlobalGraphPage : Model -> Html Msg
viewGlobalGraphPage model =
    Html.div [ HA.class "all-issues-graph" ]
        [ Html.div [ HA.class "column-title" ]
            [ Octicons.circuitBoard octiconOpts
            , Html.text "Issue Graph"
            ]
        , StatefulGraph.view model
        ]


hideLabel : String -> Html Msg
hideLabel x =
    Html.span [ HA.class "hide-label" ] [ Html.text x ]


viewNavBar : Model -> Html Msg
viewNavBar model =
    Html.div [ HA.class "nav-bar" ]
        [ Html.div [ HA.class "nav" ]
            [ Html.a [ HA.class "button", HA.href "/" ]
                [ Octicons.project octiconOpts
                , hideLabel "Projects"
                ]
            , Html.a [ HA.class "button", HA.href "/archive" ]
                [ Octicons.history octiconOpts
                , hideLabel "Archive"
                ]
            , Html.a [ HA.class "button", HA.href "/release" ]
                [ Octicons.milestone octiconOpts
                , hideLabel "Release"
                ]
            , Html.a [ HA.class "button", HA.href "/pull-requests" ]
                [ Octicons.gitPullRequest octiconOpts
                , hideLabel "PRs"
                ]
            , Html.a [ HA.class "button", HA.href "/graph" ]
                [ Octicons.circuitBoard octiconOpts
                , hideLabel "Graph"
                ]
            , Html.a [ HA.class "button", HA.href "/labels" ]
                [ Octicons.tag octiconOpts
                , hideLabel "Labels"
                ]
            ]
        , case model.me of
            Nothing ->
                Html.a [ HA.class "user-info", HA.href "/auth/github" ]
                    [ Octicons.signIn octiconOpts
                    , hideLabel "Sign In"
                    ]

            Just { user } ->
                Html.a [ HA.class "user-info", HA.href user.url ]
                    [ Html.img [ HA.class "user-avatar", HA.src user.avatar ] []
                    , hideLabel user.login
                    ]
        , viewSearch model
        ]


viewAllProjectsPage : Model -> Html Msg
viewAllProjectsPage model =
    let
        extractRoadmaps rid rps ( rms, ps ) =
            case Dict.get rid model.repos of
                Nothing ->
                    ( rms, ps )

                Just r ->
                    if List.isEmpty rps then
                        ( rms, ps )

                    else
                        case LE.find ((==) "Roadmap" << .name) rps of
                            Nothing ->
                                ( rms, ( r, rps ) :: ps )

                            Just rm ->
                                ( ( r, rm ) :: rms, ps )

        ( roadmaps, projects ) =
            Dict.foldl extractRoadmaps ( [], [] ) model.repoProjects
    in
    Html.div [ HA.class "page-content" ] <|
        List.map (\( a, b ) -> viewRepoRoadmap model a b) roadmaps
            ++ [ Html.div [ HA.class "page-header" ]
                    [ Octicons.project octiconOpts
                    , Html.text "Projects"
                    ]
               , Html.div [ HA.class "card-columns" ] <|
                    List.map (\( a, b ) -> viewRepoProjects model a b) projects
               ]


viewRepoRoadmap : Model -> GitHub.Repo -> GitHub.Project -> Html Msg
viewRepoRoadmap model repo project =
    Html.div [ HA.class "repo-roadmap" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.project octiconOpts
            , Html.text project.name
            , Octicons.repo octiconOpts
            , Html.text repo.name
            ]
        , Html.div [ HA.class "project-columns" ] <|
            List.map (viewProjectColumn model project) project.columns
        ]


viewRepoProjects : Model -> GitHub.Repo -> List GitHub.Project -> Html Msg
viewRepoProjects model repo projects =
    Html.div [ HA.class "repo-cards" ]
        [ Html.span [ HA.class "column-title" ]
            [ Octicons.repo octiconOpts
            , Html.text repo.name
            ]
        , Html.div [ HA.class "cards" ]
            (List.map (viewProjectCard model []) projects)
        ]


viewLabelsPage : Model -> Html Msg
viewLabelsPage model =
    let
        newLabel =
            Html.div [ HA.class "new-label" ]
                [ Html.div [ HA.class "label-cell" ]
                    [ Html.div [ HA.class "label-name" ]
                        [ Html.form [ HA.class "label-edit", HE.onSubmit CreateLabel ]
                            [ Html.span
                                ([ HA.class "label-icon"
                                 , HE.onClick RandomizeNewLabelColor
                                 ]
                                    ++ Label.colorStyles model model.newLabel.color
                                )
                                [ Octicons.sync octiconOpts ]
                            , Html.input
                                ([ HE.onInput SetNewLabelName
                                 , HA.value model.newLabel.name
                                 ]
                                    ++ Label.colorStyles model model.newLabel.color
                                )
                                []
                            ]
                        ]
                    ]
                , Html.div [ HA.class "label-cell" ]
                    [ Html.div [ HA.class "label-controls" ]
                        [ Html.span
                            [ HE.onClick CreateLabel
                            , HA.class "button"
                            ]
                            [ Octicons.plus octiconOpts ]
                        ]
                    ]
                ]

        labelRows =
            (\a -> List.map a (Dict.toList model.reposByLabel)) <|
                \( ( name, color ), repoIds ) ->
                    viewLabelRow model { name = name, color = color } repoIds
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.tag octiconOpts
            , Html.text "Labels"
            ]
        , newLabel
        , Html.div [ HA.class "labels-table" ]
            labelRows
        ]


viewReleasePage : Model -> Html Msg
viewReleasePage model =
    let
        repos =
            Dict.values model.releaseRepos
                |> List.sortBy .totalCommits
                |> List.reverse
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.milestone octiconOpts
            , Html.text "Release"
            ]
        , Html.div [ HA.class "metrics-items" ]
            (List.map viewReleaseRepo repos)
        ]


viewReleaseRepoPage : Model -> Model.ReleaseRepo -> Html Msg
viewReleaseRepoPage model sir =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Html.a [ HA.href "/release" ]
                [ Octicons.milestone octiconOpts
                , Html.text "Release"
                ]
            , Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.nextMilestone of
                Just nm ->
                    Html.span [ HA.class "release-next-milestone" ]
                        [ Octicons.milestone octiconOpts
                        , Html.text nm.title
                        ]

                Nothing ->
                    Html.text ""
            ]
        , viewTabbedCards model
            [ ( Octicons.inbox octiconOpts, "To Do", sir.openIssues ++ sir.openPRs )
            , ( Octicons.check octiconOpts, "Done", sir.doneCards )
            , ( viewLabelByName model "release/documented", "Documented", sir.documentedCards )
            , ( viewLabelByName model "release/undocumented", "Undocumented", sir.undocumentedCards )
            , ( viewLabelByName model "release/no-impact", "No Impact", sir.noImpactCards )
            ]
        ]


viewLabelByName : Model -> String -> Html Msg
viewLabelByName model name =
    let
        mlabel =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (List.head << Dict.values)
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)
    in
    case mlabel of
        Just label ->
            viewLabel model label

        Nothing ->
            Html.text ("missing label: " ++ name)


viewTabbedCards : Model -> List ( Html Msg, String, List Card ) -> Html Msg
viewTabbedCards model tabs =
    Html.div [ HA.class "tabbed-cards" ]
        [ let
            tabAttrs tab =
                [ HA.classList [ ( "tab", True ), ( "selected", pageTab model.page == tab ) ]
                , HA.href (UB.absolute (pageRoute model.page) [ UB.int "tab" tab ])
                ]

            tabCount count =
                Html.span [ HA.class "counter" ]
                    [ Html.text (String.fromInt count) ]
          in
          Html.div [ HA.class "tab-row" ] <|
            List.indexedMap
                (\idx ( icon, label, cards ) ->
                    Html.a (tabAttrs idx)
                        [ icon
                        , hideLabel label
                        , tabCount (List.length cards)
                        ]
                )
                tabs
        , let
            firstTabClass =
                HA.classList [ ( "first-tab", pageTab model.page == 0 ) ]
          in
          case List.drop (pageTab model.page) tabs of
            ( _, _, cards ) :: _ ->
                if List.isEmpty cards then
                    Html.div [ HA.class "no-tab-cards", firstTabClass ]
                        [ Html.text "no cards" ]

                else
                    cards
                        |> List.sortBy (.updatedAt >> Time.posixToMillis)
                        |> List.reverse
                        |> List.map (viewCard model [])
                        |> Html.div [ HA.class "tab-cards", firstTabClass ]

            _ ->
                Html.text ""
        ]


viewReleaseRepo : Model.ReleaseRepo -> Html Msg
viewReleaseRepo sir =
    Html.div [ HA.class "metrics-item" ]
        [ Html.a [ HA.class "column-title", HA.href ("/release/" ++ sir.repo.name) ]
            [ Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.nextMilestone of
                Just nm ->
                    Html.span []
                        [ Octicons.milestone octiconOpts
                        , Html.text nm.title
                        ]

                Nothing ->
                    Html.text ""
            ]
        , Html.div [ HA.class "metrics" ]
            [ viewMetric
                (Octicons.gitCommit { octiconOpts | color = Colors.gray })
                sir.totalCommits
                "commits"
                "commit"
                "since last release"
            , viewMetric
                (Octicons.gitPullRequest { octiconOpts | color = Colors.purple })
                (List.length sir.mergedPRs)
                "merged PRs"
                "merged PRs"
                "since last release"
            , if List.isEmpty sir.closedIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.check { octiconOpts | color = Colors.green })
                    (List.length sir.closedIssues)
                    "closed issues"
                    "closed issue"
                    "in milestone"
            , if List.isEmpty sir.openIssues then
                Html.text ""

              else
                viewMetric
                    (Octicons.issueOpened { octiconOpts | color = Colors.yellow })
                    (List.length sir.openIssues)
                    "open issues"
                    "open issue"
                    "in milestone"
            ]
        ]


viewPullRequestsPage : Model -> Html Msg
viewPullRequestsPage model =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.gitPullRequest octiconOpts
            , Html.text "Pull Requests"
            ]
        , Dict.toList model.openPRsByRepo
            |> List.sortBy (Tuple.second >> List.length)
            |> List.reverse
            |> List.map (\( a, b ) -> viewRepoPRs model a b)
            |> Html.div [ HA.class "card-columns" ]
        ]


viewRepoPRs : Model -> GitHub.ID -> List GitHub.ID -> Html Msg
viewRepoPRs model repoId prIds =
    case Dict.get repoId model.repos of
        Just repo ->
            Html.div [ HA.class "repo-cards" ]
                [ Html.a [ HA.class "column-title", HA.href ("/pull-requests/" ++ repo.name) ]
                    [ Octicons.repo octiconOpts
                    , Html.text repo.name
                    ]
                , prIds
                    |> List.filterMap (\id -> Dict.get id model.cards)
                    |> List.sortBy (.updatedAt >> Time.posixToMillis)
                    |> List.reverse
                    |> List.map (viewCard model [])
                    |> Html.div [ HA.class "cards" ]
                ]

        Nothing ->
            Html.text ""


failedChecks : Card -> Bool
failedChecks card =
    case card.content of
        GitHub.PullRequestCardContent { lastCommit } ->
            case lastCommit |> Maybe.andThen .status of
                Just { contexts } ->
                    List.any ((==) GitHub.StatusStateFailure << .state) contexts

                Nothing ->
                    False

        _ ->
            False


changesRequested : Model -> Card -> Bool
changesRequested model card =
    case Dict.get card.id model.prReviewers of
        Just reviews ->
            List.any ((==) GitHub.PullRequestReviewStateChangesRequested << .state) reviews

        _ ->
            False


hasMergeConflict : Card -> Bool
hasMergeConflict card =
    case card.content of
        GitHub.PullRequestCardContent { mergeable } ->
            case mergeable of
                GitHub.MergeableStateMergeable ->
                    False

                GitHub.MergeableStateConflicting ->
                    True

                GitHub.MergeableStateUnknown ->
                    False

        _ ->
            False


viewRepoPullRequestsPage : Model -> String -> Html Msg
viewRepoPullRequestsPage model repoName =
    let
        prCards =
            Dict.get repoName model.reposByName
                |> Maybe.andThen (\id -> Dict.get id model.openPRsByRepo)
                |> Maybe.map (List.filterMap (\id -> Dict.get id model.cards))
                |> Maybe.withDefault []

        categorizeCard card cat =
            let
                lastWord =
                    lastActiveUser model card

                reviewersHaveLastWord =
                    case lastWord of
                        Just { login } ->
                            let
                                reviewers =
                                    Dict.get card.id model.prReviewers
                                        |> Maybe.withDefault []
                                        |> List.map .author
                            in
                            List.any ((==) login << .login) (card.assignees ++ reviewers)

                        Nothing ->
                            False
            in
            if not reviewersHaveLastWord then
                -- force PRs that were last active by someone else into the inbox
                { cat | inbox = card :: cat.inbox }

            else if hasLabel model "needs-test" card then
                { cat | needsTest = card :: cat.needsTest }

            else if hasLabel model "blocked" card then
                { cat | blocked = card :: cat.blocked }

            else if changesRequested model card then
                { cat | changesRequested = card :: cat.changesRequested }

            else if failedChecks card then
                { cat | failedChecks = card :: cat.failedChecks }

            else if hasMergeConflict card then
                { cat | mergeConflict = card :: cat.mergeConflict }

            else if reviewersHaveLastWord then
                { cat | waiting = card :: cat.waiting }

            else
                { cat | inbox = card :: cat.inbox }

        categorized =
            List.foldl categorizeCard
                { inbox = []
                , waiting = []
                , failedChecks = []
                , mergeConflict = []
                , needsTest = []
                , blocked = []
                , changesRequested = []
                }
                prCards
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Html.div []
                [ Html.a [ HA.href "/pull-requests" ]
                    [ Octicons.gitPullRequest octiconOpts
                    , Html.text "Pull Requests"
                    ]
                , Octicons.repo octiconOpts
                , Html.text repoName
                ]
            ]
        , Html.div [ HA.class "repo-cards" ]
            [ viewTabbedCards model
                [ ( Octicons.inbox octiconOpts, "Inbox", categorized.inbox )
                , ( Octicons.comment octiconOpts, "Waiting", categorized.waiting )
                , ( Octicons.x octiconOpts, "Failed Checks", categorized.failedChecks )
                , ( Octicons.alert octiconOpts, "Merge Conflict", categorized.mergeConflict )
                , ( Octicons.law octiconOpts, "Changes Requested", categorized.changesRequested )
                , ( viewLabelByName model "needs-test", "Needs Tests", categorized.needsTest )
                , ( viewLabelByName model "blocked", "Blocked", categorized.blocked )
                ]
            ]
        ]


viewArchivePage : Model -> Html Msg
viewArchivePage model =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.history octiconOpts
            , Html.text "Archive"
            ]
        , groupEvents model.currentZone model.archive
            |> List.take 7
            |> List.map (\( a, b ) -> viewArchiveDay model a b)
            |> Html.div [ HA.class "archive-columns" ]
        ]


viewArchiveDay : Model -> ( Int, Time.Month, Int ) -> List Model.ArchiveEvent -> Html Msg
viewArchiveDay model ( year, month, day ) events =
    Html.div [ HA.class "archive-day" ]
        [ Html.span [ HA.class "column-title" ]
            [ Octicons.calendar octiconOpts
            , viewMonth month
            , Html.text " "
            , Html.text (String.fromInt day)
            , Html.text ", "
            , Html.text (String.fromInt year)
            ]
        , events
            |> List.map (viewArchiveEvent model)
            |> Html.div [ HA.class "archive-events" ]
        ]


viewMonth : Time.Month -> Html Msg
viewMonth month =
    Html.text <|
        case month of
            Time.Jan ->
                "January"

            Time.Feb ->
                "February"

            Time.Mar ->
                "March"

            Time.Apr ->
                "April"

            Time.May ->
                "May"

            Time.Jun ->
                "June"

            Time.Jul ->
                "July"

            Time.Aug ->
                "August"

            Time.Sep ->
                "September"

            Time.Oct ->
                "October"

            Time.Nov ->
                "November"

            Time.Dec ->
                "December"


viewArchiveEvent : Model -> Model.ArchiveEvent -> Html Msg
viewArchiveEvent model { cardId, event } =
    case Dict.get cardId model.cards of
        Nothing ->
            Html.text "(card missing)"

        Just card ->
            Html.div
                [ HA.class "archive-event"
                , HE.onClick (SelectCard card.id)
                ]
                [ Html.a
                    [ HA.class "archive-event-card-icon"
                    , HA.title (card.repo.owner ++ "/" ++ card.repo.name ++ " #" ++ String.fromInt card.number)
                    , HA.target "_blank"
                    , HA.href card.url
                    ]
                    [ viewCardIcon card
                    ]
                , case event.event of
                    "comment" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.reply grayOpts ]

                    "commit" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.gitCommit grayOpts ]

                    "review-pending" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.primitiveDot { octiconOpts | color = Colors.yellow } ]

                    "review-comment" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.comment grayOpts ]

                    "review-approved" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.check { octiconOpts | color = Colors.green } ]

                    "review-changes-requested" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.comment { octiconOpts | color = Colors.red } ]

                    "review-dismissed" ->
                        Html.span [ HA.class "archive-event-icon" ] [ Octicons.x grayOpts ]

                    _ ->
                        Html.text ""
                , Html.a
                    [ HA.class "archive-event-title"
                    , HA.target "_blank"
                    , HA.href event.url
                    ]
                    [ Html.text card.title
                    ]
                , Html.text " "
                , Html.span [ HA.class "archive-event-actor" ]
                    [ Html.text "by "
                    , case event.user of
                        Just user ->
                            Html.a [ HA.class "archive-event-user", HA.href user.url ]
                                [ Html.text (Maybe.withDefault user.login user.name)
                                ]

                        Nothing ->
                            Html.text ""
                    ]
                , Html.span [ HA.class "archive-event-time" ]
                    [ Html.text (DateFormat.format absoluteTime model.currentZone event.createdAt)
                    ]
                ]


absoluteTime : List DateFormat.Token
absoluteTime =
    [ DateFormat.hourNumber
    , DateFormat.text ":"
    , DateFormat.minuteFixed
    , DateFormat.text " "
    , DateFormat.amPmUppercase
    ]


groupEvents : Time.Zone -> List Model.ArchiveEvent -> List ( ( Int, Time.Month, Int ), List Model.ArchiveEvent )
groupEvents zone =
    let
        insertEvent event acc =
            let
                day =
                    ( Time.toYear zone event.event.createdAt
                    , Time.toMonth zone event.event.createdAt
                    , Time.toDay zone event.event.createdAt
                    )
            in
            case acc of
                ( d, es ) :: rest ->
                    if d == day then
                        ( d, event :: es ) :: rest

                    else
                        ( day, [ event ] ) :: acc

                [] ->
                    [ ( day, [ event ] ) ]
    in
    List.foldl insertEvent []


matchesLabel : Model.SharedLabel -> GitHub.Label -> Bool
matchesLabel sl l =
    l.name == sl.name && String.toLower l.color == String.toLower sl.color


includesLabel : Model -> Model.SharedLabel -> List GitHub.ID -> Bool
includesLabel model label labelIds =
    List.any
        (\id ->
            case Dict.get id model.allLabels of
                Just l ->
                    matchesLabel label l

                Nothing ->
                    False
        )
        labelIds


viewLabelRow : Model -> Model.SharedLabel -> List GitHub.ID -> Html Msg
viewLabelRow model label repoIds =
    let
        stateKey =
            labelKey label

        ( prs, issues ) =
            Dict.foldl
                (\_ c ( ps, is ) ->
                    if Card.isOpen c && includesLabel model label c.labels then
                        if Card.isPR c then
                            ( c :: ps, is )

                        else
                            ( ps, c :: is )

                    else
                        ( ps, is )
                )
                ( [], [] )
                model.cards
    in
    Html.div [ HA.class "label-row" ]
        [ Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-name" ]
                [ case Dict.get stateKey model.editingLabels of
                    Nothing ->
                        Html.div [ HA.class "label-background" ]
                            [ if String.isEmpty model.newLabel.name && Dict.isEmpty model.editingLabels then
                                Html.span
                                    ([ HA.class "label-icon"
                                     , HE.onClick (searchLabel model label.name)
                                     ]
                                        ++ Label.colorStyles model label.color
                                    )
                                    [ Octicons.tag octiconOpts ]

                              else
                                Html.span
                                    ([ HA.class "label-icon"
                                     , HE.onClick (SetLabelColor label.color)
                                     ]
                                        ++ Label.colorStyles model label.color
                                    )
                                    [ Octicons.paintcan octiconOpts ]
                            , Html.span
                                ([ HA.class "label big"
                                 , HE.onClick (searchLabel model label.name)
                                 ]
                                    ++ Label.colorStyles model label.color
                                )
                                [ Html.span [ HA.class "label-text" ]
                                    [ Html.text label.name ]
                                ]
                            ]

                    Just newLabel ->
                        Html.form [ HA.class "label-edit", HE.onSubmit (EditLabel label) ]
                            [ Html.span
                                ([ HA.class "label-icon"
                                 , HE.onClick (RandomizeLabelColor label)
                                 ]
                                    ++ Label.colorStyles model newLabel.color
                                )
                                [ Octicons.sync octiconOpts ]
                            , Html.input
                                ([ HE.onInput (SetLabelName label)
                                 , HA.value newLabel.name
                                 ]
                                    ++ Label.colorStyles model newLabel.color
                                )
                                []
                            ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts first" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.issueOpened octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length issues))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.gitPullRequest octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length prs))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell" ]
            [ Html.div [ HA.class "label-counts last" ]
                [ Html.span [ HA.class "count" ]
                    [ Octicons.repo octiconOpts
                    , Html.span [ HA.class "count-number" ]
                        [ Html.text (String.fromInt (List.length repoIds))
                        ]
                    ]
                ]
            ]
        , Html.div [ HA.class "label-cell drawer-cell" ]
            [ Html.div [ HA.class "label-controls" ]
                [ Html.span
                    [ HE.onClick (MirrorLabel label)
                    , HA.class "button"
                    ]
                    [ Octicons.mirror octiconOpts ]
                , if Dict.member stateKey model.editingLabels then
                    Html.span
                        [ HE.onClick (StopEditingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.x octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (StartEditingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.pencil octiconOpts ]
                , if Set.member stateKey model.deletingLabels then
                    Html.span
                        [ HE.onClick (StopDeletingLabel label)
                        , HA.class "button close"
                        ]
                        [ Octicons.x octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (StartDeletingLabel label)
                        , HA.class "button"
                        ]
                        [ Octicons.trashcan octiconOpts ]
                ]
            , let
                isDeleting =
                    Set.member stateKey model.deletingLabels

                isEditing =
                    Dict.member stateKey model.editingLabels
              in
              Html.div
                [ HA.classList
                    [ ( "label-confirm", True )
                    , ( "active", isDeleting || isEditing )
                    ]
                ]
                [ if isDeleting then
                    Html.span
                        [ HE.onClick (DeleteLabel label)
                        , HA.class "button delete"
                        ]
                        [ Octicons.check octiconOpts ]

                  else
                    Html.span
                        [ HE.onClick (EditLabel label)
                        , HA.class "button edit"
                        ]
                        [ Octicons.check octiconOpts ]
                ]
            ]
        ]


searchLabel : Model -> String -> Msg
searchLabel model name =
    SearchCards <|
        if String.isEmpty model.cardSearch then
            "label:" ++ name

        else
            model.cardSearch ++ " label:" ++ name


viewMetric : Html Msg -> Int -> String -> String -> String -> Html Msg
viewMetric icon count plural singular description =
    Html.div [ HA.class "metric" ]
        [ icon
        , Html.span [ HA.class "count" ] [ Html.text (String.fromInt count) ]
        , Html.text " "
        , Html.text <|
            if count == 1 then
                singular

            else
                plural
        , Html.text " "
        , Html.text description
        ]


columnIcon : GitHub.ProjectColumn -> Html Msg
columnIcon col =
    case col.purpose of
        Nothing ->
            Octicons.kebabHorizontal { octiconOpts | color = Colors.gray }

        Just GitHub.ProjectColumnPurposeToDo ->
            Octicons.book { octiconOpts | color = Colors.gray }

        Just GitHub.ProjectColumnPurposeInProgress ->
            Octicons.pulse { octiconOpts | color = Colors.purple }

        Just GitHub.ProjectColumnPurposeDone ->
            Octicons.check { octiconOpts | color = Colors.green }


addNoteTextareaId : GitHub.ID -> String
addNoteTextareaId colId =
    "add-note-" ++ colId


viewProjectColumn : Model -> GitHub.Project -> GitHub.ProjectColumn -> Html Msg
viewProjectColumn model project col =
    let
        cards =
            Dict.get col.id model.columnCards
                |> Maybe.withDefault []

        ( archived, unarchived ) =
            List.partition .isArchived cards

        dropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Nothing
                }
            }

        addingNote =
            Dict.get col.id model.addingColumnNotes
    in
    Html.div
        [ HA.class "project-column"
        , HA.classList [ ( "loading", Dict.member col.id model.progress ) ]
        ]
        [ Html.div [ HA.class "column-title" ]
            [ columnIcon col
            , Html.span [ HA.class "column-name" ]
                [ Html.text col.name ]
            , Html.div [ HA.class "column-controls" ]
                [ Html.span [ HA.class "refresh-column spin-on-column-refresh", HE.onClick (RefreshColumn col.id) ]
                    [ Octicons.sync octiconOpts ]
                , Html.span [ HA.class "add-card", HE.onClick (SetCreatingColumnNote col.id "") ]
                    [ Octicons.plus octiconOpts ]
                ]
            ]
        , if addingNote == Nothing && List.isEmpty cards then
            Html.div [ HA.class "no-cards" ]
                [ Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing
                ]

          else
            Html.div [ HA.class "cards" ] <|
                List.concat
                    [ [ Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing ]
                    , case addingNote of
                        Nothing ->
                            []

                        Just note ->
                            [ viewAddingNote col note ]
                    , List.concatMap (viewProjectColumnCard model project col) unarchived
                    ]
        , if List.isEmpty archived then
            Html.text ""

          else
            Html.div [ HA.class "archived-cards" ]
                [ Html.div
                    [ HA.class "archived-cards-header"
                    , HA.classList [ ( "showing", Set.member col.id model.showArchivedCards ) ]
                    , HE.onClick (ToggleShowArchivedCards col.id)
                    ]
                    [ Html.span [ HA.class "counter" ] [ Html.text (String.fromInt (List.length archived)) ]
                    , Html.text " "
                    , Html.text "archived cards"
                    ]
                , if Set.member col.id model.showArchivedCards then
                    Html.div [ HA.class "cards" ] <|
                        Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate Nothing
                            :: List.concatMap (viewProjectColumnCard model project col) archived

                  else
                    Html.text ""
                ]
        ]


viewAddingNote : GitHub.ProjectColumn -> String -> Html Msg
viewAddingNote col val =
    Html.div [ HA.class "editable-card" ]
        [ Html.div
            [ HA.class "card note"
            , HA.tabindex 0
            , HA.classList
                [ ( "in-flight", Project.detectColumn.inFlight col )
                , ( "done", Project.detectColumn.done col )
                , ( "backlog", Project.detectColumn.backlog col )
                ]
            ]
            [ Html.div [ HA.class "card-icons" ]
                [ Octicons.note octiconOpts
                ]
            , Markdown.toHtml [ HA.class "card-info card-note" ] val
            , Html.div [ HA.class "card-controls" ] []
            ]
        , Html.div
            [ HA.class "edit-bubble add-note"
            , HA.draggable "true"
            , HE.custom "dragstart" (JD.succeed { message = Noop, stopPropagation = True, preventDefault = True })
            ]
            [ Html.form [ HA.class "write-note-form", HE.onSubmit (CreateColumnNote col.id) ]
                [ Html.textarea
                    [ HA.placeholder "Enter a note"
                    , HA.id (addNoteTextareaId col.id)
                    , HE.onInput (SetCreatingColumnNote col.id)
                    , onCtrlEnter (CreateColumnNote col.id)
                    ]
                    [ Html.text val ]
                , Html.div [ HA.class "buttons" ]
                    [ Html.button
                        [ HA.class "button cancel"
                        , HA.type_ "reset"
                        , HE.onClick (CancelCreatingColumnNote col.id)
                        ]
                        [ Octicons.x octiconOpts
                        , Html.text "cancel"
                        ]
                    , Html.button
                        [ HA.class "button apply"
                        , HA.type_ "submit"
                        ]
                        [ Octicons.check octiconOpts
                        , Html.text "add"
                        ]
                    ]
                ]
            ]
        ]


onCtrlEnter : Msg -> Html.Attribute Msg
onCtrlEnter msg =
    HE.on "keydown"
        << Keyboard.Event.considerKeyboardEvent
    <|
        \event ->
            if (event.ctrlKey || event.metaKey) && event.keyCode == Keyboard.Key.Enter then
                Just msg

            else
                Nothing


deleteCardControl : Model -> GitHub.ID -> GitHub.ID -> Html Msg
deleteCardControl model selfId deleteId =
    if Set.member selfId model.deletingCards then
        Html.div [ HA.class "with-confirm" ]
            [ Html.span
                [ HA.class "cancel-delete-card"
                , onClickNoBubble (CancelDeleteCard selfId)
                ]
                [ Octicons.x octiconOpts
                ]
            , Html.span
                [ HA.class "inline-confirm"
                , onClickNoBubble (DeleteCard selfId deleteId)
                ]
                [ Octicons.check octiconOpts
                ]
            ]

    else
        Html.span
            [ HA.class "delete-card"
            , onClickNoBubble (ConfirmDeleteCard selfId)
            ]
            [ Octicons.trashcan octiconOpts
            ]


archiveCardControl : GitHub.ID -> Html Msg
archiveCardControl archiveId =
    Html.span
        [ onClickNoBubble (SetCardArchived archiveId True)
        ]
        [ Octicons.archive octiconOpts
        ]


unarchiveCardControl : GitHub.ID -> Html Msg
unarchiveCardControl archiveId =
    Html.span
        [ HA.class "unarchive"
        , onClickNoBubble (SetCardArchived archiveId False)
        ]
        [ Octicons.archive octiconOpts
        ]


viewProjectColumnCard : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> List (Html Msg)
viewProjectColumnCard model project col ghCard =
    let
        dragId =
            Model.FromColumnCardSource { columnId = col.id, cardId = ghCard.id }

        dropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Just ghCard.id
                }
            }

        card =
            case ( ghCard.note, ghCard.contentId ) of
                ( Just n, Nothing ) ->
                    viewNote model project col ghCard n

                ( Nothing, Just contentId ) ->
                    case Dict.get contentId model.cards of
                        Just c ->
                            let
                                controls =
                                    if not (Card.isOpen c) then
                                        [ deleteCardControl model c.id ghCard.id
                                        , if ghCard.isArchived then
                                            unarchiveCardControl ghCard.id

                                          else
                                            archiveCardControl ghCard.id
                                        ]

                                    else
                                        [ deleteCardControl model c.id ghCard.id ]
                            in
                            viewCard model controls c

                        Nothing ->
                            viewLoadingCard

                _ ->
                    Html.text "impossible: card is neither note nor content"
    in
    [ Drag.draggable model.projectDrag ProjectDrag dragId card
    , Drag.viewDropArea model.projectDrag ProjectDrag dropCandidate (Just dragId)
    ]


viewLoadingCard : Html Msg
viewLoadingCard =
    Html.div [ HA.class "card loading" ]
        [ Html.div [ HA.class "card-icons" ] [ Octicons.sync octiconOpts ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "loading-text" ] [ Html.text "loading..." ] ]
        ]


viewProjectPage : Model -> GitHub.Project -> Html Msg
viewProjectPage model project =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "project single" ]
            [ Html.div [ HA.class "page-header" ]
                [ Octicons.project octiconOpts
                , Html.text project.name
                ]
            , Html.div [ HA.class "project-columns" ] <|
                List.map (viewProjectColumn model project) project.columns
            , Html.div [ HA.class "icebox-graph" ]
                [ Html.div [ HA.class "column-title" ]
                    [ Octicons.circuitBoard octiconOpts
                    , Html.text (project.name ++ " Graph")
                    ]
                , StatefulGraph.view model
                ]
            ]
        ]


viewSearch : Model -> Html Msg
viewSearch model =
    Html.div [ HA.class "card-search" ]
        [ Html.form [ HE.onSubmit SelectAnticipatedCards ]
            [ Html.input
                [ HA.type_ "search"
                , HA.placeholder "search cards"
                , HA.value model.cardSearch
                , HE.onInput SearchCards
                ]
                []
            ]
        ]


onClickNoBubble : msg -> Html.Attribute msg
onClickNoBubble msg =
    HE.custom "click" <|
        JD.succeed
            { message = msg
            , stopPropagation = True
            , preventDefault = True
            }


viewCardEntry : Model -> Card -> Html Msg
viewCardEntry model card =
    let
        anticipated =
            isAnticipated model card

        controls =
            if not anticipated then
                [ Html.span
                    [ onClickNoBubble (DeselectCard card.id)
                    ]
                    [ Octicons.x octiconOpts ]
                ]

            else
                []

        cardView =
            viewCard model controls card

        dragSource =
            Model.NewContentCardSource { contentId = card.id }
    in
    Drag.draggable model.projectDrag ProjectDrag dragSource <|
        cardView


lastActiveUser : Model -> Card -> Maybe GitHub.User
lastActiveUser model card =
    Dict.get card.id model.cardEvents
        |> Maybe.andThen List.head
        |> Maybe.andThen .user


lastActivityIsByUser : Model -> String -> Card -> Bool
lastActivityIsByUser model login card =
    lastActiveUser model card
        |> Maybe.map ((==) login << .login)
        |> Maybe.withDefault False


isAnticipated : Model -> Card -> Bool
isAnticipated model card =
    Set.member card.id model.anticipatedCards && not (OrderedSet.member card.id model.selectedCards)


hasLabel : Model -> String -> Card -> Bool
hasLabel model name card =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)
    in
    case mlabelId of
        Just id ->
            List.member id card.labels

        Nothing ->
            False


viewCard : Model -> List (Html Msg) -> Card -> Html Msg
viewCard model controls card =
    Html.div
        [ HA.class "card"
        , HA.classList [ ( "loading", Dict.member card.id model.progress ) ]
        , HA.tabindex 0
        , HA.classList
            [ ( "in-flight", Card.isInFlight card )
            , ( "done", Card.isDone card )
            , ( "icebox", Card.isIcebox card )
            , ( "backlog", Card.isBacklog card )
            , ( "paused", Card.isPaused card )
            , ( "anticipated", isAnticipated model card )
            , ( "highlighted", model.highlightedCard == Just card.id )
            , ( Activity.class model.currentTime card.updatedAt, Card.isPR card )
            , ( "last-activity-is-me"
              , case model.me of
                    Just { user } ->
                        lastActivityIsByUser model user.login card

                    Nothing ->
                        False
              )
            ]
        , HE.onClick (SelectCard card.id)
        , HE.onMouseOver (HighlightNode card.id)
        , HE.onMouseOut UnhighlightNode
        ]
        [ Html.div [ HA.class "card-icons" ] <|
            List.concat
                [ [ viewCardIcon card ]
                , cardExternalIcons card
                , [ pauseIcon card ]
                , List.map
                    (\{ avatar } ->
                        Html.img [ HA.class "status-actor", HA.src avatar ] []
                    )
                    card.assignees
                , prIcons model card
                ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "card-title", HA.draggable "false" ] <|
                [ Html.a
                    [ HA.class "title-link"
                    , HA.href card.url
                    , HA.target "_blank"
                    ]
                    [ Html.text card.title
                    ]
                ]
            , viewCardMeta card
            , viewCardSquares model card
            ]
        , Html.div [ HA.class "card-controls" ] <|
            Html.span
                [ HE.onClick
                    (if Card.isPR card then
                        RefreshPullRequest card.id

                     else
                        RefreshIssue card.id
                    )
                ]
                [ Octicons.sync octiconOpts ]
                :: controls
        ]


viewNote : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> String -> Html Msg
viewNote model project col card text =
    let
        controls =
            [ deleteCardControl model card.id card.id
            , Html.span [ HA.class "edit-note", onClickNoBubble (SetEditingCardNote card.id text) ]
                [ Octicons.pencil octiconOpts
                ]
            ]
    in
    if Dict.member card.id model.editingCardNotes then
        viewNoteCard model project col card controls text

    else if String.startsWith "http" text then
        Maybe.map (viewProjectCard model controls) (projectByUrl model text)
            |> ME.orElseLazy (\_ -> Maybe.map (viewCard model controls) (cardByUrl model text))
            |> Maybe.withDefault (viewNoteCard model project col card controls text)

    else
        viewNoteCard model project col card controls text


projectByUrl : Model -> String -> Maybe GitHub.Project
projectByUrl model url =
    Dict.get url model.idsByUrl
        |> Maybe.andThen (\id -> Dict.get id model.projects)


cardByUrl : Model -> String -> Maybe Card
cardByUrl model url =
    Dict.get url model.idsByUrl
        |> Maybe.andThen (\id -> Dict.get id model.cards)


viewNoteCard : Model -> GitHub.Project -> GitHub.ProjectColumn -> Backend.ColumnCard -> List (Html Msg) -> String -> Html Msg
viewNoteCard model project col card controls text =
    Html.div [ HA.class "editable-card" ]
        [ Html.div
            [ HA.class "card note"
            , HA.classList [ ( "loading", Dict.member card.id model.progress ) ]
            , HA.tabindex 0
            , HA.classList
                [ ( "in-flight", Project.detectColumn.inFlight col )
                , ( "done", Project.detectColumn.done col )
                , ( "backlog", Project.detectColumn.backlog col )
                ]
            ]
            [ Html.div [ HA.class "card-icons" ]
                [ Octicons.note octiconOpts
                ]
            , Dict.get card.id model.editingCardNotes
                |> Maybe.withDefault text
                |> Markdown.toHtml [ HA.class "card-info card-note" ]
            , Html.div [ HA.class "card-controls" ] <|
                Html.span
                    [ HA.class "spin-on-column-refresh"
                    , HE.onClick (RefreshColumn col.id)
                    ]
                    [ Octicons.sync octiconOpts ]
                    :: controls
            ]
        , case Dict.get card.id model.editingCardNotes of
            Nothing ->
                Html.text ""

            Just val ->
                Html.div
                    [ HA.class "edit-bubble"
                    , HA.draggable "true"
                    , HE.custom "dragstart" (JD.succeed { message = Noop, stopPropagation = True, preventDefault = True })
                    ]
                    [ Html.form [ HA.class "write-note-form", HE.onSubmit (UpdateCardNote card.id) ]
                        [ Html.textarea
                            [ HA.placeholder "Enter a note"
                            , HA.id (addNoteTextareaId card.id)
                            , HE.onInput (SetEditingCardNote card.id)
                            , onCtrlEnter (UpdateCardNote card.id)
                            ]
                            [ Html.text val ]
                        , Html.div [ HA.class "buttons" ]
                            [ Html.button
                                [ HA.class "button cancel"
                                , HA.type_ "reset"
                                , HE.onClick (CancelEditingCardNote card.id)
                                ]
                                [ Octicons.x octiconOpts
                                , Html.text "cancel"
                                ]
                            , case project.owner of
                                GitHub.ProjectOwnerRepo repoId ->
                                    Html.button
                                        [ HA.class "button convert-to-issue"
                                        , HA.type_ "button"
                                        , HE.onClick (ConvertEditingCardNoteToIssue card.id repoId)
                                        ]
                                        [ Octicons.issueOpened octiconOpts
                                        , Html.text "convert to issue"
                                        ]

                                _ ->
                                    Html.text ""
                            , Html.button
                                [ HA.class "button apply"
                                , HA.type_ "submit"
                                ]
                                [ Octicons.check octiconOpts
                                , Html.text "save"
                                ]
                            ]
                        ]
                    ]
        ]


viewProjectCard : Model -> List (Html Msg) -> GitHub.Project -> Html Msg
viewProjectCard model controls project =
    Html.div [ HA.class "card project", HA.tabindex 0 ]
        [ Html.div [ HA.class "card-icons" ]
            [ Octicons.project { octiconOpts | color = Colors.gray }
            , projectExternalIcon project
            ]
        , Html.div [ HA.class "card-info" ]
            [ Html.span [ HA.class "card-title", HA.draggable "false" ]
                [ Html.a [ HA.href ("/projects/" ++ project.id) ]
                    [ Html.text project.name ]
                ]
            , if String.isEmpty project.body then
                Html.text ""

              else
                Markdown.toHtml [ HA.class "project-body" ] project.body
            , viewProjectBar model project
            ]
        , Html.div [ HA.class "card-controls" ] controls
        ]


viewProjectBar : Model -> GitHub.Project -> Html Msg
viewProjectBar model project =
    let
        cardCount col =
            Dict.get col.id model.columnCards
                |> Maybe.map List.length
                |> Maybe.withDefault 0

        countPurpose purpose =
            LE.find ((==) (Just purpose) << .purpose) project.columns
                |> Maybe.map cardCount
                |> Maybe.withDefault 0

        toDos =
            countPurpose GitHub.ProjectColumnPurposeToDo

        inProgresses =
            countPurpose GitHub.ProjectColumnPurposeInProgress

        dones =
            countPurpose GitHub.ProjectColumnPurposeDone

        total =
            toDos + inProgresses + dones

        width base =
            let
                pct =
                    (toFloat base / toFloat total) * 100
            in
            HA.style "width" (String.fromFloat pct ++ "%")

        segment name val =
            if val == 0 then
                Html.text ""

            else
                Html.div [ HA.class ("segment " ++ name), width val ] []
    in
    if total > 0 then
        Html.div [ HA.class "project-bar" ]
            [ segment "done" dones
            , segment "in-progress" inProgresses
            , segment "to-do" toDos
            ]

    else
        Html.text ""


viewCardMeta : Card -> Html Msg
viewCardMeta card =
    Html.div [ HA.class "card-meta" ]
        [ Html.a
            [ HA.href card.url
            , HA.target "_blank"
            , HA.draggable "false"
            ]
            [ Html.text ("#" ++ String.fromInt card.number) ]
        , Html.text " "
        , Html.text "opened by "
        , case card.author of
            Just user ->
                Html.a
                    [ HA.href user.url
                    , HA.target "_blank"
                    , HA.draggable "false"
                    ]
                    [ Html.text user.login ]

            _ ->
                Html.text "(deleted user)"
        ]


viewCardSquares : Model -> Card -> Html Msg
viewCardSquares model card =
    Html.div [ HA.class "card-squares" ]
        [ Html.div [ HA.class "card-labels" ] <|
            List.map (searchableLabel model) card.labels
                ++ List.map (viewSuggestedLabel model card) model.suggestedLabels
        , Html.div [ HA.class "card-actors" ] <|
            List.map (viewEventActor model) (recentEvents model card)
        ]


pauseIcon : Card -> Html Msg
pauseIcon card =
    case ( Card.isInFlight card, Card.isPaused card ) of
        ( _, True ) ->
            Html.span
                [ HA.class "pause-toggle"
                , HE.onClick (UnlabelCard card "paused")
                ]
                [ Octicons.bookmark { octiconOpts | color = Colors.gray300 }
                ]

        ( True, False ) ->
            Html.span
                [ HA.class "pause-toggle"
                , HE.onClick (LabelCard card "paused")
                ]
                [ Octicons.bookmark { octiconOpts | color = Colors.gray600 }
                ]

        _ ->
            Html.text ""


viewCardIcon : Card -> Html Msg
viewCardIcon card =
    if Card.isPR card then
        Octicons.gitPullRequest
            { octiconOpts
                | color =
                    if Card.isMerged card then
                        Colors.purple

                    else if Card.isOpen card then
                        Colors.green

                    else
                        Colors.red
            }

    else if Card.isOpen card then
        Octicons.issueOpened { octiconOpts | color = Colors.green }

    else
        Octicons.issueClosed { octiconOpts | color = Colors.red }


projectExternalIcon : GitHub.Project -> Html Msg
projectExternalIcon project =
    Html.a
        [ HA.target "_blank"
        , HA.class "external-link"
        , HA.href project.url
        ]
        [ Octicons.linkExternal octiconOpts ]


cardExternalIcons : Card -> List (Html Msg)
cardExternalIcons card =
    List.map
        (\{ url } ->
            Html.a
                [ HA.target "_blank"
                , HA.class "external-link"
                , HA.href url
                ]
                [ Octicons.linkExternal octiconOpts ]
        )
        card.cards


summarizeContexts : List GitHub.StatusContext -> Html Msg
summarizeContexts contexts =
    let
        states =
            List.map .state contexts
    in
    if List.all ((==) GitHub.StatusStateSuccess) states then
        Octicons.check { octiconOpts | color = Colors.green }

    else if List.member GitHub.StatusStateFailure states then
        Octicons.x { octiconOpts | color = Colors.red }

    else if List.member GitHub.StatusStateError states then
        Octicons.alert { octiconOpts | color = Colors.orange }

    else if List.member GitHub.StatusStatePending states then
        Octicons.primitiveDot { octiconOpts | color = Colors.yellow }

    else
        Octicons.question { octiconOpts | color = Colors.purple }


prIcons : Model -> Card -> List (Html Msg)
prIcons model card =
    case card.content of
        GitHub.IssueCardContent _ ->
            []

        GitHub.PullRequestCardContent pr ->
            let
                statusCheck =
                    case Maybe.map .status pr.lastCommit of
                        Just (Just { contexts }) ->
                            Html.span [ HA.class "status-icon" ]
                                [ summarizeContexts contexts
                                ]

                        _ ->
                            Html.text ""

                reviews =
                    Maybe.withDefault [] <| Dict.get card.id model.prReviewers

                reviewStates =
                    List.map
                        (\r ->
                            let
                                reviewClass =
                                    case r.state of
                                        GitHub.PullRequestReviewStatePending ->
                                            "pending"

                                        GitHub.PullRequestReviewStateApproved ->
                                            "success"

                                        GitHub.PullRequestReviewStateChangesRequested ->
                                            "failure"

                                        GitHub.PullRequestReviewStateCommented ->
                                            "commented"

                                        GitHub.PullRequestReviewStateDismissed ->
                                            "dismissed"
                            in
                            Html.img [ HA.class ("status-actor " ++ reviewClass), HA.src r.author.avatar ] []
                        )
                        reviews
            in
            [ Octicons.gitMerge
                { octiconOpts
                    | color =
                        case pr.mergeable of
                            GitHub.MergeableStateMergeable ->
                                Colors.green

                            GitHub.MergeableStateConflicting ->
                                Colors.red

                            GitHub.MergeableStateUnknown ->
                                Colors.yellow
                }
            , statusCheck
            ]
                ++ reviewStates


recentEvents : Model -> Card -> List Backend.CardEvent
recentEvents model card =
    Dict.get card.id model.cardEvents
        |> Maybe.withDefault []
        |> List.take 3
        |> List.reverse


viewSuggestedLabel : Model -> Card -> String -> Html Msg
viewSuggestedLabel model card name =
    let
        mlabelId =
            Dict.get name model.labelToRepoToId
                |> Maybe.andThen (Dict.get card.repo.id)

        mlabel =
            mlabelId
                |> Maybe.andThen (\id -> Dict.get id model.allLabels)

        has =
            case mlabelId of
                Just id ->
                    List.member id card.labels

                Nothing ->
                    False
    in
    case mlabel of
        Nothing ->
            Html.text ""

        Just { color } ->
            Html.span
                ([ HA.class "label suggested"
                 , HE.onClick <|
                    if has then
                        UnlabelCard card name

                    else
                        LabelCard card name
                 ]
                    ++ Label.colorStyles model color
                )
                [ if has then
                    Octicons.dash { octiconOpts | color = Colors.white }

                  else
                    Octicons.plus { octiconOpts | color = Colors.white }
                , Html.span [ HA.class "label-text" ]
                    [ Html.text name ]
                ]


viewLabel : Model -> GitHub.Label -> Html Msg
viewLabel model label =
    Html.span
        (HA.class "label" :: Label.colorStyles model label.color)
        [ Html.span [ HA.class "label-text" ]
            [ Html.text label.name ]
        ]


searchableLabel : Model -> GitHub.ID -> Html Msg
searchableLabel model labelId =
    case Dict.get labelId model.allLabels of
        Just label ->
            Html.span [ HE.onClick (searchLabel model label.name) ]
                [ viewLabel model label
                ]

        Nothing ->
            Html.text ""


viewEventActor : Model -> Backend.CardEvent -> Html Msg
viewEventActor model { createdAt, avatar } =
    Html.img
        [ HA.class ("card-actor " ++ Activity.class model.currentTime createdAt)
        , HA.src <|
            if String.contains "?" avatar then
                avatar ++ "&s=88"

            else
                avatar ++ "?s=88"
        , HA.draggable "false"
        ]
        []


randomizeColor : Model.SharedLabel -> Model.SharedLabel
randomizeColor label =
    let
        currentColor =
            Maybe.withDefault 0 <| Result.toMaybe <| ParseInt.parseIntHex label.color

        randomHex =
            generateColor currentColor
    in
    { label | color = randomHex }


generateColor : Int -> String
generateColor seed =
    let
        ( randomColor, _ ) =
            Random.step (Random.int 0x00 0x00FFFFFF) (Random.initialSeed seed)
    in
    String.padLeft 6 '0' (ParseInt.toHex randomColor)


handleEvent : String -> String -> Int -> Model -> Model
handleEvent event data index model =
    let
        withDecoded decoder fn =
            case JD.decodeString decoder data of
                Ok val ->
                    Log.debug ("updating " ++ event) () <|
                        fn val

                Err err ->
                    Log.debug "error decoding event" err <|
                        model
    in
    case event of
        "columnCards" ->
            withDecoded Backend.decodeColumnCardsEvent <|
                \val ->
                    { model
                        | columnCards = Dict.insert val.columnId val.cards model.columnCards
                        , progress = finishProgress val.columnId (finishLoadingColumnCards val.cards model.progress)
                    }

        "repo" ->
            withDecoded GitHub.decodeRepo <|
                \val ->
                    { model
                        | repos = Dict.insert val.id val model.repos
                        , progress = finishProgress val.id model.progress
                    }
                        |> computeDataView

        "repoProjects" ->
            withDecoded Backend.decodeRepoProjectsEvent <|
                \val ->
                    { model | repoProjects = Dict.insert val.repoId val.projects model.repoProjects }

        "repoCommits" ->
            withDecoded Backend.decodeRepoCommitsEvent <|
                \val ->
                    { model | repoCommits = Dict.insert val.repoId val.commits model.repoCommits }

        "repoLabels" ->
            withDecoded Backend.decodeRepoLabelsEvent <|
                \val ->
                    { model | repoLabels = Dict.insert val.repoId val.labels model.repoLabels }

        "repoMilestones" ->
            withDecoded Backend.decodeRepoMilestonesEvent <|
                \val ->
                    { model | repoMilestones = Dict.insert val.repoId val.milestones model.repoMilestones }

        "repoReleases" ->
            withDecoded Backend.decodeRepoReleasesEvent <|
                \val ->
                    { model | repoReleases = Dict.insert val.repoId val.releases model.repoReleases }

        "issue" ->
            withDecoded GitHub.decodeIssue <|
                \val ->
                    { model
                        | issues = Dict.insert val.id val model.issues
                        , progress = finishProgress val.id model.progress
                    }
                        |> computeCardsView

        "pr" ->
            withDecoded GitHub.decodePullRequest <|
                \val ->
                    { model
                        | prs = Dict.insert val.id val model.prs
                        , progress = finishProgress val.id model.progress
                    }
                        |> computeCardsView

        "cardEvents" ->
            withDecoded Backend.decodeCardEventsEvent <|
                \val ->
                    { model | cardEvents = Dict.insert val.cardId val.events model.cardEvents }

        "prReviewers" ->
            withDecoded Backend.decodeReviewersEvent <|
                \val ->
                    { model | prReviewers = Dict.insert val.prId val.reviewers model.prReviewers }

        "graphs" ->
            withDecoded Backend.decodeGraphs <|
                \val ->
                    -- graphs view is computed in computeViewForPage since it
                    -- depends on filter state and that has to be handled there
                    -- so the filter gets applied when they navigate to the page
                    { model | graphs = val }

        _ ->
            Log.debug "event ignored" ( event, data, index ) <|
                model


octiconOpts : Octicons.Options
octiconOpts =
    Octicons.defaultOptions


grayOpts : Octicons.Options
grayOpts =
    { octiconOpts | color = Colors.gray }


computeArchive : Model -> Dict GitHub.ID Card -> List Model.ArchiveEvent
computeArchive model cards =
    let
        actorEvents card =
            Dict.get card.id model.cardEvents
                |> Maybe.withDefault []
                |> List.map (Model.ArchiveEvent card.id)

        cardEvents card =
            { cardId = card.id
            , event =
                { event = "created"
                , url = card.url
                , user = card.author
                , avatar = Maybe.withDefault "" <| Maybe.map .avatar card.author
                , createdAt = card.createdAt
                }
            }
                :: actorEvents card
    in
    cards
        |> Dict.values
        |> List.concatMap cardEvents
        |> List.sortBy (.event >> .createdAt >> Time.posixToMillis)


setLoading : List GitHub.ID -> Model -> Model
setLoading ids model =
    { model | progress = List.foldl (\id -> Dict.insert id Model.ProgressLoading) model.progress ids }


finishProgress : GitHub.ID -> Model.ProgressState -> Model.ProgressState
finishProgress =
    Dict.remove


finishLoadingData : Backend.Data -> Model.ProgressState -> Model.ProgressState
finishLoadingData data =
    let
        -- TODO: column cards? labels?
        hasLoaded id _ =
            Dict.member id data.repos || Dict.member id data.columnCards
    in
    Dict.filter (\id p -> not (hasLoaded id p))


finishLoadingCardData : Backend.CardData -> Model.ProgressState -> Model.ProgressState
finishLoadingCardData data =
    let
        hasLoaded id _ =
            Dict.member id data.issues || Dict.member id data.prs
    in
    Dict.filter (\id p -> not (hasLoaded id p))


finishLoadingColumnCards : List Backend.ColumnCard -> Model.ProgressState -> Model.ProgressState
finishLoadingColumnCards cards state =
    List.foldl (\{ id } -> finishProgress id) state cards


labelKey : Model.SharedLabel -> ( String, String )
labelKey label =
    ( label.name, String.toLower label.color )
