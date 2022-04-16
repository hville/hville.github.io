// ../node_modules/@hugov/shorter-string/src/egc.js
function encodeEGC(arr) {
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
function decodeEGC(big) {
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
  decodeEGC,
  encodeEGC
};
