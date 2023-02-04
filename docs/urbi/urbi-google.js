//https://stackoverflow.com/questions/29328558/change-language-in-google-maps-after-it-was-initialized
//https://stackoverflow.com/questions/7065420/how-can-i-change-the-language-of-google-maps-on-the-run
/*
static map m$2
dynamic map m$2
autocomplete m$2.83
placedetails m$17



17.00 auto+basicdetails session
25.00 17+3+5 nearby
25.00 17+3+5 nearby
25.00 17+3+5 nearby

100 => per call 2000

charging the three Places Data SKUs in addition to the charge for each API request
0 Basic Data
Contact Data
Atmosphere Data


Data SKU usage is cumulative across all services. Your Basic data volume will match the total requests for Find Place + Place Details + Nearby Search + Text Search. Similarly, the Contact and Atmosphere data volumes will be the total requests for those fields across all Places API services.
After contacting google here is the answer: "Places API nearby search can return as many as 60 results, split across three pages. Note that each search counts as a single request against your usage limits. To simply put, accessing additional results via the pagetoken parameter will incur another Places - Nearby Search request (0.032 USD per call)."

So bottom line is, calling the request to the get the next page results is being charged again. the price of the call is the same as the call to the first page results.

*/
import { Loader } from '../_npm/@googlemaps/js-api-loader.js'
//C:\_dev\hville.github.io\docs\_env\api_key-googlemaps.js
import key from '../_env/api_key-googlemaps.js'

const google = await (new Loader({
  apiKey: key,
  libraries: ["places"]
})).load()

//AutoComplete
const inputEl = document.createElement('input'),
			mapEl = document.createElement('div'),
			places = [],
			stats = {}

inputEl.setAttribute('type', 'text')
document.body.appendChild(inputEl)

console.log('key',key)

const autocomplete = new google.maps.places.Autocomplete(inputEl, {
  fields: ["geometry", "place_id", "name"],
  types: ["(regions)"],
})
const placesService = new google.maps.places.PlacesService(mapEl)
autocomplete.addListener("place_changed", evt=>{
	const place = autocomplete.getPlace()
	console.log(evt, place )//
	//pagetoken: next_page_token
	//Returns up to 20 results from a previously run search. Setting a pagetoken parameter will execute a search with the same parameters used previously — all parameters other than pagetoken will be ignored.
	placesService.nearbySearch({
    location: place.geometry.location,
    radius: '7500',
    type: ['lodging']
  }, onPlaces)
})
function onPlaces(results, status, pagination) {
	console.log(results?.length, status, pagination)
	if (results) {
		places.push(...results)
		for (let res of results) for (let typ of res.types) {
			if (stats[typ])  ++stats[typ]
			else stats[typ] = 1
		}
	}
	if (pagination.hasNextPage) pagination.nextPage()
	else {
		console.log(stats)
	}
}


/*
{
    "geometry": {
        "location": {
            "lat": 40.4167754,
            "lng": -3.7037902
        },
        "viewport": {
            "south": 40.31206394740597,
            "west": -3.834161809872056,
            "north": 40.56384473341083,
            "east": -3.524911528167741
        }
    },
    "name": "Madrid",
    "place_id": "ChIJgTwKgJcpQg0RaSKMYcHeNsQ",
    "html_attributions": []
}
[
    {
        "business_status": "OPERATIONAL",
        "geometry": {
            "location": {
                "lat": 40.4195646,
                "lng": -3.699581499999999
            },
            "viewport": {
                "south": 40.4182957197085,
                "west": -3.700943330291502,
                "north": 40.4209936802915,
                "east": -3.698245369708497
            }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
        "icon_background_color": "#909CE1",
        "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
        "name": "Iberostar Las Letras Gran Vía",
        "opening_hours": {
            "open_now": true
        },
        "photos": [
            {
                "height": 1560,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/112467056791679448943\">Iberostar Las Letras Gran Vía</a>"
                ],
                "width": 2400
            }
        ],
        "place_id": "ChIJRY8v6YYoQg0RAnHqn4kltw0",
        "plus_code": {
            "compound_code": "C892+R5 Madrid, Spain",
            "global_code": "8CGRC892+R5"
        },
        "rating": 4.4,
        "reference": "ChIJRY8v6YYoQg0RAnHqn4kltw0",
        "scope": "GOOGLE",
        "types": [
            "spa",
            "lodging",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
        ],
        "user_ratings_total": 1635,
        "vicinity": "Calle Gran Vía, 11, Madrid",
        "html_attributions": []
    }
]
*/

/* const map = new google.maps.Map(document.getElementById("map"), {
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 4
})


RESTAURANT => 9 cafe (15%)
3	bakery: 2
2	bar: 12
3	cafe: 9
?	establishment: 60
?	food: 60
X	meal_delivery: 6
X	meal_takeaway: 12
1	night_club: 1
~	point_of_interest: 60
3	restaurant: 60
?	store: 7

point_of_interest ==> 2 cafe 3%
{
x    "department_store": 2,
x    "car_repair": 5,
x    "home_goods_store": 12,
~    "point_of_interest": 60,
1    "store": 27,
?    "establishment": 60,
1    "grocery_or_supermarket": 5,
1    "pharmacy": 11,
2    "bakery": 4,
?    "food": 20,
?    "health": 16,
1    "restaurant": 12,
1    "bar": 5,
1    "university": 1,
1    "tourist_attraction": 1,
1    "park": 1,
?    "bank": 1,
1    "atm": 1,
x    "finance": 3,
x    "car_dealer": 1,
x    "car_rental": 1,
?    "electronics_store": 8,
2    "cafe": 2,
x    "lodging": 2,
x    "meal_takeaway": 2,
?    "clothing_store": 1,
?    "shoe_store": 1,
?    "gym": 1,
x    "lawyer": 1,
?    "secondary_school": 1,
?    "school": 1,
x    "supermarket": 1,
x    "general_contractor": 1,
1    "bicycle_store": 1
}

ESTABLISHMENT ==> 3 cafe 5%
{
x    "locality": 1,
x    "political": 2,
    "grocery_or_supermarket": 4,
    "pharmacy": 6,
    "bakery": 1,
    "food": 15,
    "health": 12,
    "point_of_interest": 58,
    "store": 25,
    "establishment": 58,
    "university": 1,
    "electronics_store": 6,
    "home_goods_store": 7,
    "car_rental": 1,
    "bank": 1,
    "atm": 1,
    "finance": 3,
    "lodging": 1,
    "cafe": 3,
    "restaurant": 10,
    "bar": 6,
    "secondary_school": 1,
    "school": 1,
    "sublocality_level_1": 1,
    "sublocality": 1,
    "car_repair": 2,
    "hardware_store": 1,
    "furniture_store": 1,
    "dentist": 1,
    "doctor": 1,
    "night_club": 1,
    "laundry": 1,
    "shoe_store": 1,
    "clothing_store": 3,
    "storage": 1,
    "liquor_store": 1,
    "bicycle_store": 2,
    "plumber": 1,
    "general_contractor": 1,
    "beauty_salon": 1,
    "hair_care": 1
}


CAFE ==>
{
    "cafe": 60,
    "restaurant": 30,
    "food": 60,
    "point_of_interest": 60,
    "store": 37,
    "establishment": 60,
    "bar": 3,
    "book_store": 1,
    "bakery": 7,
    "bicycle_store": 1,
    "electronics_store": 1,
    "home_goods_store": 1,
    "grocery_or_supermarket": 3,
    "laundry": 1,
    "art_gallery": 2,
    "gym": 1,
    "health": 1
}


park
{
    "tourist_attraction": 8,
    "park": 60,
    "point_of_interest": 60,
    "establishment": 60
}

tourist_attraction
{
    "tourist_attraction": 19,
    "park": 11,
    "point_of_interest": 19,
    "establishment": 19,
    "museum": 3,
    "zoo": 1,
    "place_of_worship": 2,
    "hindu_temple": 1
}

bakery
{
    "grocery_or_supermarket": 6,
    "pharmacy": 5,
    "bakery": 60,
    "food": 60,
    "health": 5,
    "point_of_interest": 60,
    "store": 60,
    "establishment": 60,
    "cafe": 8,
    "restaurant": 4
}


lodging
{
    "lodging": 37,
    "point_of_interest": 37,
    "establishment": 37,
    "real_estate_agency": 2,
    "travel_agency": 2
}
 */
