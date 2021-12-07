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
import { useParams } from "react-router-dom"
import { symbolSubject$ } from "../../streams/symbol$"

interface ParamsType {
	stock: string
}

const StockScreen = () => {
	const { symbol, setSymbol } = useSymbol()
	const { stock } = useParams<ParamsType>()

	useEffect(() => {
		if (stock) {
			setSymbol(stock)
			symbolSubject$.next(stock)
		}
	}, [stock])

	if (symbol) {
		return (
			<div className="stock-screen">
				<LogoColumn
					alignment="stretch"
					className="stock-screen__logo"
				/>
				<div className="main-section">
					<StockHeader />
					<Chart />
					<Stats />
				</div>
				<div
					className="news-summary-section"
				>
					<NewsFeed />
					<CompanySummary />
					<TopPeers />
				</div>
				<div className="indice-section">
					<Indices />
				</div>
			</div>
		)
	}
	return null
}

export default StockScreen
