import { fetchhAndCheckResponseForError } from "../../utils/fetchAndCheckResponseForError"
import { base } from "../../utils/baseUrl"

export const getSuggestions = async (value: string) => {
	const SEARCH_URL = `${base}search/${value}?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	return await fetchhAndCheckResponseForError(SEARCH_URL)
}

// const url = "https://cloud.iexapis.com/stable/ref-data/symbols?token=pk_74a58d88b01646379d9096c2ae0713e4"
// // const url = "https://sandbox.iexapis.com/stable/ref-data/symbols?token=Tpk_b2d8e00d9a3542d68e4a8767edb9f512"

// const requestCompanySymbolsAndNames = async () => {
//     try {
//         const response = await fetch(url)
//         const symbols = await checkResponseForError(response)
//         console.log(symbols)
//         writeFile("symbols.txt", JSON.stringify(symbols), (err) => {
//             if (err) throw err;
//             console.log('The file has been saved!');
//         })
//     }
//     catch (error) {
//         console.error(error)
//     }
// }
