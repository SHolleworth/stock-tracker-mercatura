import { checkResponseForError } from "../../utils/checkResponseForError"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestIntradayPrices = async (symbol : string) => {
	// throw Error()
	const response = await fetch(
		`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`
	)
	return await checkResponseForError(response)
}

export const requestHistoricalPrices = async (symbol : string) => {
	// throw Error()
	const response = await fetch(`${base}/stock/${symbol}/chart/5dm?${token}`)
	return await checkResponseForError(response)
}
