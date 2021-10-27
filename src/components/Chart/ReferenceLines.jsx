import React from "react"
import { ReferenceLine } from "recharts"
import { colours } from "./colours"

export const ReferenceLines = ({ data }) => {
	const dates = new Set(
		data.map((price) => {
			return price.date
		})
	)
	const dateInterval = Math.floor(data.length / [...dates].length)
	return [...dates].map((date, index) => (
		<ReferenceLine
			key={date}
			x={data[index * dateInterval].minute}
			stroke={colours.daySeparator}
		/>
	))
}
