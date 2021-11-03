import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { FLAGS, useRenderFlag } from "../../../contexts/RenderFlagContext"
import { requestHistoricalPrices, requestIntradayPrices } from "../services"
import { priceState, price } from '../types';

interface minMaxState {
	min: number
	max: number
}

const removeNulls = (prices : price[]): price[] => {
	return prices.filter((price) => {
		return price.average !== null
	})
}

export const useHistoricalPrices = (symbol : string): [priceState, Dispatch<SetStateAction<priceState>>,  minMaxState] => {
	const [prices, setPrices] = useState<priceState>({ status: "loading", body: [] })
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	const { renderFlag } = useRenderFlag()
	useEffect(() => {
		(async () => {
			if (renderFlag === FLAGS.chart) {
				try {
					const prices = (await requestHistoricalPrices(symbol)) as []

					console.log("Historic prices retrieved: ")
					console.log(prices)

					const pricesWithoutNulls = removeNulls(prices)

					setMinMax(findMinAndMax(pricesWithoutNulls))

					//Add a point to the end of the last day to make it's length consistent with the others
					if (pricesWithoutNulls.length) {
						pricesWithoutNulls.push({
							...pricesWithoutNulls[
								pricesWithoutNulls.length - 1
							],
							minute: "16:00",
						})
					}

					//Minutes must be unique in order for the reference areas to work
					//TODO find a less stupid solution
					const pricesWithIdentifiableMinutes =
						pricesWithoutNulls.map((price, index) => {
							return {
								...price,
								minute: index.toString() + " " + price.minute,
							}
						})

					setPrices({
						status: "resolved",
						body: pricesWithIdentifiableMinutes,
					})
				} catch (error) {
					//an empty array will signal the request failed
					console.error(
						"Error requesting historical prices: " + error
					)
					setPrices({ status: "error" })
				}
			} else if (renderFlag === -1) {
				setPrices({ status: "loading" })
			}
		})()
	}, [symbol, renderFlag])

	return [prices, setPrices, minMax]
}

export const useIntradayPrices = (symbol : string) : [priceState, minMaxState] => {
	const [prices, setPrices] = useState<priceState>({ status: "loading" })
	const [minMax, setMinMax] = useState({
		min: Number.POSITIVE_INFINITY,
		max: Number.NEGATIVE_INFINITY,
	})
	const { renderFlag } = useRenderFlag()

	useEffect(() => {
		(async () => {
			if (renderFlag === FLAGS.chart) {
				try {
					const prices  = (await requestIntradayPrices(symbol)) as []

					console.log("Intraday prices retrieved: ")
					console.log(prices)

					const pricesWithoutNulls = removeNulls(prices)

					setMinMax(findMinAndMax(pricesWithoutNulls))

					setPrices({ status: "resolved", body: pricesWithoutNulls })
				} catch (error) {
					console.error("Error requesting intraday prices: " + error)
					setPrices({ status: "error" })
				}
			} else if (renderFlag === -1) {
				setPrices({ status: "loading" })
			}
		})()
	}, [symbol, renderFlag])

	return [prices, minMax]
}

const findMinAndMax = (prices : price[]) => {
	const averages = prices.map((el) => el.average)
	const min = Math.floor(Math.min(...averages))
	const max = Math.floor(Math.max(...averages) + 1)
	return { min, max }
}
