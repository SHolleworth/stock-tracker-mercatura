import React from "react"
import CustomisedYAxis from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import {
	LineChart,
	Line,
	CartesianGrid,
	ReferenceArea,
	ResponsiveContainer,
} from "recharts"
import { getDayFromDate } from "../../utils/getDayFromDate"
import { colours } from "./colours"

export const HistoricalPriceChart = ({
	axisProps,
	data,
	interval,
	min,
	max,
	daySize,
}) => {
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
			stroke={`rgba(0, 0, 0, 0.05)`}
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
		const day = Number.parseInt(getDayFromDate(data[offset].date))
		const opacityWeight = day % 2 === 0 ? 0 : 0.05
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
						? `rgba(0, 0, 0, ${0.05 + opacityWeight})`
						: `rgba(0, 0, 0, ${0 + opacityWeight})`
				}
			/>
		)
	})

	return (
		<ResponsiveContainer height={"100%"} width={daySize * 5}>
			<LineChart data={data} margin={{ right: 0, bottom: 10 }}>
				{referenceAreas}
				{grid}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
			</LineChart>
		</ResponsiveContainer>
	)
}
