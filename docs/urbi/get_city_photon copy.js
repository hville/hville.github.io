const photon = 'http://photon.komoot.io/api/?'
export default async function(city, lang) {
	const url = lang ? `${photon}q=${city}&lang=${lang}` : `${photon}q=${city}`,
				data = await (await fetch(url)).json(),
				list = []
	for (const {geometry:{coordinates}, properties} of data.features) {
		properties[properties.type] = properties.name
		const {district,city,state,country} = properties
		if (district||city) list.push({
			name: [district,city,state,country].filter( v => v ).join(','),
			coordinates
		})
	}
	return list
}
