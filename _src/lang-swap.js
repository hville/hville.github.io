// Select the node that will be observed for mutations
const langRE = /(?<=^#)[^/]*/,
			H = document.documentElement,
			div = '//'
/*
Select the node that will be observed for mutations
align hash and html.lang
*/
export default (ls, cb) => {
	const	mo = new MutationObserver( onlang ),
				kids = new Map

	function onlang() {
		if(!ls.includes(H.lang)) H.lang = ls[0]
		else {
			if (gethashlang() !== H.lang) sethashlang(H.lang)
			H.querySelectorAll('[data-lang]').forEach(pick)
			cb?.(H.lang)
		}
	}

	function pick(el) {
		if (!kids.has(el)) {
			// pre-set list forces extraction from text
			if (!el.firstElementChild) {
				const langs = el.dataset.lang ? el.dataset.lang.split(' ') : ls
				el.innerHTML = el.textContent.split(div)
				.map( (t,i) => `<span lang=${ langs[i] }>${ t.trim() }</span>`)
				.join('')
			}
			// set choices and clear the parent
			const res = {}
			el.querySelectorAll('[lang]').forEach( k => res[k.lang] = k )
			kids.set(el, res)
			el.textContent = ''
		}
		el.replaceChildren( kids.get(el)[H.lang] )
	}

/**
 * picks a supported language from the following sources (in that order)
 * location.hash > navigator.languages > document.documentElement.lang
 */
	function onhash() {
		const lang = gethashlang()
		//language in hash is empty or not supported, change it
		if(!ls.includes(lang)) sethashlang(
			navigator.languages.find( l => ls.includes( l.split('-', 1) ) ) || H.lang
		)
		else if (lang !== H.lang) H.lang = lang
	}

	onhash()
	onlang()
	mo.observe(H, { attributeFilter: [ 'lang' ] })
	addEventListener('hashchange', onhash)
}

function gethashlang() {
	return location.hash.match(langRE)?.[0] || ''
}

function sethashlang(lang) {
	location.hash = location.hash ? location.hash.replace(langRE, lang) : `#${lang}`
}
