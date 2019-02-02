{- vendored and updated from jergason/elm-hash -}


module Hash exposing (hash)

{-| A simple hash function for Elm.

@docs hash

-}

import Bitwise
import Char exposing (toCode)
import String exposing (foldl)



{-
   from http://www.cse.yorku.ca/~oz/hash.html

   ```c
   unsigned long hash(unsigned char *str) {
     unsigned long hash = 5381;
     int c;

     while (c = *str++)
       hash = ((hash << 5) + hash) + c; /* hash * 33 + c */

     return hash;
   }
   ```
-}


{-| Hashes a String to an Int using the
[djb2](http://www.cse.yorku.ca/~oz/hash.html) algorithm. This is in no way
cryptographically secure. It is just for turning abirary strings in to numbers.

    hash "yolo swaggins" == 2438413579

-}
hash : String -> Int
hash str =
    foldl updateHash 5381 str


updateHash : Char -> Int -> Int
updateHash c h =
    Bitwise.shiftLeftBy h 5 + h + toCode c
