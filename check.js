// Loads site pages in a headless browser, in each of their languages,
// and prints the title and any errors. Nothing to install in cloud sessions
// (Playwright is preinstalled there); elsewhere: npm i -g playwright.
//
//   node check.js                 every page
//   node check.js bwt zero        only these folders (and the home page)
//   node check.js --shots <dir>   also save phone-width screenshots
//
// Serves docs/ like GitHub Pages: docs/ is the root, unknown paths get 404.html,
// any origin may load files (as from an iframe srcdoc).
// Exit code 1 if a page from this site has an error; failed requests to
// other hosts are listed but do not count (cloud sessions block most hosts).

import {createServer} from 'node:http'
import {readFile, readdir, mkdir} from 'node:fs/promises'
import {existsSync} from 'node:fs'
import {join, extname} from 'node:path'
import {createRequire} from 'node:module'

const {chromium} = createRequire(import.meta.url)('playwright'),
			root = join(import.meta.dirname, 'docs'),
			types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.svg':'image/svg+xml',
				'.json':'application/json', '.atom':'application/atom+xml', '.png':'image/png', '.jpg':'image/jpeg'}

const args = process.argv.slice(2),
			shotIndex = args.indexOf('--shots'),
			shots = shotIndex < 0 ? null : args.splice(shotIndex, 2)[1],
			only = args.map( a => a.replace(/^docs\/|\/$/g, '') )

// static server
const server = createServer(async (req, res) => {
	let path = join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname))
	if (path.endsWith('/')) path += 'index.html'
	const found = existsSync(path) && extname(path)
	res.writeHead(found ? 200 : 404, {'access-control-allow-origin': '*', 'content-type': types[found || '.html'] ?? 'application/octet-stream'})
	res.end(await readFile(found ? path : join(root, '404.html')))
})
await new Promise( ok => server.listen(0, ok) )
const base = `http://localhost:${server.address().port}`

// pages: home, 404 (also from a nested missing path), every <folder>/index.html
const folders = (await readdir(root, {withFileTypes: true}))
	.filter( d => d.isDirectory() && !d.name.startsWith('_') && existsSync(join(root, d.name, 'index.html')) )
	.map( d => d.name )
	.filter( n => !only.length || only.includes(n) )
const pages = ['/', ...(only.length ? [] : ['/404.html', '/missing/nested/page']), ...folders.map( n => `/${n}/index.html` )]

const browser = await chromium.launch()
if (shots) await mkdir(shots, {recursive: true})
let failed = 0

for (const page of pages) {
	const file = page === '/' ? 'index.html' : page.startsWith('/missing') ? '404.html' : page.slice(1),
				langs = (await readFile(join(root, file), 'utf8')).match(/<data-lang>([^<]*)<\/data-lang>/)?.[1].trim().split(/\s+/) ?? ['en']
	for (const lang of langs) {
		const tab = await browser.newPage({viewport: {width: 390, height: 844}}),
					errors = [], external = []
		tab.on('pageerror', e => errors.push(e.message))
		tab.on('console', m => m.type() === 'error' && !m.text().startsWith('Failed to load resource') && errors.push(m.text()))
		tab.on('requestfailed', r => (r.url().startsWith(base) ? errors : external).push(`failed ${r.url()}`))
		tab.on('response', r => r.status() >= 400 && r.url() !== `${base}${page}`
			&& (r.url().startsWith(base) ? errors : external).push(`${r.status()} ${r.url()}`))
		await tab.goto(`${base}${page}#${lang}`, {waitUntil: 'networkidle'}).catch( e => errors.push(e.message) )
		const title = await tab.title().catch( () => '?' )
		console.log(`${errors.length ? '✗' : '✓'} ${page}#${lang}  "${title}"`)
		for (const e of errors) console.log(`    error: ${e.replaceAll(base, '')}`)
		for (const e of external) console.log(`    external: ${e}`)
		if (shots) await tab.screenshot({path: join(shots, `${page.slice(1).replace(/\/?index\.html$|\.html$/, '').replaceAll('/', '_') || 'home'}.${lang}.png`)})
		if (errors.length) ++failed
		await tab.close()
	}
}

await browser.close()
server.close()
console.log(failed ? `\n${failed} page(s) with errors` : '\nno errors')
process.exitCode = failed ? 1 : 0
