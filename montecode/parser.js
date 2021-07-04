import { seq, any, few, run, opt, not } from '../_npm/pico-parse.js'

const
	ws = /[ \t\v\f\x20\xA0]/,
	nl = /[ \t\v\f\x20\xA0\n\r\u2028\u2029]/,
	id = /[\p{ID_Start}\$_][\p{ID_Continue}\$_\u200C\u200D]*/u,
	eol = /[ \t\v\f\x20\xA0]*[;\n\r\u2028\u2029]+[ \t\v\f\x20\xA0;\n\r\u2028\u2029]*/,
	cm = /\/\*[^]*?\*\//,
	ci = /\/\/[^\n\r\u2028\u2029]*/,
	nb = /[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?/,
	_ = seq(/\s*/),
	__ = seq(/\s+/)

const
	sep = seq`comma`(/\s+/), //spaces to become comma
	name = seq`name`(id),

	commentL = seq`remove`(run(ws), ci),
	commentM = seq`remove`(run(ws), cm),

	corel = seq(id, sep, nb),
	risk = seq(opt(sep, corel, run(sep, corel)), opt(sep, id)),
	rand = seq`rand`(seq`dist`(/[A-Z]?/), /\(\s*/, seq`L`(nb), __, seq`H`(nb), risk, /\s*\)/),

	group = any(),
	paren = seq('(', run(any(group, id, /[^)]/)), ')'),
	block = seq('{', run(any(group, id, /[^}]/)), '}'),
	brack = seq('[', run(any(group, id, /[^\]]/)), ']'),
	expr = seq(few(any(group, id, seq(not(any(eol, /[()\[\]{}]/)), /[^]/)))),
	set = seq`assign`(name, /\s*=\s*/, expr),
	exp = seq`export`(name, seq`eq`(/\s*:\s*/), expr),
	itm = any(set, exp, commentM, commentL)

group.set(rand, paren, block, brack, commentM, commentL)

const codeParser = seq(opt(eol), itm, run(eol, itm), opt(eol))
console.log(codeParser.scan(`b=2
d:(1 2) /*
 */
//f
c=2`).cuts)
export default function(t,props) {
	return Object.assign(codeParser.scan(t), {
		source: t
	}, props)
}
