import React, { Suspense } from "react"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
const Index = React.lazy(() => import("./Index"))
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import "./styles.css"

function Indices() {
	return (
		<div className="indices">
			<ErrorBoundary fallback={<ErrorPlaceholder index="SPY" />} >
				<Suspense fallback={<LoadingPlaceholder />}>
					<Index symbol="SPY"/>
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary fallback={<ErrorPlaceholder index="DIA" />} >
				<Suspense fallback={<LoadingPlaceholder />}>
					<Index symbol="DIA" className="index--center"/>
				</Suspense>	
			</ErrorBoundary>
			<ErrorBoundary fallback={<ErrorPlaceholder index="IWM" />} >
				<Suspense fallback={<LoadingPlaceholder />}>
					<Index symbol="IWM" />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}


export default Indices
