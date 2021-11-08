export const checkResponseForError = (response: Response): Promise<any> => {
	return new Promise((resolve, reject) => {
		// throw Error()
		if (response.ok) {
			response.json().then((json) => {
				return resolve(json)
			})
		} else {
			reject(
				`server responded with error code: ${response.status} ${response.statusText}`
			)
		}
	})
}
