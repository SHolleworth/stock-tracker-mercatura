const mocking = true

const fetchOrMock = async (url, mockFunction) => {
	if (mocking) {
		return await fetch(url)
	} else {
		return await mockFunction()
	}
}

export default fetchOrMock
