import React, { useState, useEffect } from "react"
import KeyStatistics from "./KeyStatistics"
import { stats } from "./services"

const Stats = () => {
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    stats.then((res) => setStatistics(res)).catch((err) => console.error(err))
  }, [])

  return (
    <>
      {Object.keys(statistics).length === 0 ? (
        "Loading..."
      ) : (
        <KeyStatistics stats={statistics} />
      )}
    </>
  )
}

export default Stats