import React from "react"
import { colours } from "./colours"
import { YAxis, Text, ResponsiveContainer, LineChart } from "recharts"

const CustomisedYAxisTick = ({ x, y, payload, style, min }) => {
	let text = "-"
	if ((payload.value - min) % 2 === 0) {
		text = Number.parseFloat(payload.value).toFixed(0)
	}
	return (
		<Text
			x={x}
			y={y - 1}
			fill={colours.keys}
			style={style}
			fontSize={12}
			textAnchor="end"
			verticalAnchor="middle"
		>
			{text}
		</Text>
	)
}

export const StaticYAxis = ({ data, axisProps, min, max }) => {
	return (
		<div className="static-y-axis">
			<ResponsiveContainer height={"100%"} width={60}>
				<LineChart data={data} margin={{ bottom: 40 }}>
					{CustomisedYAxis({ axisProps, min, max })}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

function CustomisedYAxis({ axisProps, min, max, hide }) {
	const { tickSize, tickMargin, tickLine, stroke, strokeWidth, style } =
		axisProps
	//min and max are used to control the height of the graph
	const difference = Math.ceil(max - min)
	let ticks = []
	for (let i = 0; i < difference; i += 1) {
		ticks.push(min + i)
	}

	return (
		<YAxis
			type="number"
			dataKey="average"
			ticks={ticks}
			domain={[min, max]}
			tick={<CustomisedYAxisTick min={min} />}
			tickSize={tickSize}
			tickMargin={tickMargin}
			tickLine={tickLine}
			stroke={stroke}
			strokeWidth={strokeWidth}
			style={style}
			hide={hide}
		></YAxis>
	)
}

export default CustomisedYAxis
