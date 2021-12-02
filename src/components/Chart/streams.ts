import { of } from "rxjs"
import { map } from "rxjs/operators"
import promiseWrapper from "../../utils/promiseWrapper"
import { requestIntradayPrices, requestPreviousDayPrices } from "./services"
import { Price } from "./types"

export const requestIntradayPricesStream = (symbol: string) => {
	return of(requestIntradayPrices(symbol)).pipe(
		map((promise) => ({ prices: promiseWrapper(promise, transformPrices) }))
	)
}

export const requestPreviousDayPricesStream = (symbol: string) => {
	return of(requestPreviousDayPrices(symbol)).pipe(
		map((promise) => {
			return {
				prices: promiseWrapper(promise),
			}
		})
	)
}

const transformPrices = (prices: Price[]) => {
	const pricesWithoutNulls = removeNulls(prices)

	if (pricesWithoutNulls.length <= 0) {
		throw Error("Error requesting historical prices, all values were null.")
	}

	return pricesWithoutNulls
}

const removeNulls = (prices: Price[]): Price[] => {
	return prices.filter((price) => {
		return price.average !== null
	})
}
