import {enc, dec, QUERY} from 'https://cdn.skypack.dev/@hugov/shorter-string@0.1.0'

const dataRE = /(?<=^#[^/]+\/)[^]+/,
			langRE = /(?<=^#)[^/]+/

export default function(onhash /* string => void */) {
	const cb = () => {
		const data = location.hash.match(dataRE)?.[0]
		//TODO empty string condition can eventually be removed
		onhash( data ? dec( data, QUERY) : '')
	}
	addEventListener('hashchange', cb)
	cb()

	return string => {
		const lang = location.hash.match(langRE)?.[0]
		//TODO empty string condition can eventually be removed
		location.hash = `#${ lang }/${ string ? enc( string, QUERY ) : '' }`
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
