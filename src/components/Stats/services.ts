import { checkResponseForError } from "../../utils/checkResponseForError"
import { base } from "../../utils/baseUrl"

export async function getKeyStatistics(symbol: string) {
	const QUOTE_URL = `${base}stock/${symbol}/quote?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	const FUNDAMENTALS_URL = `${base}time-series/FUNDAMENTAL_VALUATIONS/${symbol}?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	const quoteResponse = await fetch(QUOTE_URL)
	const fundamentalsResponse = await fetch(FUNDAMENTALS_URL)

	const quote = await checkResponseForError(quoteResponse)
	const fundamentals = await checkResponseForError(fundamentalsResponse)

	return { ...quote, ...fundamentals[0] }
}
