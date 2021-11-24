import React from "react"
import { YAxis, ResponsiveContainer, LineChart, Text } from "recharts"
import { colours } from "../colours"
import { axisPropsType, price } from "../types"

// interface YAxisTickPropsType {
// 	x: number
// 	y: number
// 	payload: {
// 		value: string
// 	}
// 	style: React.CSSProperties
// 	index: number
// }

// const CustomisedYAxisTick = ({ x, y, payload, style, index }: YAxisTickPropsType) => {
// 	let text = "-"
// 	if(index % 4 === 0) {
// 		text = payload.value
// 	}
// 	return (
// 		<Text
// 			x={x}
// 			y={index < 10 ? y : y - 8}
// 			fill={colours.keys}
// 			style={style}
// 			fontSize={14}
// 			textAnchor="end"
// 			verticalAnchor="middle"
// 		>
// 			{text}
// 		</Text>
// 	)
// }

interface YAxisTickPropsType {
	x: number
	y: number
	payload: {
		value: string
	}
	style: React.CSSProperties
}

const CustomisedYAxisTick = ({ x, y, payload, style }: YAxisTickPropsType) => {
	const text = Number.parseFloat(payload.value).toFixed(0)

	return (
		<Text
			x={x}
			y={y - 1}
			fill={colours.keys}
			style={style}
			fontSize={14}
			textAnchor="end"
			verticalAnchor="middle"
		>
			{text}
		</Text>
	)
}

interface CustomisedYAxisPropsType {
	axisProps: axisPropsType
	min: number
	max: number
	hide?: boolean
}

interface StaticYAxisPropsTypes {
	data: price[]
	axisProps: axisPropsType
	min: number
	max: number
}

export const StaticYAxis = ({
	data,
	axisProps,
	min,
	max,
}: StaticYAxisPropsTypes) => {
	return (
		<div className="static-y-axis">
			<ResponsiveContainer height="100%" width={61}>
				<LineChart data={data} margin={{ bottom: 40 }}>
					{CustomisedYAxis({ axisProps, min, max, hide: false })}
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

function CustomisedYAxis({
	axisProps,
	min,
	max,
	hide,
}: CustomisedYAxisPropsType) {
	const { tickSize, tickMargin, tickLine, stroke, style } = axisProps
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
			// ticks={ticks}
			domain={[min, max]}
			tick={({ x, y, payload }: YAxisTickPropsType) => (
				<CustomisedYAxisTick
					x={x}
					y={y}
					payload={payload}
					style={style}
				/>
			)}
			tickSize={tickSize}
			tickMargin={tickMargin}
			tickLine={tickLine}
			stroke={stroke}
			hide={hide}
		></YAxis>
	)
}

export default CustomisedYAxis
