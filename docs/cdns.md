# CDN

## [unpkg.com](unpkg.com)

* `+` automatic publish from npm (as-is) `https://unpkg.com/${package}@${version}/${file}`
* `+` `https://unpkg.com/attodom/el.js` => `https://unpkg.com/attodom@0.13.0/el.js`

## [cdnjs](cdnjs.com)

* `https://cdnjs.cloudflare.com/ajax/libs/${name}/${version}/${file}.js`
* `+` free / opensource
* `-` manual publish

## jsDelivr

* `https://cdn.jsdelivr.net/npm/${name}@${version}/${path}.js`
* `x` free / opensource
* `?` automatic publish

## [jspm.org](jspm.org)

* `-` npm i; esm

## [pika](https://www.pika.dev/cdn)

* search => unpkg

## [raw.githack.com](raw.githack.com)

* `~` `https://rawcdn.githack.com/${user}/${rep}/${version}/${file}.js`
* `+` automatic publish (serve directly from github)
* `~` development only

## [statically.io](statically.io)

* `https://cdn.statically.io/gh/${user}/${rep}/${version}/${file}.js`
* `https://cdn.statically.io/gh/hville/attodom/9e952592/el.js`
