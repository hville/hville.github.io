// ../node_modules/@hugov/shorter-string/src/bwt.js
function lyndon(s) {
  const ends = [];
  let k = 0;
  while (k < s.length) {
    let i = k, j = k + 1;
    while (j < s.length && s[i] <= s[j])
      s[i] === s[j++] ? ++i : i = k;
    ends.push(k += j - i);
  }
  return ends;
}
function get_rotations(s) {
  const words = lyndon(s), rots = [];
  let iw = 0, i = 0;
  for (let k = 0; k < s.length; ++k) {
    if (k === words[iw])
      i = words[iw++];
    rots[k] = { k, i, j: words[iw] };
  }
  return rots;
}
function encodeBWT(s) {
  return get_rotations(s).sort((a, b) => {
    let ka = a.k, kb = b.k;
    do {
      if (s[ka] < s[kb])
        return -1;
      else if (s[ka] > s[kb])
        return 1;
      if (++ka === a.j)
        ka = a.i;
      if (++kb === b.j)
        kb = b.i;
    } while (ka !== a.k || kb !== b.k);
    return 0;
  }).reduce((acc, rot) => acc + s[(rot.k === rot.i ? rot.j : rot.k) - 1], "");
}
function match(str) {
  const cnt = {};
  for (const c of str)
    cnt[c] ? ++cnt[c] : cnt[c] = 1;
  const keys = Object.keys(cnt).sort(), before = { [keys[0]]: 0 }, theta = [], seen = {};
  for (let i = 1; i < keys.length; ++i)
    before[keys[i]] = before[keys[i - 1]] + cnt[keys[i - 1]];
  for (const c of str)
    theta.push(before[c] + (seen[c] ? ++seen[c] : seen[c] = 1) - 1);
  return theta;
}
function decodeBWT(str) {
  const T = match(str), alpha = [];
  for (let j = 0; j < str.length; ++j) {
    if (T[j] !== -1) {
      let k = j;
      do {
        alpha.push(str[k]);
        const t = k;
        k = T[k];
        T[t] = -1;
      } while (T[k] !== -1);
    }
  }
  return alpha.reverse().join("");
}

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

// ../node_modules/@hugov/shorter-string/src/egc.js
function encodeEGC(arr, min = 0) {
  let res = 0n, j = arr.length;
  while (j--) {
    let v = arr[j] + 1 - min, n = -1;
    while (v) {
      res = v & 1 ? res << 1n | 1n : res << 1n;
      v >>>= 1;
      ++n;
    }
    res <<= BigInt(n);
  }
  return res;
}
function decodeEGC(big, min = 0) {
  let res = [];
  while (big) {
    let v = 0, n = 1;
    while (!(big & 1n)) {
      ++n;
      big >>= 1n;
    }
    while (n--) {
      v = big & 1n ? v << 1 | 1 : v << 1;
      big >>= 1n;
    }
    res.push(v - 1 + min);
  }
  return res;
}

// ../node_modules/@hugov/shorter-string/src/btt.js
function encodeBTT(big, keys = HASH) {
  const len = BigInt(keys.length);
  let res = [];
  do {
    res.unshift(keys[big % len]);
    big /= len;
  } while (big);
  return res.join("");
}
function decodeBTT(txt, keys = HASH) {
  const len = BigInt(keys.length);
  let big = 0n;
  for (const c of txt) {
    big = big * len + BigInt(keys.indexOf(c));
  }
  return big;
}

// ../node_modules/@hugov/shorter-string/index.js
function encode(text, keys = HASH, dic = MTF) {
  return text ? encodeBTT(encodeEGC(encodeMTF(encodeBWT(text), dic)), keys) : "";
}
function decode(code, keys = HASH, dic = MTF) {
  return code ? decodeBWT(decodeMTF(decodeEGC(decodeBTT(code, keys)), dic)) : "";
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
  UPPER,
  decode,
  encode
};
