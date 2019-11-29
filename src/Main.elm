port module Main exposing (main)

import Backend
import Browser
import Browser.Dom
import Browser.Navigation as Nav
import Card exposing (Card)
import CardOperations
import CardView
import Colors
import DateFormat
import Dict exposing (Dict)
import Drag
import Effects
import Events
import GitHub
import Hash
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD
import Label
import List.Extra as LE
import Log
import Markdown
import Model exposing (Model, Msg(..), Page(..))
import Octicons
import Project
import Query
import ReleaseStatus
import Set exposing (Set)
import StatefulGraph
import Task
import Time
import Time.Extra as TE
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


view : Model -> Browser.Document Msg
view model =
    { title = pageTitle model
    , body = [ viewCadet model ]
    }


routeParser : UP.Parser (Page -> a) a
routeParser =
    UP.oneOf
        [ UP.map AllProjectsPage UP.top
        , UP.map AllProjectsPage (UP.s "projects")
        , UP.map ProjectPage (UP.s "projects" </> UP.string)
        , UP.map GlobalGraphPage (UP.s "graph")
        , UP.map LabelsPage (UP.s "labels")
        , UP.map ReleasesPage (UP.s "releases")
        , UP.map ReleasePage (UP.s "releases" </> UP.string <?> UQ.string "ref" <?> UQ.string "milestone" <?> UQ.int "tab")
        , UP.map PullRequestsPage (UP.s "pull-requests")
        , UP.map PullRequestsRepoPage (UP.s "pull-requests" </> UP.string <?> UQ.int "tab")
        , UP.map ArchivePage (UP.s "archive")
        , UP.map DashboardPage (UP.s "dashboard")
        , UP.map BouncePage (UP.s "auth" </> UP.s "github")
        , UP.map BouncePage (UP.s "auth")
        , UP.map BouncePage (UP.s "logout")
        ]


pageUrl : Page -> List UB.QueryParameter -> String
pageUrl page query =
    case page of
        AllProjectsPage ->
            UB.absolute [] query

        ProjectPage id ->
            UB.absolute [ "projects", id ] query

        GlobalGraphPage ->
            UB.absolute [ "graph" ] query

        LabelsPage ->
            UB.absolute [ "labels" ] query

        ReleasePage repo mref mmilestone _ ->
            UB.absolute [ "releases", repo ] <|
                case ( mref, mmilestone ) of
                    ( Just ref, _ ) ->
                        UB.string "ref" ref :: query

                    ( Nothing, Just milestone ) ->
                        UB.string "milestone" milestone :: query

                    ( Nothing, Nothing ) ->
                        query

        ReleasesPage ->
            UB.absolute [ "releases" ] query

        PullRequestsPage ->
            UB.absolute [ "pull-requests" ] query

        PullRequestsRepoPage r _ ->
            UB.absolute [ "pull-requests", r ] query

        ArchivePage ->
            UB.absolute [ "archive" ] query

        DashboardPage ->
            UB.absolute [ "dashboard" ] query

        BouncePage ->
            UB.absolute [] query


pageTab : Page -> Int
pageTab page =
    case page of
        ReleasePage _ _ _ mi ->
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
                Drag.Dropped drop ->
                    CardOperations.dropCard model targetCol card drop

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
            ( CardOperations.selectAnticipatedCards model
                |> StatefulGraph.update
            , Cmd.none
            )

        SelectCard id ->
            ( CardOperations.selectCard id model
                |> StatefulGraph.update
            , Cmd.none
            )

        ClearSelectedCards ->
            ( CardOperations.clearSelectedCards model
                |> StatefulGraph.update
            , Cmd.none
            )

        DeselectCard id ->
            ( CardOperations.deselectCard id model
                |> StatefulGraph.update
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
                        if index == model.dataIndex + 1 then
                            ( { model | dataIndex = index }
                                |> handleEvent event data index
                                |> computeViewForPage
                            , Cmd.none
                            )

                        else
                            ( model
                            , Log.debug "skipped a data index; syncing" ( model.dataIndex, index ) <|
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
                            Dict.insert (labelKey label) (Label.randomizeColor newLabel) model.editingLabels
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
            ( { model
                | newLabel = Label.randomizeColor model.newLabel
                , newLabelColored = True
              }
            , Cmd.none
            )

        SetNewLabelName name ->
            let
                newLabel =
                    model.newLabel

                newColor =
                    if model.newLabelColored then
                        model.newLabel.color

                    else
                        Label.generateColor (Hash.hash name)
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
            ( model, CardOperations.applyLabelOperations model )

        SetCreatingColumnNote id note ->
            ( { model | addingColumnNotes = Dict.insert id note model.addingColumnNotes }
            , Task.attempt (always Noop) (Browser.Dom.focus (focusId id))
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
            ( { model | editingCardNotes = Dict.insert id val model.editingCardNotes }
            , CardView.focusEditNote id
            )

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
            Label.cardHasLabel model name card

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

        ReleasesPage ->
            reset
                |> computeRepoStatuses

        ReleasePage _ _ _ _ ->
            { reset
                | suggestedLabels =
                    [ "release/documented"
                    , "release/undocumented"
                    , "release/no-impact"
                    ]
            }
                |> computeRepoStatuses

        PullRequestsRepoPage _ _ ->
            { reset
                | suggestedLabels =
                    [ "needs-test"
                    , "blocked"
                    ]
            }

        _ ->
            reset


computeRepoStatuses : Model -> Model
computeRepoStatuses model =
    let
        add _ repo acc =
            let
                releaseStatuses =
                    ReleaseStatus.init model repo
            in
            if List.isEmpty releaseStatuses then
                acc

            else
                Dict.insert repo.name releaseStatuses acc
    in
    { model | repoReleaseStatuses = Dict.foldl add Dict.empty model.repos }


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


titleSuffix : String -> String
titleSuffix s =
    if String.isEmpty s then
        "Cadet"

    else
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
                    |> Maybe.withDefault ""

            LabelsPage ->
                "Labels"

            ReleasesPage ->
                "Releases"

            ReleasePage repoName _ _ _ ->
                repoName ++ "  Release"

            PullRequestsPage ->
                "Pull Requests"

            PullRequestsRepoPage repoName _ ->
                repoName ++ " Pull Requests"

            ArchivePage ->
                "Archive"

            DashboardPage ->
                "Dashboard"

            BouncePage ->
                "Bounce"


viewCadet : Model -> Html Msg
viewCadet model =
    Html.div [ HA.class "cadet" ]
        [ viewNavBar model
        , Html.div [ HA.class "side-by-side" ]
            [ viewPage model
            , CardOperations.view model
            ]
        ]


matchesRelease : Maybe String -> Maybe String -> Model.ReleaseStatus -> Bool
matchesRelease mref mmilestone rel =
    let
        milestoneMatches milestone =
            case rel.milestone of
                Nothing ->
                    milestone == "none"

                Just { title } ->
                    milestone == title
    in
    case ( mref, mmilestone ) of
        ( Just ref, Just milestone ) ->
            rel.ref == Just ref && milestoneMatches milestone

        ( Just ref, Nothing ) ->
            rel.ref == Just ref

        ( Nothing, Just milestone ) ->
            milestoneMatches milestone

        _ ->
            False


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

            ReleasesPage ->
                viewReleasesPage model

            ReleasePage repoName mref mmilestone _ ->
                Dict.get repoName model.repoReleaseStatuses
                    |> Maybe.andThen (LE.find (matchesRelease mref mmilestone))
                    |> Maybe.map (viewReleasePage model)
                    |> Maybe.withDefault (Html.text "release not found")

            PullRequestsPage ->
                viewPullRequestsPage model

            PullRequestsRepoPage repoName _ ->
                viewRepoPullRequestsPage model repoName

            ArchivePage ->
                viewArchivePage model

            DashboardPage ->
                viewDashboardPage model

            BouncePage ->
                Html.text "you shouldn't see this"
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
            [ navButton model Octicons.project "Projects" "/projects"
            , navButton model Octicons.history "Archive" "/archive"
            , navButton model Octicons.milestone "Release" "/releases"
            , navButton model Octicons.gitPullRequest "PRs" "/pull-requests"
            , navButton model Octicons.circuitBoard "Graph" "/graph"
            , navButton model Octicons.tag "Labels" "/labels"
            , navButton model Octicons.flame "Dashboard" "/dashboard"
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


navButton : Model -> (Octicons.Options -> Html Msg) -> String -> String -> Html Msg
navButton model icon label route =
    let
        active =
            case model.page of
                AllProjectsPage ->
                    label == "Projects"

                ProjectPage _ ->
                    label == "Projects"

                GlobalGraphPage ->
                    label == "Graph"

                ArchivePage ->
                    label == "Archive"

                DashboardPage ->
                    label == "Dashboard"

                LabelsPage ->
                    label == "Labels"

                ReleasesPage ->
                    label == "Releases"

                ReleasePage _ _ _ _ ->
                    label == "Release"

                PullRequestsPage ->
                    label == "PRs"

                PullRequestsRepoPage _ _ ->
                    label == "PRs"

                BouncePage ->
                    False
    in
    Html.a [ HA.class "button", HA.classList [ ( "active", active ) ], HA.href route ]
        [ icon octiconOpts
        , hideLabel label
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
            (List.map (CardView.viewProjectCard model []) projects)
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


compareReleaseStatus : Model.ReleaseStatus -> Model.ReleaseStatus -> Order
compareReleaseStatus a b =
    case ( a.milestone, b.milestone ) of
        ( Just am, Just bm ) ->
            compare am.title bm.title

        ( Just _, Nothing ) ->
            GT

        ( Nothing, Just _ ) ->
            LT

        ( Nothing, Nothing ) ->
            case ( a.ref, b.ref ) of
                ( Just ar, Just br ) ->
                    compare ar br

                _ ->
                    -- impossible
                    EQ


viewReleasesPage : Model -> Html Msg
viewReleasesPage model =
    let
        viewRepoReleases repoName releases =
            Html.div [ HA.class "repo-releases" ]
                [ Html.span [ HA.class "column-title" ]
                    [ Octicons.repo octiconOpts
                    , Html.text repoName
                    ]
                , releases
                    |> List.sortWith compareReleaseStatus
                    |> List.reverse
                    |> List.map (ReleaseStatus.view model)
                    |> Html.div [ HA.class "releases" ]
                ]
    in
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Octicons.milestone octiconOpts
            , Html.text "Releases"
            ]
        , Html.div [ HA.class "all-releases" ] <|
            Dict.values (Dict.map viewRepoReleases model.repoReleaseStatuses)
        ]


viewReleasePage : Model -> Model.ReleaseStatus -> Html Msg
viewReleasePage model sir =
    Html.div [ HA.class "page-content" ]
        [ Html.div [ HA.class "page-header" ]
            [ Html.a [ HA.href "/release" ]
                [ Octicons.milestone octiconOpts
                , Html.text "Release"
                ]
            , Octicons.repo octiconOpts
            , Html.text sir.repo.name
            , case sir.milestone of
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
            Label.view model label

        Nothing ->
            Html.text ("missing label: " ++ name)


viewTabbedCards : Model -> List ( Html Msg, String, List Card ) -> Html Msg
viewTabbedCards model tabs =
    Html.div [ HA.class "tabbed-cards" ]
        [ let
            tabAttrs tab =
                [ HA.classList [ ( "tab", True ), ( "selected", pageTab model.page == tab ) ]
                , HA.href (pageUrl model.page [ UB.int "tab" tab ])
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
                        |> List.map (CardView.viewCard model [])
                        |> Html.div [ HA.class "tab-cards", firstTabClass ]

            _ ->
                Html.text ""
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
                    |> List.map (CardView.viewCard model [])
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
                    lastActiveUser model card.id

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

            else if Label.cardHasLabel model "needs-test" card then
                { cat | needsTest = card :: cat.needsTest }

            else if Label.cardHasLabel model "blocked" card then
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
            , Html.text "Weekly Archive"
            ]
        , eventsThisWeek model
            |> groupEvents model.currentZone
            |> List.map (\( a, b ) -> viewArchiveDay model a b)
            |> Html.div [ HA.class "archive-columns" ]
        ]


viewDashboardPage : Model -> Html Msg
viewDashboardPage model =
    let
        eventCounts event =
            case event of
                "review-comment" ->
                    True

                "review-approved" ->
                    True

                "review-changes-requested" ->
                    True

                _ ->
                    False

        events =
            eventsThisWeek model
                |> List.filter (.event >> .event >> eventCounts)

        bumpLeaderboard user entry =
            case entry of
                Nothing ->
                    Just ( user, 1 )

                Just ( _, count ) ->
                    Just ( user, count + 1 )

        countUserEvent event byUser =
            case event.user of
                Nothing ->
                    byUser

                Just user ->
                    Dict.update user.id (bumpLeaderboard user) byUser

        leaderboard =
            List.foldl
                (\{ event } -> countUserEvent event)
                Dict.empty
                events
                |> Dict.values
                |> List.sortBy Tuple.second
                |> List.reverse

        prHasReviewers prId =
            Dict.get prId model.prReviewers
                |> Maybe.withDefault []
                |> List.isEmpty
                |> not

        prLastActivityIsAuthor prId =
            case ( lastActiveUser model prId, Dict.get prId model.prs ) of
                ( Just user, Just pr ) ->
                    user.id == Maybe.withDefault "" (Maybe.map .id pr.author)

                _ ->
                    False

        prIsReadyToMerge prId =
            Dict.get prId model.prReviewers
                |> Maybe.withDefault []
                |> (\rs -> not (List.isEmpty rs) && List.all (.state >> (==) GitHub.PullRequestReviewStateApproved) rs)

        prsNeedingAttention =
            List.concat (Dict.values model.openPRsByRepo)
                |> List.filter (not << prHasReviewers)
                |> List.filterMap (\id -> Dict.get id model.cards)
                |> List.sortBy .number
                |> List.reverse

        prsWaitingReply =
            List.concat (Dict.values model.openPRsByRepo)
                |> List.filter prLastActivityIsAuthor
                |> List.filterMap (\id -> Dict.get id model.cards)
                |> List.sortBy .number
                |> List.reverse

        prsWaitingMerge =
            List.concat (Dict.values model.openPRsByRepo)
                |> List.filter prIsReadyToMerge
                |> List.filterMap (\id -> Dict.get id model.cards)
                |> List.sortBy .number
                |> List.reverse
    in
    Html.div [ HA.class "page-content dashboard" ]
        [ Html.div [ HA.class "dashboard-pane leaderboard-pane" ]
            [ Html.div [ HA.class "page-header" ]
                [ Octicons.flame octiconOpts
                , Html.text "Weekly Review Leaderboard"
                ]
            , Html.div [ HA.class "leaderboard" ]
                (List.map viewLeaderboardEntry leaderboard)
            ]
        , Html.div [ HA.class "dashboard-pane review-inbox-pane" ]
            [ Html.div [ HA.class "page-header" ]
                [ Octicons.inbox octiconOpts
                , Html.text "Review Inbox"
                ]
            , Html.div [ HA.class "dashboard-cards" ] <|
                List.map (CardView.viewCard model []) prsNeedingAttention
            ]
        , Html.div [ HA.class "dashboard-pane author-waiting-pane" ]
            [ Html.div [ HA.class "page-header" ]
                [ Octicons.clock octiconOpts
                , Html.text "Author Waiting"
                ]
            , Html.div [ HA.class "dashboard-cards" ] <|
                List.map (CardView.viewCard model []) prsWaitingReply
            ]
        , Html.div [ HA.class "dashboard-pane approved-pane" ]
            [ Html.div [ HA.class "page-header" ]
                [ Octicons.check octiconOpts
                , Html.text "Approved"
                ]
            , Html.div [ HA.class "dashboard-cards" ] <|
                List.map (CardView.viewCard model []) prsWaitingMerge
            ]
        ]


viewLeaderboardEntry : ( GitHub.User, Int ) -> Html Msg
viewLeaderboardEntry ( user, count ) =
    Html.div [ HA.class "leaderboard-entry" ]
        [ Html.div [ HA.class "leaderboard-person" ]
            [ Html.img [ HA.class "leaderboard-avatar", HA.src user.avatar ] []
            , Html.text (Maybe.withDefault user.login user.name)
            ]
        , Html.div [ HA.class "leaderboard-count" ]
            [ Html.span [ HA.class "leaderboard-count-number" ]
                [ Html.text (String.fromInt count)
                ]
            ]
        ]


viewArchiveDay : Model -> ArchiveDay -> List Model.ArchiveEvent -> Html Msg
viewArchiveDay model { year, month, day } events =
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
                    [ CardView.viewCardIcon card
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


type alias ArchiveDay =
    { year : Int
    , month : Time.Month
    , day : Int
    , weekday : Time.Weekday
    }


groupEvents : Time.Zone -> List Model.ArchiveEvent -> List ( ArchiveDay, List Model.ArchiveEvent )
groupEvents zone =
    let
        insertEvent event acc =
            let
                day =
                    { year = Time.toYear zone event.event.createdAt
                    , month = Time.toMonth zone event.event.createdAt
                    , day = Time.toDay zone event.event.createdAt
                    , weekday = Time.toWeekday zone event.event.createdAt
                    }
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
    List.foldr insertEvent []


eventsThisWeek : Model -> List Model.ArchiveEvent
eventsThisWeek model =
    let
        startOfWeek =
            TE.floor TE.Week model.currentZone model.currentTime
                |> Time.posixToMillis
    in
    LE.takeWhile (eventMillis >> (<) startOfWeek) model.archive


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
                                     , HE.onClick (Label.search model label.name)
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
                                 , HE.onClick (Label.search model label.name)
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


focusId : GitHub.ID -> String
focusId colId =
    "add-note-" ++ colId


viewProjectColumn : Model -> GitHub.Project -> GitHub.ProjectColumn -> Html Msg
viewProjectColumn model project col =
    let
        cards =
            Dict.get col.id model.columnCards
                |> Maybe.withDefault []

        ( archived, unarchived ) =
            List.partition .isArchived cards

        firstDropCandidate =
            { msgFunc = MoveCardAfter
            , target =
                { projectId = project.id
                , columnId = col.id
                , afterId = Nothing
                }
            }

        addingNote =
            Dict.get col.id model.addingColumnNotes

        draggableCard card =
            let
                dragId =
                    Model.FromColumnCardSource { columnId = col.id, cardId = card.id }

                afterDropCandidate =
                    { msgFunc = MoveCardAfter
                    , target =
                        { projectId = project.id
                        , columnId = col.id
                        , afterId = Just card.id
                        }
                    }
            in
            [ CardView.viewProjectColumnCard model project col card
                |> Drag.draggable model.projectDrag ProjectDrag dragId
            , Drag.viewDropArea model.projectDrag ProjectDrag afterDropCandidate (Just dragId)
            ]
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
                [ Drag.viewDropArea model.projectDrag ProjectDrag firstDropCandidate Nothing
                ]

          else
            Html.div [ HA.class "cards" ] <|
                List.concat
                    [ [ Drag.viewDropArea model.projectDrag ProjectDrag firstDropCandidate Nothing ]
                    , case addingNote of
                        Nothing ->
                            []

                        Just note ->
                            [ viewAddingNote col note ]
                    , List.concatMap draggableCard unarchived
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
                        Drag.viewDropArea model.projectDrag ProjectDrag firstDropCandidate Nothing
                            :: List.concatMap draggableCard archived

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
                    , HA.id (focusId col.id)
                    , HE.onInput (SetCreatingColumnNote col.id)
                    , Events.onCtrlEnter (CreateColumnNote col.id)
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


lastActiveUser : Model -> GitHub.ID -> Maybe GitHub.User
lastActiveUser model cardId =
    Dict.get cardId model.cardEvents
        |> Maybe.andThen List.head
        |> Maybe.andThen .user


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
                    let
                        commits =
                            { lastRelease = val.lastRelease
                            , commits = val.commits
                            }

                        setRefCommits =
                            Maybe.withDefault Dict.empty
                                >> Dict.insert val.ref commits
                                >> Just
                    in
                    { model | repoCommits = Dict.update val.repoId setRefCommits model.repoCommits }

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

        latestFirst e1 e2 =
            case compare (eventMillis e1) (eventMillis e2) of
                EQ ->
                    EQ

                LT ->
                    GT

                GT ->
                    LT
    in
    cards
        |> Dict.values
        |> List.concatMap cardEvents
        |> List.sortWith latestFirst


eventMillis : Model.ArchiveEvent -> Int
eventMillis =
    .event >> .createdAt >> Time.posixToMillis


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
