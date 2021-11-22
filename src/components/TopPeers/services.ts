import { base } from "../../utils/baseUrl"
import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export async function getPeers(symbol: string) {
	const PEERS_URL = `${base}stock/${symbol}/relevant?${token}`
	const response = await fetchAndCheckResponseForError(PEERS_URL)
	return response.symbols
}

// const fetchMock = (bool: boolean) => {
// 	const peers = ["QCOM", "MSI", "ERIC", "AMZN", "GOOGL", "MSFT", "DELL"]

// 	const resolveJson = () => {
// 		return Promise.resolve(peers)
// 	}
// 	const resolveResponse = { ok: true, json: resolveJson }
// 	const rejectResponse = { ok: false }
// 	if (bool) {
// 		return Promise.resolve(resolveResponse)
// 	}
// 	return Promise.reject(rejectResponse)
// }
