export const fetchAndCheckResponseForError = (url: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch(url).then((response) => {
			// return reject()
			if (response.ok) {
				response.json().then((json) => {
					return resolve(json)
				})
			} else if (response.status === 429) {
				// console.log("Testing recursion")
				fetchAndCheckResponseForError(url).then((response) =>
					resolve(response)
				)
			} else {
				reject(
					`server responded with error code: ${response.status} ${response.statusText}`
				)
			}
		})
	})
}
