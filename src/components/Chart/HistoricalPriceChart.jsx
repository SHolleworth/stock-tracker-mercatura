import React from "react"
import CustomisedYAxis from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import { LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts"
import { colours } from "./colours"
import { ReferenceAreas } from "./ReferenceAreas"
import { TopXAxis } from "./TopXAxis"
import { CustomisedToolTip } from "./CustomisedToolTip"

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
			isAnimationActive={false}
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

	return (
		<ResponsiveContainer height={"100%"} width={daySize * 5}>
			<LineChart
				isAnimationActive={false}
				data={data}
				margin={{ right: 0, bottom: 10 }}
			>
				{ReferenceAreas({ data, interval, min, max })}
				{grid}
				{line}
				<Line dataKey="date" xAxisId="top" />
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max, hide: true })}
				{TopXAxis({ data, daySize, style: axisProps.style })}
				{CustomisedToolTip({ style: axisProps.style })}
			</LineChart>
		</ResponsiveContainer>
	)
}
