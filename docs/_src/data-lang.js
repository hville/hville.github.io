import langswap from './lang-swap.js'
import './lang-event.js'

const	H = document.documentElement

customElements.define('data-lang', class extends HTMLElement {
  constructor() {
    super()
		const langs = this.textContent.split(/\s+/),
					setRadio = lang => this.querySelector(`[value=${lang}]`).checked = true,
					setPage  = () => langswap(langs)

		this.innerHTML = langs.map(
			l => `<label><input type=radio name=datalang value=${l}><span>${l}</span></label>`
		).join(' ')

		// onchange, fix all elements and change <html lang>
		function onchange(evt) {
			const lang = evt.target.value
			if (H.lang !== lang) H.lang = lang
			setPage(lang)
		}
		this.querySelectorAll('input').forEach( el => el.onchange = onchange )

		// on external <html lang> also align all
		addEventListener('lang', onlang)
		function onlang() {
			const lang = langs.includes(H.lang) ? H.lang : closest(H.lang, langs)
			if (H.lang !== lang) H.lang = lang
			setRadio(lang)
			setPage(lang)
		}

		// at least once
		onlang()
  }
})

function closest(text, choices, pos=0) {
	const res = choices.filter( c => c[pos] === text[pos] )
	return res.length > 1 ? closest(text, choices, ++pos) : (res[0] ?? choices[0])
}
