import React from "react"
import { abbreviateNumber, addDollarSign } from "./utils"
import "./styles.css"
import { KeyStatistics } from "./stats.d"

//Probably change name to StatsTable or smth
interface KeyStatisticsProps {
	stats: KeyStatistics
}

const KeyStatisticsTable: React.FC<KeyStatisticsProps> = ({
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
		ttmEPS,
		volume,
		avgTotalVolume,
	},
}) => {
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
					Previous Close{" "}
					<span>
						{previousClose ? addDollarSign(previousClose) : "-"}
					</span>
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
					<span>
						{!week52High || !week52Low
							? "-"
							: addDollarSign(`${week52High} - ${week52Low}`)}
					</span>
				</li>
				<li>
					Market Cap{" "}
					<span>{marketCap ? abbreviateNumber(marketCap) : "-"}</span>
				</li>
				<li>
					P/E Ratio <span>{peRatio.toFixed(2)}</span>
				</li>
			</ul>
			<ul className="stats__list">
				<li>
					Dividend Yield{" "}
					<span>
						{dividendYield ? dividendYield?.toFixed(2) + "%" : "-"}
					</span>
				</li>
				<li>
					Earnings Per Share{" "}
					<span>
						{ttmEPS ? addDollarSign(ttmEPS?.toFixed(2)) : "-"}
					</span>
				</li>
				<li>
					Volume{" "}
					<span>{volume ? abbreviateNumber(volume) : "-"}</span>
				</li>
				<li>
					Total Avg. Volume{" "}
					<span>
						{avgTotalVolume
							? abbreviateNumber(avgTotalVolume)
							: "-"}
					</span>
				</li>
			</ul>
		</div>
	)
}

export default KeyStatisticsTable
