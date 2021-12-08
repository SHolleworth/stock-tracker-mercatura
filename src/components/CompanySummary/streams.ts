import { bind } from "@react-rxjs/core";
import { fetchFromSymbol, suspendAndFetchFromSymbol } from "../../streams/operators/fetchFromSymbol";
import { symbolSubject$ } from "../../streams/symbol$";
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

const companyInfo$ = symbolSubject$.pipe(
    suspendAndFetchFromSymbol<Summary>(COMPANYINFO_URL))

const companyInfoWithoutSuspense$ = symbolSubject$.pipe(fetchFromSymbol<Summary>(COMPANYINFO_URL))

const [useCompanyInfoStream, ] = bind(companyInfo$)
const [useCompanyInfoStreamWithoutSuspense, ] = bind(companyInfoWithoutSuspense$, undefined)

export { useCompanyInfoStreamWithoutSuspense }
export default useCompanyInfoStream