// ../node_modules/@hugov/shorter-string/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var BASE64 = BASE62 + "-_";
var UNRESERVED = BASE62 + "-._~";
var PCHAR = UNRESERVED + "%!$&'()*+,;=:@";
var RFC1924 = BASE62 + "!#$%&()*+-;<=>?@^_`{|}~";
var QUERY = UNRESERVED + "%!$&()*+,;=:@";
var HASH = PCHAR + "/?#";
var MTF = charRange(127, 127, charRange(0, 8, charRange(11, 31, " " + LOWER + `,.'":;-?()[]{}
!` + DIGIT + "+/*=_~<>^`#%	$&@|\\" + UPPER)));
function charRange(i, j, s) {
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
  PCHAR,
  QUERY,
  RFC1924,
  UNRESERVED,
  UPPER
};
