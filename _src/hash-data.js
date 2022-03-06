import {encode, decode} from '/_npm/@hugov/shorter-string.js'
import './lang-event.js'

function getHash() {
	const {data='', lang=''} = location.hash.match(hashRE)?.groups ?? {}
	return {data, lang}
}

const H = document.documentElement,
			hashRE = /^#(?<lang>[^/]*)(?:\/(?<data>[^]*))?$/,
			{lang, data} = getHash()

// on page load, the hash if specified sets the language else default to the page language
if (lang) H.lang = lang
else location.hash = `#${ H.lang }/${ data }`

// on subsequent page language change, the hash follows
addEventListener('lang', () => {
	const {lang, data} = getHash()
	if (lang !== H.lang) location.hash = data ? `#${ H.lang }/${data}` : `#${ H.lang }`
})

export default function(/* {lang:string, lang:string} => void */onhash, enc=encode, dec=decode) {
	function onhashchange() {
		const {lang, data} = getHash()
		H.lang = lang
		onhash( {data: !data ? '' : !dec ? data : dec( data ), lang} )
	}
	addEventListener('hashchange', onhashchange)
	onhashchange()

	return ({data='', lang=H.lang}) => {
		location.hash = `#${ lang }/${ enc?.( data ) ?? data }`
	}
}

//const setHash1 = ({data='', lang=H.lang}) => location.hash = data ? `#${ lang }/${ enc ? enc(data) : data }` : `#${ lang }`
//const setHash2 = ({data='', lang=H.lang}) => location.hash = data ? `#${ lang }/${ enc?.(data) ?? data }` : `#${ lang }`
//const setHash3 = ({data='', lang=H.lang}) => location.hash = `#${ lang }/` + data ? `/${ enc?.(data) ?? data }` : `#${ lang }`
