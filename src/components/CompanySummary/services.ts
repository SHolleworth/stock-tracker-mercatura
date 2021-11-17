import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from "../../../../token"

export const requestCompanyInfo = async (company: string) => {
	const COMPANYINFO_URL = `${base}stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// const COMPANYINFO_URL = `${base}stock/${company}/company?token=${tokens.REAL_TOKEN}`
	// throw Error()
	return await fetchAndCheckResponseForError(COMPANYINFO_URL)
}
