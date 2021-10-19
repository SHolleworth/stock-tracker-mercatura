import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts"

const ChartContainer = () => {
  let data = [
    { time: Date.now(), price: 318 },
    { time: Date.now() + 60000, price: 318 },
    { time: Date.now() + 120000, price: 408 },
    { time: Date.now() + 180000, price: 388 },
    { time: Date.now() + 240000, price: 178 },
    { time: Date.now() + 300000, price: 233 },
  ]

  // data = data.sort((a, b) => a.pv - b.pv)

  return <Chart data={data} />
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
      dataKey="price"
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
      type="number"
      dataKey="time"
      domain={[data[0].time, data[data.length - 1].time]}
      axisLine={false}
      tickCount={6}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      stroke={colours.keys}
    />
  )

  const yAxis = (
    <YAxis
      type="number"
      dataKey="price"
      axisLine={false}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
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
