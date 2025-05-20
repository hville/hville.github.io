const addTxt = (tree, text) => tree.pushText( text ).j,
			endTxt = (tree, text) => ~tree.pushText( text ).j,
			addKin = (tree, text, id) => tree.makeLeaf( text, id ).j,
			endKin = (tree, text, id) => ~tree.makeLeaf( text, id ).j

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
	const kins = Object.keys(rules),
				source = Object.values(rules).map( arr => '(' + arr[0].source + ')' ).join('|'),
				rule = new RegExp( source, 'y' )

	return function (tree, text) {
		const input = tree.constructor.input
		if ( text ) tree.pushText( text )
		while (tree.j < input.length) {
			rule.lastIndex = tree.j
			const match = rule.exec(input)
			if ( !match?.[0] ) return tree.j
			const kin = kins[match.findLastIndex( v => v !== undefined ) - 1],
						action = rules[kin][1]
			if (!action) return tree.j //don't consume is no actions assigned
			const j = action(tree, match[0], kin)
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
		pushText(text) {
			this.push(text)
			this.j += text.length
			return this
		}
		makeLeaf(text, id='') {
			const leaf = new this.constructor(id, this.j)
			if (text) leaf.pushText(text)
			this.push(leaf)
			this.j = leaf.j //TODO fails on parent.j
			return leaf
		}
	}

	const tree = new T('file')
	jsParse(tree) //.makeLeaf('','js'))
	return tree
}

/*
TODO
2x speed gain if use RE.test instead of compiled regexp
https://schem.ist/publicbench/index.html#en/3FoK:6?OEjV_a9X7SZO!27rhrJIZD5Ujg!co%@Z(:(y(:UDJ87ST9L?.w1tmhD4G7HkuFB3y2ql?5TfH3#v$$3Ld)Z%M/nAC=_t8igAQdohFeHmrw3Iano!T;4=,TT:VvR$QFFiRGPbC;K'=z+?pPmv635zm0L6$aNqJ!5h5Oa7BbEBgzL-7dd.)0WtBTR:L.X5(2'DGFwRQnr9Fd'_K*Dcaq~rp?#GQg,Q!RC$8%iJG!34Wh)x0#qd#n_9-QS;,vgZ'pc8A,PgEPFk$E(YbpB9#F)&NMHB=$cJZRdPtT*@_MUohco)1+1Po#kz1q6ViS0kW#1E+:o!5
*/
