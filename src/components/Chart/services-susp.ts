import { Price } from "./types"
import promiseWrapper from "../../utils/promiseWrapper"
import { requestIntradayPrices, requestPreviousDayPrices } from "./services"

const requestIntradayPriceData = (symbol: string) => {
	const intradayPricePromise = requestIntradayPrices(symbol)

	return {
		prices: promiseWrapper(intradayPricePromise, transformPrices),
	}
}

const requestPreviouDayPriceData = (symbol: string) => {
	const previousDayPricePromise = requestPreviousDayPrices(symbol)

	return {
		prices: promiseWrapper(previousDayPricePromise),
	}
}

export default { requestIntradayPriceData, requestPreviouDayPriceData }

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
