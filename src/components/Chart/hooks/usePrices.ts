import { useState, useEffect, Dispatch, SetStateAction } from "react"
import STATUS from "../../../utils/statusKeys"
import {
	requestHistoricalPrices,
	requestIntradayPrices,
	requestPreviousDayPrices,
} from "../services"
import { priceState, price } from "../types"

interface minMaxState {
	min: number
	max: number
}

const removeNulls = (prices: price[]): price[] => {
	return prices.filter((price) => {
		return price.average !== null
	})
}

type HistoricalPrices = [
	priceState,
	Dispatch<SetStateAction<priceState>>,
	minMaxState
]

export const useHistoricalPrices = (symbol: string): HistoricalPrices => {
	const [prices, setPrices] = useState<priceState>({
		status: STATUS.LOADING,
		body: [],
	})
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	useEffect(() => {
		(async () => {
			try {
				const prices = await requestHistoricalPrices(symbol)

				// console.log("Historic prices retrieved: ")
				// console.log(prices)

				const pricesWithoutNulls = removeNulls(prices)

				if (pricesWithoutNulls.length <= 0) {
					throw Error(
						"Error requesting historical prices, all values were null."
					)
				}

				setMinMax(findMinAndMax(pricesWithoutNulls))

				//Add a point to the end of the last day to make it's length consistent with the others
				if (pricesWithoutNulls.length) {
					pricesWithoutNulls.push({
						...pricesWithoutNulls[pricesWithoutNulls.length - 1],
						minute: "16:00",
					})
				}

				//Minutes must be unique in order for the reference areas to work
				//TODO find a less stupid solution
				const pricesWithIdentifiableMinutes = pricesWithoutNulls.map(
					(price, index) => {
						return {
							...price,
							minute: index.toString() + " " + price.minute,
						}
					}
				)

				setPrices({
					status: STATUS.RESOLVED,
					body: pricesWithIdentifiableMinutes,
				})
			} catch (error) {
				//an empty array will signal the request failed
				console.error("Error requesting historical prices: " + error)
				setPrices({ status: STATUS.ERROR })
			}
		})()
	}, [symbol])

	return [prices, setPrices, minMax]
}

export const useIntradayPrices = (
	symbol: string
): [priceState, minMaxState] => {
	const [prices, setPrices] = useState<priceState>({ status: STATUS.LOADING })
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})

	useEffect(() => {
		(async () => {
			setPrices({ status: STATUS.LOADING })
			try {
				const prices = await requestIntradayPrices(symbol)

				const pricesWithoutNulls = removeNulls(prices)

				if (pricesWithoutNulls.length <= 0) {
					throw Error(
						"Error requesting intraday prices, all values were null."
					)
				}

				setMinMax(findMinAndMax(pricesWithoutNulls))

				setPrices({
					status: STATUS.RESOLVED,
					body: pricesWithoutNulls,
				})
			} catch (error) {
				setPrices(() => {
					throw Error("Error requesting intraday prices: " + error)
				})
			}
		})()
	}, [symbol])

	return [prices, minMax]
}

export const usePreviousClose = (symbol: string) => {
	const [previousClose, setPreviousClose] = useState()

	useEffect(() => {
		(async () => {
			try {
				const previousDayPrices = await requestPreviousDayPrices(symbol)
				setPreviousClose(previousDayPrices.close)
			} catch (error) {
				console.error("Error retrieving previous day prices: " + error)
			}
		})()
	}, [])

	return previousClose
}

const findMinAndMax = (prices: price[]) => {
	const averages = prices.map((el) => el.average)
	const minAverage = Math.min(...averages)
	const maxAverage = Math.max(...averages)
	const min = Math.floor(minAverage)
	const max = Math.ceil(maxAverage)
	return { min, max }
}
