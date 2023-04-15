import {frame} from '../_npm/@hugov/inhtml.js'

export default await frame(/*javascript*/`function(init, body, N) {
	if(init || body) {
		try {
			const fcn = new Function( init, body )
			sim = SIM(fcn, {resolution:128})
		} catch (e) {
			sim = null
			return e
		}
	}
	try {
		sim.run(N)
	} catch (e) {
		return e
	}
	//TODO only export data...
	return Object.entries(sim.stats).map( ([n,s]) => [n,s.data])
}`,
/*javascript*/`import SIM from '../_npm/@hugov/correl-range.js'
let sim=null`
)
