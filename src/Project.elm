module Project exposing (detectColumn)

import GitHub


detectColumn : { icebox : GitHub.ProjectColumn -> Bool, backlog : GitHub.ProjectColumn -> Bool, inFlight : GitHub.ProjectColumn -> Bool, done : GitHub.ProjectColumn -> Bool }
detectColumn =
    { icebox = (==) "Icebox" << .name
    , backlog = (==) GitHub.ProjectColumnPurposeToDo << .purpose
    , inFlight = (==) GitHub.ProjectColumnPurposeInProgress << .purpose
    , done = (==) GitHub.ProjectColumnPurposeDone << .purpose
    }
