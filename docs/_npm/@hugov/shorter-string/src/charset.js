// ../node_modules/@hugov/shorter-string/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var BASE64 = BASE62 + "-_";
var UNRESERVED = BASE62 + "-._~";
var QUERY = UNRESERVED + "%!$&()*+,;=:@";
var HASH = BASE62 + `!#$&'()*+,-./:;=?@[\\]^_{|}~`;
var MTF = ` ${LOWER},.'":;-?()[]{}
!${DIGIT}+/*=_~<>^\`#%	$&@|\\${UPPER}\v\f\r${chars(0, 8) + chars(14, 31)}\x7F`;
function chars(i, j, s = "") {
  while (i <= j)
    s += String.fromCharCode(i++);
  return s;
}
export {
  BASE62,
  BASE64,
  DIGIT,
  HASH,
  LOWER,
  MTF,
  QUERY,
  UNRESERVED,
  UPPER
};
