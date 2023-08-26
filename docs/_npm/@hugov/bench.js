// ../node_modules/@hugov/bench/main.js
async function main_default(tests, POOL_MS = getMinMS() * 50, Q1_PAD = 3) {
  const testNames = Object.keys(tests), POOLQTY = 4 * Q1_PAD + 1, testdata = {};
  for (const k of testNames) {
    const sample_ = tests[k](0);
    testdata[k] = {
      test: tests[k],
      type: typeof await sample_,
      pool: 1,
      means: [],
      runs: 0,
      get_ms: sample_?.then ? get_ms_async : get_ms_sync
    };
    await run(testdata[k], POOL_MS);
    testdata[k].means.length = 0;
  }
  for (let i = 0; i < POOLQTY; ++i) {
    for (const k of testNames)
      await run(testdata[k], POOL_MS);
    testNames.push(testNames.shift());
  }
  const results = {};
  for (const k in testdata) {
    if (testdata[k].error)
      results[k] = testdata[k].error;
    else {
      const means = testdata[k].means.sort((a, b) => a - b);
      results[k] = [means[Q1_PAD], means[2 * Q1_PAD], means[3 * Q1_PAD]];
    }
  }
  return results;
}
async function run(data, POOL_MS) {
  if (!data.error) {
    const ms = await data.get_ms(data.test, data.type, data.runs, data.runs += data.pool);
    if (ms === Infinity)
      data.error = "inconsistent return type";
    else if (ms > 0) {
      data.means.push(1e3 * data.pool / ms);
      data.pool = Math.ceil(data.pool * POOL_MS / ms);
    } else if ((data.pool *= 2) >= Number.MAX_SAFE_INTEGER)
      data.error = "test function too fast";
    else
      run(data, POOL_MS);
  }
}
function getMinMS(r = performance.now(), t = r) {
  while (t <= r)
    t = performance.now();
  return t - r;
}
function get_ms_sync(fcn, type, i, j) {
  if (j == null)
    throw Error;
  const t0 = performance.now();
  while (i < j)
    if (typeof fcn(i++) !== type)
      return Infinity;
  return Promise.resolve(performance.now() - t0);
}
async function get_ms_async(fcn, type, i, j) {
  const t0 = performance.now();
  while (i < j)
    if (typeof await fcn(i++) !== type)
      return Infinity;
  return performance.now() - t0;
}
export {
  main_default as default
};
