import { Observable, pipe } from "rxjs"
import { catchError, filter, map, scan } from "rxjs/operators"
import { Price } from "../../components/LivePrice/types"
import { base_sse } from "../../utils/baseUrl"

const symbolToUrl = pipe(
	map(symbol => 
		`${base_sse}stocksUS1Second?symbols=${symbol}&token=${import.meta.env.VITE_IEX_TOKEN}`)
)

const urlToSSE = pipe(
	scan((acc, newURL: string) => {
		//close previous connection when a new symbol arrives
		acc.close()
		return new EventSource(newURL)
	}, new EventSource(""))
)

const setupSSEListeners = (source: Observable<EventSource>) => {
	return new Observable<Price>(subscriber => {
		return source.subscribe({
			next: sse => sse.onmessage = message => subscriber.next(JSON.parse(message.data)[0]),
			error: error => subscriber.error(error),
			complete: () => subscriber.complete()
		})
	})
}

const filterAndCatchErrors = pipe(
	filter(price => price !== undefined),
	catchError((error, caught) => {
		console.error("Error in price stream: " + error)
		return caught
}))

const streamPricesFromSymbol = pipe(symbolToUrl, urlToSSE, setupSSEListeners, filterAndCatchErrors)

export default streamPricesFromSymbol