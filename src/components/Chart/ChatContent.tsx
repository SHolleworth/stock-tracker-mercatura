import { useSymbol } from "../../contexts/SymbolContext"
import { colours } from "./colours"
import { CurrentPriceChart } from "./components/CurrentPriceChart"
import { StaticYAxis } from "./components/CustomisedYAxis"
import { useIntradayPrices, usePreviousClose } from "./hooks/usePrices"


const style: React.CSSProperties = {
	fontFamily: "Roboto",
	userSelect: "none",
	fill: colours.keys,
}

const axisProps = {
	tickSize: 12,
	tickMargin: 10,
	tickLine: { stroke: colours.coreSecondary3 },
	stroke: colours.coreSecondary3,
	strokeWidth: 0.5,
	style: style,
}

const ChartContent = () => {
	const { symbol } = useSymbol()
	const [intradayPrices, minMax] = useIntradayPrices(symbol)
	const previousClose = usePreviousClose(symbol)
	const interval = 3

	if (intradayPrices && minMax) {
		return (
			<>
				<StaticYAxis
					axisProps={axisProps}
					data={intradayPrices}
					max={minMax.max}
					min={minMax.min}
				/>
				<CurrentPriceChart
					axisProps={axisProps}
					currentDayData={intradayPrices}
					previousClose={previousClose ? previousClose : undefined}
					interval={interval}
					max={minMax.max}
					min={minMax.min}
				/>
			</>
		)
	}

	return null
}

export default ChartContent