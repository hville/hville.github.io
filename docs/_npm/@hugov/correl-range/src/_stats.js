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
export {
  Stats as default
};
