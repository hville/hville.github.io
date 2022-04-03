// node_modules/@hugov/bench/browser.js
var Q1_PAD = 3;
var POOLQTY = 4 * Q1_PAD + 1;
var POOL_MS = 100;
async function browser_default(tests) {
  const testNames = Object.keys(tests), results = {};
  for (const k of testNames) {
    const sample_ = tests[k]();
    results[k] = Object.defineProperties([], {
      type: { value: typeof await sample_ },
      pool: { value: 1, writable: true },
      means: { value: [] },
      get_ms: { value: sample_.then ? get_ms_ : get_ms }
    });
    await run(tests[k], results[k]);
  }
  for (let i = 0; i < POOLQTY; ++i) {
    for (const k of testNames)
      await run(tests[k], results[k]);
    testNames.push(testNames.shift());
  }
  for (const res of Object.values(results))
    if (!res.error) {
      res.means.sort((a, b) => a - b);
      res[0] = res.means[Q1_PAD];
      res[1] = res.means[3 * Q1_PAD];
    }
  return results;
}
function get_ms(fcn, n, type) {
  const t0 = performance.now();
  while (n--)
    if (typeof fcn() !== type)
      return Infinity;
  return performance.now() - t0;
}
async function get_ms_(fcn, n, type) {
  const t0 = performance.now();
  while (n--)
    if (typeof await fcn() !== type)
      return Infinity;
  return performance.now() - t0;
}
async function run(test, result) {
  if (!result.error) {
    const ms = await result.get_ms(test, result.pool, result.type);
    if (ms === Infinity)
      result.error = "inconsistent return type";
    else if (ms === 0) {
      result.pool *= 2;
      run(test, result);
    } else {
      result.means.push(1e3 * result.pool / ms);
      result.pool = Math.ceil(result.pool * (POOL_MS / ms + 1) / 2);
    }
  }
}
export {
  browser_default as default
};
