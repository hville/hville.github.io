// prototype to test the conventions of readme.md - string functions only, no DOM
// a notebook is split line by line into parts: code | text | cell
//   text: block comment opened by a line starting with /* (not /** or /*!), markdown
//   cell: ```js fenced block inside a text, runs in the notebook only
//   code: everything else, the module itself

const OPEN = /^\/\*(?![*!])/,
			FENCE = /^```\s*(\S*)\s*(.*?)\s*$/

/**
 * @param {string} src notebook source
 * @return {{parts: {kind:string, line:number, lines:string[], info?:string}[], script: string}}
 * script has the same line numbers as src: text lines are blank, cell lines are uncommented
 */
export function split(src) {
	const lines = src.replaceAll('\r\n', '\n').split('\n'),
				parts = [],
				script = []
	let kind = 'code', // code | text | cell
			part = null

	function add(newKind, i, line, info) {
		if (part?.kind !== newKind || info !== undefined) parts.push(part = {kind: newKind, line: i+1, lines: [], info})
		if (line !== null) part.lines.push(line)
	}

	for (let i=0; i<lines.length; ++i) {
		let line = lines[i], js = ''
		if (kind === 'code') {
			if (OPEN.test(line)) {
				kind = 'text'
				line = line.slice(2)
				js = '  '
			} else {
				add('code', i, line)
				script.push(line)
				continue
			}
		}
		// in a comment: text or cell
		const end = line.indexOf('*/'),
					body = end < 0 ? line : line.slice(0, end)
		if (kind === 'cell') {
			if (end < 0 && !FENCE.test(line)) add('cell', i, line), js += line
			else kind = 'text', part = null // closing fence, or comment closed before the fence
			if (end >= 0 && body.trim() && !FENCE.test(body)) add('text', i, body)
		} else {
			const fence = body.match(FENCE)
			if (fence && fence[1] === 'js' && !/\brun=false\b/.test(fence[2]) && end < 0) {
				kind = 'cell'
				add('cell', i, null, fence[2])
				js += `__cell(${ parts.length-1 });`
			} else add('text', i, body)
		}
		if (end >= 0) {
			kind = 'code'
			part = null
			const rest = line.slice(end+2)
			js = ' '.repeat(js.length + end + 2) + rest
			if (rest.trim()) add('code', i, rest)
		}
		script.push(js.trimEnd())
	}
	return {parts, script: script.join('\n')}
}

const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;')

/**
 * small markdown subset, to be replaced by a real CommonMark parser
 * blocks: # headings, lists (- * 1.), > quotes, ---, ``` fences, html blocks, paragraphs
 * inline: `code`, **bold**, *italic*, [text](url), ![alt](url), html tags
 */
export function markdown(lines) {
	const out = []
	let i = 0
	const inline = s => s
		.replace(/&(?![a-z0-9#]+;)/gi, '&amp;')
		.replace(/<(?![a-z/!])/gi, '&lt;')
		.split(/(`[^`]+`)/)
		.map( (t, j) => j%2 ? `<code>${ esc(t.slice(1,-1)) }</code>` : t
			.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img alt="$1" src="$2">')
			.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
			.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
			.replace(/(^|[^\w*])[*_]([^*_\s](?:[^*_]*[^*_\s])?)[*_](?!\w)/g, '$1<i>$2</i>') )
		.join('')
	const take = re => {
		const got = []
		while (i < lines.length && re.test(lines[i])) got.push(lines[i++])
		return got
	}
	while (i < lines.length) {
		const line = lines[i]
		let m
		if (!line.trim()) ++i
		else if (m = line.match(/^(#{1,6})\s+(.*)$/)) out.push(`<h${ m[1].length }>${ inline(m[2]) }</h${ m[1].length }>`), ++i
		else if (/^(---+|\*\*\*+)\s*$/.test(line)) out.push('<hr>'), ++i
		else if (m = line.match(FENCE)) {
			++i
			const code = []
			while (i < lines.length && !FENCE.test(lines[i])) code.push(lines[i++])
			++i
			out.push(`<pre><code>${ esc(code.join('\n')) }</code></pre>`)
		}
		else if (/^\s*[-*]\s/.test(line)) out.push(`<ul>${ take(/^\s*[-*]\s/).map( l => `<li>${ inline(l.replace(/^\s*[-*]\s+/, '')) }</li>` ).join('') }</ul>`)
		else if (/^\s*\d+[.)]\s/.test(line)) out.push(`<ol>${ take(/^\s*\d+[.)]\s/).map( l => `<li>${ inline(l.replace(/^\s*\d+[.)]\s+/, '')) }</li>` ).join('') }</ol>`)
		else if (/^>/.test(line)) out.push(`<blockquote>${ inline(take(/^>/).map( l => l.replace(/^>\s?/, '') ).join('\n')) }</blockquote>`)
		else if (/^<[a-z!/]/i.test(line)) out.push(take(/\S/).join('\n')) // html block, up to a blank line
		else out.push(`<p>${ inline(take(/^(?!\s*$|#{1,6}\s|```|>|\s*[-*]\s|\s*\d+[.)]\s)/).join('\n')) }</p>`)
	}
	return out.join('\n')
}

const trim = lines => {
	let a = 0, b = lines.length
	while (a < b && !lines[a].trim()) ++a
	while (b > a && !lines[b-1].trim()) --b
	return {from: a, lines: lines.slice(a, b)}
}

/** parts => html body: text as markdown, code and cells as <pre>, a <div> after each cell for its results */
export function render(parts) {
	return parts.map( (p, n) => {
		if (p.kind === 'text') return `<section>${ markdown(p.lines) }</section>`
		const {from, lines} = trim(p.lines)
		if (!lines.length && p.kind === 'code') return ''
		const pre = /\becho=false\b/.test(p.info ?? '') ? ''
			: `<pre class=${ p.kind } data-from=${ p.line+from } data-to=${ p.line+from+lines.length }><code>${ esc(lines.join('\n')) }</code></pre>`
		return p.kind === 'cell' ? `${ pre }<div id=__out${ n }></div>` : pre
	}).join('\n')
}

// runs in the frame before the notebook (a module waits for the end of the page): globals for the cells, errors shown in the page
function runtime() {
	let out = null
	const el = (tag, props) => Object.assign(document.createElement(tag), props)
	globalThis.$ = (sel, root=document) => root.querySelector(sel)
	globalThis.$$ = (sel, root=document) => [...root.querySelectorAll(sel)]
	globalThis.__cell = n => { out = document.getElementById('__out'+n) }
	globalThis.display = v => {
		let text = v
		if (v !== null && typeof v === 'object' && !(v instanceof Node)) try { text = JSON.stringify(v) ?? v } catch {}
		;(out ?? document.body).append( v instanceof Node ? v : el('pre', {textContent: String(text)}) )
		return v
	}
	function fail(message, line) {
		const err = el('pre', {className: 'error', textContent: (line ? `line ${line}: ` : '') + message}),
					at = [...document.querySelectorAll('pre[data-from]')].find( p => line >= p.dataset.from && line <= p.dataset.to )
		if (at) (at.nextElementSibling?.id.startsWith('__out') ? at.nextElementSibling : at).after(err) // under the results of a cell
		else document.body.prepend(err)
	}
	addEventListener('error', e => fail(e.message, e.lineno))
	addEventListener('unhandledrejection', e => fail(String(e.reason?.stack ?? e.reason), +String(e.reason?.stack).match(/:(\d+):\d+\)?\s*$/m)?.[1]))
	// a module that can't be fetched gives no message and no line: only this event on the script
	document.querySelector('script[type=module]').onerror = () => fail('an import could not be loaded')
	new ResizeObserver( () => parent.postMessage({height: document.documentElement.scrollHeight}, '*') ).observe(document.documentElement)
}

const CSS = `
pre.cell { border-left: 3px solid }
pre.error { color: tomato; white-space: pre-wrap }
pre { tab-size: 2 }
`

// bare module names (from 'd3') have no meaning in a browser: they are read from esm.sh (idea from -executif)
// only the quoted name changes, so the line numbers stay the same
const IMPORT = /(\bfrom\s*|\bimport\s*\(?\s*)(["'])([^"'.\/\s][^"'\s]*)\2/g
export const bare = script => script.replace(IMPORT, (all, kw, q, name) =>
	/^[a-z][a-z\d+.-]*:/i.test(name) ? all : `${kw}${q}https://esm.sh/${name}${q}`)

/**
 * full page for <iframe sandbox=allow-scripts srcdoc=...>
 * the module script starts on line 1, so that error lines are the lines of the source
 * @param {string} src notebook source
 * @param {{base?: string, css?: string, lang?: string}} options base: address of the notebook, for its relative imports
 */
export function page(src, {base='', css='', lang='en'} = {}) {
	const {parts, script} = split(src),
				safe = bare(script).replaceAll('</script', '<\\/script').replaceAll('<!--', '<\\!--')
	return `<!doctype html><html lang=${ lang }><meta charset=utf-8><meta name=viewport content="width=device-width, initial-scale=1.0">${
		base ? `<base href="${ esc(base).replaceAll('"', '&quot;') }">` : '' }${
		css ? `<link rel=stylesheet href="${ css }">` : '' }<style>${ CSS.replaceAll('\n', ' ') }</style><script type=module>${ safe }
</script>
<body>
${ render(parts) }
<script>(${ runtime })()</script>
</body>`
}
