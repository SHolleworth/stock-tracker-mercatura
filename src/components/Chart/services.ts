import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
import { Price } from "./types"
// import { tokens } from "../../../../token"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`
// const token = `token=${tokens.REAL_TOKEN}`

export const requestIntradayPrices = async (
	symbol: string
): Promise<Price[]> => {
	// throw Error()
	if (!symbol) throw Error("No symbol given.")
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
	)
}

export const requestPreviousDayPrices = async (symbol: string) => {
	if (!symbol) throw Error("No symbol given")
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/previous?${token}`
	)
}

export const requestHistoricalPrices = async (symbol: string) => {
	// throw Error()
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/chart/5dm?${token}`
	)
}
