import React, { useState, useEffect } from "react"
import { requestCompanyInfo } from "./services"
import "./styles.css"

const CompanySummary = () => {
  const [companyInfo, setCompanyInfo] = useState({})

  useEffect(() => {
    requestCompanyInfo("AAPL").then((res) => {
      const newDescription = res.description.substring(0, 500)
      setCompanyInfo({ ...res, description: newDescription })
    })
  }, [])

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
