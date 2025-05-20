/*
TOTAL                         510kb !!!
tree-sitter-javascript
	grammar.js                   26kb
	tree-sitter-javascript.wasm 230kb
web-tree-sitter
	tree-sitter.js               71kb
	tree-sitter.wasm            183kb
	web-tree-sitter needs to load the tree-sitter.wasm file. By default, it assumes that this file is available in the same path as the JavaScript code. Therefore, if the code is being served from http://localhost:3000/bundle.js, then the wasm file should be at http://localhost:3000/tree-sitter.wasm.


package                        size       minified   gzipped
seafox@1.7.1                   95 KB      93.41 KB   25.57 KB x 2,613 ...3y! ...unmaintained
esprima@4.0.1                  278.47 KB  132.14 KB  28.59 KB x 1,581 ...No Module
acorn@8.8.0                    206.72 KB  107.29 KB  30.81 KB x 1,502 mjs
tenko@2.0.1                    371.71 KB  142.41 KB  39.75 KB x 1,183
meriyah@4.3.0                  128.94 KB  127.33 KB  40.25 KB x 3,107 ***

esprima@4.0.1 29.0 kB
acorn@8.9.0   32.1 kB
meriyah@4.3.7 40.3 kB

acorn-loose@8.3.0                                    38.2

import { parseScript } from './meriyah';
parseScript('({x: [y] = 0} = 1)');

	*/
