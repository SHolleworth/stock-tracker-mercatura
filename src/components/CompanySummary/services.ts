import { checkResponseForError } from "../../utils/checkResponseForError"

const BASE_URL = `https://sandbox.iexapis.com/stable`

export const requestCompanyInfo = async (company : string) => {
	const COMPANYINFO_URL = `${BASE_URL}/stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// throw Error()
	const response = await fetch(COMPANYINFO_URL)
	return await checkResponseForError(response)
}
