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
export {
  decodeBWT,
  encodeBWT
};
