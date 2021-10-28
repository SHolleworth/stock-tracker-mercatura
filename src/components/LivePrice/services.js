import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = `https://sandbox.iexapis.com/stable`
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestLatestPrice = async (symbol) => {
	try {
		const response = await fetch(
			`${BASE_URL}/stock/${symbol}/quote?${token}`
		)
		return await checkResponseForError(response)
	} catch (error) {
		console.error("Error retrieving latest price: " + error)
		return "No prices available"
	}
}
