import parser from './parser.js'

function t() {
	const s = String.raw.apply(null, arguments),
				t = parser(s)
	console.log(t.cuts, s)
}

/* t`a:( N(0.1 3e6 a 0 b 8 c) )
b=N(0.1 3e6 a 0 b 8 c)
` */
/* t`
c=3` */
