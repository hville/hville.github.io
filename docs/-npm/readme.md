# npm module stats

![npm](readme.svg)

## goal

fetch the stats of my modules published in npm, showing a table with name, date, version and downloads in a table format with the option to sort by any of these 4 fields.

## concept

* one page, no input needed: opens on my modules
* data fetched live from npm at each visit, nothing stored
* table: name, date of last publish, version, downloads of the last month
* tap a column header to sort, tap again to reverse
* name links to the module page on npm

## how

* list: `registry.npmjs.com/-/v1/search?text=maintainer:hugov` (max 250 per call)
* downloads: `api.npmjs.org/downloads/point/last-month/<name>`, one call per module
* sort column and direction saved in the URL hash

## state of the code

* fetches work and log to the console; no table yet
* page body is a leftover copy of `zero/`
* `index.js`: older attempt with another search service, unused

## open questions

* maintainer name editable, to look at someone else's modules?
* period choice (week / month / year)?
* total downloads row?
* loading and error message (npm unreachable, rate limit)
* untested from the cloud sandbox: npm hosts are blocked there
