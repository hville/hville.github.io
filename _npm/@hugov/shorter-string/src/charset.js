// node_modules/@hugov/shorter-string/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var UNRESERVED = BASE62 + ".-_~";
var QUERY = UNRESERVED + ",?!():;+/*=$&@";
var FRAGMENT = QUERY + "'";
export {
  BASE62,
  DIGIT,
  FRAGMENT,
  LOWER,
  QUERY,
  UNRESERVED,
  UPPER
};
