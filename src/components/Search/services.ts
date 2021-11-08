import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = "https://sandbox.iexapis.com/stable/"

export const getSuggestions = async (value : string) => {
	const SEARCH_URL = `${BASE_URL}search/${value}?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	try {
		const response = await fetch(SEARCH_URL)
		return await checkResponseForError(response)
	} catch (error) {
		console.log(error)
	}
}
