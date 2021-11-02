import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = "https://sandbox.iexapis.com/stable/"

export async function getKeyStatistics(symbol) {
	const QUOTE_URL = `${BASE_URL}stock/${symbol}/quote?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	const FUNDAMENTALS_URL = `${BASE_URL}time-series/FUNDAMENTAL_VALUATIONS/${symbol}?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	const quoteResponse = await fetch(QUOTE_URL)
	const fundamentalsResponse = await fetch(FUNDAMENTALS_URL)

	const quote = await checkResponseForError(quoteResponse)
	const fundamentals = await checkResponseForError(fundamentalsResponse)

	return { ...quote, ...fundamentals[0] }
}
