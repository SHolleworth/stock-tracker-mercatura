import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = `https://sandbox.iexapis.com/stable`
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestLatestPrice = async (symbol) => {
	const response = await fetch(`${BASE_URL}/stock/${symbol}/quote?${token}`)
	return await checkResponseForError(response)
}
