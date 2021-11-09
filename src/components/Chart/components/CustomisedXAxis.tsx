import React from "react"
import { XAxis, Text } from "recharts"
import { colours } from "../colours"
import convert24HourTo12Hour from "../../../utils/convert24HourTo12Hour"
import { axisPropsType } from "../types"

interface CustomisedXAxisPropsType {
	axisProps: axisPropsType
	interval: number
}

interface XAxisTickPropsType {
	x: number
	y: number
	payload: {
		value: string
	}
	style?: React.CSSProperties
}

export const CustomisedXAxisTick = ({
	x,
	y,
	payload,
	style,
}: XAxisTickPropsType) => {
	let time = convert24HourTo12Hour(payload.value)
	if (time === "4:00 PM") {
		time = ""
	}
	let textAnchor: "start" | "middle" = time === "9:30 AM" ? "start" : "middle"
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

function CustomisedXAxis({ axisProps, interval }: CustomisedXAxisPropsType) {
	const { tickSize, tickMargin, tickLine, stroke, style } = axisProps

	return (
		<XAxis
			type="category"
			dataKey="minute"
			tick={({ x, y, payload }: XAxisTickPropsType) => (
				<CustomisedXAxisTick
					x={x}
					y={y}
					payload={payload}
					style={{ ...style }}
				/>
			)}
			axisLine={false}
			interval={interval - 1}
			tickSize={tickSize}
			tickMargin={tickMargin}
			tickLine={tickLine}
			stroke={stroke}
			// strokeWidth={strokeWidth}
			allowDuplicatedCategory={false}
		></XAxis>
	)
}

export default CustomisedXAxis
