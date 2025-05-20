/*

USE JSON.stringify(obj, null, "  ")
https://registry.npmjs.com/



*/


const timeout = 1000
//https://web.dev/fetch-api-error-handling/
export async function fetcher(base='https://httpbin.org', query='/delay/1') {
	const controller = new AbortController(),
				signal = controller.signal,
				url = new URL(query, base)
	url.searchParams.append('myname', 'myValue') // +'&myname=myValue'
	// Cancel the fetch request in 500ms
	setTimeout(() => controller.abort(), 1000);
	fetch(url, { signal })
	.then( response => {
		if (!response.ok) throw new Error('Network error '+ response.status)
		return JSON.stringify(response.json())
	})
	.catch(error => {
		if (error instanceof TypeError && error.message.includes('API key')) {
			console.error('Invalid API key:', error);
		} else {
			console.error('There was a problem with the Fetch operation:', error);
		}
	})
}
