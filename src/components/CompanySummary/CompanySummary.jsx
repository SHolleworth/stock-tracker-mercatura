import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"

const CompanySummary = () => {
  const [companyInfo, setCompanyInfo] = useState({})
  const { symbol } = useSymbol()

  useEffect(() => {
    requestCompanyInfo(symbol).then((res) => {
      const newDescription = res.description.substring(0, 500)
      setCompanyInfo({ ...res, description: newDescription })
    })
  }, [symbol])

  return Object.keys(companyInfo).length === 0 ? (
    "Loading..."
  ) : (
    <div className="company__summary">
      <h2>Company Summary</h2>
      <div className="company__name">{`${companyInfo.companyName} (${companyInfo.symbol})`}</div>
      <div className="company__website">{companyInfo.website}</div>
      <div className="company__description">{companyInfo.description}</div>
    </div>
  )
}

export default CompanySummary
