import React from "react"
import statusKeys from "../../utils/statusKeys"
import { Placeholder } from "../Chart/Placeholder/Placeholder"
import useLivePrice from "../LivePrice/hooks/useLivePrice"
import { PriceDisplay } from "../LivePrice/LivePrice"
import "./styles.css"

function Indices() {
	return (
		<div className="indices">
			<Index symbol="SPY" className="left" />
			<Index symbol="DIA" className="center" />
			<Index symbol="IWM" className="right" />
		</div>
	)
}

const Index = ({ symbol, className }) => {
	const price = useLivePrice(symbol)

	if (price.status !== statusKeys.RESOLVED) {
		return <Placeholder />
	}

	return (
		<div className={"index " + className}>
			<div className="index__symbol">{symbol}</div>
			<PriceDisplay price={price.body} className="index-price" />
		</div>
	)
}

export default Indices
