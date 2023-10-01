const H = document.documentElement,
			setters = new Map,
			div = '//'

export default list => H.querySelectorAll('[data-lang]').forEach(pick, list)

/*
	1. pick ElementChild matching lang=## or from text a // b // c
	2. eval data-lang
	this :: list of languages
*/
function pick(el) {
	// first initiation
	if (!setters.has(el)) {
		const setter = {}
		if (el.dataset.lang) { // treat as a callback if text is present
			try {
				setter.set = Function(el.dataset.lang)
			} catch {
				console.warn('invalid data-lang setter:', el.dataset.lang)
			}
		}
		if (!el.firstElementChild) { // create childNodes from text nodes
			const langs = el.dataset.lang ? el.dataset.lang.split(' ') : this
			el.innerHTML = el.textContent.split(div)
				.map( (t,i) => `<span lang=${ langs[i] }>${ t.trim() }</span>`)
				.join('')
		}
		// set choices and clear the parent
		el.querySelectorAll('[lang]').forEach( k => { if ((setter[k.lang]=k).lang !== H.lang) k.remove() } )
		setters.set(el, setter)
	}
	const setter = setters.get(el)
	if (setter[H.lang]) el.querySelector('[lang]').replaceWith( setter[H.lang] )
	el.lang = H.lang
	setter.set?.call(el)
}

