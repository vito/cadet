module Log exposing (debug, dump, dumpTransform)

import Debug


debug : String -> thing -> a -> a
debug ctx thing a =
    always a (Debug.log ctx thing)


dump : String -> thing -> a -> a
dump ctx thing a =
    always a (Debug.log ctx ( thing, a ))


dumpTransform : String -> thing -> (a -> b) -> a -> a
dumpTransform ctx thing f a =
    always a (Debug.log ctx ( thing, f a ))



-- debug : String -> err -> a -> a
-- debug ctx err a =
--     a
