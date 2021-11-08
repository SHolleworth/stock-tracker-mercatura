import React from "react"
import { Tooltip } from "recharts"
import convert24HourTo12Hour from "../../../utils/convert24HourTo12Hour"

interface CustomTooltipContentPropsType {
	label: string
	payload: {payload: { average: number }}[]
	active: boolean
}

export const CustomisedToolTip = ({ style } : { style: React.CSSProperties}) => {
	return (
		<Tooltip
			isAnimationActive={false}
			itemStyle={style}
			labelStyle={style}
			content={({ label, payload, active } : CustomTooltipContentPropsType) => (
			<CustomTooltipContent label={label} payload={payload} active={active}/>
			)}
		/>
	)
}

function CustomTooltipContent({ label, payload, active } : CustomTooltipContentPropsType) {
	if (active && payload && payload.length) {
		const hour12Label = convert24HourTo12Hour(label)
		return (
			<div className="custom-tooltip">
				<div className="custom-tooltip__label">{hour12Label}</div>
				<div className="custom-tooltip__content">
					{"Price: "}{" "}
					<span>{+payload[0].payload.average.toFixed(2)}</span>
				</div>
			</div>
		)
	}
	return null
}
