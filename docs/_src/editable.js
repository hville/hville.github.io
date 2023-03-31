const hasEOL = /\n$/,
			changed = new WeakSet

const style = document.createElement('style')
document.head.appendChild(style)

export default function(selection) {
	const el = selection.nodeName ? selection : document.querySelector(selection)
	el.contentEditable = true
	el.addEventListener('input', oninput)
	el.addEventListener('blur', onblur)
	if (el.getAttribute('spellcheck') === null) el.spellcheck = false
	if (el.id && el.getAttribute('placeholder')) style.sheet.insertRule(/* css */`#${el.id}[placeholder]:empty::before {
		content: attr(placeholder);
		opacity: 0.5;
	}`, 0)
	el.toString = () => el.textContent
	return el
}
function oninput(evt) {
	const el = evt.currentTarget
	changed.add(el)
	//firefox inserts BR tags and struggles with the first empty lines - can't fix
	//while(el.children.length) el.children[0].outerHTML = '\n'
}
function onblur(evt) {
	const el = evt.currentTarget
	if (changed.delete(el)) el.dispatchEvent(new Event('change'))
}
