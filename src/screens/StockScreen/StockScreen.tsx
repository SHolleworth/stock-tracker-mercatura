import React, { useEffect } from "react"
import Stats from "../../components/Stats"
import Chart from "../../components/Chart"
import "./styles.css"
import NewsFeed from "../../components/NewsFeed/NewsFeed"
import CompanySummary from "../../components/CompanySummary/CompanySummary"
import StockHeader from "../../components/Search/StockHeader"
import Indices from "../../components/Indices/Indices"
import LogoColumn from "../../components/Logo/LogoColumn"
import TopPeers from "../../components/TopPeers/TopPeers"
import { useSymbol } from "../../contexts/SymbolContext"
import { useFocus } from "../../contexts/FocusContext"
import { useHistory, useParams } from "react-router-dom"

interface ParamsType {
	stock: string
}

const StockScreen = () => {
	const { symbol, setSymbol } = useSymbol()
	const history = useHistory()
	const { stock } = useParams<ParamsType>()
	const { setFocused } = useFocus()

	useEffect(() => {
		if (!stock) {
			history.push("/stock-tracker-mercatura")
		}
		if (stock && !symbol) {
			setSymbol(stock)
		}
	}, [])

	return (
		<>
			<LogoColumn alignment="stretch" />
			<div className="main-section">
				<StockHeader />
				<Chart />
				<Stats />
				<Indices />
			</div>
			<div
				className="news-summary-section"
				onClick={() => setFocused(false)}
			>
				<NewsFeed />
				<CompanySummary />
				<TopPeers />
			</div>
		</>
	)
}

export default StockScreen
