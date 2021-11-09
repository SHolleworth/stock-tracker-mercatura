import { checkResponseForError } from "../../utils/checkResponseForError"
import { base } from "../../utils/baseUrl"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestNews = async (symbol: string) => {
	// throw Error()
	const response = await fetch(`${base}/stock/${symbol}/news/last/3?${token}`)
	return await checkResponseForError(response)
}
