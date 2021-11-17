import React from "react"
import CustomisedYAxis from "./CustomisedYAxis"
import CustomisedXAxis from "./CustomisedXAxis"
import { LineChart, Line, CartesianGrid, ResponsiveContainer } from "recharts"
import { colours } from "../colours"
import { ReferenceAreas } from "./ReferenceAreas"
import { CustomisedToolTip } from "./CustomisedToolTip"
import { axisPropsType, price } from "../types"

interface CurrentPriceChartPropsType {
	axisProps: axisPropsType
	currentDayData: price[]
	interval: number
	min: number
	max: number
}

// const removePrependedIndex = (stringWithIndex : string) => {
// 	const spaceIndex = stringWithIndex.indexOf(" ")
// 	return stringWithIndex.slice(spaceIndex + 1)
// }

export const CurrentPriceChart = ({
	axisProps,
	currentDayData,
	interval,
	min,
	max,
}: CurrentPriceChartPropsType) => {
	const fakeFullDayData = generateFakeFullDayData(currentDayData[0].average)

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

	const fakeFullDayLine = (
		<Line
			isAnimationActive={false}
			dataKey="average"
			data={fakeFullDayData}
			hide={true}
		/>
	)

	const grid = (
		<CartesianGrid
			stroke={colours.coreSecondary3}
			vertical={false}
			strokeWidth={1}
		/>
	)

	return (
		<ResponsiveContainer width="100%">
			<LineChart
				margin={{ right: 0, bottom: 10 }}
				// padding={{ left: 10 }}
			>
				{ReferenceAreas({
					data: fakeFullDayData,
					interval,
					min,
					max,
				})}
				{grid}
				{fakeFullDayLine}
				{line}
				{/* recharts does not like your custom components in it's custom components, so this is a work around */}
				{CustomisedXAxis({ axisProps, interval })}
				{CustomisedYAxis({ axisProps, min, max })}
				{/* <ReferenceLine
					y={fakeFullDayData[fakeFullDayData.length - 1].average}
					strokeDasharray={"8 5"}
					stroke={colours.accentPrimary}
				/> */}
				{CustomisedToolTip({ style: axisProps.style })}
			</LineChart>
		</ResponsiveContainer>
	)
}

const generateFakeFullDayData = (average: number) => {
	return skeletonData.map((data) => {
		data.average = average
		return data
	})
}

const skeletonData = [
	{ average: 20, minute: "09:30", date: "" },
	{ average: 20, minute: "09:40", date: "" },
	{ average: 20, minute: "09:50", date: "" },
	{ average: 20, minute: "10:00", date: "" },
	{ average: 20, minute: "10:10", date: "" },
	{ average: 20, minute: "10:20", date: "" },
	{ average: 20, minute: "10:30", date: "" },
	{ average: 20, minute: "10:40", date: "" },
	{ average: 20, minute: "10:50", date: "" },
	{ average: 20, minute: "11:00", date: "" },
	{ average: 20, minute: "11:10", date: "" },
	{ average: 20, minute: "11:20", date: "" },
	{ average: 20, minute: "11:30", date: "" },
	{ average: 20, minute: "11:40", date: "" },
	{ average: 20, minute: "11:50", date: "" },
	{ average: 20, minute: "12:00", date: "" },
	{ average: 20, minute: "12:10", date: "" },
	{ average: 20, minute: "12:20", date: "" },
	{ average: 20, minute: "12:30", date: "" },
	{ average: 20, minute: "12:40", date: "" },
	{ average: 20, minute: "12:50", date: "" },
	{ average: 20, minute: "13:00", date: "" },
	{ average: 20, minute: "13:10", date: "" },
	{ average: 20, minute: "13:20", date: "" },
	{ average: 20, minute: "13:30", date: "" },
	{ average: 20, minute: "13:40", date: "" },
	{ average: 20, minute: "13:50", date: "" },
	{ average: 20, minute: "14:00", date: "" },
	{ average: 20, minute: "14:10", date: "" },
	{ average: 20, minute: "14:20", date: "" },
	{ average: 20, minute: "14:30", date: "" },
	{ average: 20, minute: "14:40", date: "" },
	{ average: 20, minute: "14:50", date: "" },
	{ average: 20, minute: "15:00", date: "" },
	{ average: 20, minute: "15:10", date: "" },
	{ average: 20, minute: "15:20", date: "" },
	{ average: 20, minute: "15:30", date: "" },
	{ average: 20, minute: "15:40", date: "" },
	{ average: 20, minute: "15:50", date: "" },
]
