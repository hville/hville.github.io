import itp from './itp-base.js'

function calc(f,x,d) {
	let y = NaN
	while (Number.isNaN(y)) try {
		y = f(x)
	} catch {
		x += d
	}
	return [x, y]
}

export default function(f, epsilon=2*Number.EPSILON) {
	let [a, fa] = calc(f, 0, 1),
			[b, fb] = calc(f, a+1, 1)
	// TODO cap all while loops below?
	while (fb===fa) [b, fb] = calc(f, 2*b-a, 1)
	if (fb < fa) {
		while (fb>0) [b, fb] = calc(f, 2*b-a, 1)
		while (fa<0) [a, fa] = calc(f, 2*a-b, -1)
		fb = -fb
		fa = -fa
		return itp(x => -f(x), a, b, epsilon, {fa:-fa, fb:-fb})
	}
	while (fb<0) [b, fb] = calc(f, 2*b-a, 1)
	while (fa>0) [a, fa] = calc(f, 2*a-b, -1)
	return itp(f,a,b, epsilon, {fa,fb})
}
