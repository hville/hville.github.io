# web is hard

## veni, vidi, cessi

> *an incomplete list of the many ways to fail to publish a web page*

## context

Trying over the years to share many of the small scripts I have been working on, I ended up spending countless hours on the many different intricate ways of publishing some *html* markup with *css* styles and *js* scripts without actually publishing anything.

To make matters worse, I have often forgotten dead ends only to repeat the same failures.
This is an attempt to document them and help my future self to keep things simple, or more realistically, understand when and where simple is just not simple.

## requirements

* static files - serve the files as-is
* files include scripts

## finding a home

* AWS - with patience, you can get it to work, until you forgot how, rince and repeat
* github pages - **simple**

## scripts and their dependencies - bundlers

* snowpack - failed with scoped packages `import x from '@scope/module'`. How to manage this is not documented
  * also quickly got complicated as sub folders/pages get added with growing `config.js` with *workspaceRoot*, *packageOptions.knownEntrypoints* and *exclude* with `./dist` created in all sorts of places when doing sub-page tests. With patience, I am confident you can get it to work, until you forgot how, rince and repeat
* parcel/wmr/vite - failed with scripts with `</script>` somewhere inside the module. Worked by escaping parts of the offending `<\/script>` but it felt like a hack and was a little disheartened that I could break all 3 on my first try.
* wmr/vite also encountered issues with the cache not clearing up and serving the wrong content
* parcel has dual identities with parcel v1 ([parceljs.org](https://parceljs.org)) living in parrallel to parcel@next v2 ([v2.parceljs.org](https://v2.parceljs.org))
* rollup with html entry - with patience and plugins, you can get it to work, until you forgot how, rince and repeat

All in all, I really wanted to embrace battle tested tools, only to find myself in the battle.

## no bundle

* direct from `./node_module` - failed because of bare imports
* as above but with *import maps* - not yet widly supported by browsers
* direct from a CDN

## node vs the world

Turns out developing in node for the browser brings it's own share of complexities since some functionalities are different.
On example is `performance.now` that requires this line to work in both environments:

```javascript
const P = typeof performance !== 'undefined' ? performance
  : (await import('perf_hooks')).performance
```

Except that *top level await* is only a stage 3 proposal that is supported in as of now in chrome, node and firefox canary.
Starting to think that *node.js* is a mixed blessing but going for *deno.js* for web development might just bring a different set of complexities.

## cdns to the rescue, most of the time

* failed: cdnjs
  * need a pull request in github to publish a module
* failed: [unpkg.com](https://unpkg.com)
  * `/[@scope/]name[@version][/file][?module]`
  * served as-is, bare imports not resolved
  * top level await not allowed
* failed sometimes: [cdn.jsdelivr.net](https://cdn.jsdelivr.net)
  * `/_npm/[@scope/]name[@version][/file][+esm]`
  * minified
  * couldn't find the requested file - likely an issue with bare imports or top level await
* failed sometimes: [cdn.skypack.dev](https://cdn.skypack.dev)
  * `/[@scope/]name[@version][/file][?module]`
  * dependencies resolved with intermediate export file
  * served as is through re-exports
  * bare imports not resolved *relative references must start with either "/", "./", or "../"*
* failed sometimes [esm.run](https://esm.run) (just like jsdelivr)
  * `/@scope/name` => `/npm/@scope/name/+esm`
  * couldn't find the requested file - likely an issue with bare imports or top level await
* kind of worked [jspm.dev](https://jspm.dev)
  * `/[@scope/]name[@version][/file]`
  * dependencies resolved with intermediate export file
  * in case of failure, serves an older version?
  * slower update
* worked [esm.sh](https://esm.sh)
  * minified, bundled dependencies - harder to debug
  * failed: top-level await is not available in the configured target environment
  * nice: can change the environment `/[@scope/]name[@version][/file]?target=[es2020|esnext]`

Part of the failures are understandable. While *bare imports* within npm modules should logically be resolved, *top level await* is more debatable. At the time of failures, it is still only a stage 3 proposal even if supported in chrome, node and firefox canary.

Then again, top level await is hard to avoid with modules that need to work in both node and the browser... another source of failures.

## other unavoidable skill sets aquired through unlisted failures

* globbing, for gitignore, package.json and other config files
  * `*` : anything anytimes, except `/` and maybe except `/.`
  * `**` : anything anytimes
  * `?` : anything once, except `/` and maybe except `/.`
  * end with `/` : a folder
* folder structure and naming conventions
  * authored sources to be compiled: public, source, code, root, `src/`, *app*
  * external sources to be compiled: node_modules, dependencies, librairies, *vendor*
  * compiled and served: production, served, *public*, target, common, serve, *build*, `dist/`, root, `docs/`
  * served as-is: *assets*, *public*, *vendor*, common, vendor, `lib/`
  * tooling: internal, binaries, `build/`, util, code, tool, `test/`, `unit/`, node_modules, `bin/`, `env/`
  * ==> *separating folder by feature not by type*: login, core
