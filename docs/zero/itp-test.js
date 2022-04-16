import {fast as itp} from "./itp.js"

const fs = [
	x => x * Math.exp(x) - 1,
	x => Math.tan(x - 0.1),
	x => Math.sin(x) + 0.5,
	x => 4*x**5 + x**2 + 1,
	x => Math.log(Math.abs( x - 10/9 )),
	x => (x+2/3) / (x + 1.01),
	x => x + x**10 - 1,
	x => ( x*1e6 - 1 )**3,
	x => Math.exp(x) * ( x*1e6 - 1 )**3
]
const n0s = [3],
      k1s = [2], //0.01
      k2s = [2],
			epsilons = [1, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13, 1e14].map(x => x*Number.EPSILON),
			results = [],
			zero = v=>0,
			stats = {n0:n0s.map(zero), k1:k1s.map(zero), k2:k2s.map(zero)}

let n = 0,
		n12 = 0
function test(k,o) { n=k, n12=o.n12 }

for (let f of fs)
	for (let b = 1; b<1.8; b+=.1) for (let a = -1; a>-1.5; a-=.1)
		for (let epsilon of epsilons)
			for (let i=0; i<n0s.length; ++i)
				for (let j=0; j<k1s.length; ++j)
					for (let k=0; k<k2s.length; ++k) {
						n=0, n12=0
						let n0 = n0s[i],
								k1 = k1s[j]/(b-a), //Math.log2(1/epsilon)/100,//
								k2 = k2s[k]
						itp(f, a, b, epsilon, {n0, k1, k2, test})
						const r = n/n12
						results.push({n0, k1, k2, n, r, f})
						stats.n0[i] += n
						stats.k1[j] += n
						stats.k2[k] += n
					}
console.log(stats)
