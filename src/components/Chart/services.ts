import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from "../../../../token"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`
// const token = `token=${tokens.REAL_TOKEN}`

export const requestIntradayPrices = async (symbol: string) => {
	// throw Error()
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
	)
}

export const requestHistoricalPrices = async (symbol: string) => {
	// throw Error()
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/chart/5dm?${token}`
	)
}
