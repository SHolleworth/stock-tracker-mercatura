// const BASE_URL = "https://sandbox.iexapis.com/stable/"

import { checkResponseForError } from "../../utils/checkResponseForError"

export async function getPeers(symbol: string) {
	// const PEERS_URL = `${BASE_URL}stock/${symbol}/relevant?token=${
	//   import.meta.env.VITE_IEX_TOKEN
	// }`
	const response = await fetchMock(true)
	return await checkResponseForError(response as Response)
}

const fetchMock = (bool: boolean) => {
	const peers = ["QCOM", "MSI", "ERIC", "AMZN", "GOOGL", "MSFT", "DELL"]

	const resolveJson = () => {
		return Promise.resolve(peers)
	}
	const resolveResponse = { ok: true, json: resolveJson }
	const rejectResponse = { ok: false }
	if (bool) {
		return Promise.resolve(resolveResponse)
	}
	return Promise.reject(rejectResponse)
}
