import { Price } from "../types"
import { base, base_sse } from "../../../utils/baseUrl"
import { from, Observable, of, pipe, Subject } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import {
	map,
	filter,
	catchError,
	switchMap,
	delay,
	repeat,
	share,
} from "rxjs/operators"
import { bind } from "@react-rxjs/core"
import symbolSubject$ from "../../../streams/symbol$"


const fromEventSource = (source: Observable<string>) => {
	return new Observable<Price>(subscriber => {
		return source.subscribe({
			next: (symbol) => {
				const CURL_URL = `${base_sse}stocksUS1Second?symbols=${symbol}&token=${
					import.meta.env.VITE_IEX_TOKEN
				}`
				const sse = new EventSource(CURL_URL)
				console.log("Created event source from symbol: " + symbol)
				sse.onmessage = (message) => subscriber.next(JSON.parse(message.data)[0])
				sse.onerror = (error: Event) =>  subscriber.error(error)
			},
			error: error => subscriber.error(error),
			complete: () => subscriber.complete()
		})
	})
}

const filterAndCatchErrorsFromLivePrice = pipe(
	fromEventSource,
	filter(price => price !== undefined),
	catchError((error, caught) => {
		console.error("Error in price stream: " + error)
		return caught
	}))

const prices$ = symbolSubject$.pipe(
	filterAndCatchErrorsFromLivePrice
)

const [useSPYPrice, ] = bind(bind(of("SPY"))[1].pipe(filterAndCatchErrorsFromLivePrice)) 
const [useDIAPrice, ] = bind(bind(of("DIA"))[1].pipe(filterAndCatchErrorsFromLivePrice)) 
const [useIWMPrice, ] = bind(bind(of("IWM"))[1].pipe(filterAndCatchErrorsFromLivePrice)) 

const indicePriceStreamMap =  new Map()
indicePriceStreamMap.set("SPY", useSPYPrice)
indicePriceStreamMap.set("DIA", useDIAPrice)
indicePriceStreamMap.set("IWM", useIWMPrice)

export { indicePriceStreamMap }

const [usePriceStream, ] = bind(prices$)

export default usePriceStream