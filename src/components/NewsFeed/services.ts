import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from '../../../../token';

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestNews = async (symbol: string) => {
	// throw Error()
	return await fetchhAndCheckResponseForError(
		`${base}/stock/${symbol}/news/last/3?${token}`
	)
}
