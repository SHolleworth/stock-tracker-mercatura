import { fetchAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"
// import { tokens } from '../../../../token';

const token = `token=${import.meta.env.VITE_IEX_TOKEN}`

export const requestNews = async (symbol: string) => {
	// throw Error()
	return await fetchAndCheckResponseForError(
		`${base}stock/${symbol}/news/last/3?${token}`
	)

	// return Promise.resolve([
	// 	{
	// 		headline: "HSIUHI Hhihhd iHD ihdIH DSsihd DHisad a",
	// 		url: "test.url.com",
	// 		source: "Heat",
	// 		datetime: 65947320
	// 	},
	// 	{
	// 		headline: "DHHDIUWHd iahdwuhdwaiu DWiwuhD iHWIDhdwIUDH wi",
	// 		url: "test.url.com",
	// 		source: "The Sun",
	// 		datetime: 4324352
	// 	},
	// 	{
	// 		headline: "GDYSGUD I DYSGDWUDudgwuidh waiudh wihwUIGDIUWGD Igwiwagdwihdia HD",
	// 		url: "test.url.com",
	// 		source: "Daily Mail",
	// 		datetime: 432412412242
	// 	}
	// ])
}
