// ../node_modules/@hugov/shorter-string2/src/deflate.js
async function deflate(txt, format = "deflate-raw") {
  let buffer = null;
  const stream = new Blob([txt]).stream().pipeThrough(new CompressionStream(format));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
async function inflate(bytes, format = "deflate-raw") {
  const stream = new Blob([bytes]).stream();
  const decompressedStream = stream.pipeThrough(new DecompressionStream(format));
  return await new Response(decompressedStream).text();
}

// ../node_modules/@hugov/shorter-string2/src/charset.js
var LOWER = "abcdefghijklmnopqrstuvwxyz";
var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var DIGIT = "0123456789";
var BASE62 = DIGIT + UPPER + LOWER;
var BASE64 = BASE62 + "-_";
var UNRESERVED = BASE62 + "-._~";
var QUERY = UNRESERVED + "!$&()*+,;=:@";
var HASH = QUERY + "#/?";

// ../node_modules/@hugov/shorter-string2/src/bigint.js
function toString(big, keys = HASH) {
  const len = BigInt(keys.length);
  let res = "";
  do {
    res += keys[big % len];
    big /= len;
  } while (big);
  return res;
}
function fromString(txt, keys = HASH) {
  let big = 0n, j = txt.length;
  const len = BigInt(keys.length), map = {};
  while (j--) {
    const char = txt[j];
    const val = map[char] ?? (map[char] = BigInt(keys.indexOf(char)));
    big = big * len + val;
  }
  return big;
}
function fromArray(arr) {
  const bits = BigInt(8 * arr.BYTES_PER_ELEMENT);
  let big = 1n, i = arr.length;
  while (i--) {
    big <<= bits;
    big |= BigInt(arr[i]);
  }
  return big;
}
function toArray(big, Target = Uint8Array) {
  const bits = (Target.BYTES_PER_ELEMENT ?? 6) * 8, bitn = BigInt(bits);
  const arr = [];
  while (big > 1n) {
    const uint = Number(BigInt.asUintN(bits, big));
    arr.push(Number(BigInt.asUintN(bits, big)));
    big >>= bitn;
  }
  return new Target(arr);
}

// ../node_modules/@hugov/shorter-string2/index.js
async function encode(text, keys = HASH) {
  return text ? toString(fromArray(await deflate(text)), keys) : "";
}
async function decode(code, keys = HASH) {
  return code ? inflate(toArray(fromString(code, keys))) : "";
}
export {
  BASE62,
  BASE64,
  DIGIT,
  HASH,
  LOWER,
  QUERY,
  UNRESERVED,
  UPPER,
  decode,
  encode
};
