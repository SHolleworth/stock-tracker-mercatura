import React, { useState, useEffect } from "react"
import "./styles.css"
import { getPeers } from "./services"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholders/Placeholder"
import STATUS from "../../utils/statusKeys"

type PeersType = {
	status: "loading" | "error" | "resolved"
	body?: string[]
}

/* interface PeersType {
	status: "loading" | "error" | "resolved"
	body?: {
		peers: boolean
		symbols: string[]
	}
} */

const TopPeers = () => {
	const [peers, setPeers] = useState<PeersType>({
		status: STATUS.LOADING,
	})
	const { symbol, setSymbol } = useSymbol()

	useEffect(() => {
		setPeers({ status: STATUS.LOADING })
		getPeers(symbol)
			.then((peerData) => {
				setPeers({ status: STATUS.RESOLVED, body: peerData })
			})
			.catch((error) => {
				console.error("Error retrieving top peers data: " + error)
				setPeers({ status: STATUS.ERROR })
			})
	}, [symbol])

	const peersRenderer = () => {
		let content = null
		if (peers.status === STATUS.LOADING) {
			content = <Placeholder />
		} else if (peers.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (peers.status === STATUS.RESOLVED) {
			content = (
				<div className="peers__buttons">
					{peers.body
						? peers.body.map((symbol) => (
								<button
									className="peer"
									key={symbol}
									onClick={() => setSymbol(symbol)}
								>
									{symbol}
								</button>
						  ))
						: null}
				</div>
			)
		} else {
			throw Error(
				"Unrecognised state status in top peers component: " +
					peers.status
			)
		}
		return (
			<div className="top-peers">
				<div className="peers__heading section-heading">Top Peers</div>
				{content}
			</div>
		)
	}

	return peersRenderer()
}

export default TopPeers
