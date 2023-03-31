const lineRE = /^\s*(?<name>[^\s=:,()]+)\s*(?<kind>[=:])\s*(?<expr>[^]*[^\s])\s*$/,
			randRE = /^(?<dist>[A-Z])?\(\s*(?<L>[^\s]+)\s+(?<H>[^\s)]+)\s*(?<risk>[^)]*[^\s)])?\s*\)$/,
			riskRE = /([^\s]+)(\s+[^\s]*)?/g,
			callRE = /[^+*%?:<>=\-\s\/]\([^)]*\)/

function parseLine(line, i) {
	const {name, kind, expr} = line.match(lineRE)?.groups || {}
	if (!expr) return null
	const {rand, init, each, keep} = this,
				rexp = expr.match(randRE)?.groups
	if (rexp) {
		const {L, H, risk} = rexp,
					dist = rexp.dist || (parseFloat(L)*parseFloat(H) > 0 ? 'L' : 'N')
		init[name] = `${dist}(${L},${H}${ risk ? risk.replace(riskRE, (x,r,c) => c ? `,"${r}",${c}` : `,"${r}"`) : '' })`
		rand.push(name)
	}
	// hoisting ends when a random variable is used or a function is called
	else if (Object.keys(each).length || callRE.test(expr) || rand.some( n => expr.includes(n) ) ) each[name] = expr
	else init[name] = expr

	// only export random variables or variable expressions
	if (kind === ':' && (each[name] || rand.includes(name)) ) {
		keep[name] = i
	}
}

export default function(code) {
	const init = Object.create(null),
				each = Object.create(null),
				keep = Object.create(null),
				args = ['{L,N,U,W,G,D}']
	code.split(/ *\n+\s*(?=\w+\s*[=:])/).forEach(parseLine, {rand:[], init, each, keep})

	for(const n in init) args.push(`${n}=${init[n]}`)

	return Object.assign(
		Function(...args, `return (${
			Object.keys(each).map( n => `${n}=${each[n]}`).join(',')
		})=>({${
			Object.keys(keep).join(',')
		}})`),
		keep
	)
}
/*

///159+34+16=209
({N,L,W,U},   // initiation ran once
	fixed$ = L(500_000, 650_000, 'demand', 0.5, 'price'),
	month$ = L(5_000, 7_000, 'demand', 0.5, 'season', 0.5),
	months = L(6, 9, 'season', 0.5, 'price', -0.5)
)=>(          // calculations on every iterations
	total$ = fixed$ + month$ * months
)=>({         // exported results
	months,
	total$
})

///159+42=201
({N,L,W,U},   // initiation ran once
	fixed$ = L(500_000, 650_000, 'demand', 0.5, 'price'),
	month$ = L(5_000, 7_000, 'demand', 0.5, 'season', 0.5),
	months = L(6, 9, 'season', 0.5, 'price', -0.5)
)=>(          // calculations on every iterations
)=>({         // exported results
	months,
	total$: fixed$ + month$ * months
})

///179+56=235
({N,L,W,U},   // initiation ran once
	fixed$ = L(500_000, 650_000, 'demand', 0.5, 'price'),
	month$ = L(5_000, 7_000, 'demand', 0.5, 'season', 0.5),
	months = L(6, 9, 'season', 0.5, 'price', -0.5),
	result = {months}
)=>(          // calculations on every iterations
)=>{          // exported results
	result.total$ = fixed$ + month$ * months
	return result
}

//168+56=224
({N,L,W,U})=>{   // initiation ran once
const fixed$ = L(500_000, 650_000, 'demand', 0.5, 'price'),
			month$ = L(5_000, 7_000, 'demand', 0.5, 'season', 0.5),
			months = L(6, 9, 'season', 0.5, 'price', -0.5)
return ()=>{          // calculations on every iterations
	result.total$ = fixed$ + month$ * months
	return result
}}

new Function('{N,L,W,U}', A+'return ()=>{'+B+'}')

*/
