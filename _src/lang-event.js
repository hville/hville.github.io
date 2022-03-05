// <html>
const	H = document.documentElement
const	mo = new MutationObserver( recs => {
	recs.forEach( rec => console.log(`mutant ${rec.oldValue} => ${H.lang} `) )
  H.dispatchEvent(new Event('lang', {bubbles: true}))
})
mo.observe(H, { attributeFilter: [ 'lang' ], attributeOldValue:true })

addEventListener('test onlang', e => console.log(`window ${e.target.lang} ${H.lang}`))
