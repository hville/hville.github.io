//https://schem.ist/publicbench/index.html#en/3FoK:6?OEjV_a9X7SZO!27rhrJIZD5Ujg!co%@Z(:(y(:UDJ87ST9L?.w1tmhD4G7HkuFB3y2ql?5TfH3#v$$3Ld)Z%M/nAC=_t8igAQdohFeHmrw3Iano!T;4=,TT:VvR$QFFiRGPbC;K'=z+?pPmv635zm0L6$aNqJ!5h5Oa7BbEBgzL-7dd.)0WtBTR:L.X5(2'DGFwRQnr9Fd'_K*Dcaq~rp?#GQg,Q!RC$8%iJG!34Wh)x0#qd#n_9-QS;,vgZ'pc8A,PgEPFk$E(YbpB9#F)&NMHB=$cJZRdPtT*@_MUohco)1+1Po#kz1q6ViS0kW#1E+:o!5


import bench from '@hugov/bench'
import LexE from './lexer.js'
import LexT from './lexer2.js'
import {readFileSync} from 'fs'

//const ol = readFileSync('../_npm/ol.js', 'utf8')
const lx = readFileSync('./lexer.js', 'utf8')
let tr = readFileSync('../../node_modules/terser/dist/bundle.min.js', 'utf8')
console.log(ol.length + lx.length + tr.length)

//console.log(ol.length)
//console.log(LexE(ol), ol.length)

console.log(await bench({
	exec: () => LexE(ol).j+LexE(lx).j+LexE(tr).j,
	test: () => LexT(ol).j+LexT(lx).j+LexT(tr).j
}))
console.log(await bench({
	exec: () => LexE(tr+=' ').j,
	test: () => LexT(tr+=' ').j
}))

//console.log(LexE(ol).j+LexE(lx).j+LexE(tr).j)
//console.log(LexT(ol).j+LexT(lx).j+LexT(tr).j)

//console.log(LexT(tr))
