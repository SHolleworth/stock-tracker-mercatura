import { bind } from "@react-rxjs/core";
import { suspendAndFetchFromSymbol } from "../../streams/operators/fetchFromSymbol";
import symbol$ from "../../streams/symbol$";
import { base } from "../../utils/baseUrl";
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`
const url = (symbol: string) =>`${base}stock/${symbol}/news/last/3?${token}`

type Article = {
	headline: string
	url: string
	source: string
	datetime: number
}

const newsFeed$ = symbol$.pipe(suspendAndFetchFromSymbol<Article[]>(url))
const [useNewsFeedStream, ] = bind(newsFeed$)

export default useNewsFeedStream