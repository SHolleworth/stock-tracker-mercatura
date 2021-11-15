/* import { tokens } from '../../../../token'
import { base } from '../../utils/baseUrl'
import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError" */

// const token = `token=${tokens.REAL_TOKEN}`;

export async function getPeers(symbol: string) {
	// const PEERS_URL = `${base}stock/${symbol}/relevant?${token}`
	const response = await fetchMock(true)
	// return await fetchhAndCheckResponseForError(PEERS_URL)
	return await response.json()
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
