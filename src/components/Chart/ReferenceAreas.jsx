import React from "react"
import { getDayFromDate } from "../../utils/getDayFromDate"
import { ReferenceArea } from "recharts"

export const ReferenceAreas = (props) => {
	//The amount of reference areas is going to be equal to the amount of data points
	//divided by the interval between the x-axis's ticks
	const referenceAreaArray = new Array(
		Math.ceil(props.data.length / props.interval)
	).fill("")
	return referenceAreaArray.map((el, index) => {
		const offset = index * props.interval
		const day = Number.parseInt(getDayFromDate(props.data[offset].date))
		const opacityWeight = day % 2 === 0 ? 0 : 0.1
		const x1 = props.data[offset].minute
		const x2 =
			index === referenceAreaArray.length - 1
				? props.data[props.data.length - 1]
				: props.data[offset + props.interval].minute
		return (
			<ReferenceArea
				key={index}
				x1={x1}
				x2={x2}
				y1={props.min}
				y2={props.max}
				fill={
					index % 2 !== 0
						? `rgba(0, 0, 0, ${0.05 + opacityWeight})`
						: `rgba(0, 0, 0, ${0})`
				}
			/>
		)
	})
}
