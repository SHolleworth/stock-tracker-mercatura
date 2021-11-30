import React from "react"
import { Text, XAxis } from "recharts"
import { colours } from "../colours"
import { Price } from "../types"

interface TopXAxisType {
	data: Price[]
	daySize?: number
	style: React.CSSProperties
	isHidden: boolean
}

interface CustomisedXAxisPropsType {
	x: number
	dx: number
	y: number
	dy: number
	style: React.CSSProperties
	payload: {
		value: number
	}
}
const CustomisedXAxisTick: React.FC<CustomisedXAxisPropsType> = ({
	x,
	dx,
	y,
	dy,
	style,
	payload,
}): React.ReactElement => {
	return (
		<Text x={x + dx} y={y + dy} fontSize={16} style={style}>
			{payload.value}
		</Text>
	)
}

export const TopXAxis: React.FC<TopXAxisType> = ({
	data,
	daySize,
	style,
	isHidden,
}) => {
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
			tick={({ x, y, dx, dy, payload }: CustomisedXAxisPropsType) => (
				<CustomisedXAxisTick
					x={x}
					y={y}
					dx={dx}
					dy={dy}
					payload={payload}
					style={{ ...style, margin: 10 }}
				/>
			)}
			stroke={colours.daySeparator}
			tickLine={!isHidden}
			interval={dateInterval - 1}
			allowDuplicatedCategory={true}
			orientation={"top"}
			axisLine={false}
			dx={daySize ? daySize / 2 - 70 : 0}
			dy={-10}
		/>
	)
}
