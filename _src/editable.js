const hasEOL = /\n$/,
			changed = new WeakSet

export default function(el) {
	el.contentEditable = true
	el.addEventListener('input', oninput)
	el.addEventListener('blur', onblur)
}
function oninput(evt) {
	const el = evt.currentTarget
	changed.add(el)
	while(el.children.length) el.children[0].outerHTML = hasEOL.test(el.textContent) ? '\n' : '\n\n'
}
function onblur(evt) {
	const el = evt.currentTarget
	if (changed.delete(el)) el.dispatchEvent(new Event('change'))
}
