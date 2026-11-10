# simple notebook-like experiments

## context and goals

Sharing with and for my future self the odd small scripts I have been working on over the years. This includes unfinished ideas, failures and dead ends.

Keep things simple, or more realistically, understand when and where simple is just not that simple.

## requirements

* for the browser, mobile first
* static files
* multilingual
* dynamic scripts in every html files
* bias for web APIs over external scripts
* no bundlers, no build steps: serve the html files as-is

## the future starts on 20261109 

As a side goal, use this simple site to test Claude Code and hopefully advance old ideas and publish more often!

Use **Claude Code in the cloud** for structural edits and tests in headless browser. Nothing to install.

Use the **GitHub** app for personal edits and tweeks.

## Things to remember

- Saved URLs are bookmarks: breaking changes go to a new folder (`app2/`), never in place.
- Released project versions are linked from the home page and have an ATOM feed.
- Draft projects in `docs/` have a `-` prefix.
- Shared utils, libs and code have the `_` prefix
- `docs/_env/` has a Google Maps key, restricted to schem.ist.
- `feed.atom` is generated from the home page list by `node makefeed.js`. It rebuilds itself on `main` (GitHub workflow `feed`) whenever the home page changes. Drafts are never in the feed.
- Serverless. State is saved in the URL

## Future pipeline

- Rename `urbi/` and `muse/` with dash since they are unfinished drafts
- Add a readme.md to every app folder to explain the concept, goals and open actions
- The new `hash-data2.js` uses the CompressionStream API instead of the older BWT+EliasGamma custom algorithm. It is likely faster, smaller and with better performance.


