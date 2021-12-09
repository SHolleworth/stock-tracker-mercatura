import { bind } from "@react-rxjs/core";
import { suspended } from "@react-rxjs/utils";
import { catchError, tap } from "rxjs/operators";
import { fetchFromSymbol } from "../../streams/operators/fetchFromSymbol";
import symbol$ from "../../streams/symbol$";
import { base } from "../../utils/baseUrl"

const COMPANYINFO_URL = (symbol: string) => `${base}stock/${symbol}/company?token=${
    import.meta.env.VITE_IEX_TOKEN
}`

interface Summary {
	symbol: string
	companyName: string
	website: string
	description: string
}

const companyInfo$ = symbol$.pipe(
	fetchFromSymbol(COMPANYINFO_URL),
	tap((info) => {
		console.log("Company Info: ")
		console.log(info)
	})
	)

const companyInfoWithoutSuspense$ = symbol$.pipe(fetchFromSymbol(COMPANYINFO_URL), suspended())

const [useCompanyInfoStream, ] = bind(companyInfo$)
const [useCompanyInfoStreamWithoutSuspense, ] = bind(companyInfoWithoutSuspense$, undefined)

export { useCompanyInfoStreamWithoutSuspense }
export default useCompanyInfoStream