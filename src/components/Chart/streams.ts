import { bind, SUSPENSE } from "@react-rxjs/core"
import { suspended } from "@react-rxjs/utils"
import { of } from "rxjs"
import { filter, map, switchMap, tap } from "rxjs/operators"
import { fetchFromSymbol } from "../../streams/operators/fetchFromSymbol"
import symbol$ from "../../streams/symbol$"
import { base } from "../../utils/baseUrl"
import { Price } from "./types"
const token = `token=${import.meta.env.VITE_IEX_TOKEN}`


const intradayPriceURL = (symbol: string) =>
	`${base}/stock/${symbol}/intraday-prices?${token}&chartInterval=10`

const previousDayPriceURL = (symbol: string) =>
	`${base}/stock/${symbol}/previous?${token}`

const transformPrices = (prices: Price[]) => {
	const pricesWithoutNulls = removeNulls(prices)

	if (pricesWithoutNulls.length <= 0) {
		throw Error("Error requesting historical prices, all values were null.")
	}

	return pricesWithoutNulls
}

const findMinAndMax = (prices: Price[]) => {
	const averages = prices.map((el) => el.average)
	const minAverage = Math.min(...averages)
	const maxAverage = Math.max(...averages)
	const min = Math.floor(minAverage)
	const max = Math.ceil(maxAverage)
	return { min, max }
}

const removeNulls = (prices: Price[]): Price[] => {
	return prices.filter((price) => {
		return price.average !== null
	})
}

const intradayPrices$ = symbol$.pipe(
	fetchFromSymbol(intradayPriceURL),
	tap((prices) => {
		console.log("Prices: ")
		console.log(prices)
	}),
	map(transformPrices),
	map(prices => {
		return {
			prices,
			minMax: findMinAndMax(prices)
		}
	}),
	suspended()
)

const previousClose$ = symbol$.pipe(
	fetchFromSymbol(previousDayPriceURL),
	map(data => data.close),
)

const [useIntradayPriceStream, ] = bind(intradayPrices$)
const [usePreviousCloseStream, ] = bind(previousClose$)

export { useIntradayPriceStream, usePreviousCloseStream }
