const dics = {},
			last = null

async function textURL2Array(url) {
	return dics.url || (dics.url = await (await fetch(url)).text())
}

onmessage = async evt => {
	last = evt // cached in case of multiple in-calls
	const [src, url] = evt.data,
				dic = await textURL2Array(url)
	// only process the last message that took place during the fetch
	if (last === evt) postMessage(words.match(new RegExp(src, 'imu')))
}
