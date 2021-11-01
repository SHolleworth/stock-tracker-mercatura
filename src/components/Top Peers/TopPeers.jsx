import React, { useState, useEffect } from "react"
import "./styles.css"
import { getPeers } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"

const TopPeers = () => {
	const [peers, setPeers] = useState({ status: "loading", body: null })
	const { symbol, setSymbol } = useSymbol()

	useEffect(() => {
		getPeers(symbol)
			.then((peerData) => {
				setPeers({ status: "resolved", body: peerData })
			})
			.catch((error) => {
				setPeers({ status: "error", body: error })
			})
	}, [symbol])

	const peersRenderer = () => {
		let content = null
		if (peers.status === "resolved") {
			content = (
				<div className="peers__buttons">
					{peers.body.map((symbol) => (
						<button
							className="peer"
							key={symbol}
							onClick={() => setSymbol(symbol)}
						>
							{symbol}
						</button>
					))}
				</div>
			)
		} else if (peers.status === ("error" || "loading")) {
			content = <Placeholder />
		}
		return (
			<div className="top_peers">
				<h2 className="peers__title">Top Peers</h2>
				{content}
			</div>
		)
	}

	return peersRenderer()
}

export default TopPeers
