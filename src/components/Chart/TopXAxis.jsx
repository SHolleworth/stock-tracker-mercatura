import React from "react"
import { Text, XAxis } from "recharts"

const CustomisedXAxisTick = ({ x, dx, y, dy, style, payload }) => {
	return (
		<Text x={x + dx} y={y + dy} fontSize={16} style={style}>
			{payload.value}
		</Text>
	)
}

export const TopXAxis = ({ data, daySize, style }) => {
	const dates = new Set(
		data.map((price) => {
			return price.date
		})
	)
	const dateInterval = Math.floor(data.length / [...dates].length)
	console.log(dateInterval)

	return (
		<XAxis
			xAxisId="top"
			type="category"
			dataKey="date"
			tick={<CustomisedXAxisTick />}
			interval={dateInterval - 1}
			allowDuplicatedCategory={true}
			orientation={"top"}
			style={style}
			axisLine={false}
			dx={daySize / 2 - 70}
			dy={-10}
		/>
	)
}
