import React, { Suspense } from "react"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import "./styles.css"
import Index from "./Index"
import { Subscribe } from "@react-rxjs/core"

function Indices() {
	return (
		<div className="indices">
			<Subscribe>
				<ErrorBoundary fallback={<ErrorPlaceholder index="SPY" />} >
					<Suspense fallback={<LoadingPlaceholder />}>
							<Index symbol="SPY"/>
					</Suspense>
				</ErrorBoundary>
			</Subscribe>
			
			<Subscribe>
				<ErrorBoundary fallback={<ErrorPlaceholder index="DIA" />} >
					<Suspense fallback={<LoadingPlaceholder />}>
							<Index symbol="DIA" className="index--center"/>
					</Suspense>	
				</ErrorBoundary>
			</Subscribe>

			<Subscribe>
				<ErrorBoundary fallback={<ErrorPlaceholder index="IWM" />} >
					<Suspense fallback={<LoadingPlaceholder />}>
							<Index symbol="IWM" />
					</Suspense>
				</ErrorBoundary>
			</Subscribe>
		</div>
	)
}


export default Indices
