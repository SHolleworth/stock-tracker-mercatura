import { useState, useEffect } from "react"
import { requestHistoricalPrices, requestIntradayPrices } from "../services"

const removeNulls = (prices) => {
	return prices.filter((price) => price.average)
}

export const useHistoricalPrices = () => {
	const [prices, setPrices] = useState([])
	const [minMax, setMinMax] = useState({ min: 0, max: 0 })

	useEffect(() => {
		requestHistoricalPrices()
			.then((prices) => {
				console.log("Historical Prices:")
				console.log(prices)
				const pricesWithoutNulls = removeNulls(prices)
				const averages = prices.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
				const pricesWithIdentifiableMinutes = pricesWithoutNulls.map(
					(price, index) => {
						return {
							...price,
							minute: index.toString() + " " + price.minute,
						}
					}
				)
				setPrices(pricesWithIdentifiableMinutes)
			})
			.catch((err) => console.error(err))
	}, [])

	return [prices, minMax]
}

export const useIntradayPrices = () => {
	const [prices, setPrices] = useState([])
	const [minMax, setMinMax] = useState({ min: 0, max: 0 })

	useEffect(() => {
		requestIntradayPrices()
			.then((prices) => {
				console.log("Intraday Prices:")
				console.log(prices)
				const pricesWithoutNulls = removeNulls(prices)
				const averages = prices.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
				setPrices(pricesWithoutNulls)
			})
			.catch((err) => console.error(err))
	}, [])

	return [prices, minMax]
}
