// ../node_modules/@hugov/shorter-string/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var BASE64 = BASE62 + "-_";
var UNRESERVED = BASE62 + "-._~";
var QUERY = UNRESERVED + "!$&()*+,;=:@";
var HASH = QUERY + "#'/?";
var MTF = ` ${LOWER},.'":;-?()[]{}
!${DIGIT}+/*=_~<>^\`#%	$&@|\\${UPPER}\v\f\r${chars(0, 8) + chars(14, 31)}\x7F`;
function chars(i, j, s = "") {
  while (i <= j)
    s += String.fromCharCode(i++);
  return s;
}

// ../node_modules/@hugov/shorter-string/src/mtf.js
function decodeMTF(arr, DIC = MTF) {
  const res = [], dic = DIC.split("");
  for (let i of arr) {
    if (i >= dic.length)
      for (let j = dic.length; j <= i; ++j)
        dic[j] = String.fromCharCode(j);
    const c = dic[i];
    res.push(c);
    while (i)
      dic[i] = dic[--i];
    dic[0] = c;
  }
  return res.join("");
}
function encodeMTF(txt, DIC = MTF) {
  const res = [], dic = DIC.split("");
  for (const c of txt) {
    let i = dic.indexOf(c);
    if (i < 0) {
      i = c.charCodeAt();
      for (let j = dic.length; j < i; ++j)
        dic[j] = String.fromCharCode(j);
    }
    res.push(i);
    while (i)
      dic[i] = dic[--i];
    dic[0] = c;
  }
  return res;
}
export {
  decodeMTF,
  encodeMTF
};
