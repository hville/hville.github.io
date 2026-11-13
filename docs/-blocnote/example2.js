/*
# A notebook importing another one

`example.js` is a notebook too. Importing it gives its module only:
its texts and cells are comments, they are not shown or run here.
*/

import {mean, median} from './example.js'

export const spread = values => mean(values) - median(values)

/*
```js
const sample = [1, 2, 3, 4, 100]
display(`mean ${ mean(sample) }, median ${ median(sample) }, spread ${ spread(sample) }`)
```

A cell can have its own imports, and wait for a result:

<p id=note>this line can be edited, once the cell has run</p>

```js
import editable from '/_src/editable.js'
editable($('#note'))
display(await new Promise( done => setTimeout(done, 50, 'done waiting') ))
```
*/
