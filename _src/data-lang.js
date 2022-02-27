import langswap from './lang-swap.js'

const	H = document.documentElement

customElements.define('data-lang', class extends HTMLElement {
  constructor() {
    super()
		const langs = this.textContent.split(/\s+/)
		this.innerHTML = langs.map(
			l => `<label><input type=radio name=datalang value=${l}><span>${l}</span></label>`
		).join(' ')

		this.querySelectorAll('input').forEach( el => {
			el.onchange = () => H.lang = el.value
			if (el.value === H.lang) el.checked = true
		})

		langswap(langs, lang => this.querySelector(`input[value=${lang}]`).checked = true)
  }
})

/*
TODO

<a data-lang="el=>el.href=`/#${el.lang}`"><i><svg><use href="/icon.svg#dice"></use></svg></i></a>

<data-lang>en fr</data-lang>

<span data-lang>
	<span lang=en><a href="./bwt/index.html#en/exi_hL?ZiKNQ$_GjNm7p@).PdmyIa1Up%T%(+'K_jiUzi!=LTIkOd,C;">Burrows–Wheeler transform (BWT)</a></span>
	<span lang=fr><a href="./bwt/index.html#fr/exi_hL?ZiKNQ$_GjNm7p@).PdmyIa1Up%T%(+'K_jiUzi!=LTIkOd,C;">Transformée de Burrows-Wheeler (BWT)</a></span>
</span>

*/
