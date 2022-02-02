import {itp} from "./itp.js"

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
const gs = fs.map( f => x => -f(x) )

fs.map( f => console.log(itp(f,-1,1), itp(x=>-f(x),1,-1)) )

