# blocnote

![blocnote](readme.svg)

Minimal computational notebook

## concept

* file is a valid JavaScript module
* specific items to a notebook like text, examples, display and interactive bits are in the comments. Akin to an inverted markdown file where code is the main text and markdown is in blocks
* regular code is in exported modules throughout the file
* because all is regular JavaScript, one notebook can import modules from another one, automatically ignoring the single use parts in the comments
* simple conventions allow for direct in-file editing
* an HTML viewer allows pretty rendering of markdown comments and code

## conventions

Three kinds of blocks, nothing else to learn:

* **text**: a block comment whose `/*` starts a line. Written in markdown
* **cell**: a fenced `js` block inside a text. Single use code: shown and run in the notebook, a comment for whoever imports the file
* **code**: everything else. This is the module

````js
/*
# Title
Some *markdown*, then a cell:

```js
display(mean([1, 2, 3]))
```
*/

/** JSDoc, as usual */
export function mean(values) { /* … */ }
````

### actual comments

They stay with the code, untouched:

* `// line comment`
* `/** JSDoc */`, `/*! license */`
* `/* block */` after some code, or indented

### inside a text

* markdown as in CommonMark
* HTML is allowed, as in any markdown. It makes the placeholders, labelled with `id`:
  - `<output id=total></output>`
  - `<input id=n type=range>`
  - `<canvas id=plot></canvas>`
* fenced block in another language (` ```txt `): shown only
* words after `js` change a cell:
  - ` ```js run=false `: shown, not run
  - ` ```js echo=false `: run, not shown

### inside a cell

* plain JavaScript, in the same scope as the module: no import needed for what is in the file
* own `import` lines and `await` are fine
* 3 helpers, only there in the notebook:
  - `display(value)`: adds the value under the cell. A DOM element is added as is, the rest as text. Returns the value
  - `$(selector)`: first matching element
  - `$$(selector)`: array of matching elements

### where they come from

* text in comments, as markdown: Rust doc comments, Docco, Jupytext
* fenced code that runs: Rust doctests, `deno test --doc`, Quarto, Observable Framework
* `run=false`, `echo=false`: Observable Framework (`echo` also in Quarto and R Markdown)
* `display()`: Observable, IPython
* `$`, `$$`: the browser console
* HTML for inputs and outputs: plain markdown

## logic

* **the notebook is the file with its cells uncommented**: one module, one scope, run from top to bottom
  - a name declared in a cell is seen by the cells below
  - same name twice: an error, as in any JavaScript file
  - usual JavaScript order: a function can be used above its line, a `const` cannot
* the file is cut line by line, with no JavaScript parser (as Jupytext does with `# %%`)
* every text line is blanked and every cell line kept in place, so **an error line is the line in the file**
* the page is built first, then the code runs: text and code still show when the code fails
* an error shows under its block, with its line. Phones have no console
* everything runs in a sandboxed iframe: no access to the site, its storage or the page around
* the address of the notebook is the base of its relative imports (`<base>` in the iframe)

## Goals

### primary (1st version)

* pretty display of *.js notebook
  - cut the file into text, cell and code blocks
  - compile all blocks into markdown style html
  - compile code and cells into one executable script
  - display and run in i-frame
  - must work on mobile phone browsers
* editing in a plain text block

### secondary

* pretty editing instead of a plain text block
* values in the middle of a text: `${ mean(data) }` (Observable Framework)
* `console.log` shown under the cell
* cells that run again when an input changes. For now: plain DOM events
* code colours
* save back to a file (desktop only, a download on phones)

## tested

Prototype: `proto.html`, `proto.js`, with `example.js` and `example2.js`. Headless Chromium only, phone width. Safari and Firefox not tested.

Works:

* both examples, inputs included, in a sandboxed iframe
* `example2.js` imports `example.js`: gets its module, none of its texts or cells
* `example.js` imported by Node as is
* cell with its own `import` and a top-level `await`
* error lines match the file: cell, module code, syntax error, name declared twice, after an `await`, in a click
* `</script>` and `<!--` in the source
* an edited notebook saved in the URL and reloaded (`example.js`: 1670 characters → 1083 in the URL)
* the old files of this folder are cut into valid scripts: any JavaScript file is a notebook

Limits found:

* `*/` in a text or a cell ends the comment: `'src/**/*.js'`, `*this*/*that*`. The file is then broken JavaScript, so any editor shows it. Write `*\/`
* a line starting with `/*` inside a multi-line string is taken for a text. Indent it
* `display()` in a timer or a click writes under the last cell that ran. There, write to a placeholder: `$('#total').value = …`
* an import that can't be loaded: the browser gives no name and no line. The message is only "an import could not be loaded"
* `import … from 'lodash'` (bare name) does not work in a browser: use an address
* some failed promises only say "Script error." (hidden by the sandbox)
* imports need a server that allows other origins. GitHub Pages and `node check.js` do, `python3 -m http.server` does not
* a file opened from the phone has no address: its relative imports are read from the app folder

## rejected ideas

* **cells in a second module that imports the notebook**
  - needs the list of exports, and the notebook loaded from memory (blob) can't have relative imports
  - cells can only see what is exported
* **each cell in its own `{ }`**, to give each its own `display`: no `import` in a cell, no name shared between cells
* **text in `//` lines** (Docco, Rust `///`): no `*/` trouble, but a prefix on every line. Painful on a phone
* **JavaScript parser** (acorn, meriyah: 30-40 kB gzipped; tree-sitter: 510 kB) to do what a line rule does. Can come later for the two first limits, with no change to the conventions

## open questions

* markdown: the prototype has its own small subset (titles, lists, quotes, fences, bold, italic, code, links, images, HTML). Keep growing it, or add a library (`marked`, `markdown-it`: a new dependency)? The convention is CommonMark either way
* where the notebook comes from. In the prototype:
  - `proto.html?./example.js`: a file by its address
  - text in the URL hash, as in the other apps: the edited copy, shown first
  - a file picked on the device
* should module code and cells look different? Now: a bar on the left of the cells
* long module code: folded by default?
* bilingual notebooks: one file per language, or `lang` blocks in the text?
