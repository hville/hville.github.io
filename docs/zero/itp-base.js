/*
https://docs.rs/kurbo/0.8.1/kurbo/common/fn.solve_itp.html
*/
export default function(f, a, b, epsilon = Number.EPSILON, {
	fa = f(a),
	fb = f(b),
	n0 = 3,
	k1 = 1,
	k2 = 2,
	test = null
} = {}) {
	const n12 = Math.ceil( Math.log2( ( b - a) / epsilon ) ) - 1,
				nMax = n12 + n0,
				epsilon2 = epsilon*2
	let epsilonk = epsilon * 2**nMax,
			k = 0
	while ( b-a > epsilon2 ) {
		const // interpolation
					xf = ( fb*a - fa*b ) / ( fb - fa ),
					// truncation
					x12 = ( a + b ) / 2,
					sign = Math.sign( x12 - xf ),
					ẟ = k1*(b-a)**k2,
					xt = ẟ > Math.abs( x12 - xf ) ? x12 : xf + sign*ẟ,
					// projection
					r = epsilonk - (b-a)/2,
					x = Math.abs( xt - x12 ) > r ? x12 - sign*r : xt,
					// updating
					fx = f(x)
		if (fx > 0) b = x, fb = fx
		else if (fx < 0) a = x, fa = fx
		else a = b = x
		epsilonk /= 2
		// for testing | analysis | counter
		if (test) test(++k, {a, b, x, fa, fb, n12, nMax})
	}
	return ( a + b ) / 2
}
