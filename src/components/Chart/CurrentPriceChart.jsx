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

const removePrependedIndex = (stringWithIndex) => {
	const spaceIndex = stringWithIndex.indexOf(" ")
	return stringWithIndex.slice(spaceIndex + 1)
}

export const CurrentPriceChart = ({
	axisProps,
	previousDayData,
	data,
	interval,
	min,
	max,
	daySize,
}) => {
	const cleanData = previousDayData.map((price) => {
		return { ...price, minute: removePrependedIndex(price.minute) }
	})

	const line = (
		<Line
			type="linear"
			dataKey="average"
			dot={false}
			stroke={colours.accentPrimary}
			data={data}
			strokeWidth={2}
		/>
	)

	const previousDayLine = (
		<Line
			type="linear"
			dataKey="average"
			dot={false}
			stroke={colours.accentPrimary}
			data={cleanData}
			strokeWidth={2}
			hide={true}
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
		Math.ceil(cleanData.length / interval)
	).fill("")
	const referenceAreas = referenceAreaArray.map((el, index) => {
		const offset = index * interval
		const day = Number.parseInt(getDayFromDate(data[0].date))
		const opacityWeight = day % 2 === 0 ? 0 : 0.05
		const x1 = cleanData[offset].minute
		const x2 =
			index === referenceAreaArray.length - 1
				? cleanData[cleanData.length - 1]
				: cleanData[offset + interval].minute
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
		<ResponsiveContainer height={"100%"} width={daySize}>
			<LineChart margin={{ right: 0, bottom: 10 }}>
				{referenceAreas}
				{grid}
				{previousDayLine}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
			</LineChart>
		</ResponsiveContainer>
	)
}
