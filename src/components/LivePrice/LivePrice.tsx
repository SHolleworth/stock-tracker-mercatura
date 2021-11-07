import React from "react"
import Placeholder from "./Placeholder/Placeholder"
import { useSymbol } from "../../contexts/SymbolContext"
import useLivePrice from "./hooks/useLivePrice"
import "./styles.css"
import downArrow from "../../assets/red-arrow.svg"
import normalArrow from "../../assets/green-arrow.svg"
import STATUS from "../../utils/statusKeys"

const LivePrice = ({ searchFocused } : {searchFocused : boolean}) => {
	const { symbol } = useSymbol()
	const price = useLivePrice(symbol)

	const livePriceRenderer = () => {
		if (price.status === STATUS.LOADING) {
			return <Placeholder />
		} else if (price.status === STATUS.ERROR) {
			return <Placeholder />
		} else if (price.status === STATUS.RESOLVED) {
			return (
				<PriceDisplay
					price={price.body}
					searchFocused={searchFocused}
					className={"price"}
				/>
			)
		} else {
			throw Error(
				"Unrecognised state status in live price component: " +
					price.status
			)
		}
	}

	return livePriceRenderer()
}

interface Price {
	change: number
	latestPrice: number
	changePercent: number
}

type PriceProps = {
	price : Price[];	
	searchFocused: boolean;
	className: string;
}

const PriceDisplay : React.FC<PriceProps> = ({ price, searchFocused, className }) => {
	return price.length > 0 ? (
		<div
			className={`${className}__display 
			${searchFocused ? `{className}__display--hidden` : null}`}
		>
			<span className={className}>{`$${price.latestPrice.toFixed(
				2
			)}`}</span>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<img
					className="arrow"
					src={price.change > 0 ? normalArrow : downArrow}
					alt="down arrow"
				/>
				<span
					className={
						price.change > 0
							? `${className} change positive`
							: `${className} change negative`
					}
				>
					{`${price.change} | ${price.changePercent.toFixed(2)}%`}
				</span>
			</div>
		</div>
	) : null
}

export default LivePrice
