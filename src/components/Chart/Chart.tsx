import React, { Suspense } from "react"
import "./styles.css"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import ErrorPlaceholder  from "./Placeholders/ErrorPlaceholder"
import { useDrag } from "./hooks/useDrag"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
const ChartContent = React.lazy(() => import("./ChatContent"))

const Chart = () => {
	const [chartRef, startDrag] = useDrag()

	return (
		<div
			className="chart__container"
			ref={chartRef}
			onMouseDown={startDrag}
			data-testid="intraday-chart"
		>
			<div className={`chart__inner`}>
				<ErrorBoundary fallback={<ErrorPlaceholder />}>
					<Suspense fallback={<LoadingPlaceholder />}>
						<ChartContent />
					</Suspense>
				</ErrorBoundary>
			</div>
		</div>
	)
}

export default Chart
