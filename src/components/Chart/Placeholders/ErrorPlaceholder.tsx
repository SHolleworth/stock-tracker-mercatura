import React from "react"

export function ErrorPlaceholder() {
	return (
		<div
			className="chart__placeholder--error"
			data-testid="chart-placeholder"
		>
			<div>Error Loading Chart Data</div>
		</div>
	)
}
