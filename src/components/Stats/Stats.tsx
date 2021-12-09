import React, { Suspense } from "react"
import KeyStatisticsTable from "./KeyStatistics"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import { Subscribe } from "@react-rxjs/core"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import useStatisticsStream from "./streams"

const Stats = () => {				
	return (
		<Subscribe>
			<ErrorBoundary fallback={<ErrorPlaceholder />}>
				<Suspense fallback={<LoadingPlaceholder />}>
					<StatContent />
				</Suspense>
			</ErrorBoundary>
		</Subscribe>
	)
}

const StatContent = () => {
	const statistics = useStatisticsStream()
	if(statistics) {
		return (
			<div className="stats">
					<h2 className="section-heading stats__title">Key Statistics</h2>
					<KeyStatisticsTable stats={statistics} />
			</div>
		)
	}
	return null
}

export default Stats