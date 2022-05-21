const nominatim = 'https://nominatim.openstreetmap.org/search?'//q=rosemont&accept-language=fr
export default async function(city, lang) {
	const url = lang ? `${nominatim}q=${city}&format=json&accept-language=${lang}` : `${nominatim}q=${city}&format=json`,
				data = await (await fetch(url)).json(),
				list = []
	for (const {lat, lon, display_name} of data) {
		list.push({
			name: display_name,
			coordinates: [lon, lat]
		})
	}
	return list
}
