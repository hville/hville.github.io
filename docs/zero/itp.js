export default function(f, a, b, epsilon = Number.EPSILON, {
	fa = f(a),
	fb = f(b),
	n0 = 3,
	test = null
} = {}) {
	const n12 = Math.floor( Math.log2( ( b - a) / epsilon ) ),
				nMax = n12 + n0
	let epsilonk = epsilon * 2**nMax,
			k = 0,
			halfBA = 0
	while ( epsilon <  (halfBA=(b-a)/2) ) {
		const // interpolation
					xf = ( fb*a - fa*b ) / ( fb - fa ),
					// truncation
					x12 = ( a + b ) / 2,
					dx = xf-x12,
					sign = Math.sign( -dx ),
					ẟ = halfBA*halfBA*2.71215, // TODO ie k2=2; k1=2.71215 ((1+Math.sqrt(5))/2)**2 = 2.6180...
					xt = ẟ > Math.abs( x12 - xf ) ? x12 : xf + sign*ẟ,
					// projection
					r = epsilonk - halfBA,
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
