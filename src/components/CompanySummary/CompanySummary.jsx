import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder"

const CompanySummary = () => {
	const [companyInfo, setCompanyInfo] = useState({
		status: "loading",
		body: null,
	})
	const { symbol } = useSymbol()

	useEffect(() => {
		requestCompanyInfo(symbol).then((res) => {
			if (res.status === "resolved") {
				const desc = res.body.description
					.substring(0, 500)
					.concat("...")
				const body = { ...res.body, description: desc }
				setCompanyInfo({ ...res, body })
			} else {
				setCompanyInfo(res)
			}
		})
	}, [symbol])

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
