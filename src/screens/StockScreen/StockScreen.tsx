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
import { useParams } from "react-router-dom"

interface ParamsType {
	stock: string
}

const StockScreen = () => {
	const { symbol, setSymbol } = useSymbol()
	const { stock } = useParams<ParamsType>()
	const { setFocused } = useFocus()

	console.log("STOCKSCREEN SYMBOL: " + symbol)
	console.log("STOCKSCREEN STOCK: " + stock)

	useEffect(() => {
		// if (!stock) {
		// 	history.push(`${ROUTES.base}stock/${symbol}`)
		// }
		// if (stock && !symbol) {
		// 	setSymbol(stock)
		// }
		console.log("AFTER MOUNTING STOCK SCREEN")
		if (stock) {
			setSymbol(stock)
		}
		return () => console.log("AFTER UNMOUNTING STOCK SCREEN")
	}, [])

	if (symbol) {
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
	return null
}

export default StockScreen
