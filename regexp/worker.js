onmessage = e => {
	const {dic, data, lang, max} = e.data,
				re = new RegExp(data, 'iu'),
				list = []
	for (let i=0; i<dic.length; ++i) if (re.test(dic[i])) if (list.push(dic[i]) === max) {
		list.push('...')
		break
	}
	postMessage( {list, data, lang} )
}
