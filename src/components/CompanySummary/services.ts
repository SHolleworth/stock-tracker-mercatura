import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

export const requestCompanyInfo = async (company: string) => {
	const COMPANYINFO_URL = `${base}stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// throw Error()
	return await fetchhAndCheckResponseForError(COMPANYINFO_URL)
}
