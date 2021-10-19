import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts"
import { requestHistoricalPrices } from "./services"

const ChartContainer = () => {
  const [intradayPrices, setIntradayPrices] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const prices = await requestHistoricalPrices()
        console.log(prices)
        setIntradayPrices(prices)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  if (intradayPrices.length) {
    return (
      <div style={{ padding: "20px 200px 20px 200px" }}>
        <Chart data={intradayPrices} />
      </div>
    )
  } else {
    return null
  }
}

export const Chart = ({ data }) => {
  const colours = {
    accentPrimary: "#aaabd1",
    coreSecondary2: "#f1f2f2",
    coreSecondary3: "#eaebeb",
    keys: "#7f7f7f",
  }

  const line = (
    <Line
      type="linear"
      dataKey="average"
      dot={false}
      stroke={colours.accentPrimary}
      strokeWidth={2}
    />
  )

  const grid = (
    <CartesianGrid stroke={colours.coreSecondary3} vertical={false} />
  )

  const xAxis = (
    <XAxis
      type="category"
      dataKey="minute"
      axisLine={false}
      tickCount={6}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      stroke={colours.keys}
    />
  )
  const averages = data.map((el) => el.average)
  const min = Math.floor(Math.min(...averages))
  const max = Math.ceil(Math.max(...averages))

  console.log(`${min} and ${max}`)

  const yAxis = (
    <YAxis
      type="number"
      dataKey="average"
      axisLine={false}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      domain={[min, max]}
      stroke={colours.keys}
    />
  )

  const renderChart = (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart width={400} height={400} data={data}>
        <ReferenceArea
          x1={Date.now()}
          x2={Date.now() + 60000}
          y1={0}
          y2={600}
          fill={colours.coreSecondary2}
        />
        {line}
        {grid}
        {xAxis}
        {yAxis}
      </LineChart>
    </ResponsiveContainer>
  )

  return <div>{renderChart}</div>
}

export default ChartContainer
