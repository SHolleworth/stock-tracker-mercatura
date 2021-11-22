import { useEffect, useState } from "react"
import { requestLatestPrice } from "../services"
import STATUS from "../../../utils/statusKeys"
import { Price } from "../types"
import { base_sse as base } from "../../../utils/baseUrl"
// import { tokens } from "../../../../../token"

//Map whole body response object for the type
type PriceState = {
	status: string
	body?: Price
}

const useLivePrice = (symbol: string, updateInterval: 1 | 5) => {
	const [price, setPrice] = useState<PriceState>({ status: STATUS.LOADING })
	const CURL_URL = `${base}stocksUS${updateInterval}Second?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN
	}`
	// const CURL_URL = `${base}stocksUS${updateInterval}Second?symbols=${symbol}&token=${tokens.REAL_TOKEN}`

	useEffect(() => {
		setPrice({ status: STATUS.LOADING })

		const sse = new EventSource(CURL_URL)

		sse.onopen = () => {
			console.log("SSE connection established")
		}

		sse.onmessage = (e) => {
			const data = JSON.parse(e.data)
			if (data.length !== 0) {
				setPrice({
					status: STATUS.ERROR,
					body: JSON.parse(e.data)[0],
				})
			} else {
				console.log("Just got an empty message")
			}
		}

		sse.onerror = async (error) => {
			console.log(error)
			sse.close()
			try {
				const latestPrice = await requestLatestPrice(symbol)
				setPrice({ status: STATUS.RESOLVED, body: latestPrice })
			} catch (error) {
				console.error(error)
				setPrice({ status: STATUS.ERROR })
			}
		}

		return () => sse.close()
	}, [CURL_URL, symbol])

	return price
}

export default useLivePrice
