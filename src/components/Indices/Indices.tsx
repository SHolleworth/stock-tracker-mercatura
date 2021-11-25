import React from "react"
import STATUS from "../../utils/statusKeys"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import useLivePrice from "../LivePrice/hooks/useLivePrice"
import { PriceDisplay } from "../LivePrice/LivePrice"
import "./styles.css"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"

function Indices() {
	return (
		<div className="indices">
			<Index symbol="SPY" className="left" />
			<Index symbol="DIA" className="center" />
			<Index symbol="IWM" className="right" />
		</div>
	)
}

interface IndexPropsType {
	symbol: string
	className: string
}

export const Index = ({ symbol, className }: IndexPropsType) => {
	const price = useLivePrice(symbol, 5)
	let content

	if (price.body) {
		content = (
			<>
				<PriceDisplay
					symbol={symbol}
					price={price.body}
					className="index-price"
					searchFocused={false}
				/>
			</>
		)
	}

	if (price.status === STATUS.LOADING) {
		content = <LoadingPlaceholder />
	} else if (price.status === STATUS.ERROR) {
		content = <ErrorPlaceholder index={symbol} />
	}

	return <div className={"index " + className}>{content}</div>
}

export default Indices
