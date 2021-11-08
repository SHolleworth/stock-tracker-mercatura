import React from "react"
import { Text, XAxis } from "recharts"
import { colours } from "../colours"

const CustomisedXAxisTick = ({ x, dx, y, dy, style, payload }) => {
	return (
		<Text x={x + dx} y={y + dy} fontSize={16} style={style}>
			{payload.value}
		</Text>
	)
}

export const TopXAxis = ({ data, daySize, style, isHidden }) => {
	const dates = new Set(
		data.map((price) => {
			return price.date
		})
	)
	const dateInterval = Math.floor(data.length / [...dates].length)

	return (
		<XAxis
			xAxisId="top"
			type="category"
			dataKey="date"
			tick={<CustomisedXAxisTick />}
			stroke={colours.daySeparator}
			tickLine={!isHidden}
			interval={dateInterval - 1}
			allowDuplicatedCategory={true}
			orientation={"top"}
			style={style}
			axisLine={false}
			dx={daySize / 2 - 70}
			dy={-10}
			margin={{ bottom: 50 }}
		/>
	)
}
