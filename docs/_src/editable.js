const hasEOL = /\n$/,
			changed = new WeakSet

document.head
.appendChild(document.createElement('style'))
.sheet.insertRule(/* css */`[contentEditable][placeholder]:empty::before {
	content: attr(placeholder);
	opacity: 0.5;
}`)

export default function(selection) {
	const el = selection.nodeName ? selection : document.querySelector(selection)
	el.setAttribute('contentEditable', 'true')
	if (el.getAttribute('spellcheck') === null) el.spellcheck = false
	el.addEventListener('input', oninput)
	el.addEventListener('blur', onblur)
	el.toString = () => el.textContent
	return el
}
function oninput(evt) {
	const el = evt.currentTarget
	changed.add(el)
	//firefox inserts BR tags and struggles with the first empty lines - can't fix
	//while(el.children.length) el.children[0].outerHTML = '\n'
	// TODO?? // Handle final newlines if (value[value.length - 1] == "\n") value += " "
}
function onblur(evt) {
	const el = evt.currentTarget
	if (changed.delete(el)) el.dispatchEvent(new Event('change'))
}
