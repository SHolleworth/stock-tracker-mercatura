import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
import { Price } from "./types"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const priceURL = (symbol: string) =>
	`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`

export const requestIntradayPrices = async (
	symbol: string
): Promise<Price[]> => {
	// throw Error()
	if (!symbol) throw Error("No symbol given.")
	return await fetchAndCheckResponseForError(priceURL(symbol))
}

export const previousDayURL = (symbol: string) =>
	`${base}/stock/${symbol}/previous?${token}`

export const requestPreviousDayPrices = async (symbol: string) => {
	if (!symbol) throw Error("No symbol given")
	return await fetchAndCheckResponseForError(previousDayURL(symbol))
}

export const requestHistoricalPrices = async (symbol: string) => {
	// throw Error()
	return await fetchAndCheckResponseForError(
		`${base}/stock/${symbol}/chart/5dm?${token}`
	)
}
