# blocnote

![blocnote](readme.svg)

Minimal computational notebook

## concept

* file is a valid JavaScript file
* specific items to a notebook like text, examples, display and interactive bits are in the comments. Akin to an inverted markdown file where code is the main text and markdown is in blocks
* regular code is in exported modules throughout the file
* because all is regular JavaScript, one notebook can import modules from another one, automatically ignoring the single use parts in the comments
* simple conventions allow for direct in-file editimg
* an HTML viewer allows pretty rendering of markdown comments and code

## conventions

need different markers for markdown, actual comments and single use code specific to the notebook

* Single line comments `//...`
* Multi line comments `/*...*/`
* 

## Goals

### primary (1st version)

* pretty display of *.js notebook
  - parse js into sequence of code and comment blocks
  - compile all blocks into markdown style html
  - compile all code blocks and code in comments into executable script
  - display and run in i-frame
  - must work on mobile phone browsers

### secondary

* pretty editing instead of a plain text block

## is code conventions

all main js code is in the form of an exported module

## comment block convention

TODO: establish conventions to distinguish within a comment block:
- markdown notes
- DOM placeholders with labels for interactive graphs, drawings, UI, inputs or output values
- code with helpers to run/import the main script modules and update the UI fields. ideally, imports within same file should be automatic (parser adds the import statement so that the block is less verbose)

TODO: decide global helper variables in is in comment code like $ and $$ for DOM manipulation since code in comments will need to modify values
