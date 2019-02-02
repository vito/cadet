module Log exposing (debug)

-- import Debug
-- debug : String -> err -> a -> a
-- debug ctx err a =
--   always a (Debug.log ctx err)


debug : String -> err -> a -> a
debug ctx err a =
    a
