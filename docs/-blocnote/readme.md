# blocnote

![blocnote](readme.svg)

attempt at creating a minimal computational notebook

JavaScript file with comments

## concept

* the notebook **is** a plain `.js` file: it still runs anywhere, without the app
* comments = text cells, code between comments = code cells
* the app only adds the display: text, code and the result of each code cell
* no custom file format, no hidden metadata

## how

* open and save the `.js` file from the device (File System Access API)
* split the file into cells with a small lexer: comments, strings, template literals and brackets only, enough to find the top-level blocks
* run the code in a sandboxed iframe, show each cell's result under it
* edit a cell, rerun, save back to the same file

## files

* `index.html`: copy of `bench/`, to be replaced
* `mvp.html`: open / save file tests
* `lexer.js`, `lexer2.js`, `lexer.test.js`, `benchlex.js`: the cell splitter, its tests and speed test
* `zztree-sitter.js`: size notes on existing parsers

## open questions

* File System Access API is desktop Chrome / Edge only: fallback for phones? (`<input type=file>` + download, or URL hash as in other apps)
* what is a cell result: last expression, `console.log`, a returned DOM element?
* do cells share variables (one module) or run one by one?
* markdown in comments, or plain text?
* overlap with `-executif/` (one cell, saved in the URL): merge?

## rejected idea

* full JS parser to split the cells: too heavy for the need
  * tree-sitter + JS grammar: ~510 kB
  * acorn, esprima, meriyah: 30-40 kB gzipped
