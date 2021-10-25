import React from "react"
import CustomisedYAxis, { StaticYAxis } from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import {
	LineChart,
	Line,
	CartesianGrid,
	ReferenceArea,
	ResponsiveContainer,
} from "recharts"
import { colours } from "./colours"
import "./styles.css"
import { usePrices } from "./hooks/usePrices"

const axisProps = {
	tickSize: 12,
	tickMargin: 10,
	tickLine: { stroke: colours.coreSecondary3 },
	stroke: colours.coreSecondary3,
	strokeWidth: 0.5,
	style: { fontFamily: "Roboto" },
}

const ChartContainer = () => {
	const { intradayPrices, minMax } = usePrices()

	if (intradayPrices.length) {
		return (
			<div className="chart-container">
				<StaticYAxis
					data={intradayPrices}
					interval={3}
					min={minMax.min}
					max={minMax.max}
					axisProps={axisProps}
				/>
				<Chart
					data={intradayPrices}
					interval={3}
					min={minMax.min}
					max={minMax.max}
				/>
			</div>
		)
	} else {
		return null
	}
}

export const Chart = ({ data, interval, min, max }) => {
	const line = (
		<Line
			type="linear"
			dataKey="average"
			dot={false}
			stroke={colours.accentPrimary}
			strokeWidth={2}
		/>
	)

	const grid = (
		<CartesianGrid
			stroke={colours.coreSecondary3}
			vertical={false}
			strokeWidth={1}
		/>
	)

	//The amount of reference areas is going to be equal to the amount of data points
	//divided by the interval between the x-axis's ticks
	const referenceAreaArray = new Array(
		Math.ceil(data.length / interval)
	).fill("")
	const referenceAreas = referenceAreaArray.map((el, index) => {
		const offset = index * interval
		const x1 = data[offset].minute
		const x2 =
			index === referenceAreaArray.length - 1
				? data[data.length - 1]
				: data[offset + interval].minute
		return (
			<ReferenceArea
				key={index}
				x1={x1}
				x2={x2}
				y1={min}
				y2={max}
				fill={
					index % 2 !== 0
						? colours.coreSecondary2
						: "rgba(0, 0, 0, 0)"
				}
			/>
		)
	})

	const renderChart = (
		<ResponsiveContainer height={"100%"} width={2000}>
			<LineChart data={data} margin={{ right: 40, bottom: 10 }}>
				{referenceAreas}
				{grid}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
			</LineChart>
		</ResponsiveContainer>
	)

	return renderChart
}

export default ChartContainer
