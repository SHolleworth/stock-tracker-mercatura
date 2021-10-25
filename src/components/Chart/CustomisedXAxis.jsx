import React from "react"
import { XAxis, Text } from "recharts"
import { colours } from "./colours"
import convert24HourTo12Hour from "../../utils/convert24HourTo12Hour"

const CustomisedXAxisTick = ({ x, y, payload, style, index }) => {
	const time = convert24HourTo12Hour(payload.value)
	let textAnchor = index === 0 ? "start" : "middle"
	return (
		<Text
			x={x}
			y={y + 10}
			textAnchor={textAnchor}
			fill={colours.keys}
			style={style}
			fontSize={12}
		>
			{time}
		</Text>
	)
}

function CustomisedXAxis({ axisProps, interval }) {
	const { tickSize, tickMargin, tickLine, stroke, strokeWidth, style } =
		axisProps

	return (
		<XAxis
			type="category"
			dataKey="minute"
			interval={interval - 1}
			tick={<CustomisedXAxisTick />}
			axisLine={false}
			tickSize={tickSize}
			tickMargin={tickMargin}
			tickLine={tickLine}
			stroke={stroke}
			strokeWidth={strokeWidth}
			style={style}
		/>
	)
}

export default CustomisedXAxis
