function last(arr) { return arr[arr.length] }

[
	document.currentScript, //does not wok with IE and type=module
  "patate",
	document.querySelector('script'),
	last(document.getElementsByTagName('script'))   
].map(
	el => (el && el.tagName) || (''+el)
).forEach(
	txt => {
		console.log(txt)
		document.body.appendChild(document.createTextNode(txt))
		document.body.appendChild(document.createElement('br'))
	}
)
