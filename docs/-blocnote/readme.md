# blocnote

![blocnote](readme.svg)

Minimal computational notebook

## concept

* the notebook file is a valid JavaScript module. It can run or have imported modules from it without errors
* specific items to a notebook like text, examples, display and interactive bits are in the comments. Akin to an inverted markdown file where code is the main text and markdown is in blocks
* regular code is in exported modules throughout the file
* because all is regular JavaScript, one notebook can import modules from another one, automatically ignoring the single use parts in the comments
* simple conventions allow for direct in-file editing
* this app is an HTML viewer for JS notebooks and allows pretty rendering of markdown comments and code
* a notebook can be a standalone js file or is stored in the URL for the app.

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

### exact rules

* a text starts with `/*` as the 2 first characters of a line, and ends at the first `*/`
  - `/* # title */` on one line is fine
  - code after the `*/`, on the same line, is code
* the lines of a text are read as is: no ` * ` at the start of each line, it would make a list
* a cell starts with exactly 3 backticks and `js` at the start of a line, and ends with 3 backticks alone
  - indented (in a list), 4 backticks or `~~~`: not a cell, never run

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
* the whole page is there before the first line runs: a cell can fill a placeholder written below it
* an `id` is used once per notebook. Browsers also make it a global variable (`total.value`): don't give an `id` the name of a variable
* fenced block in another language (` ```txt `): shown only
* words after `js` change a cell:
  - ` ```js run=false `: shown, not run
  - ` ```js echo=false `: run, not shown

### inside a cell

* plain JavaScript, in the same scope as the module: no import needed for what is in the file
* own `import` lines and `await` are fine. An `await` holds everything below it, module code included
* addresses are relative to the notebook: `fetch('./data.json')`, `import.meta.url`
* a bare module name is read from esm.sh: `import _ from 'lodash'` → `https://esm.sh/lodash`, `'d3-scale@4'` for a version. Node reads the same file from `node_modules`
* 3 helpers, only there in the notebook:
  - `display(value)`: adds the value under the cell. A DOM element is added as is, the rest as text. Returns the value
  - `$(selector)`: first matching element
  - `$$(selector)`: array of matching elements
* the helpers are for cells only: in module code they break the import

### where they come from

* text in comments, as markdown: Rust doc comments, Docco, Jupytext
* fenced code that runs: Rust doctests, `deno test --doc`, Quarto, Observable Framework
* `run=false`, `echo=false`: Observable Framework (`echo` also in Quarto and R Markdown)
* `display()`: Observable, IPython
* `$`, `$$`: the browser console
* bare names from a CDN: Observable, esm.sh
* HTML for inputs and outputs: plain markdown

## logic

* **the notebook is the file with its cells uncommented**: one module, one scope, run from top to bottom
  - a name declared in a cell is seen by the cells below
  - same name twice: an error, as in any JavaScript file
  - usual JavaScript order: a function can be used above its line, a `const` cannot
  - the trap: module code also sees the names of the cells. It then works in the notebook and fails when imported. Module code must never use a name from a cell
* any edit runs the whole notebook again: inputs go back to their first value
* the file is cut line by line, with no JavaScript parser (as Jupytext does with `# %%`)
* every text line is blanked and every cell line kept in place, so **an error line is the line in the file**
* the page is built first, then the code runs: text and code still show when the code fails
* an error shows under its block, with its line. Phones have no console
* everything runs in a sandboxed iframe: no access to the site, its storage or the page around
  - ignored without a word: `alert`, `prompt`, `open` (new window)
  - blocked with an error: `localStorage`, cookies, IndexedDB, clipboard, geolocation
  - `fetch` works, where the server allows other origins
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
* to fix from the tests (see the limits):
  - links in the text
  - a notebook that froze must not run again by itself

### secondary

* pretty editing instead of a plain text block
* values in the middle of a text: `${ mean(data) }` (Observable Framework)
* `console.log` shown under the cell
* cells that run again when an input changes. For now: plain DOM events
* code colours
* save back to a file (desktop only, a download on phones)
* check of the module alone: run the file once more with the cells left as comments, to catch the trap of the names (see logic)
* a link to another notebook opens it in the viewer

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
* `fetch('./readme.svg')` and `import.meta.url` in a cell: both use the address of the notebook

Limits found:

* `*/` in a text or a cell ends the comment: `'src/**/*.js'`, `*this*/*that*`. The file is then broken JavaScript, so any editor shows it. Write `*\/`
* a line starting with `/*` inside a multi-line string is taken for a text. Indent it
* `display()` in a timer or a click writes under the last cell that ran. There, write to a placeholder: `$('#total').value = …`
* an import that can't be loaded: the browser gives no name and no line. The message is only "an import could not be loaded"
* bare names (`'lodash'`) are rewritten to esm.sh in code and cells. Not tested on esm.sh itself: the cloud session can't reach it. The rewrite also changes `from 'x'` written inside a string
* some failed promises only say "Script error." (hidden by the sandbox)
* imports need a server that allows other origins. GitHub Pages and `node check.js` do, `python3 -m http.server` does not
* a file opened from the phone has no address: its relative imports are read from the app folder
* **links in the text replace the notebook** inside its frame. An outside link gives an error page, `[top](#title)` shows the raw file
  - tested fix: `<base target=_blank>` in the frame, and `allow-popups allow-popups-to-escape-sandbox` on the iframe. Links open in a new tab, the notebook stays
  - links inside the page (`#title`) still need a few lines of script. Not tested
* **an endless loop in a cell freezes the whole page**, not only the frame. The saved URL freezes again when opened: the text can't be reached to fix it
  - idea, not tested: note that a run started, clear the note when it ends. If the note is still there at the next opening, show the text and wait for a tap
* a name from a cell used in module code: fine in the notebook, `ReferenceError` when imported in Node

## rejected ideas

* **run at each keystroke** (old `-executif` draft): half-typed code runs, and an unfinished `while (` freezes the page. The text runs when it loses the focus

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
* esm.sh is an outside service: fine, or only `/_npm/` and full addresses?
