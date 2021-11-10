import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestLatestPrice = async (symbol: string) => {
	return await fetchhAndCheckResponseForError(
		`${base}/stock/${symbol}/quote?${token}`
	)
}
