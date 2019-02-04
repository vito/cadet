module Log exposing (debug)

import Debug


debug : String -> thing -> a -> a
debug ctx thing a =
    always a (Debug.log ctx thing)



-- debug : String -> err -> a -> a
-- debug ctx err a =
--     a
