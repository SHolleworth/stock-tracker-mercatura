const savedFetch = global.fetch

const STATUS = {
	LOADING: "loading",
	ERROR: "error",
	RESOLVED: "resolved",
}

const fetchMock = (data, status) => {
	return jest.fn(() => {
		console.log("Called")
		const json = () => Promise.resolve(data)
		const response = { ok: null, json: json }
		if (status === STATUS.LOADING) {
			return new Promise()
		} else if (status === STATUS.RESOLVED) {
			response.ok = true
		} else if (status === STATUS.ERROR) {
			response.ok = false
		} else {
			throw Error(
				"Unrecognised status in fetch mock for tests: " + status
			)
		}
		return Promise.resolve(response)
	})
}

const cleanFetch = () => {
	return savedFetch
}

const exports = { fetchMock, cleanFetch, STATUS }

export default exports
