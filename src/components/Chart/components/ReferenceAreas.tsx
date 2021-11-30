import React from "react"
import { ReferenceArea } from "recharts"
import { Price } from "../types"
import { colours } from "../colours"

interface ReferenceAreasPropsType {
	interval: number
	min: number
	max: number
	data: Price[]
}

export const ReferenceAreas = ({
	interval,
	min,
	max,
	data,
}: ReferenceAreasPropsType) => {
	//The amount of reference areas is going to be equal to the amount of data points
	//divided by the interval between the x-axis's ticks
	const referenceAreaArray = new Array(
		Math.ceil(data.length / interval)
	).fill("")
	return referenceAreaArray.map((el, index) => {
		const offset = index * interval
		const x1 = data[offset].minute
		const x2 =
			index === referenceAreaArray.length - 1
				? data[data.length - 1].minute
				: data[offset + interval].minute
		return (
			<ReferenceArea
				key={index}
				x1={x1}
				x2={x2}
				y1={min}
				y2={max}
				fill={
					index % 2 !== 0
						? colours.coreSecondary2
						: colours.coreSecondary1
				}
			/>
		)
	})
}
