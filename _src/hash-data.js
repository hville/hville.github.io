import {encode, decode} from '/_npm/@hugov/shorter-string.js'

const dataRE = /(?<=^#[^/]+\/)[^]+/,
			langRE = /(?<=^#)[^/]+/

export default function(/* string => void */onhash, enc=encode, dec=decode) {
	const cb = () => {
		const data = location.hash.match(dataRE)?.[0]
		//TODO empty string condition can eventually be removed
		onhash( !data ? '' : !dec ? data : dec( data ))
	}
	addEventListener('hashchange', cb)
	cb()

	return string => {
		const lang = location.hash.match(langRE)?.[0]
		//TODO empty string condition can eventually be removed
		location.hash = `#${ lang }/${ !string ? '' : !enc ? string : enc( string ) }`
	}
}
