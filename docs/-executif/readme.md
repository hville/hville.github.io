# executif

![executif](readme.svg)

## goal

run user provided script in an iframe sandbox. $ and $$ utility functions are provided, modules imported.

I don't really remember why I started this not where the results are to be displayed.

the request anymatuin frame and the $ and $$ Dom selectors suggest the iframe was to manipulate DOM elements for its output.

idea?

## concept (guess from the code)

* smallest possible script playground: one code box, one result frame
* the script is saved in the URL: a link is a runnable, shareable snippet
* the result **is** the iframe: the script builds its own output there with `$` and `$$`
* the sandbox keeps the script away from the site and its data
* site styling loaded in the iframe, so the output looks like the other pages

## how (as coded)

* code typed in an editable block, saved in the URL hash at each keystroke
* each change reloads the iframe with the code as a module
* bare imports (`import x from 'name'`) rewritten to `https://esm.sh/name`; paths left as-is
* `$` and `$$` from `inhtml` set on `window` in the iframe

## possible uses

* quick test of an npm module from a phone
* small demos linked from the home page, without a new app folder
* the run engine for `-blocnote/` (same thing, with many cells)

## open questions

* output: only what the script puts in the DOM, or also `console.log` and the last value?
* errors are not shown: the iframe has to send them to the page (`postMessage`)
* run at each keystroke or with a run button? (half-typed code runs)
* `esm.sh` is an outside service: fine, or limit to `/_npm/`?
* leftovers with no use yet: `#show`, `nextFrame`
* keep as its own app, or fold into `-blocnote/`?
