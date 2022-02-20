onmessage = e => {
	const {dic, code, lang, max} = e.data,
				re = new RegExp(code, 'iu'),
				cb = w => re.test(w),
				list = []
	for (let i=0; i<dic.length; ++i) if (re.test(dic[i])) if (list.push(dic[i]) === max) {
		list.push('...')
		break
	}
	postMessage( {list, code, lang} )
}
