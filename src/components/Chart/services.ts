import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async (symbol: string) => {
	// throw Error()
	return await fetchhAndCheckResponseForError(
		`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
	)
}

export const requestHistoricalPrices = async (symbol: string) => {
	// throw Error()
	return await fetchhAndCheckResponseForError(
		`${base}/stock/${symbol}/chart/5dm?${token}`
	)
}
