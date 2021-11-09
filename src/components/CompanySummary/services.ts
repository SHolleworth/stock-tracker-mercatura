import { checkResponseForError } from "../../utils/checkResponseForError"
import { base } from "../../utils/baseUrl"

export const requestCompanyInfo = async (company: string) => {
	const COMPANYINFO_URL = `${base}/stock/${company}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// throw Error()
	const response = await fetch(COMPANYINFO_URL)
	return await checkResponseForError(response)
}
