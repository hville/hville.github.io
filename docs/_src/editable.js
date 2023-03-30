const hasEOL = /\n$/,
			changed = new WeakSet

const style = document.createElement('style')
document.head.appendChild(style)

export default function(selection) {
	const el = selection.nodeName ? selection : document.querySelector(selection)
	el.contentEditable = true
	el.addEventListener('input', oninput)
	el.addEventListener('blur', onblur)
	if (el.id && el.getAttribute('placeholder')) style.sheet.insertRule(/* css */`#${el.id}[placeholder]:empty::before {
		content: attr(placeholder);
	}`, 0)
	return el
}
function oninput(evt) {
	const el = evt.currentTarget
	changed.add(el)
	//TODO ? el.normalize()? ==> single non empty text node
	while(el.children.length) el.children[0].outerHTML = hasEOL.test(el.textContent) ? '\n' : '\n\n'
}
function onblur(evt) {
	const el = evt.currentTarget
	if (changed.delete(el)) el.dispatchEvent(new Event('change'))
}
