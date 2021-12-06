import { useEffect, useState } from "react"
import STATUS, { StatusStringType } from "../../../utils/statusKeys"
import { Price } from "../types"
import { base, base_sse } from "../../../utils/baseUrl"
import { Observable, of } from "rxjs"
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
import promiseWrapper from "../../../utils/promiseWrapper"
import { bind, SUSPENSE } from "@react-rxjs/core"
import symbolSubject$ from "../../../streams/symbol$"

//Map whole body response object for the type
export interface PriceState {
	status: StatusStringType
	body?: Price
}

const fromEventSource = (source: Observable<string>) => {
	return new Observable<Price | typeof SUSPENSE>(subscriber => {
		return source.subscribe({
			next: (symbol) => {
				const CURL_URL = `${base_sse}stocksUS5Second?symbols=${symbol}&token=${
					import.meta.env.VITE_IEX_TOKEN
				}`
				const sse = new EventSource(CURL_URL)

				sse.onmessage = (message) => subscriber.next(JSON.parse(message.data)[0])
				sse.onerror = error => subscriber.error(error)
				sse.onopen = () => console.log("CONNECTED")
			},
			error: error => subscriber.error(error),
			complete: () => subscriber.complete()
		})
	})
}

const prices$ = symbolSubject$.pipe(
	fromEventSource,
	filter(price => price !== undefined),
	catchError((error, caught) => {
		console.error("Error in price stream: " + error)
		return caught
	})
)

const [usePriceStream, _] = bind(prices$)

export default usePriceStream