import React from "react"
import CustomisedYAxis from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import {
	LineChart,
	Line,
	CartesianGrid,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts"
import { colours } from "./colours"
import { ReferenceAreas } from "./ReferenceAreas"
import { TopXAxis } from "./TopXAxis"
import { CustomisedToolTip } from "./CustomisedToolTip"

const removePrependedIndex = (stringWithIndex) => {
	const spaceIndex = stringWithIndex.indexOf(" ")
	return stringWithIndex.slice(spaceIndex + 1)
}

export const CurrentPriceChart = ({
	axisProps,
	previousDayData,
	currentDayData,
	interval,
	min,
	max,
	daySize,
}) => {
	const cleanPreviousDayData = previousDayData.map((price) => {
		return { ...price, minute: removePrependedIndex(price.minute) }
	})

	const line = (
		<Line
			isAnimationActive={false}
			dataKey="average"
			name="Average"
			dot={false}
			stroke={colours.accentPrimary}
			data={currentDayData}
			strokeWidth={2}
		/>
	)

	const previousDayLine = (
		<Line
			isAnimationActive={false}
			type="linear"
			dataKey="average"
			dot={false}
			stroke={colours.accentPrimary}
			data={cleanPreviousDayData}
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
			<LineChart data={currentDayData} margin={{ right: 0, bottom: 10 }}>
				{ReferenceAreas({
					data: cleanPreviousDayData,
					interval,
					min,
					max,
				})}
				{grid}
				{previousDayLine}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
				{TopXAxis({
					data: currentDayData,
					daySize,
					style: axisProps.style,
				})}
				<ReferenceLine
					y={previousDayData[previousDayData.length - 1].average}
					strokeDasharray={"8 5"}
					strokeWidth={1}
					stroke={colours.accentPrimary}
				/>
				{CustomisedToolTip({ style: axisProps.style })}
			</LineChart>
		</ResponsiveContainer>
	)
}
