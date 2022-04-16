import solve from "./solve.js"
import itp from "./itp.js"

function test(f) {
	const x = solve(f),
				y = f(x)
	console.log(x, Math.round(1e6*y)/1e6)
}

test( x=>(x-1)**2-x)
test( x=>x-(x-1)**2)
