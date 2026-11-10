//TODO https://www.edoardoscibona.com/exploring-the-npm-registry-api
//TODO https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search
//TODO https://registry.npmjs.org/-/v1/search?text=repository:hville
//TODO https://registry.npmjs.org/untap/
const res = await fetch('http://npmsearch.com/query?q=hugov&fields=author')
console.log(res)
//TODO
