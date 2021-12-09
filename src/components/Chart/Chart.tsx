import React, { Suspense } from "react"
import "./styles.css"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import ErrorPlaceholder  from "./Placeholders/ErrorPlaceholder"
import { useDrag } from "./hooks/useDrag"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { Subscribe } from "@react-rxjs/core"
import ChartContent from "./ChatContent"

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
				<Subscribe>
					<ErrorBoundary fallback={<ErrorPlaceholder />}>
						<Suspense fallback={<LoadingPlaceholder />}>
							<ChartContent />
						</Suspense>
					</ErrorBoundary>
				</Subscribe>
			</div>
		</div>
	)
}

export default Chart
