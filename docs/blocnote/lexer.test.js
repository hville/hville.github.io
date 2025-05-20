//import { describe, it } from 'node:test'
//import assert from 'node:assert'
import {jsActs, tlActs, default as Lexer} from './lexer2.js'

let errors = []

function test(rule, text, msg) {
	rule.lastIndex = 0
	const result = rule.test(text),
				delta = rule.lastIndex - text.length
	console.assert(result, msg + '-pass')
	console.assert(delta===0, msg + '-full: '+delta)
	if (!result || delta) errors.push(msg)
}

test(jsActs.sq[0], "''", 'sq0')
test(jsActs.sq[0], "'haha'", 'sq1')
test(jsActs.sq[0], String.raw`'\''`, 'sq2')
test(jsActs.sq[0], String.raw`'hahaha\'haha'`, 'sq3')
test(jsActs.dq[0], '""', 'dq0')
test(jsActs.dq[0], '"haha"', 'dq1')
test(jsActs.dq[0], String.raw`"hahaha\"haha"`, 'dq2')
test(jsActs.sc[0], '//', 'sc0')
test(jsActs.sc[0], '//ha', 'sc1')
test(jsActs.sc[0], '//ha\n', 'sc2')
test(jsActs.mc[0], '/**/', 'mc0')
test(jsActs.mc[0], '/*ha*/', 'mc1')
test(jsActs.mc[0], '/*ha*ha*/', 'mc2')
test(jsActs.mc[0], '/*\n* ha\n*/', 'mc3')

test(tlActs.lb[0], '${', 'sq2', 'tl-lb')
test(tlActs.bt[0], '`', 'tl-bt')
test(tlActs.tl[0], String.raw`"'\``, 'tl')

console.log(errors.length, 'errors', errors)

console.log('>>>', Lexer(`
/* comment */
import a from 'path' // single
/* comment */
const b="c"
`
))
