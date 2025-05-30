const addTxt = (tree, last) => tree.pushText( last ).j,
			endTxt = (tree, last) => ~tree.pushText( last ).j,
			addKin = (tree, last, id) => tree.makeLeaf( last, id ).j,
			endKin = (tree, last, id) => ~tree.makeLeaf( last, id ).j

export const tlActs = {
	bt: [ /`/y, endTxt ],
	lb: [ /\$\{/y, null ],
	tl: [ /(?:(?:\\[^])|(?:\$(?![{]))|[^`$\\])+/y, addTxt ],
}
const tlParse = createParser(tlActs)

const cbActs = { // only bother with blocks that could contain brackets
	sq: [ /'(?:(?:\\[^])|[^\\'])*'/y, addTxt ],
	dq: [ /"(?:(?:\\[^])|[^"\\])*"/y, addTxt ],
	mc: [ /\/\*(?:[^\*]|(?:\*[^\/]))*\*\//y, addTxt ],
	sc: [ /\/\/[^\n]*(?:\n|$)/y, addTxt ],
	bt: [ tlActs.bt[0], tlParse ],
	lb: [ /{/y, null ],
	rb: [ /}/y, endTxt ],
	cb: [ /(?:[^'"`{}/]|(?:\/(?![*/])))+/y, addTxt]
}
export const cbParse = createParser(cbActs)
tlActs.lb[1] = cbParse
cbActs.lb[1] = cbParse

export const paActs = { //only bother with blocks that could contain parens
	sq: [ cbActs.sq[0], addKin ],
	dq: [ cbActs.dq[0], addKin ],
	mc: [ cbActs.mc[0], addKin ],
	sc: [ cbActs.sc[0], addKin ],
	bt: [ tlActs.bt[0], tlParse ],
	lb: [ cbActs.lb[0], (tree, text, id) => cbParse(tree.makeLeaf('',id), text) ],
	lp: [ /\(/y, null ],
	rp: [ /\)/y, endTxt ],
	pa: [ /(?:[^'"`()/]|(?:\/(?![*/])))+/y, addTxt]
}
export const paParse = createParser(paActs)
paActs.lp[1] = paParse

export const jsActs = { //TODO parens ()
	sq: [ cbActs.sq[0], addKin ],
	dq: [ cbActs.dq[0], addKin ],
	bt: [ tlActs.bt[0], (tree, text, id) => tlParse(tree.makeLeaf('',id), text) ],
	lb: [ cbActs.lb[0], (tree, text, id) => cbParse(tree.makeLeaf('',id), text) ],
	lp: [ paActs.lp[0], (tree, text, id) => paParse(tree.makeLeaf('',id), text) ],
	sc: [ cbActs.sc[0], addKin ],
	mc: [ cbActs.mc[0], addKin ],
	js: [ /(?:[^'"`{(/]|(?:\/(?![*/])))+/y, addKin ]
}
const jsParse = createParser(jsActs)

/*
GOAL
1. split out multiline comments from code ['^$'
	['mc', '/*.../']
	['js', '...', ['cb', '....'], '....'}
	['mc', '/*.../']
	['js', '...', ['cb', '....'], '....'}
]
2. split full text in editor
3. for js blocks, find var let const function in non-block lines (potential exports)
	and find names at top level that match prior potential exports (imports)
	to run code, add imports and export for each block
4. if outputs found in next json js edit, recheck inputs and outputs of edited section

CONVENTION
	!action    		 : stop, parent takes the token
	action() <  0  : stop, resume at ~0
	action()  > 0  : continue

	Leaf: [...Leaf|string, index, input, groups]
*/

function createParser(rules) {
	const kins = Object.keys(rules)

	return function (tree, last) {
		const input = tree.constructor.input
		if ( last ) tree.pushText( last )
		while (tree.j < input.length) {
			let kin = ''
			for (kin in rules) {
				rules[kin][0].lastIndex = tree.j
				if (rules[kin][0].test(input)) break
			}
			if ( !kin ) return tree.j
			const action = rules[kin][1]
			if (!action) return tree.j //don't consume is no actions assigned
			const j = action(tree, rules[kin][0].lastIndex, kin)
			if (j<0) return tree.j = ~j //back track to last accepted position
			tree.j = j
		}
		return tree.j
	}
}

export default function parse(input) {
	class T extends Array {
		static input = input
		constructor(id='', i=0) {
			super()
			this.i=i
			this.j=i
			this.id=id
		}
		pushText( last ) {
			this.j = last
			return this
		}
		makeLeaf(last, id='') {
			const leaf = new this.constructor(id, this.j)
			this.push(leaf)
			this.j = leaf.j = last
			return leaf
		}
	}

	const tree = new T('file')
	jsParse(tree) //.makeLeaf('','js'))
	return tree
}
