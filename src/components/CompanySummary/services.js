import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = `https://sandbox.iexapis.com/stable`

export const requestCompanyInfo = async (company) => {
	const COMPANYINFO_URL = `${BASE_URL}/stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	try {
		const response = await fetch(COMPANYINFO_URL)
		return checkResponseForError(response)
	} catch (error) {
		console.error("Error retrieving company summary: " + error)
		return "No summary available."
	}
}
