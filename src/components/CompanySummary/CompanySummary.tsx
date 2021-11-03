import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"
import statusKeys, { StatusStringType } from "../../utils/statusKeys"

interface Summary {
	symbol : string
	companyName : string
	website : string
	description : string	
}

interface SummaryState {
	status: StatusStringType
	body?: Summary
}

const CompanySummary = () => {
	const [companyInfo, setCompanyInfo] = useState<SummaryState>({
		status: "loading"
	})
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	const requestData = async () => {
		try {
			const response = await requestCompanyInfo(symbol)
			const desc = response.description.substring(0, 500).concat("...")
			const body = { ...response, description: desc }
			setCompanyInfo({ status: statusKeys.RESOLVED, body })
		} catch (error) {
			console.error("Error retreiving company summary data: " + error)
			setCompanyInfo({ status: statusKeys.ERROR, body: null })
		}
	}

	useEffect(() => {
		if (renderFlag === FLAGS.summary) {
			requestData()
		} else if (renderFlag === -1) {
			setCompanyInfo({ status: statusKeys.LOADING, body: null })
		}
	}, [symbol, renderFlag])

	const summaryRenderer = () => {
		let content = null
		if (companyInfo.status === statusKeys.LOADING) {
			content = <Placeholder />
		}
		if (companyInfo.status === statusKeys.ERROR) {
			content = <Placeholder />
		}
		if (companyInfo.status === statusKeys.RESOLVED) {
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
			) : null;
		}
		return (
			<div className="company__summary">
				<h2 className={"section-heading"}>Company Summary</h2>
				{content}
			</div>
		)
	}

	return summaryRenderer()
}

export default CompanySummary
