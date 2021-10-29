import { checkResponseForError } from "../../utils/checkResponseForError"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async (symbol) => {
	try {
		const response = await fetch(
			`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
		)
		return await checkResponseForError(response)
	} catch (error) {
		console.error("Error retrieving intraday prices for chart: " + error)
	}
}

export const requestHistoricalPrices = async (symbol) => {
	try {
		const response = await fetch(
			`${base}/stock/${symbol}/chart/5dm?${token}`
		)
		return await checkResponseForError(response)
	} catch (error) {
		console.error("Error retrieving historical prices for chart: " + error)
	}
}
