onmessage = e => {
	const {regexp, action, string} = e.data,
				{source,flags} = regexp.match(/^\/(?<source>[^]*)\/(?<flags>[^\/]*)$/).groups
	e.data.result = string.replace(new RegExp(source, flags), action)
	postMessage( e.data )
}
