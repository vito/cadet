module Log exposing (debug, dump)

import Debug


debug : String -> thing -> a -> a
debug ctx thing a =
    always a (Debug.log ctx thing)


dump : String -> thing -> a -> a
dump ctx thing a =
    always a (Debug.log ctx (thing, a))

-- debug : String -> err -> a -> a
-- debug ctx err a =
--     a
