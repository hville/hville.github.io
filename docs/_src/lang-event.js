// <html>
const	H = document.documentElement

const	mo = new MutationObserver( recs => {
  H.dispatchEvent(new Event('lang', {bubbles: true}))
})

mo.observe(H, { attributeFilter: [ 'lang' ], attributeOldValue:true })
