import React from "react"
import { abbreviateNumber, addDollarSign } from "./utils"
import "./styles.css"

type StatsType = {
		open: number
		high: number
		low: number
		previousClose: number
		week52High: number
		week52Low: number
		marketCap: number
		peRatio: number
		dividendYield: number
		incomeNetPerWabsoSplitAdjusted: number
		volume: number
		avgTotalVolume: number
}

const KeyStatistics = ({
	stats: {
		open,
		high,
		low,
		previousClose,
		week52High,
		week52Low,
		marketCap,
		peRatio,
		dividendYield,
		incomeNetPerWabsoSplitAdjusted,
		volume,
		avgTotalVolume,
	},
} : { stats: StatsType } ) => {
	return (
		<div className="stats-container">
			<ul className="stats__list">
				<li>
					Open <span>{open ? addDollarSign(open) : "-"}</span>
				</li>
				<li>
					High <span>{high ? addDollarSign(high) : "-"}</span>
				</li>
				<li>
					Low <span>{low ? addDollarSign(low) : "-"}</span>
				</li>
				<li>
					Previous Close <span>{addDollarSign(previousClose)}</span>
				</li>
			</ul>
			<ul className="stats__list middle-section">
				<li>
					Day Range{" "}
					<span>
						{high ? addDollarSign(`${high} - ${low}`) : "-"}
					</span>
				</li>
				<li>
					52 Week Range{" "}
					<span>{addDollarSign(`${week52High} - ${week52Low}`)}</span>
				</li>
				<li>
					Market Cap <span>{abbreviateNumber(marketCap)}</span>
				</li>
				<li>
					P/E Ratio <span>{peRatio}</span>
				</li>
			</ul>
			<ul className="stats__list">
				<li>
					Dividend Yield{" "}
					<span>{dividendYield?.toFixed(2) + "%"}</span>
				</li>
				<li>
					Earnings Per Share{" "}
					<span>
						{addDollarSign(
							incomeNetPerWabsoSplitAdjusted?.toFixed(2)
						)}
					</span>
				</li>
				<li>
					Volume <span>{volume ?? "-"}</span>
				</li>
				<li>
					Total Avg. Volume{" "}
					<span>{abbreviateNumber(avgTotalVolume)}</span>
				</li>
			</ul>
		</div>
	)
}

export default KeyStatistics
