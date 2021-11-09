import { checkResponseForError } from "../../utils/checkResponseForError"
import { base } from "../../utils/baseUrl"

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestLatestPrice = async (symbol: string) => {
	const response = await fetch(`${base}/stock/${symbol}/quote?${token}`)
	return await checkResponseForError(response)
}
