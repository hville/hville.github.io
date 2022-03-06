const langRE = /(?<=^#)[^/]*/, // #en/ ==> en
			H = document.documentElement,
			setters = new Map,
			div = '//'


export default (lang, list) => H.querySelectorAll('[data-lang]').forEach(pick, list)

/*
either
	1. eval data-lang
	2. pick ElementChild matching lang=##
	3. pick text from a // b // c
	this::Map of {lang:element, set:function}
*/
function pick(el) {
	// first initiation
	if (!setters.has(el)) {
		const setter = {}
		if (el.dataset.lang) {
			try {
				setter.set = Function(el.dataset.lang)
			} catch {
				console.warn('invalid data-lang setter:', el.dataset.lang)
			}
		}
		if (!el.firstElementChild) {
			const langs = el.dataset.lang ? el.dataset.lang.split(' ') : this
			el.innerHTML = el.textContent.split(div)
				.map( (t,i) => `<span lang=${ langs[i] }>${ t.trim() }</span>`)
				.join('')
		}
		// set choices and clear the parent
		el.querySelectorAll('[lang]').forEach( k => el.removeChild(setter[k.lang] = k) )
		setters.set(el, setter)
	}
	const setter = setters.get(el)
	if (setter[H.lang]) el.replaceChildren( setter[H.lang] )
	el.lang = H.lang
	setter.set?.call(el)
}

