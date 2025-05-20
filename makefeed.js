//TODO https://www.mozilla.org/en-US/foundation/feed-icon-guidelines/

import {resolve as cd} from path
const encodeHTMLEntities = s => s.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';')
/*
	https://www.rfc-editor.org/rfc/rfc4287
	https://kevincox.ca/2022/05/06/rss-feed-best-practices/
		<subtitle>${ esc(site.description) }</subtitle>

	Atom ID: valid URI(RFC 2396) & globally unique & never change, even if the permalink changes
	http://web.archive.org/web/20110502030950/http://www.taguri.org/
	http://web.archive.org/web/20110514113830/http://diveintomark.org/archives/2004/05/28/howto-atom-idnp
		<id>tag:roboleary.net,2022-06-13:/blog/1655074800</id>
		<id>https://schem.ist/</id>
		<id>uuid:bcecded5-97c8-4d24-96f1-6d9e16652434;id=1</id>
		<id>tag:example.org,2003:3</id>
	replace summary with ?
		<content type="html">{{ENTRY.HTML}}</content>
		tag:example.com,2009-01-08:tsqueue:WB20TSQ:23
*/
export default ({name='schemist', url='https://schem.ist/', author='Hugo Villeneuve', entries=[]}) => {
	const now = (new Date()).toISOString()
	if (url.at(-1) !== '/') url += '/'
return /*xml*/`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title><![CDATA[${ name }]]></title>
	<link rel="alternate" href="${ url /* default rel=alternate::permalink */}" />
	<link rel="self" href="${ url /* type="application/atom+xml" */}feed.atom"  />
	<author><name><![CDATA[${ author }]]></name></author>
	<id>${ id ?? url }</id>
	<updated>${ now }</updated>
	<icon>/favicon.svg</icon>

${entries.map(entry => /* xml */`
	<entry>
		<title><![CDATA[${ esc(entry.title) /* Reader Header */}]]></title>
		<link rel="alternate" type="text/html" href="${ cd(siteURL, entry.url) /* default rel=alternate::permalink */}"/>
		<summary type="html"><![CDATA[${ entry.description /* Reader Sub-Header */}]]></summary>
		<id>${ cd(siteURL, entry.url) /* <id>tag:example.org,2003:3.2397</id> */}</id>
		<updated>${ entry.updated ?? now }</updated>
	</entry>`
)}
</feed>`
}
