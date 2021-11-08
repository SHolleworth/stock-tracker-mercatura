import React, { useState, useEffect } from "react"
import "./styles.css"
import { getPeers } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"
import STATUS from "../../utils/statusKeys"

type PeersType = {
	status: "loading" | "error" | "resolved";
	body: [];
}

const TopPeers = () => {
	const [peers, setPeers] = useState<PeersType>({ status: STATUS.LOADING, body: [] })
	const { symbol, setSymbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	useEffect(() => {
		if (renderFlag === FLAGS.topPeers) {
			getPeers(symbol)
				.then((peerData) => {
					setPeers({ status: STATUS.RESOLVED, body: peerData })
				})
				.catch((error) => {
					console.error("Error retrieving top peers data: " + error)
					setPeers({ status: STATUS.ERROR, body: [] })
				})
		} else if (renderFlag === -1) {
			setPeers({ status: STATUS.LOADING, body: [] })
		}
	}, [symbol, renderFlag])

	const peersRenderer = () => {
		let content = null
		if (peers.status === STATUS.LOADING) {
			content = <Placeholder />
		} else if (peers.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (peers.status === STATUS.RESOLVED) {
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
		} else {
			throw Error(
				"Unrecognised state status in top peers component: " +
					peers.status
			)
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
