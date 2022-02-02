import {enc, dec, QUERY} from '/_npm/@hugov.shorter-string.js'

const dataRE = /(?<=^#[^/]+\/)[^]+/,
			langRE = /(?<=^#)[^/]+/

export default function(/* string => void */onhash, encode=enc, decode=dec) {
	const cb = () => {
		const data = location.hash.match(dataRE)?.[0]
		//TODO empty string condition can eventually be removed
		onhash( !data ? '' : !decode ? data : decode( data, QUERY))
	}
	addEventListener('hashchange', cb)
	cb()

	return string => {
		const lang = location.hash.match(langRE)?.[0]
		//TODO empty string condition can eventually be removed
		location.hash = `#${ lang }/${ !string ? '' : !encode ? string : encode( string, QUERY ) }`
	}
}

/*
	COMPONENT = BASE62 + "-._~!()'*",
	PCHAR = COMPONENT + '+,;=$&:@',
	QUERY = PCHAR + '/?',
	URI = QUERY + '#'



	FRAGMENT
	QUERY w/o '

?ver#lang/PCHAR


rfc3986 Obsoletes: 2732, 2396, 1808


sent: ?-._~!()'*+,;=$&:@/#-._~!()'*+,;=$&:@? rfc3986 rfc2396
chrome        A
back: ?-._~!() *+,;=$&:@

chrome less  ' -> %27
chrome more %/[\]^`{|}




*/
