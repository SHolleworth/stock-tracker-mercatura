import React, { useState, useEffect } from "react"
import "./styles.css"
import { getPeers } from "./services"

const TopPeers = () => {
  const [peers, setPeers] = useState({})

  useEffect(() => {
    getPeers("AAPl").then((peerData) => {
      setPeers(peerData)
    })
  }, [])

  return (
    <div className="top_peers">
      <h2>Top Peers</h2>
      <div className="peers__buttons">
        {peers.symbols?.map((symbol) => (
          <button className="peer" key={symbol}>
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TopPeers
