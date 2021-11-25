import { useEffect, useState } from "react"
// import { requestLatestPrice } from "../services"
import STATUS, { StatusStringType } from "../../../utils/statusKeys"
import { Price } from "../types"
import { base_sse as base } from "../../../utils/baseUrl"
import { Observable } from "rxjs"
import { map, filter, catchError } from "rxjs/operators"
// import { tokens } from "../../../../../token"

//Map whole body response object for the type
export interface PriceState {
	status: StatusStringType
	body?: Price
}

function fromEventSource(url: string): Observable<MessageEvent> {
	return new Observable<MessageEvent>((subscriber) => {
		const sse = new EventSource(url)

		sse.onmessage = (e) => subscriber.next(e)
		sse.onerror = (e) => subscriber.error(e)

		return () => sse.close()
	})
}

const useLivePrice = (symbol: string, updateInterval: 1 | 5) => {
	const [price, setPrice] = useState<PriceState>({ status: STATUS.LOADING })
	const CURL_URL = `${base}stocksUS${updateInterval}Second?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// const CURL_URL = `${base}stocksUS${updateInterval}Second?symbols=${symbol}&token=${tokens.REAL_TOKEN}`

	useEffect(() => {
		setPrice({ status: STATUS.LOADING })

		const subscription = fromEventSource(CURL_URL)
			.pipe(
				map((message) => JSON.parse(message.data)[0]),
				filter((data) => data),
				catchError((err, caught) => {
					console.log(err)
					return caught
				})
			)
			.subscribe((data) =>
				setPrice({
					status: STATUS.RESOLVED,
					body: data,
				})
			)

		return () => subscription.unsubscribe()
	}, [CURL_URL, symbol])

	return price
}

export default useLivePrice
