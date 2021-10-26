import React from "react"
import CustomisedYAxis from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import { LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts"
import { colours } from "./colours"
import { ReferenceAreas } from "./ReferenceAreas"
import { TopXAxis } from "./TopXAxis"

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

	return (
		<ResponsiveContainer height={"100%"} width={daySize}>
			<LineChart data={data} margin={{ right: 0, bottom: 10 }}>
				{ReferenceAreas({ data: cleanData, interval, min, max })}
				{grid}
				{previousDayLine}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
				{TopXAxis({ data, daySize, style: axisProps.style })}
			</LineChart>
		</ResponsiveContainer>
	)
}
