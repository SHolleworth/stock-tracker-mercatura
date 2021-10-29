import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = `https://sandbox.iexapis.com/stable`

export const requestCompanyInfo = async (company) => {
	const COMPANYINFO_URL = `${BASE_URL}/stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	try {
		// throw Error()
		const response = await fetch(COMPANYINFO_URL)
		const json = await checkResponseForError(response)
		const obj = { status: "resolved", body: json }
		return obj
	} catch (error) {
		console.error("Error retrieving company summary: " + error)
		return { status: "error", body: null }
	}
}
