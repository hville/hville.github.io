import {encode, decode} from '/_npm/@hugov/shorter-string2.js'
import './lang-event.js'

function getHash() {
	const {data='', lang=''} = location.hash.match(hashRE)?.groups ?? {}
	return {data, lang}
}

const H = document.documentElement,
			hashRE = /^#(?<lang>[^/]*)(?:\/(?<data>[^]*))?$/,
			{lang, data} = getHash()

// CONNECTING VIEW <=> HASH/LANG
// on page load, the hash if specified sets the language else default to the page language
if (lang) H.lang = lang
else location.hash = `#${ H.lang }/${ data }`

// on subsequent page language change, the hash follows
addEventListener('lang', () => {
	const {lang, data} = getHash()
	if (lang !== H.lang) location.hash = data ? `#${ H.lang }/${data}` : `#${ H.lang }`
})

const {port1, port2} = new MessageChannel()
port1.onmessage = async ({data:{data='', lang=H.lang}}) => {
	location.hash = `#${ lang }/${ await encode(data) }`
}
addEventListener('hashchange', async () => {
	const {lang, data} = getHash()
	H.lang = lang
	port1.postMessage({data: !data ? '' : await decode( data ), lang})
})

export default port2
