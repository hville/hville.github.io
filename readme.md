# simple notebook-like experiments

## context and goals

Sharing with and for my future self the odd small scripts I have been working on over the years. This includes unfinished ideas, failures and dead ends.

Keep things simple, or more realistically, understand when and where simple is just not that simple.

## requirements

* for the browser, mobile first
* static files
* multilingual
* dynamic scripts in every html file
* bias for web APIs over external scripts
* no bundlers, no build steps: serve the html files as-is

## the future starts on 2026-11-09

As a side goal, use this simple site to test Claude Code and hopefully advance old ideas and publish more often!

Use **Claude Code in the cloud** for structural edits and tests in headless browser. Nothing to install.

Use the **GitHub** app for personal edits and tweaks.

## Things to remember

- Saved URLs are bookmarks: breaking changes go to a new folder (`app2/`), never in place.
- Released project versions are linked from the home page and are listed in the Atom feed.
- Draft projects in `docs/` have a `-` prefix. Drafts can be renamed; a name is fixed once it appears on the home page and Atom feed.
- Shared utils, libs and code have the `_` prefix.
- `docs/_env/` has a Google Maps key, restricted to schem.ist.
- `feed.atom` is generated from the home page list by `node makefeed.js`. It rebuilds itself on `main` (GitHub workflow `feed`) whenever the home page changes. Drafts are never in the feed.
- Serverless. State is saved in the URL by `docs/_src/hash-data.js` (CompressionStream API, via `shorter-string2`).

## Future pipeline

- `_npm/` imports are written two ways: 18 as `/_npm/…` and 7 as `../_npm/…`. Check on its own whether the mix causes a real problem (e.g. the same file loaded twice) before changing any page.
- Add a readme.md to every app folder to explain the concept, goals and open actions.
- `zero/`: the formula typed is saved in the URL but not restored on reload, and only the first function gets the `Math.` prefix (`cos(x)-sin(x)` fails).
- `docs/_data/` (11 MB: photos, a PDF, a 7z archive, climate CSV/XML) is published on the site because everything in `docs/` is. If these are scratch files, move them to a `data/` folder at the repo root to keep them in the repo but off the site.
- Fill in the `[insert …]` placeholders (search for `[insert`), starting with the page descriptions.
- `-blocnote/`: the page stops with a script error (`Cannot read properties of null (reading 'children')`).
- `-urbi/`: the map needs `docs/_lib/ol.css` (OpenLayers), which was never committed.
- `-npm/`: needs the npm registry (registry.npmjs.com); untested, since the cloud sandbox blocks it.
- Links saved before 2025-05-22 were made with the old compression (`shorter-string`) and may no longer open in apps using `hash-data.js`. Home page examples work.
