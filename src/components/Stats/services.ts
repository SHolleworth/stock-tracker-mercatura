import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from "../../../../token"

// const token = `token=${tokens.REAL_TOKEN}`;
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export async function getKeyStatistics(symbol: string) {
	const QUOTE_URL = `${base}stock/${symbol}/quote?${token}`

	const FUNDAMENTALS_URL = `${base}stock/${symbol}/stats?${token}`

	const quote = await fetchhAndCheckResponseForError(QUOTE_URL)
	const fundamentals = await fetchhAndCheckResponseForError(FUNDAMENTALS_URL)

	return { ...quote, ...fundamentals }
}
