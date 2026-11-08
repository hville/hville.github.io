# Working on schem.ist with an AI agent

Notes for me (Hugo). Agent instructions are in `AGENTS.md`.

## How it fits together

- **Claude Code in the cloud** does the work: it copies the repo into a cloud machine that already has node/npm, edits, runs unnode, tests the pages in a headless browser, and opens a pull request. Nothing to install on my side.
- I start it from the **Code tab of the Claude app** on my phone (or claude.ai/code in a browser).
- I review and merge in the **GitHub app**. GitHub Pages publishes `main` only, so nothing goes live until I merge.
- `AGENTS.md` = the rules of the site. `CLAUDE.md` is one line (`@AGENTS.md`) so Claude Code always loads it. Other tools (Copilot, Codex, Cursor…) read `AGENTS.md` directly. When a rule changes, edit `AGENTS.md` only.

## One-time setup

1. Needs a Claude Pro or Max plan. Cloud sessions count toward the normal usage limits.
2. Open claude.ai/code once, go through onboarding: authorize the Claude GitHub App and give it access to **only** `hville/hville.github.io`. Keep the default environment (Trusted network access, which allows npm).
3. Add `AGENTS.md`, `CLAUDE.md` and this file to the root of the repo (github.com → Add file → Upload files works from the phone browser).
4. First test task (small, harmless):
   > Read AGENTS.md and check it against the repo. List anything inaccurate or missing. Also fix the `dependencies` script in package.json so it works on Linux. Open a PR.

## Asking for things

A good request says what, for whom, and what state goes in the URL:

> New app `loan/`: mortgage amortization table. Inputs: principal, rate, years, payment frequency. All inputs saved in the URL. Bilingual. Add it to the home page.

Small fixes can be one line: "In `bwt/`, the French title is wrong, should be …".

Ask for a plan first when unsure: "Don't change anything yet, propose 2 options for …".

## Reviewing a PR (phone)

- Read the description and look at the en/fr screenshots.
- Try it: once merged, test on the live site. If it's broken: revert the PR in GitHub (one button), or tell the agent what's wrong.
- For anything big, ask the agent to put it in a new folder first so the existing app stays untouched.

## Things to remember

- Saved URLs are bookmarks: breaking changes go to a new folder (`app2/`), never in place.
- Published = linked from the home page. Everything else in `docs/` is a draft (`urbi/`, `muse/`, `npm/`, and the `-` folders). New drafts get a `-` prefix.
- `docs/_env/` has a Google Maps key, restricted to schem.ist, not used yet. It's in a public repo, so keep the restriction.
- Shared URL-state code: `docs/_src/hash-data.js` (used by every published app). `hash-data2.js` is an unused leftover.

## Future pipeline

- Make `makefeed.js` work: generate `feed.atom` (and maybe RSS) from the home page list. Right now it's a broken draft and `feed.atom` is hand-edited, last updated 2023.
- Use the Google Maps key (`urbi` or a new app).
- Delete `hash-data2.js` once nothing needs it.
