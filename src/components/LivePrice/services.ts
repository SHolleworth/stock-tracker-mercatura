import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from "../../../../token"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`
// const token = `token=${tokens.REAL_TOKEN}`

export const requestLatestPrice = async (symbol: string) => {
	return await fetchhAndCheckResponseForError(
		`${base}/stock/${symbol}/quote?${token}`
	)
}
