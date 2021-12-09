import React, { Suspense } from "react"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import "./styles.css"
import downArrow from "../../assets/red-arrow.svg"
import normalArrow from "../../assets/green-arrow.svg"
import { Price } from "./types"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { bind, Subscribe } from "@react-rxjs/core"
import { symbolSubject$ } from "../../streams/symbol$"
import { streamPricesFromSymbol } from "../../streams/operators/streamPricesFromSymbol"

const LivePrice = ({ searchFocused }: { searchFocused: boolean }) => {
		return (
			<ErrorBoundary fallback={<ErrorPlaceholder />}>
				<Suspense fallback={<LoadingPlaceholder />}>
					<Subscribe>
						<LivePriceContent searchFocused={searchFocused} />
					</Subscribe>
				</Suspense>
			</ErrorBoundary>
		)
}

const [usePriceStream, ] = bind(symbolSubject$.pipe(streamPricesFromSymbol))

const LivePriceContent = ({ searchFocused }: { searchFocused: boolean }) => {
	const price = usePriceStream()

	return (
		<PriceDisplay
			price={price}
			searchFocused={searchFocused}
			className={"price"}
		/>
	)
}

type PriceProps = {
	symbol?: string
	price: Price
	searchFocused: boolean
	className: string
}

export const PriceDisplay: React.FC<PriceProps> = ({
	symbol,
	price,
	searchFocused,
	className,
}) => {
		return (
			<>
				<div
					className={`${className}__display 
					${searchFocused ? `${className}__display--hidden` : null}`}
				>
					<div style={{ display: "flex" }}>
						{symbol ? <div className={`${className}__symbol`}>{symbol}</div> : null }
						<span className={className}>{`$${price.latestPrice.toFixed(
							2
						)}`}</span>
					</div>
					<div className={`${className}__change__wrapper`}>
						<img
							className={`${className}__arrow arrow`}
							src={price.change > 0 ? normalArrow : downArrow}
							alt="down arrow"
						/>
						<span
							className={
								price.change > 0
									? `${className}__change change positive`
									: `${className}__change change negative`
							}
						>
							{`${price.change.toFixed(
								2
							)} | ${price.changePercent.toFixed(2)}%`}
						</span>
					</div>
				</div>
			</>
		)
}

export default LivePrice
