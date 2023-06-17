// ../node_modules/norm-dist/icdf-voutier.js
var pL = 0.025;
var pH = 1 - pL;
var a0 = 0.151015505647689;
var a1 = -0.5303572634357367;
var a2 = 1.365020122861334;
var b0 = 0.132089632343748;
var b1 = -0.7607324991323768;
var c3 = -1.000182518730158;
var c0 = 16.682320830719988;
var c1 = 4.120411523939115;
var c2 = 0.02981418730820021;
var d0 = 7.173787663925508;
var d1 = 8.759693508958634;
function icdf_voutier_default(p = Math.random()) {
  if (p < pL) {
    const r2 = Math.sqrt(-Math.log(p) * 2);
    return (c1 * r2 + c0) / ((r2 + d1) * r2 + d0) + c3 * r2 + c2;
  }
  if (p > pH) {
    const r2 = Math.sqrt(-Math.log1p(-p) * 2);
    return -((c1 * r2 + c0) / ((r2 + d1) * r2 + d0) + c3 * r2 + c2);
  }
  const q = p - 0.5, r = q * q;
  return ((a1 * r + a0) / ((r + b1) * r + b0) + a2) * q;
}

// ../node_modules/grosso-modo/norm.js
function norm_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  const mu = (high + low) / 2, si = (high - low) / icdf_voutier_default((1 + prob) / 2) / 2;
  return function(zSeed) {
    return (zSeed === void 0 ? icdf_voutier_default(Math.random()) : zSeed) * si + mu;
  };
}

// ../node_modules/grosso-modo/logn.js
function logn_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  const hl = high * low;
  if (hl <= 0)
    throw Error("range must not cross 0");
  const mu = Math.log(hl) / 2, si = Math.log(low > 0 ? high / low : low / high) / 2 / icdf_voutier_default((prob + 1) / 2);
  return low > 0 ? function(zSeed) {
    return Math.exp((zSeed === void 0 ? icdf_voutier_default(Math.random()) : zSeed) * si + mu);
  } : function(zSeed) {
    return -Math.exp(-(zSeed === void 0 ? icdf_voutier_default(Math.random()) : zSeed) * si + mu);
  };
}

// ../node_modules/norm-dist/pdf.js
function pdf_default(z) {
  return Math.exp(-(Math.log(2 * Math.PI) + z * z) * 0.5);
}

// ../node_modules/norm-dist/cdf.js
var b02 = 0.2316419;
var b12 = 0.31938153;
var b2 = -0.356563782;
var b3 = 1.781477937;
var b4 = -1.821255978;
var b5 = 1.330274429;
function cdf_default(z) {
  if (z > 6)
    return 1;
  else if (z < -6)
    return 0;
  const t = 1 / (1 + b02 * Math.abs(z)), t2 = t * t, y = t * (b12 + b2 * t + (b3 + b4 * t + b5 * t2) * t2);
  return z < 0 ? pdf_default(-z) * y : 1 - pdf_default(z) * y;
}

// ../node_modules/grosso-modo/gumbel.js
function gumbel_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  const p = (1 - prob) / 2, lnln1p = Math.log(-Math.log(p)), lnln1q = Math.log(-Math.log(1 - p)), s = (high - low) / (lnln1q - lnln1p), m = (high * lnln1p - low * lnln1q) / (lnln1p - lnln1q);
  return function(zSeed) {
    const p2 = zSeed === void 0 ? Math.random() : cdf_default(zSeed);
    return m + s * Math.log(-Math.log(p2));
  };
}

// ../node_modules/grosso-modo/uniform.js
function uniform_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  var rng = (high - low) / prob, min = (high + low - rng) / 2;
  return function(zSeed) {
    var p = zSeed === void 0 ? Math.random() : cdf_default(zSeed);
    return min + p * rng;
  };
}

// ../node_modules/grosso-modo/weibull.js
function weibull_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  if (high * low <= 0)
    throw Error("range must not cross 0");
  const p = (1 - prob) / 2, lnp = Math.log(p), lnq = Math.log(1 - p), \u03BA = Math.log(low > 0 ? high / low : low / high) / Math.log(lnp / lnq), \u03BB = (low > 0 ? low : high) / Math.pow(-lnq, \u03BA);
  return low > 0 ? function(zSeed) {
    const p2 = zSeed === void 0 ? Math.random() : cdf_default(zSeed);
    return \u03BB * Math.pow(-Math.log(1 - p2), \u03BA);
  } : function(zSeed) {
    const p2 = zSeed === void 0 ? Math.random() : cdf_default(-zSeed);
    return \u03BB * Math.pow(-Math.log(1 - p2), \u03BA);
  };
}

// ../node_modules/grosso-modo/dagum.js
function dagum_default(low, high, prob = 0.5) {
  if (high <= low)
    throw Error("high <= low");
  if (high * low <= 0)
    throw Error("range must not cross 0");
  const q_p = (1 + prob) / (1 - prob), H_L = low > 0 ? high / low : low / high, _a = 0.5 * Math.log(H_L) / Math.log(q_p), b = (low > 0 ? low : high) * Math.pow(q_p, _a);
  return low > 0 ? function(zSeed) {
    const p = zSeed === void 0 ? Math.random() : cdf_default(zSeed);
    return b * Math.pow(p / (1 - p), _a);
  } : function(zSeed) {
    const p = zSeed === void 0 ? Math.random() : cdf_default(-zSeed);
    return b * Math.pow(p / (1 - p), _a);
  };
}

// ../node_modules/@hugov/correl-range/src/_random-number.js
var RandomNumber = class {
  constructor(fz) {
    this._fz = fz;
    this._ks = [];
    this._ws = [];
    this.value = NaN;
  }
  valueOf() {
    return this.value;
  }
  update(zs) {
    let v = 0;
    for (var i = 0; i < this._ks.length; ++i)
      v += this._ws[i] * zs[this._ks[i]];
    this.value = this._fz(v);
    return this;
  }
  _link(risks, links) {
    const ks = this._ks, ws = this._ws;
    let \u0394 = 1, i = 0, m = links.length % 2 ? links.length - 1 : links.length;
    while (i < m) {
      ks[ks.length] = riskIndex(risks, links[i++]);
      const w = links[i++];
      \u0394 -= (ws[ws.length] = w) ** 2;
      if (\u0394 < -Number.EPSILON)
        throw Error("sum of squared weights > 1");
    }
    if (\u0394 > Number.EPSILON) {
      ks[ks.length] = riskIndex(risks, links[i]);
      ws[ws.length] = Math.sqrt(\u0394);
    }
    return this;
  }
};
function riskIndex(risks, itm) {
  let idx = risks.indexOf(itm);
  return idx !== -1 ? idx : risks.push(itm ?? "") - 1;
}

// ../node_modules/sample-distribution/index.js
var D = class {
  constructor(size = 32) {
    const vs = size.buffer ? new Float64Array(size.buffer, size.byteOffset, size.length) : new Float64Array(size * 2), rs = new Float64Array(vs.buffer, vs.byteOffset + (vs.byteLength >> 1), vs.length >> 1);
    Object.defineProperties(this, { vs: { value: vs }, rs: { value: rs } });
  }
  get data() {
    return this.vs;
  }
  get N() {
    return this.rs[this.rs.length - 1];
  }
  get E() {
    return this.\u03A3(1) / this.N;
  }
  get V() {
    const N = this.N;
    return (this.\u03A3(2) - this.\u03A3(1) ** 2 / N) / (N - 1);
  }
  get S() {
    const v = this.V;
    return v < 0 ? 0 : Math.sqrt(v);
  }
  \u03A3(pow) {
    const vs = this.vs, rs = this.rs, M = Math.min(rs.length, rs[rs.length - 1]), Mm = M - 1, Op = pow + 1;
    if (pow === 0)
      return rs[Mm];
    if (pow === 1) {
      let sum2 = vs[0] + vs[Mm];
      for (let i = 0; i < Mm; ++i)
        sum2 += (vs[i + 1] + vs[i]) * (rs[i + 1] - rs[i]);
      return sum2 / Op;
    }
    let sum = vs[0] ** pow;
    for (let i = 1; i < M; ++i) {
      sum += vs[i] ** pow + (rs[i] - rs[i - 1] - 1) * (vs[i] ** Op - vs[i - 1] ** Op) / (vs[i] - vs[i - 1]) / Op;
    }
    return sum;
  }
  M(order) {
    return this.\u03A3(order) / this.N;
  }
  Q(prob) {
    const vs = this.vs, rs = this.rs, M = Math.min(rs.length, rs[rs.length - 1]), h = rs[M - 1] * prob + 0.5, j = topIndex(rs, h, M), i = j - 1;
    return j === 0 ? vs[0] : j === M ? vs[M - 1] : vs[i] + (vs[j] - vs[i]) * (h - rs[i]) / (rs[j] - rs[i]);
  }
  F(x) {
    const vs = this.vs, rs = this.rs, M = Math.min(rs.length, rs[rs.length - 1]), N = rs[M - 1], j = topIndex(vs, x, M), i = j - 1;
    return (j === 0 ? 0.5 : j === M ? N - 0.5 : rs[i] - 0.5 + (rs[j] - rs[i]) * (x - vs[i]) / (vs[j] - vs[i])) / N;
  }
  f(x) {
    const vs = this.vs, rs = this.rs, M = Math.min(rs.length, rs[rs.length - 1]), N = rs[M - 1];
    if (x === vs[0] || x === vs[M - 1])
      return 0.5 / N;
    const j = topIndex(vs, x, M);
    return j === 0 || j === M ? 0 : (rs[j] - rs[j - 1]) / (vs[j] - vs[j - 1]) / N;
  }
  plotF(ctx, vMin = this.vs[0], vMax = this.vs[this.rs.length - 1]) {
    const rs = this.rs, vs = this.vs, xScale = (ctx.canvas.width - 1) / (vMax - vMin), yScale = (ctx.canvas.height - 1) / rs[rs.length - 1], H = ctx.canvas.height, getX = (v) => 0.5 + Math.round((v - vMin) * xScale), getY = (r) => H - 0.5 - Math.round(r * yScale);
    ctx.beginPath();
    ctx.moveTo(getX(Math.min(vs[0], vMin)), H - 0.5);
    ctx.lineTo(getX(vs[0]), H - 0.5);
    for (let i = 0; i < rs.length; ++i)
      ctx.lineTo(getX(vs[i]), getY(rs[i]));
    ctx.lineTo(getX(vs[rs.length - 1]), 0.5);
    ctx.lineTo(getX(Math.max(vs[rs.length - 1], vMax)), 0.5);
  }
  plotf(ctx, vMin = this.vs[0], vMax = this.vs[this.rs.length - 1], yMax = 1 / (this.Q(0.75) - this.Q(0.25))) {
    const rs = this.rs, vs = this.vs, xScale = (ctx.canvas.width - 1) / (vMax - vMin), yScale = (ctx.canvas.height - 1) / yMax / rs[rs.length - 1], H = ctx.canvas.height, getX = (v) => 0.5 + Math.round((v - vMin) * xScale), getY = (drdv) => H - 0.5 - Math.round(drdv * yScale);
    let x = getX(Math.min(vs[0], vMin)), y = H;
    ctx.beginPath();
    ctx.moveTo(getX(Math.min(vs[0], vMin)), H - 0.5);
    ctx.lineTo(x = getX(vs[0]), H - 0.5);
    for (let i = 0, j = 1; j < rs.length; i = j++) {
      ctx.lineTo(x, y = getY((rs[j] - rs[i]) / (vs[j] - vs[i])));
      ctx.lineTo(x = getX(vs[j]), y);
    }
    ctx.lineTo(x, H - 0.5);
    ctx.lineTo(getX(Math.max(vs[rs.length - 1], vMax)), H - 0.5);
  }
  push(x) {
    const vs = this.vs, rs = this.rs, M = Math.min(rs.length, rs[rs.length - 1]);
    let j = topIndex(this.vs, x, M);
    if (M < rs.length) {
      for (let ir = M; ir > j; --ir) {
        rs[ir] = ir + 1;
        vs[ir] = vs[ir - 1];
      }
      rs[j] = j ? rs[j - 1] + 1 : 1;
      vs[j] = x;
      if (M !== rs.length - 1)
        ++rs[rs.length - 1];
    } else if (j === M) {
      --j;
      const i = j - 1, h = i - 1, \u0394wv = vs[j] - vs[i], \u0394xu = x - vs[h], rjh = rs[i] * (vs[j] - vs[h]);
      if (\u0394xu !== 0) {
        const r_w = (rs[j] * (x - vs[i]) + rjh - rs[h] * \u0394wv) / \u0394xu, r_v = (rs[j] * (x - vs[j]) + rjh - \u0394wv) / \u0394xu;
        if (r_v < rs[h] || vs[i] + vs[j] < vs[h] + x && r_w < rs[j] + 1) {
          vs[i] = vs[j];
          rs[i] = r_w;
        } else
          rs[i] = r_v;
        vs[j] = x;
      }
      ++rs[j];
    } else if (j === 0) {
      const u = vs[0], \u0394wx = vs[2] - x;
      if (\u0394wx !== 0) {
        const r_v = (vs[2] + vs[1] - 2 * x + rs[1] * (vs[2] - u)) / \u0394wx, r_u = r_v - rs[2] * (vs[1] - u) / \u0394wx;
        if (u + vs[1] > x + vs[2] && r_u > rs[0] || r_v > rs[2] + 1) {
          vs[1] = u;
          rs[1] = r_u;
        } else
          rs[1] = r_v;
        vs[0] = x;
      }
      for (let ir = 2; ir < rs.length; ++ir)
        ++rs[ir];
    } else if (j !== 1 && (j === M - 1 || 2 * x < vs[j + 1] + vs[j - 2])) {
      --j;
      let k = j + 1, i = j - 1;
      const w = vs[k], v = vs[j], \u0394wu = w - vs[i];
      if (\u0394wu !== 0) {
        const r_x\u0394wu = rs[j] * \u0394wu + (w - x + (x - v) * (rs[k] - rs[i]));
        if (vs[i] + w < v + x || r_x\u0394wu >= (rs[k] + 1) * \u0394wu)
          rs[j] += (w + v - 2 * x) / \u0394wu;
        else {
          rs[j] = r_x\u0394wu / \u0394wu;
          vs[j] = x;
        }
      }
      while (++j < rs.length)
        ++rs[j];
    } else {
      let k = j + 1, i = j - 1;
      const w = vs[k], v = vs[j], \u0394wu = w - vs[i];
      if (\u0394wu !== 0) {
        const r_x\u0394wu = rs[j] * \u0394wu + (w - x + (x - v) * (rs[k] - rs[i]));
        if (x + v < vs[i] + w || r_x\u0394wu <= rs[i] * \u0394wu)
          rs[j] += (w + v - 2 * x) / \u0394wu;
        else {
          rs[j] = r_x\u0394wu / \u0394wu;
          vs[j] = x;
        }
      }
      while (++j < rs.length)
        ++rs[j];
    }
  }
};
function topIndex(arr, v, max) {
  let low = 0;
  while (low < max) {
    const mid = low + max >>> 1;
    if (arr[mid] < v)
      low = mid + 1;
    else
      max = mid;
  }
  return max;
}

// ../node_modules/@hugov/byte-views/byte-views.js
function byte_views_default({ buffer, constructor, byteLength, byteOffset }, View = constructor, length) {
  return new View(buffer ?? arguments[0], buffer ? byteOffset + byteLength : 0, length);
}

// ../node_modules/lazy-stats/index.js
var LazyStats = class {
  constructor(size = 1) {
    this.M = size.buffer ? Math.floor((Math.sqrt(size.byteLength + 1) - 3) / 2) : size;
    const N = (this.M + 1) * (this.M + 2) / 2;
    const memory = size.buffer ? new Float64Array(size.buffer, size.offset, N) : new Float64Array(N);
    Object.defineProperties(this, {
      _mi: { value: memory },
      _mij: { value: Array(this.M) }
    });
    this._mij[0] = new Float64Array(memory.buffer, memory.byteOffset + memory.BYTES_PER_ELEMENT * this.M, 1);
    for (let i = 1; i < this.M; ++i)
      this._mij[i] = byte_views_default(this._mij[i - 1], Float64Array, i + 1);
  }
  get N() {
    return this._mi[this._mi.length - 1];
  }
  set N(count) {
    return this._mi[this._mi.length - 1] = count;
  }
  reset() {
    this._mi.fill(0);
    return this;
  }
  get data() {
    return this._mi;
  }
  push(values) {
    const args = Array.isArray(values) ? values : arguments;
    if (args.length !== this.M)
      throw Error(`Expected ${this.M} value(s)`);
    const delta = [], N = ++this.N;
    for (let i = 0; i < this.M; ++i) {
      delta[i] = (+args[i] - this._mi[i]) / N;
      this._mi[i] += delta[i];
      for (let j = 0; j <= i; ++j) {
        this._mij[i][j] += (N - 1) * delta[i] * delta[j] - this._mij[i][j] / N;
      }
    }
    return N;
  }
  ave(a = 0) {
    return this._mi[a];
  }
  cov(a, b) {
    const N = this.N;
    if (N < 2)
      return NaN;
    return N / (N - 1) * (a < b ? this._mij[b][a] : this._mij[a][b]);
  }
  var(a = 0) {
    return this.cov(a, a);
  }
  dev(a = 0) {
    return Math.sqrt(this.cov(a, a));
  }
  cor(a, b) {
    return this.cov(a, b) / Math.sqrt(this.cov(a, a) * this.cov(b, b));
  }
  slope(y, x) {
    return this.cov(y, x) / this.cov(x, x);
  }
  intercept(y, x) {
    return this.ave(y) - this.slope(y, x) * this.ave(x);
  }
};

// ../node_modules/@hugov/correl-range/src/_stats.js
var Stats = class {
  static bufferOf(instance) {
    return instance[Symbol.for("buffer")];
  }
  static momentsOf(instance) {
    return instance[Symbol.for("moments")];
  }
  constructor(names, resolution) {
    const dim = names.length, lazyLength = (dim + 1) * (dim + 2) / 2, indexOf = Object.fromEntries(names.map((n, i) => [n, i])), buffer = resolution instanceof ArrayBuffer ? resolution : new ArrayBuffer((lazyLength + dim * resolution * 2) * 64), res2 = Math.floor((buffer.byteLength / 64 - lazyLength) / dim);
    let view = byte_views_default(buffer, Float64Array, lazyLength);
    const moments = new LazyStats(view);
    for (let i = 0; i < dim; ++i) {
      view = byte_views_default(view, Float64Array, res2);
      const stat = this[names[i]] = new D(view);
      stat.ave = () => moments.ave(i);
      stat.dev = () => moments.dev(i);
      stat.var = () => moments.var(i);
      stat.cov = (b) => moments.cov(i, indexOf[b]);
      stat.cor = (b) => moments.cor(i, indexOf[b]);
      stat.slope = (b) => moments.slope(i, indexOf[b]);
      stat.intercept = (b) => moments.intercept(i, indexOf[b]);
    }
    this[Symbol.for("buffer")] = buffer;
    this[Symbol.for("moments")] = moments;
  }
  push(sample) {
    this[Symbol.for("moments")].push(Object.values(sample));
    for (const n of Object.keys(this))
      this[n].push(sample[n]);
    return this;
  }
};

// ../node_modules/@hugov/correl-range/src/_sim.js
function random(dim) {
  const zs = dim.length ? dim : new Float64Array(dim);
  return function() {
    for (let i = 0; i < zs.length; ++i)
      zs[i] = icdf_voutier_default(Math.random());
    return zs;
  };
}
var Sim = class {
  constructor(rndNs, risks, model, resolution) {
    const point = model(), names = Object.keys(point);
    this.names = names;
    this.risks = risks;
    this.rndNs = rndNs;
    this.model = model;
    this.stats = new Stats(names, resolution);
    this.one = Function("zs", `for (const rn of this.rndNs) rn.update(zs);const o=this.model();${names.filter((n) => typeof point[n] !== "number").map((n) => `o['${n}']=o['${n}'].value`).join(";")};return o`);
    this.run = Function("random", "moments", "N=25000", "sampler=random(this.risks.length)", "dim", `const stats = this.stats;
			for (let i=0; i<N; ++i) {
				const zs = sampler();
				for (const rn of this.rndNs) rn.update(zs);
				const o=this.model();
				moments.push(${this.names.map((n, i) => typeof point[n] === "number" ? `o['${n}']` : `o['${n}'].value`).join(",")});${this.names.map((n) => typeof point[n] === "number" ? `stats['${n}'].push(o['${n}'])` : `stats['${n}'].push(o['${n}'].value)`).join(";")}
			}
			return this`).bind(this, random, Stats.momentsOf(this.stats));
  }
  all(iterations, sampler = random(this.risks.length)) {
    const TypedArray = Float32Array, BYTES_PER_SET = TypedArray.BYTES_PER_ELEMENT * this.names.length, buffer = typeof iterations === "number" ? new ArrayBuffer(BYTES_PER_SET * iterations) : iterations.buffer || iterations;
    let offset = iterations.byteOffset || 0;
    const size = Math.floor((buffer.byteLength - offset) / BYTES_PER_SET), results = {};
    for (const name of this.names) {
      results[name] = new TypedArray(buffer, offset, size);
      offset += size * TypedArray.BYTES_PER_ELEMENT;
    }
    for (let i = 0; i < size; ++i) {
      const zs = sampler();
      for (const rnd of this.rndNs)
        rnd.update(zs);
      const sample = this.model();
      for (const name of this.names)
        results[name][i] = +sample[name];
    }
    return results;
  }
  get buffer() {
    return Stats.bufferOf(this.stats);
  }
};

// ../node_modules/@hugov/correl-range/sim.js
function sim_default(factory, { confidence = 0.5, resolution = 128 } = {}) {
  const risks = [], rndNs = [], conf = confidence <= 1 ? confidence : Math.pow(2, 1 - 1 / confidence) - 1, rndFs = {};
  let init = false;
  for (const [key, fcn] of Object.entries({ N: norm_default, L: logn_default, G: gumbel_default, U: uniform_default, W: weibull_default, D: dagum_default })) {
    rndFs[key] = (low, top, ...args) => {
      if (init)
        throw Error("distribution definition must be at initiation");
      return rndNs[rndNs.length] = new RandomNumber(fcn(low, top, conf))._link(risks, args);
    };
  }
  const model = factory(rndFs);
  init = true;
  return new Sim(rndNs, risks, model, resolution);
}
export {
  Stats,
  sim_default as default
};
