import { useEffect, useState } from "react"
import STATUS, { StatusStringType } from "../../../utils/statusKeys"
import { Price } from "../types"
import { base, base_sse } from "../../../utils/baseUrl"
import { Observable } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import {
	map,
	filter,
	catchError,
	switchMap,
	delay,
	repeat,
} from "rxjs/operators"

//Map whole body response object for the type
export interface PriceState {
	status: StatusStringType
	body?: Price
}

function fromEventSource(url: string): Observable<MessageEvent> {
	return new Observable<MessageEvent>((subscriber) => {
		const sse = new EventSource(url, { withCredentials: false })

		sse.onmessage = (e) => subscriber.next(e)
		sse.onerror = (e) => subscriber.error(e)

		return () => sse.close()
	})
}

const useLivePrice = (symbol: string, updateInterval: 1 | 5) => {
	const [price, setPrice] = useState<PriceState>({ status: STATUS.LOADING })
	const CURL_URL = `${base_sse}stocksUS${updateInterval}Second?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	const QUOTE_URL = `${base}stock/${symbol}/quote?token=${
		import.meta.env.VITE_IEX_TOKEN
	}`

	useEffect(() => {
		setPrice({ status: STATUS.LOADING })

		const subscription = fromEventSource(CURL_URL)
			.pipe(
				map((message) => JSON.parse(message.data)[0]),
				filter((data) => data),
				catchError((err) => {
					console.log(err)
					return fromFetch(QUOTE_URL).pipe(
						delay(2000),
						repeat(),
						switchMap((response) => {
							if (response.ok) {
								return response.json()
							} else {
								throw Error()
							}
						}),
						catchError((err, caught) => {
							return caught
						})
					)
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
