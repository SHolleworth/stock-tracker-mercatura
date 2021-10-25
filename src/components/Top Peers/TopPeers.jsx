import React, { useState, useEffect } from "react"
import "./styles.css"
import { getPeers } from "./services"
import { useSymbol } from "../../contexts/UserContext"

const TopPeers = () => {
  const [peers, setPeers] = useState({})
  const { symbol, setSymbol } = useSymbol()

  useEffect(() => {
    getPeers(symbol).then((peerData) => {
      setPeers(peerData)
    })
  }, [symbol])

  return (
    <div className="top_peers">
      <h2>Top Peers</h2>
      <div className="peers__buttons">
        {peers.symbols?.map((symbol) => (
          <button
            className="peer"
            key={symbol}
            onClick={() => setSymbol(symbol)}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopPeers
