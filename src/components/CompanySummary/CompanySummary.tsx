import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholders/Placeholder"
import STATUS, { StatusStringType } from "../../utils/statusKeys"

interface Summary {
	symbol: string
	companyName: string
	website: string
	description: string
}

interface SummaryState {
	status: StatusStringType
	body?: Summary
}

const CompanySummary = () => {
	const [companyInfo, setCompanyInfo] = useState<SummaryState>({
		status: STATUS.LOADING,
	})
	const { symbol } = useSymbol()

	const requestData = async () => {
		try {
			const response = await requestCompanyInfo(symbol)
			const desc = response.description.substring(0, 500).concat("...")
			const body = { ...response, description: desc }
			setCompanyInfo({ status: STATUS.RESOLVED, body })
		} catch (error) {
			console.error("Error retreiving company summary data: " + error)
			setCompanyInfo({ status: STATUS.ERROR })
		}
	}

	useEffect(() => {
		setCompanyInfo({ status: STATUS.LOADING })
		requestData()
	}, [symbol])

	const summaryRenderer = () => {
		let content = null
		if (companyInfo.status === STATUS.LOADING) {
			content = <Placeholder />
		}
		if (companyInfo.status === STATUS.ERROR) {
			content = <Placeholder />
		}
		if (companyInfo.status === STATUS.RESOLVED) {
			if (companyInfo.body) {
				content = (
					<>
						<div
							className="company__name"
							data-testid="company-name"
						>{`${companyInfo.body.companyName} (${companyInfo.body.symbol})`}</div>
						<a
							href={companyInfo.body.website}
							rel="noreferrer"
							target="_blank"
							className="company__website"
						>
							{companyInfo.body.website}
						</a>
						<div className="company__description">
							{companyInfo.body.description}
						</div>
					</>
				)
			}
		}
		return (
			<div className="company__summary">
				<div className={"section-heading company-summary__heading"}>
					Company Summary
				</div>
				{content}
			</div>
		)
	}

	return summaryRenderer()
}

export default CompanySummary
