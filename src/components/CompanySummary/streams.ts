import { bind } from "@react-rxjs/core";
import { suspended } from "@react-rxjs/utils";
import { switchAll, tap } from "rxjs/operators";
import fetchFromSymbol from "../../streams/operators/fetchFromSymbol";
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
    fetchFromSymbol<Summary>(COMPANYINFO_URL))

const [useCompanyInfoStream, ] = bind(companyInfo$)

export default useCompanyInfoStream