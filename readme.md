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

- Rename `urbi/`, `muse/` and `npm/` (list of my npm modules with stats, barely started) with a `-` prefix since they are unfinished drafts.
- Since the site was created, `importMaps` have gained wider support. Investigate if `unnode` is still preferred for dependencies.
- Add a readme.md to every app folder to explain the concept, goals and open actions.
- `zero/`: the formula typed is saved in the URL but not restored on reload, and only the first function gets the `Math.` prefix (`cos(x)-sin(x)` fails).
- `docs/_src/api.js` (fetch helper) and `docs/_src/h.css` (dark theme) are not used by any page: delete or keep on purpose.
- Links saved before 2025-05-22 were made with the old compression (`shorter-string`) and may no longer open in apps using `hash-data.js`. Home page examples work.
- GitHub security alerts: `brace-expansion`, a dev-only package pulled in by `unnode`, never served on the site. Fix with `npm audit fix`, or drop it if `unnode` is replaced.
