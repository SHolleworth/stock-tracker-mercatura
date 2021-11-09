import { useEffect, useState } from "react"
import { FLAGS, useRenderFlag } from "../../../contexts/RenderFlagContext"
import { requestLatestPrice } from "../services"
import STATUS from "../../../utils/statusKeys"
import { Price } from "../types"

//Map whole body response object for the type
type PriceState = {
	status: string
	body?: Price
}

const useLivePrice = (symbol: string) => {
	const [price, setPrice] = useState<PriceState>({ status: STATUS.LOADING })
	const CURL_URL = `https://cloud-sse.iexapis.com/stable/stocksUS?symbols=${symbol}&token=${
		import.meta.env.VITE_IEX_TOKEN_ACTUAL
	}`
	const { renderFlag } = useRenderFlag()

	useEffect(() => {
		if (renderFlag > FLAGS.livePrice) {
			const sse = new EventSource(CURL_URL)

			sse.onopen = () => {
				console.log("SSE connection established")
			}

			sse.onmessage = (e) => {
				const data = JSON.parse(e.data)
				if (data.length !== 0) {
					setPrice({
						status: STATUS.RESOLVED,
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
		} else if (renderFlag === -1) {
			setPrice({ status: STATUS.LOADING })
		}
	}, [CURL_URL, symbol, renderFlag])

	return price
}

export default useLivePrice
