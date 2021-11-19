import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

export const requestCompanyInfo = async (symbol: string) => {
	if (!symbol) throw Error("No company provided")
	const COMPANYINFO_URL = `${base}stock/${symbol}/company?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	return await fetchAndCheckResponseForError(COMPANYINFO_URL)
}
