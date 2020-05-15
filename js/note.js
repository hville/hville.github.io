  //document.querySelectorAll
  var lst = document.querySelectorAll('div.language-javascript>div>pre>code'),
      res = h('span')
  for (var i=0; i<lst.length; ++i) h(lst[i].parentNode.parentNode,
    h('input', {oninput: function(e) { res.textContent = e.target.value }; //}lst[i].textContent}),
    res
	)

	function last(arr) { return arr[arr.length] }

	htmlProps = {
		id: true,
		nodeValue: true,
		textContent: true,
		className: true,
		innerHTML: true,
		tabIndex: true,
		value: true
	}

	function h(tagName) {
		var node = tagName.nodeType === 1 ? tagName : document.createElement(tagName)
		for (var i=1; i<arguments.length; ++i) {
			var arg = arguments[i]
			if (arg != null) {
				if (!arg.constructor || arg.constructor === Object) for (var j=0, ks=Object.keys(arg); j<ks.length; ++j) {
					var key = ks[j],
							val = arg[key]
					if (key === 'style') node.style.cssText = val
					else if (typeof val !== 'string' || htmlProps[key]) node[key] = val
					else node.setAttribute(key, val)
				}
				else {
					if (Array.isArray(arg)) for (var k=0; k<arg.length; ++k) node.appendChild(
						arg[k].nodeType ? arg[k] : document.createTextNode(arg[k])
					)
					else node.appendChild(arg.nodeType ? arg : document.createTextNode(arg))
				}
			}
		}
		return node
	}


	var input = document.createElement('input'),
    result = document.createElement('span'),
    box = document.createElement('div')
input.oninput = function(e) {
  var res = ' ' + (e.currentTarget.value * 2).toPrecision(5)
  result.textContent = res
}
box.appendChild(input)
box.appendChild(result)
document.body.appendChild(box)