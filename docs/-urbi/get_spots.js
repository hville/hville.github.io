/*
[out:json][timeout:30];
nw[name=Victoriaville];
(
  nw(around:15000)[amenity~"cafe|pub|bar|restaurant|biergarten"];
  nw(around:15000)[tourism];
);
out;
nw(around:10000,50,7)[~"^(amenity|tourism|building|leisure)$"~"^(cafe|pub|bar|restaurant|biergarten|office|hotel|hostel|park)$"];out;
https://overpass-api.de/api/interpreter?data=nwr%5B%7E%22%5E%28amenity%7Ctourism%7Cbuilding%7Cleisure%29%24%22%7E%22%5E%28cafe%7Cpub%7Cbar%7Crestaurant%7Cbiergarten%7Coffice%7Chotel%7Chostel%7Cpark%29%24%22%5D%28around%3A10000%2C50%2C7%29%3Bout%3B%0A
encodeURIComponent() A-Z a-z 0-9 - _ . ! ~ * ' ( )
*/

const overpass = 'https://overpass-api.de/api/interpreter?',
			filter = encodeURIComponent('[~"^(amenity|tourism|building|leisure)$"~"^(cafe|pub|bar|restaurant|biergarten|office|hotel|hostel|park)$"]')

export default async function(lon,lat,radius=10000) {
	const url = `${overpass}data=[out:json][timeout:30];nw(around:${radius},${lat},${lon})${filter};out;`,
				data = await (await fetch(url)).json(),
				list = []
	for (const {tags:{amenity,tourism,building,leisure}, lat, lon} of data.elements) {
		if (amenity||tourism||building||leisure) list.push({
			amenity,tourism,building,leisure,
			lat, lon
		})
	}
	console.log(list.length)
	return list
}

/*
tag:
9 amenity=bar|cafe|restraurant
7 amenity=biergarten|pub
5 amenity=bank|atm
5 amenity=bbq|bench|drinking_water|water_point|watering_place|toilets
5 amenity=food_court|ice_cream
4 amenity=fast_food
2 amenity=car_wash|fuel|parking|parking_space
0 amenity=bureau_de_change|money_transfer

BUILDING
6 building=retail
3 building=commercial|industrial|office|supermarket|warehouse|government
0 building=hotel


*/
