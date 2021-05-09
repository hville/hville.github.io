import langswap from './lang-swap.js'
import {html} from './inhtml.js'

export default langs => {
	const cnt = html(langs.split(' ').map(
		l => `<label><input type=radio name=langswap value=${l}><span>${l}</span></label>`
	).join(' '))

	const	H = document.documentElement,
				L = H.lang.split('-')[0]

	cnt.querySelectorAll('input[name=langswap]').forEach( el => {
		el.onchange = () => H.lang = el.value
		if (el.value === L) el.checked = true
	})

	langswap(langs)
	return cnt
}
