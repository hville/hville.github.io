/*
https://docs.rs/kurbo/0.8.1/kurbo/common/fn.solve_itp.html
*/
//TODO sorted array find?
//TODO fb>x>fa
export default function(f) {
	const f1 = f(1)
	//TODO guess a,b and direction
	//k1 = 2**(0.04*n12-3)/(b-a) //TODO guess, 0.04*n : iter before switch - test with edge cases k1 n=2, n=1
}

export function itp(f, a, b, epsilon = Number.EPSILON, {
	fa = f(a),
	fb = f(b),
	n0 = 2,
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
					// line
					ẟ = k1*(b-a)**k2,
					r = epsilonk - (b-a)/2,
					x = x12 + (xf-x12>r ? r : xf-x12<-r ? -r : (xf-x12) * r / (r+ẟ)),
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
