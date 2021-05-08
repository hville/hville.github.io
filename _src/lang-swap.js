// Select the node that will be observed for mutations
export default (targetNode = document.documentElement, divisor='//') => {
	const cb = () => targetNode.querySelectorAll('[data-lang]').forEach(pick),
				mo = new MutationObserver( cb ),
				kids = new Map

	function pick(el) {
		if (!kids.has(el)) {
			// pre-set list forces extraction from text
			if (el.dataset.lang) {
				const langs = el.dataset.lang.split(' ')
				el.innerHTML = el.textContent.split(divisor)
				.map( (t,i) => `<span lang=${ langs[i] }>${ t.trim() }</span>`)
				.join('')
			}
			// set choices and clear the parent
			const res = {}
			el.querySelectorAll('[lang]').forEach( k => res[k.lang.split('-')[0]] = k )
			kids.set(el, res)
			el.textContent = ''
		}
		el.replaceChildren( kids.get(el)[ targetNode.lang.split('-')[0] ] )
	}
	cb()
	mo.observe(targetNode, { attributeFilter: [ 'lang' ] })
}
