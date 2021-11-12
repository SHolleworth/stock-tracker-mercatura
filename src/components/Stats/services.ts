import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

export async function getKeyStatistics(symbol: string) {
	const QUOTE_URL = `${base}stock/${symbol}/quote?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	const FUNDAMENTALS_URL = `${base}stock/${symbol}/stats?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	const quote = await fetchhAndCheckResponseForError(QUOTE_URL)
	const fundamentals = await fetchhAndCheckResponseForError(FUNDAMENTALS_URL)

	return { ...quote, ...fundamentals }
}
