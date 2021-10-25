import { useState, useEffect } from "react"
import { requestIntradayPrices } from "../services"

const removeNulls = (prices) => {
	return prices.filter((price) => price.average)
}

export const usePrices = () => {
	const [intradayPrices, setIntradayPrices] = useState([])
	const [minMax, setMinMax] = useState({ min: 0, max: 0 })

	useEffect(() => {
		requestIntradayPrices()
			.then((prices) => {
				const pricesWithoutNulls = removeNulls(prices)
				const averages = prices.map((el) => el.average)
				const min = Math.floor(Math.min(...averages))
				const max = Math.floor(Math.max(...averages) + 1)
				setMinMax({ min, max })
				setIntradayPrices(pricesWithoutNulls)
			})
			.catch((err) => console.error(err))
	}, [])

	return { intradayPrices, minMax }
}
