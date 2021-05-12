import langswap from './lang-swap.js'

const	H = document.documentElement

customElements.define('data-lang', class extends HTMLElement {
  constructor() {
    super()
		const langs = this.textContent.split(/\s+/)
		this.innerHTML = langs.map(
			l => `<label><input type=radio name=langswap value=${l}><span>${l}</span></label>`
		).join(' ')

		this.querySelectorAll('input').forEach( el => {
			el.onchange = () => H.lang = el.value
			if (el.value === H.lang) el.checked = true
		})

		langswap(langs, lang => this.querySelector(`input[value=${lang}]`).checked = true)
  }
})
