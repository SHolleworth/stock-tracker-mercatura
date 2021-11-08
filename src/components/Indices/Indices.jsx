import React from "react"
import statusKeys from "../../utils/statusKeys"
import Placeholder from "./Placeholder/Placeholder"
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

	let content = (
		<>
			<div className="index__symbol">{symbol}</div>
			<PriceDisplay price={price.body} className="index-price" />
		</>
	)

	if (price.status !== statusKeys.RESOLVED) {
		content = <Placeholder />
	}

	return <div className={"index " + className}>{content}</div>
}

export default Indices
