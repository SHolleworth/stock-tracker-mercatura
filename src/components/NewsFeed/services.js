import { checkResponseForError } from "../../utils/checkResponseForError"

const base = "https://sandbox.iexapis.com/stable/"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestNews = async (symbol) => {
	try {
		const response = await fetch(
			`${base}/stock/dwdwadwadad/news/last/3?${token}`
		)
		return checkResponseForError(response)
	} catch (error) {
		console.error(error)
		return []
	}
}
