# schem.ist — instructions for coding agents

**Read `readme.md` first.** It is the owner's note: goals, requirements and "Things to remember" (saved URLs, drafts, `_env/` key, `hash-data.js`, future pipeline). Those rules apply to you; they are not repeated here. This file only adds what an agent needs to do the work.

Hosted on GitHub Pages at https://schem.ist from the `docs/` folder of `main`. User data lives in the URL hash, never on a server.

The owner rarely reads code and reviews from a phone. Explain changes in plain words in the PR and include screenshots.

## Hard rules (on top of the readme)

- **No build step** means: no bundlers, frameworks, transpilers, TypeScript or CSS preprocessors. Plain HTML, CSS and ES modules, served exactly as committed.
- **Never push to `main`.** Work on a branch and open a pull request. Merging is the owner's decision.
- **Never change how an existing app encodes its URL data, never rename or move an app folder.** Breaking change → new folder, as with `montecode/`, `montecode2/`, `montecode3/`.
- **Every visible string in both English and French.**
- **No secrets.** Don't add keys or tokens. Don't edit `docs/_env/`.
- **No new dependency without asking** in the PR description first.

## Layout

```
docs/                 served site root (GitHub Pages, CNAME schem.ist, .nojekyll)
  index.html          home page: dated list of apps, newest first
  feed.atom           Atom feed, maintained by hand
  404.html
  <app>/index.html    one folder per app, self-contained, imports shared code
  _src/               shared site code (see below)
  _npm/               npm packages pre-bundled by unnode — generated, committed
  _lib/               third-party static files (CSS)
  _data/              reference/scratch data, not part of any app
  _env/               API key (see readme)
package.json          npm dependencies + unnode devDependency
makefeed.js           broken draft (see readme), don't rely on it
readme.md             owner's notes and project rules
```

## Shared building blocks (`docs/_src/`)

- `main.css` — site styling. Every page links it.
- `data-lang.js` — load with `<script type=module src="../_src/data-lang.js">`. Defines the `<data-lang>en fr</data-lang>` element (language radio buttons) and switches every element marked `data-lang`.
- Bilingual text, two forms:
  - short: `<h3 data-lang>source text // texte initial</h3>` (split on `//`, in the order of the `<data-lang>` list)
  - rich: `<span data-lang><span lang=en>…</span><span lang=fr>…</span></span>`
  - `data-lang="js code"` with a value runs that code with `this` = the element on each language change (e.g. to set a localized `href`).
- `hash-data.js` — URL state. The hash is `#<lang>/<data>`. Use:
  ```js
  import hashData from '../_src/hash-data.js'
  const save = hashData(({data, lang}) => { /* restore state from data */ })
  save({data: '...'})   // writes #lang/<encoded data>
  ```
  `data` is compressed with `@hugov/shorter-string2` by default; pass custom `enc`/`dec` as 2nd/3rd arguments if needed.
- `editable.js` — makes an element contentEditable and fires `change` on blur.
- `lang-swap.js`, `lang-event.js` — internals of the above.

Copy the head and header block of an existing app (e.g. `docs/bwt/index.html`) for any new page: same `<html lang=en>`, meta tags, `main.css`, `data-lang.js`, and the header row with the home link, title and `<data-lang>en fr</data-lang>`.

## npm libraries (unnode)

- Browser code imports libraries by path, never by bare name: `import Rec from '/_npm/sample-distribution.js'`, or a sub-file `'/_npm/@hugov/shorter-string/src/bwt.js'`.
- To add or update a library: add it to `package.json`, `npm install`, then from `docs/` run `npx unnode _npm`. unnode bundles only the `/_npm/...` paths that source files actually import. Commit the generated files in `docs/_npm/`.
- The `dependencies` script in `package.json` uses `&` (Windows). On Linux use `cd docs && npx unnode _npm`.

## Adding a new app

1. New drafts: `docs/-<short-name>/index.html` (lowercase, no spaces), off the home page. Publishing (removing the `-`, linking it) only when the owner says so.
2. All UI text bilingual. All state that should survive a reload goes through `hash-data.js`.
3. To publish: add an entry at the top of the list in `docs/index.html` with `<time>YYYY-MM-DD</time>` and links to `./<name>/index.html#en` and `#fr`.
4. Update `docs/feed.atom` only if asked.

## Code style

- Tabs, LF, final newline (`.editorconfig`); spaces for `.md`, `.json`, `.yml`.
- Terse HTML is fine (unquoted attributes, as in existing pages). Vanilla JS, small functions, no classes unless needed.
- Comments and commit messages in English.

## Before opening a PR — check your work

1. Serve the site: `cd docs && python3 -m http.server 8000` (pages use absolute `/…` paths, so serve `docs/` as the root).
2. Open every page you changed with a headless browser, in both `#en` and `#fr`:
   - no console errors
   - text switches language, nothing left untranslated
   - set some state, reload the produced URL, confirm the same state comes back
   - confirm an old URL from the home page still loads (for changed apps)
3. Take screenshots (en and fr, phone width ~390px) and put them in the PR.
4. PR description: what changed, why, how to try it (a link with example state), anything uncertain.

## Don't touch unless asked

- `docs/_env/`, draft folders, `readme.md`, `docs/_data/`.
