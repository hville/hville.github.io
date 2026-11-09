# simple notebook-like experiments

## context and goals

Sharing with and for my future self the odd small scripts I have been working on over the years. This includes unfinished ideas, failures and dead ends.

Keep things simple, or more realistically, understand when and where simple is just not that simple.

## requirements

* for the browser, mobile first
* static files
* multilingual
* dynamic scripts in every html files
* no bundlers, no build steps: serve the html files as-is

## the future starts on 20261109 

As a side goal, use this simple site to test Claude Code and hopefully advance old ideas and publish more often!

Use **Claude Code in the cloud** for structural edits and tests in headless browser. Nothing to install.

Use the **GitHub** app for personal edits and tweeks.

## Things to remember

- Saved URLs are bookmarks: breaking changes go to a new folder (`app2/`), never in place.
- Published = linked from the home page. Everything else in `docs/` is a draft (`urbi/`, `muse/`, `npm/`, and the `-` folders). New drafts get a `-` prefix.
- `docs/_env/` has a Google Maps key, restricted to schem.ist, not used yet. It's in a public repo, so keep the restriction.
- Shared URL-state code: `docs/_src/hash-data.js` (used by every published app). `hash-data2.js` is an unused leftover.

## Future pipeline

- Make `makefeed.js` work: generate `feed.atom` (and maybe RSS) from the home page list. Right now it's a broken draft and `feed.atom` is hand-edited, last updated 2023.
- Use the Google Maps key (`urbi` or a new app).
- Delete `hash-data2.js` once nothing needs it.

