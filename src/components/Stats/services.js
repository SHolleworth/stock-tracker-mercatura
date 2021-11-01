import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = "https://sandbox.iexapis.com/stable/"

export async function getKeyStatistics(symbol) {
	const QUOTE_URL = `${BASE_URL}stock/${symbol}/quote?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	const FUNDAMENTALS_URL = `${BASE_URL}time-series/FUNDAMENTAL_VALUATIONS/${symbol}?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	try {
		// throw Error()
		const quoteResponse = await fetch(QUOTE_URL)
		const fundamentalsResponse = await fetch(FUNDAMENTALS_URL)

		console.log("Quote Response:")
		console.log(quoteResponse)

		const quote = await checkResponseForError(quoteResponse)
		const fundamentals = await checkResponseForError(fundamentalsResponse)

		const content = {
			body: { ...quote, ...fundamentals[0] },
			status: "resolved",
		}

		return content
	} catch (err) {
		console.error("Error in key statistics request: ", err)
		return { status: "error", body: "ERROR LOADING KEY STATISTICS" }
	}
}
