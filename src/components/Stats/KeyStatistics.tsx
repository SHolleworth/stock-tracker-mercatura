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
			<div className="stats__list">
				<div className="stat">
					Open <span>{open ? addDollarSign(open) : "-"}</span>
				</div>

				<div className="stat">
					High <span>{high ? addDollarSign(high) : "-"}</span>
				</div>
				<div className="stat">
					Low <span>{low ? addDollarSign(low) : "-"}</span>
				</div>

				<div className="stat">
					Previous Close{" "}
					<span>
						{previousClose ? addDollarSign(previousClose) : "-"}
					</span>
				</div>
			</div>

			<div className="stats__list middle-section">
				<div className="stat">
					Day Range{" "}
					<span>
						{high ? addDollarSign(`${high} - ${low}`) : "-"}
					</span>
				</div>

				<div className="stat">
					52 Week Range{" "}
					<span>
						{!week52High || !week52Low
							? "-"
							: addDollarSign(`${week52High} - ${week52Low}`)}
					</span>
				</div>

				<div className="stat">
					Market Cap{" "}
					<span>{marketCap ? abbreviateNumber(marketCap) : "-"}</span>
				</div>

				<div className="stat">
					P/E Ratio <span>{peRatio.toFixed(2)}</span>
				</div>
			</div>

			<div className="stats__list">
				<div className="stat">
					Dividend Yield{" "}
					<span>
						{dividendYield ? dividendYield?.toFixed(2) + "%" : "-"}
					</span>
				</div>

				<div className="stat">
					Earnings Per Share{" "}
					<span>
						{ttmEPS ? addDollarSign(ttmEPS?.toFixed(2)) : "-"}
					</span>
				</div>

				<div className="stat">
					Volume{" "}
					<span>{volume ? abbreviateNumber(volume) : "-"}</span>
				</div>

				<div className="stat">
					Total Avg. Volume{" "}
					<span>
						{avgTotalVolume
							? abbreviateNumber(avgTotalVolume)
							: "-"}
					</span>
				</div>
			</div>
		</div>
	)
}

export default KeyStatisticsTable
