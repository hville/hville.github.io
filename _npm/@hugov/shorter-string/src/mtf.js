// node_modules/@hugov/shorter-string/src/mtf.js
function dMTF(arr, DIC) {
  const dic = DIC?.slice() || [], res = [];
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
function eMTF(txt, DIC) {
  const dic = DIC?.slice() || [], res = [];
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
  dMTF,
  eMTF
};
