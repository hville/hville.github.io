/**
 * Lower tail quantile for standard normal distribution function
 * Probit function, inverse CDF, z(p)
 * Algorithm by Peter John Acklam
 * http://home.online.no/~pjacklam/notes/invnorm/impl/misra/normsinv.html
 * @param {number} p - probability ]0..1[
 * @return {number}
 */
const a0 = -3.969683028665376e+01,
			a1 = 2.209460984245205e+02,
			a2 = -2.759285104469687e+02,
			a3 = 1.383577518672690e+02,
			a4 = -3.066479806614716e+01,
			a5 = 2.506628277459239e+00,
			b0$1 = -5.447609879822406e+01,
			b1$1 = 1.615858368580409e+02,
			b2$1 = -1.556989798598866e+02,
			b3$1 = 6.680131188771972e+01,
			b4$1 = -1.328068155288572e+01,
			c0 = -7.784894002430293e-03,
			c1 = -3.223964580411365e-01,
			c2 = -2.400758277161838e+00,
			c3 = -2.549732539343734e+00,
			c4 = 4.374664141464968e+00,
			c5 = 2.938163982698783e+00,
			d0 = 7.784695709041462e-03,
			d1 = 3.224671290700398e-01,
			d2 = 2.445134137142996e+00,
			d3 = 3.754408661907416e+00;

const pL	= 0.02425,
			pH = 1 - pL;

function icdf(p) {
	if ( p < pL ) {
		const q = Math.sqrt(-Math.log(p) * 2);
		return (((((c0*q + c1)*q + c2)*q + c3)*q + c4)*q + c5) / ((((d0*q + d1)*q + d2)*q + d3)*q + 1)
	}
	if ( p > pH ) {
		const q = Math.sqrt(-Math.log(1 - p) * 2);
		return -(((((c0*q + c1)*q + c2)*q + c3)*q + c4)*q + c5) / ((((d0*q + d1)*q + d2)*q + d3)*q + 1)
	}
	const q = p - 0.5,
				r = q*q;
	return (((((a0*r + a1)*r + a2)*r + a3)*r + a4)*r + a5) * q / (((((b0$1*r + b1$1)*r + b2$1)*r + b3$1)*r + b4$1)*r + 1)
}

/**
 * Normal Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
function N(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	const mu = (high + low) / 2,
				si = (high - low) / icdf( (1 + prob) / 2 ) / 2;

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		return (zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu
	}
}

/**
 * lognormal distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
function L(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	const hl = high*low;
	if (hl <= 0) throw Error('range must not cross 0')
	const mu = Math.log(hl) / 2,
				si = Math.log(low > 0 ? high/low : low/high) / 2 / icdf( (prob + 1) / 2 );

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return low > 0 ?
	function(zSeed) {
		return Math.exp((zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu)
	}
	: function(zSeed) {
		return -Math.exp(-(zSeed === undefined ? icdf(Math.random()) : zSeed) * si + mu)
	}
}

/**
 * random dice
 * @param {number} min - lowest integer
 * @param {number} max - highest integer
 * @returns {number => number} - random number generator
 */
function D$1(min, max) {
	if (max <= min) throw Error('max <= min')
	if (max%1 || min%1) throw Error('min and max must be integers')
	const size = max - min + 1, //eg. 6-1+1 = 6
				refs = [];
	let i=1; //TODO while
	for (; i<size; ++i) refs[i-1] = icdf(i/size); //eg [Q(1/6), Q(2/6), Q(3/6), Q(4/6), Q(5/6)]
	refs[i-1] = Infinity;

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		if (zSeed === undefined) return min + Math.floor(Math.random()*size)
		let k = 0;
		while(zSeed > refs[k]) ++k;
		return min + k
	}
}

/**
 * normal distribution pdf
 * @param {number} z
 * @return {number} probability
 */
function pdf(z) {
	return Math.exp(-(Math.log(2 * Math.PI) + z*z) * 0.5)
}

/**
 * Normal Distribution CDF Approximation
 * http://en.wikipedia.org/wiki/Normal_distribution#Numerical_approximations_for_the_normal_CDF
 * Zelen & Severo (1964) algorithm 26.2.17, Φ(x) for x > 0 with the absolute error < 7.5e-8
 * @param {number} z
 * @return {number} probability
 */
const b0 = 0.2316419,
			b1 = 0.319381530,
			b2 = -0.356563782,
			b3 = 1.781477937,
			b4 = -1.821255978,
			b5 = 1.330274429;
function cdf(z) {
	if (z > 6) return 1 //gives 1-1e-10, well below target 1e-8 accuracy
	else if (z < -6) return 0 //gives 1e-10, well below target 1e-8 accuracy
	const t = 1 / (1 + b0*Math.abs(z)),
				t2 = t*t,
				y = t * (b1 + b2*t + (b3 + b4*t + b5*t2)*t2);
	return z < 0 ? pdf(-z)*y : 1-pdf(z)*y
}

/**
 * Uniform Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 function U(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	var rng = (high - low) / prob,
			min = (high + low - rng)/2;

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return function(zSeed) {
		var p = zSeed === undefined ? Math.random() : cdf(zSeed);
		return min + p * rng
	}
}

/**
 * Weibull Distribution
 * @param {number} low - range lower bound
 * @param {number} high - range lower bound
 * @param {number} [prob] - confidence interval
 * @returns {number => number} - random number generator
 */
 function W(low, high, prob=0.5) {
	if (high <= low) throw Error('high <= low')
	if (high*low <= 0) throw Error('range must not cross 0')
	const p = (1 - prob)/2,
				lnp = Math.log(p),
				lnq = Math.log(1-p),
				κ = Math.log(low > 0 ? high/low : low/high) / Math.log(lnp/lnq), //κ==1/k
				λ = (low > 0 ? low : high)/Math.pow(-lnq,κ);

	/**
 	 * @param {number} [zSeed]
	 * @returns {number}
	 */
	return low > 0 ?
	function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(zSeed);
		return λ*Math.pow(-Math.log(1-p),κ)
	}
	: function(zSeed) {
		const p = zSeed === undefined ? Math.random() : cdf(-zSeed);
		return λ*Math.pow(-Math.log(1-p),κ)
	}
}

class RandomNumber {
	constructor(fz) {
		this._fz = fz;
		this._ks = [];
		this._ws = [];
		this.value = NaN;
	}
	valueOf() {
		return this.value
	}
	update(zs) {
		let v = 0;
		for (var i=0; i<this._ks.length; ++i) v += this._ws[i] * zs[this._ks[i]];
		this.value = this._fz(v);
		return this
	}
	_link(risks, links) {
		const ks = this._ks,
					ws = this._ws;
		let Δ = 1,
				i = 0,
				m = links.length%2 ? links.length-1 : links.length;
		while(i<m) {
			ks[ks.length] = riskIndex( risks, links[i++] );
			const w = links[i++];
			Δ -= (ws[ws.length] = w < 1 ? w : 100*w)**2;
			if (Δ < -Number.EPSILON) throw Error('sum of squared weights > 1')
		}
		// only bother is there is some weight to be assigned
		if (Δ > Number.EPSILON) {
			ks[ks.length] = riskIndex( risks, links[i] );
			ws[ws.length] = Math.sqrt( Δ );
		}
		return this
	}
}
function riskIndex(risks, itm) {
	let idx = risks.indexOf(itm);
	return idx !== -1 ? idx : risks.push(itm ?? '') - 1
}

function fillZ(arr) {
	for (let i=0; i<arr.length; ++i) arr[i] = icdf( (i+0.5)/arr.length );
	return arr
}

/**
 * Shift 2 array indices in place
 * @example
 * 	const arr = [1, 0, 2]
 * 	swap(arr, 0, 1) // arr is now [0, 1, 2]
 *
 * @typedef {Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array} ArrayLike
 * @param {ArrayLike} a
 * @param {number} i
 * @param {number} j
 * @return {void}
 */
function swap(a, i, j) {
	if (i !== j) {
		let t = a[i];
		a[i] = a[j];
		a[j] = t;
	}
	return a
}

/**
 * In place mutation to generate all permutations of a source array
 * heap algorithm: most efficient permutation generating algorithm (fewest swaps)
 *
 * @typedef {Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array} ArrayLike
 * @param {ArrayLike} a source array to be mutated
 * @return {()=>ArrayLike} mutation generating function
 */
function perm(a, n=a.length) {
	const c = new Uint16Array(n);
	let i= 0;
	while (i<n) c[i++] = 0;
	return function() {
		i = 0;
		while (c[i] >= i) {
			c[i] = 0;
			if (++i===n) { // reset to the initial source sequence
				if (!(n&1)) { //even sources require more magic
					swap(a, 0, n-2);
					left(a, 1, n-2);
				}
				swap(a, 0, n-1);
				return a //same as the initial sequence
			}
		}
		swap(a, i, i&1 ? c[i] : 0);
		++c[i];
		return a
	}
}

/**
 * In-place left-shift of array items from i to j
 * @typedef {Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array} ArrayLike
 * @param {Array} a
 * @param {number} i
 * @param {number} j
 * @return {void}
 */
function left(a, i=0, j=a.length-1) {
	if (j>i) {
		const t = a[i];
		while(i<j) a[i]=a[++i];
		a[j] = t;
	}
}

/**
 * random shuffling
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 *
 * @example
 * 	const src = [1, 0, 2],
 * 				tgt = shuffle(src) // new shuffled array, src unchanged
 * shuffle(src, src) // src is also shuffled in place
 *
 * @typedef {Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array} ArrayLike
 * @param {ArrayLike} src
 * @param {ArrayLike} [tgt]
 * @return {ArrayLike}
 */
function shfl(src, tgt) {
	if (tgt) { // inside-out
		tgt[0] = src[0];
		for (let j=1; j<src.length; ++j) {
			let i = Math.floor(Math.random() * (j+1));
			if (i !== j) tgt[j] = tgt[i];
			tgt[i] = src[j];
		}
		return tgt
	}
	// in-place
	let n = (src.length);
	while (n) swap( src, Math.floor(Math.random() * n), --n);
	return src
}

//TODO only random (simulation) and permute (sensitivity) are used

function random(dim) {
	const zs = dim.length ? dim : new Float64Array(dim);
	return function() {
		for (let i=0; i<zs.length; ++i) zs[i] = icdf(Math.random());
		return zs
	}
}
function permute(dim) { //works well for elementary effects after flips
	const zs = dim.length ? dim : shfl( fillZ(Array(dim)) );
	return perm(zs)
}

class D {

	constructor(size=32) {
		const vs = size.buffer ? size : new Float64Array(size.byteLength ? size : 2*size);
		// make properties !writeable !configurable and !enumerable
		Object.defineProperties(this, {
			vs: {value: vs},
			rs: {value: new Float64Array(vs.buffer, vs.byteOffset + vs.byteLength/2, vs.length/2)}
		});
	}

	// Number of samples
	get N() { return this.rs[this.rs.length-1] }

	// Expected Value
	get E() { return this.Σ(1) / this.N }

	// Sample Variance
	get V() {
		const N = this.N;
		return ( this.Σ(2) - this.Σ(1)**2 / N ) / (N-1)
	}

	// Sample Standard Deviation
	get S() {
		const v = this.V;
		return v < 0 ? 0 : Math.sqrt(v)
	}

	/**
	 * Σ(X**p)
	 * exact when there is no compression
	 * with compression, range between values treated as a uniform distribution
	 *
	 * @param {number} order
	 * @return {number} Σ( X^pow )
	 */
	Σ(pow) { //values as-is with internal uniform interval
		const vs = this.vs,
					rs = this.rs,
					N = Math.min(rs.length, rs[rs.length-1]), // in case the buffer is not full
					Mm = N-1,
					Op = pow + 1;
		if (pow === 0) return rs[Mm]
		if (pow === 1) { //same as below but simplified
			let sum = vs[0] + vs[Mm]; // correction at edge to match actual discrete result (PAD cancels out)
			for (let i=0; i<Mm; ++i) sum += (vs[i+1] + vs[i]) * (rs[i+1] - rs[i]);
			return sum / Op
		}
		let sum = vs[0]**pow;
		for (let i=1; i<N; ++i) {
			// https://en.wikipedia.org/wiki/Continuous_uniform_distribution#Moments
			sum += vs[i]**pow
					+ (rs[i] - rs[i-1] - 1) * (vs[i]**Op - vs[i-1]**Op) / (vs[i] - vs[i-1]) / Op;
		}
		return sum
	}

	/**
	 * Origin Moments
	 * https://en.wikipedia.org/wiki/Continuous_uniform_distribution#Moments
	 *
	 * @param {number} order
	 * @return {number} E( X^order )
	 */
	M(order) { return this.Σ(order) / this.N }

	/**
	 * Quantile function, provide the value for a given probability
	 * @param {number} prob - probability or array of probabilities
	 * @return {number} value or array of values
	 */
	Q(prob) {
		const vs = this.vs,
					rs = this.rs,
					M = Math.min(rs.length, rs[rs.length-1]), // in case the buffer is not full
					h = rs[M-1] * prob + 0.5, // 0.5 <= h <= N+0.5
					j = topIndex(rs, h, M), //      0 <= j <= M
					i = j-1;
		return j === 0 ? vs[0]
			: j === M ? vs[M-1]
			: vs[i] + (vs[j] - vs[i]) * (h-rs[i]) / (rs[j]-rs[i])
	}

	/**
	 * @param {number} x - probability or array of probabilities
	 * @return {number} value or array of values
	 */
	F(x) {
		const vs = this.vs,
					rs = this.rs,
					M = Math.min(rs.length, rs[rs.length-1]), // in case the buffer is not full
					N = rs[M-1],
					j = topIndex(vs, x, M),
					i = j-1;
		return (j === 0 ? 0.5
			: j === M ? (N - 0.5)
			: rs[i] - 0.5 + (rs[j] - rs[i]) * (x - vs[i]) / (vs[j] - vs[i])
		) / N
	}

	/**
	 * @param {number} x - probability or array of probabilities
	 * @return {number} value or array of values
	 */
	f(x) {
		const vs = this.vs,
					rs = this.rs,
					M = Math.min(rs.length, rs[rs.length-1]),
					N = rs[M-1];
		if (x === vs[0] || x === vs[M-1]) return 0.5/N
		const j = topIndex(vs, x, M),
					i = j-1;
		return j === 0 || j === M ? 0 : (rs[j] - rs[i]) / (vs[j] - vs[i]) / N
	}
	/**
	 * Adds a value, compressed only if buffer full
	 * @param {number} x
	 */
	push(x) {
		const vs = this.vs,
					rs = this.rs,
					M = Math.min(rs.length, rs[rs.length-1]),
					j = topIndex(this.vs, x, M);
		// lossless insert
		if (M < rs.length) {
			for (let ir=M; ir>j; --ir) {
				rs[ir] = ir+1;
				vs[ir] = vs[ir-1];
			}
			rs[j] = j ? rs[j-1] + 1 : 1;
			vs[j] = x;
			if (M!==rs.length-1) ++rs[rs.length-1];
		}
		// compression, droping a value while maintaining the interval average
		else if (j === M) newmax(vs, rs, x);
		else if (j === 0) {
			const u = vs[0],
						Δwx = vs[2] - x;
			if (Δwx !== 0) {
				//KEEP 0 : r'(w-x) = (w+v-2x) + r(w-u) - s(v-u)
				//DROP 0 : r'(w-x) = (w+v-2x) + r(w-u)
				const r_v = (vs[2] + vs[1] - 2*x + rs[1]*(vs[2] - u)) / Δwx,
							r_u = r_v - rs[2] * (vs[1]-u) / Δwx;
				if ( (u + vs[1] > x + vs[2] && r_u > rs[0]) || r_v > rs[2]+1) {
					vs[1] = u;
					rs[1] = r_u;
				}
				else rs[1] = r_v;
				vs[0] = x;
			}
			for (let ir=2; ir<rs.length; ++ir) ++rs[ir];
		}
		else {
			let i = j === 1 || (j !== M-1 && 2*x > vs[j]+vs[j-1] ) ? j : j-1;
			const w = vs[i+1],
						v = vs[i],
						Δwu = w-vs[i-1];
			if (Δwu !== 0) {
				const r_x = rs[i] + ( w-x + (x-v)*(rs[i+1] - rs[i-1]) ) / Δwu;
				if ( v < x
					? vs[i-1]+w < v+x || r_x > rs[i+1]+1
					: v+x < vs[i-1] + w || r_x < rs[i-1]
				) rs[i] += ( w+v-2*x ) / Δwu;
				else {
					rs[i] = r_x;
					vs[i] = x;
				}
			}
			while(++i<rs.length) ++rs[i];
		}
	}
}

function newmax(vs, rs, x) {
	const j = rs.length-1,
				i = j-1,
				h = i-1,
				Δwv = vs[j]-vs[i],
				Δxu = x - vs[h],
				rjh = rs[i]*(vs[j]-vs[h]);
	if (Δxu !== 0) {
		const r_w = ( rs[j]*(x-vs[i]) + rjh - rs[h]*Δwv ) / Δxu,
					r_v = ( rs[j]*(x-vs[j]) + rjh - Δwv ) / Δxu;
		if ( r_v < rs[h] || (vs[i] + vs[j] < vs[h] + x && r_w < rs[j]+1)) {
			vs[i] = vs[j];
			rs[i] = r_w;
		}
		else rs[i] = r_v;
		vs[j] = x;
	}
	++rs[j];
}

function topIndex(arr, v, max) {
	let low = 0;
	while (low < max) {
		const mid = (low + max) >>> 1;
		if (arr[mid] < v) low = mid + 1;
		else max = mid;
	}
	return max
}

class LazyStats{
	/**
	 * @param {number} [dim] number of random variables
	 */
	constructor(dim=1) {
		this.dim = dim;
		this.N = 0;
		this._mi = Array(dim); // averages
		this._mij = Array(dim); // central products: [[A'A'],[A'B',B'B''],[A'C',B'C',C'C']]
		this.reset();
	}

	reset() {
		for (let i=0; i < this.dim; ++i) {
			this._mi[i] = 0;
			this._mij[i] = [];
			for (let j=0; j <= i; ++j) {
				this._mij[i][j] = 0;
			}
		}
		return this
	}

	/**
	 * Welford-style online single pass variance and covariance
	 * https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance
	 * @param {number|Array<number>} [values]
	 * @returns {number} - number of samples
	 */
	push(values) {
		const args = Array.isArray(values) ? values : arguments;
		if (args.length !== this.dim) throw Error(`Expected ${this.dim} value(s)`)

		const delta = [];
		this.N++;
		for (let i=0; i<this.dim; ++i) {
			delta[i] = (args[i] - this._mi[i]) / this.N;
			this._mi[i] += delta[i];
			for (let j=0; j<=i; ++j) {
				this._mij[i][j] += (this.N - 1) * delta[i] * delta[j] - this._mij[i][j] / this.N;
			}
		}
		return this.N
	}

	/**
	 * @param {number} [a] index
	 * @return {number}
	 */
	ave(a=0) {
		return this._mi[a]
	}

	/**
	 * @param {number} a index
	 * @param {number} b index
	 * @return {number} covariance
	 */
	cov(a, b) {
		if (this.N < 2) return NaN
		return this.N / (this.N - 1) * (a < b ? this._mij[b][a] : this._mij[a][b])
	}

	/**
	 * @param {number} [a] index
	 * @return {number} variance
	 */
	var(a=0) {
		return this.cov(a, a)
	}

	/**
	 * @param {number} [a] index
	 * @return {number} standard deviation
	 */
	dev(a=0) {
		return Math.sqrt(this.cov(a, a))
	}

	/**
	 * @param {number} a index
	 * @param {number} b index
	 * @return {number} correlation
	 */
	cor(a, b) {
		return this.cov(a, b) / Math.sqrt(this.cov(a,a) * this.cov(b, b))
	}
}

/**
 * @typedef {Array|Int8Array|Uint8Array|Int16Array|Uint16Array|Int32Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array} ArrayLike
 */

//TODO test sensitivity oat and ee
class Sim {
	constructor(rndNs, risks, model, resolution) {
		const point = model();

		this.risks = risks;
		this.rndNs = rndNs;
		this.model = model;
		const names = this.names = Object.keys( point );
		this._moments = new LazyStats(names.length);
		this.stats = {};
		for (let i=0; i<this.names.length; ++i) {
			const stat = this.stats[names[i]] = new D(resolution);
			stat.ave = () => this._moments.ave(i);
			stat.dev = () => this._moments.dev(i);
			stat.var = () => this._moments.var(i);
			stat.cov = name => this._moments.cov(i, names.indexOf(name));
			stat.cor = name => this._moments.cor(i, names.indexOf(name));
		}

		/**
		 * single run with given Z inputs
		 * @param {ArrayLike<number>} zs
 		 * @return {Object}
		 */
		this.one = Function('zs',
			`for (const rn of this.rndNs) rn.update(zs);const o=this.model();${
			names.filter( n => typeof point[n] !== 'number')
				.map( n => `o['${n}']=o['${n}'].value`)
				.join(';')
			};return o`
		);

		/**
		 * N runs compressed into empirical sample distributions
		 * @param {number} N number of runs
		 * @param {()=>ArrayLike<number>)} [sampler] source of Z inputs
		 * @param {number} [dim] empirical distribution points
 		 * @return {Object}
		 */
		this.run = Function(
		/* binded    */'random',
		// TODO if N.length add results in views?
		/* arguments */'N=25000', 'sampler=random(this.risks.length)','dim',
		/* javascrip */`const stats = this.stats;
			for (let i=0; i<N; ++i) {
				const zs = sampler();
				for (const rn of this.rndNs) rn.update(zs);
				const o=this.model();
				this._moments.push(${
					names.map(
						(n,i) => typeof point[n] === 'number' ? `o['${n}']` : `o['${n}'].value`
					).join(',')
				});${
					names.map(
						n => typeof point[n] === 'number' ? `stats['${n}'].push(o['${n}'])` : `stats['${n}'].push(o['${n}'].value)`
					).join(';')
				}
			}
			return this`
		).bind(this, random);
	}

	all(iterations, sampler=random(this.risks.length)) {
		const TypedArray = Float32Array, //all Float32Array for now
					BYTES_PER_SET = TypedArray.BYTES_PER_ELEMENT * this.names.length,
					buffer = typeof iterations === 'number' ? new ArrayBuffer(BYTES_PER_SET * iterations) : iterations.buffer || iterations;

		let offset = iterations.byteOffset || 0;

		const size = Math.floor( ( buffer.byteLength - offset ) / BYTES_PER_SET ),
					results = {};

		for (const name of this.names) {
			results[name] = new TypedArray( buffer, offset, size );
			offset += size * TypedArray.BYTES_PER_ELEMENT;
		}

		//TODO optimize push(...,size,sampler,result).bind(rndNs,model)
		for (let i=0; i<size; ++i) {
			const zs = sampler();
			for (const rnd of this.rndNs) rnd.update(zs);
			const sample = this.model();
			for (const name of this.names) results[name][i] = +sample[name]; // +important to trigger RandomNumber.valueOf()
		}
		return results
	}
	oat() {
		const zs = new Float64Array(this.risks.length),
					z = 0.67448, // === Q(0.75) === -Q(0.25)
					dyzs = {},
					data0 = this.one(zs);
		for (const n of this.names) dyzs[n] = [];
		for (let i=0; i<this.risks.length; ++i) {
			zs[i] = z;
			for (const [n,v] of Object.entries(this.one(zs))) dyzs[n][i] = [+v, 0];
			zs[i] = -z;
			for (const [n,v] of Object.entries(this.one(zs))) {
				const dyp = dyzs[n][i][0] - data0[n],
							dym = data0[n] - v;
				dyzs[n][i][0] = (dyp + dym) / z / 2;
				dyzs[n][i][1] = ( Math.abs(dyp) + Math.abs(dym) ) / z / 2;
			}
			zs[i] = 0;
		}
		return dyzs
	}
	ee(hp=2 /* half p */) {
		//divide in p=2*hp intervals and get icdf
		const	p = 2*hp,
					ps = fillZ(Array(p)),
					Δa = ps[hp]-ps[0],
					k = this.risks.length, //number of inputs
					zs = Array(k + p - k%p).fill(0), //a little bigger to include same number of intervals
					r = Math.min( Math.floor( (p**k)/(k+1) ), 60 ), //best is 50 or 60, less if median was used
					ee = {};
		for (let i=0; i<zs.length; ++i) zs[i] = ps[i%p];
		const sampler = permute( shfl(zs) ); //permute found to have the least variance and converges well
		for (const n of this.names) ee[n] = this.risks.map( () => [0,0] ); //sum, suma
		for (let i=0; i<r; ++i) {
			// new trajectory
			let point0 = this.one(sampler());
			for (let j=0; j<k; ++j) {
				const Δ = zs[j]<.5 ? Δa : -Δa;
				zs[j] += Δ;
				let point1 = this.one(zs);
				for (const n of this.names) {
					const dy = (point1[n] - point0[n]) / Δ;
					ee[n][j][0] += dy;
					ee[n][j][1] += Math.abs(dy);
				}
				point0 = point1;
			}
			// flip the tail end too
			for (let j=k; j<zs.length; ++j) zs[j] += zs[j]<.5 ? Δa : -Δa;
		}
		for (const n of this.names) for (const sum of ee[n]) {
			sum[0] /= r;
			sum[1] /= r;
		}
		return ee
	}
}

/**
 * @param {function} factory (...once) => (...each) => ({...sample})
 * @param {Object} [options]
 * @param {number} [options.confidence=0.5] either confidence interval (default IQR) or min and max of N samples (eg 3 gives 0.59)
 * @param {number} [options.resolution=128] number of points in empirical distribution
 * @returns
 */
function sim( factory, {confidence=0.5, resolution=128}={} ) {
	const	risks = [],
				rndNs = [],
				conf = confidence <= 1 ? confidence : Math.pow(2, 1 - 1/confidence) - 1,
				rndFs = {};
	let init = false;
	for (const [key,fcn] of Object.entries({ N, L, D: D$1, U, W })) {
		rndFs[key] = (low, top, ...args) => {
			if (init) throw Error('distribution definition must be at initiation')
			return rndNs[rndNs.length] = new RandomNumber(fcn(low, top, conf))._link(risks, args)
		};
	}
	const model = factory(rndFs);
	init = true;
	return new Sim(rndNs, risks, model, resolution)
}

export default sim;
