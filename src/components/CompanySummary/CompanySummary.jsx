import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"

const CompanySummary = () => {
	const [companyInfo, setCompanyInfo] = useState({
		status: "loading",
		body: null,
	})
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	const requestData = async () => {
		try {
			const response = await requestCompanyInfo(symbol)
			const desc = response.description.substring(0, 500).concat("...")
			const body = { ...response, description: desc }
			setCompanyInfo({ status: "resolved", body })
		} catch (error) {
			console.error("Error retreiving company summary data: " + error)
			setCompanyInfo({ status: "error", body: null })
		}
	}

	useEffect(() => {
		if (renderFlag === FLAGS.summary) {
			requestData()
		}
	}, [symbol, renderFlag])

	const summaryRenderer = () => {
		let content = null
		if (companyInfo.status === "loading") {
			content = <Placeholder />
		}
		if (companyInfo.status === "error") {
			content = <Placeholder />
		}
		if (companyInfo.status === "resolved") {
			content = (
				<>
					<div className="company__name">{`${companyInfo.body.companyName} (${companyInfo.body.symbol})`}</div>
					<div className="company__website">
						{companyInfo.body.website}
					</div>
					<div className="company__description">
						{companyInfo.body.description}
					</div>
				</>
			)
		}
		return (
			<div className="company__summary">
				<h2>Company Summary</h2>
				{content}
			</div>
		)
	}

	return summaryRenderer()
}

export default CompanySummary
