// node_modules/@hugov/shorter-string/src/bwt.js
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
function bwt(s) {
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
function inv_bwt(str) {
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

// node_modules/@hugov/shorter-string/src/mtf.js
function dMTF(arr, DIC2) {
  const dic = DIC2?.slice() || [], res = [];
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
function eMTF(txt, DIC2) {
  const dic = DIC2?.slice() || [], res = [];
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

// node_modules/@hugov/shorter-string/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var UNRESERVED2 = BASE62 + ".-_~";
var QUERY = UNRESERVED2 + ",?!():;+/*=$&@";
var FRAGMENT = QUERY + "'";

// node_modules/@hugov/shorter-string/index.js
var DIC = (" " + LOWER + `,.'":;-?()[]{}
!` + DIGIT + "+/*=_~<>^`#%	$&@|\\" + UPPER).split("");
function charRange(i, j, a = []) {
  while (i <= j)
    a.push(String.fromCharCode(i++));
  return a;
}
charRange(127, 127, charRange(0, 9, charRange(11, 31, DIC)));
function enc(text, keys = UNRESERVED, dic = DIC) {
  return text ? toString(arr_big(eMTF(bwt(text), dic)), keys) : "";
}
function dec(code, keys = UNRESERVED, dic = DIC) {
  return code ? inv_bwt(dMTF(big_arr(parseBig(code, keys)), dic)) : "";
}
function toString(big, keys = UNRESERVED) {
  const len = BigInt(keys.length);
  let res = [];
  do {
    res.unshift(keys[big % len]);
    big /= len;
  } while (big);
  return res.join("");
}
function parseBig(txt, keys = COMPONENT) {
  const len = BigInt(keys.length);
  let big = 0n;
  for (const c of txt) {
    big = big * len + BigInt(keys.indexOf(c));
  }
  return big;
}
function arr_big(arr) {
  let res = 0n, j = arr.length;
  while (j--) {
    let v = arr[j] + 1, n = -1;
    while (v) {
      res = v & 1 ? res << 1n | 1n : res << 1n;
      v >>>= 1;
      ++n;
    }
    res <<= BigInt(n);
  }
  return res;
}
function big_arr(big) {
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
    res.push(v - 1);
  }
  return res;
}
export {
  BASE62,
  DIGIT,
  FRAGMENT,
  LOWER,
  QUERY,
  UNRESERVED2 as UNRESERVED,
  UPPER,
  dec,
  enc
};
