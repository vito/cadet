module Project exposing (detectColumn)

import GitHub


detectColumn : { icebox : GitHub.ProjectColumn -> Bool, backlog : GitHub.ProjectColumn -> Bool, inFlight : GitHub.ProjectColumn -> Bool, done : GitHub.ProjectColumn -> Bool }
detectColumn =
    { icebox = (==) Nothing << .purpose
    , backlog = (==) (Just GitHub.ProjectColumnPurposeToDo) << .purpose
    , inFlight = (==) (Just GitHub.ProjectColumnPurposeInProgress) << .purpose
    , done = (==) (Just GitHub.ProjectColumnPurposeDone) << .purpose
    }
