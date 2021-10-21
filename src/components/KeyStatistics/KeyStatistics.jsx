import React, { useState, useEffect } from "react"
import { stats } from "./services"
import { abbreviateNumber, addDollarSign } from "./utils"
import "./styles.css"

const KeyStatistics = () => {
  const [statistics, setStatistics] = useState()

  useEffect(() => {
    stats.then((res) => setStatistics(res))
  }, [])

  return !statistics ? null : (
    <div className="container">
      <div className="stats" data-testid="stats-data">
        <h2 className="stats__title">Key Statistics</h2>
        <ul className="stats__list">
          <li>
            Open <span>{addDollarSign(statistics.open)}</span>
          </li>
          <li>
            High <span>{addDollarSign(statistics.high)}</span>
          </li>
          <li>
            Low <span>{addDollarSign(statistics.low)}</span>
          </li>
          <li>
            Previous Close{" "}
            <span>{addDollarSign(statistics.previousClose)}</span>
          </li>
        </ul>
        <ul className="stats__list">
          <li>
            Day Range{" "}
            <span>
              {addDollarSign(`${statistics.high} - ${statistics.low}`)}
            </span>
          </li>
          <li>
            52 Week Range{" "}
            <span>
              {addDollarSign(
                `${statistics.week52High} - ${statistics.week52Low}`
              )}
            </span>
          </li>
          <li>
            Market Cap <span>{abbreviateNumber(statistics.marketCap)}</span>
          </li>
          <li>
            P/E Ratio <span>{statistics.peRatio}</span>
          </li>
        </ul>
        <ul className="stats__list">
          <li>
            Dividend Yield{" "}
            <span>{statistics.dividendYield.toFixed(2) + "%"}</span>
          </li>
          <li>
            Earnings Per Share{" "}
            <span>
              {addDollarSign(
                statistics.incomeNetPerWabsoSplitAdjusted.toFixed(2)
              )}
            </span>
          </li>
          <li>
            Volume{" "}
            <span>
              {statistics.isUsMarketOpen
                ? statistics.volume
                : "Market is closed"}
            </span>
          </li>
          <li>
            Total Avg. Volume{" "}
            <span>{abbreviateNumber(statistics.avgTotalVolume)}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default KeyStatistics
