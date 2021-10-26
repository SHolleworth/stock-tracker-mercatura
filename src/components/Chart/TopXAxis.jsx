import React from "react"
import { Text, XAxis } from "recharts"

const CustomisedXAxisTick = ({ x, dx, y, style, payload }) => {
	console.log(style)
	return (
		<Text x={x + dx} y={y} fontSize={20} style={style}>
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
			dx={daySize / 2 - 25}
		/>
	)
}
