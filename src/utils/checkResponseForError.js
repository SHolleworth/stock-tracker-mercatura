export const checkResponseForError = async (response) => {
	if (response.ok) {
		return await response.json()
	} else {
		throw new Error(
			`server responded with error code: ${response.status} ${response.statusText}`
		)
	}
}
