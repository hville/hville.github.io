/*
# A first notebook

This file is plain JavaScript. The text you are reading is a block comment
starting at the beginning of a line, written in **markdown**.

## the module

The code between the texts is the module: what another file gets with
`import {mean} from './example.js'`.
*/

/**
 * arithmetic mean
 * @param {number[]} values
 * @return {number}
 */
export function mean(values) {
	let sum = 0 // a regular comment stays with the code
	for (const v of values) sum += v
	return sum / values.length
}

/*
## a cell

A fenced `js` block in the text is a *cell*. It runs here, in the notebook,
but stays a comment for whoever imports the file.

```js
const primes = [2, 3, 5, 7, 11]
display(mean(primes))
```

Cells and module share one scope, top to bottom: `primes` is still there.

```js
display({primes, mean: mean(primes)})
```

## inputs and outputs

HTML in the text makes the inputs and the places for the results.

<label>n = <output id=count></output> <input id=n type=range min=1 max=50 value=10></label>

The mean of the first n squares is <output id=squares></output>.

```js
function update() {
	const n = +$('#n').value
	$('#count').value = n
	$('#squares').value = mean( Array.from({length: n}, (_, i) => (i+1)**2) ).toFixed(1)
}
$('#n').oninput = update
update()
```

## not run

A fenced block in another language, or with `run=false`, is only shown.

```js run=false
import {mean} from './example.js'
```
*/

export const median = values => {
	const sorted = values.toSorted( (a, b) => a - b ),
				mid = sorted.length >> 1
	return sorted.length % 2 ? sorted[mid] : (sorted[mid-1] + sorted[mid]) / 2
}

/*
```js
display(median(primes))
```
*/
