import React, { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Text,
} from "recharts"
import { requestIntradayPrices } from "./services"
import "./styles.css"

const colours = {
  accentPrimary: "#aaabd1",
  coreSecondary2: "#f1f2f2",
  coreSecondary3: "#eaebeb",
  keys: "#7f7f7f",
}

const ChartContainer = () => {
  const [intradayPrices, setIntradayPrices] = useState([])
  // console.clear(0)
  useEffect(() => {
    (async () => {
      try {
        const prices = await requestIntradayPrices()
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

const CustomisedAxisTick = ({ x, y, fill, payload, style, min }) => {
  console.log(payload)
  let text = ""
  if ((payload.value - min) % 2 === 0) {
    text = Number.parseFloat(payload.value).toFixed(0)
  }
  return (
    <Text
      x={x}
      y={y}
      fill={fill}
      style={style}
      textAnchor="end"
      verticalAnchor="middle"
    >
      {text}
    </Text>
  )
}

export const Chart = ({ data }) => {
  const line = (
    <Line
      type="linear"
      dataKey="average"
      dot={false}
      stroke={colours.accentPrimary}
      strokeWidth={3}
    />
  )

  const grid = (
    <CartesianGrid stroke={colours.coreSecondary3} vertical={false} />
  )

  const axisStyle = { fontFamily: "Roboto" }
  const interval = 4
  const xAxis = (
    <XAxis
      type="category"
      dataKey="label"
      axisLine={false}
      interval={interval - 1}
      tickMargin={10}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      stroke={colours.keys}
      style={axisStyle}
    />
  )

  const averages = data.map((el) => el.average)
  const min = Math.floor(Math.min(...averages))
  const max = Math.max(...averages) + 1
  const difference = Math.ceil(max - min)
  let ticks = []
  for (let i = 0; i < difference; i += 0.5) {
    ticks.push(min + i)
  }

  const yAxis = (
    <YAxis
      type="number"
      dataKey="average"
      axisLine={false}
      stroke={colours.keys}
      style={axisStyle}
      ticks={ticks}
      tickMargin={10}
      tick={<CustomisedAxisTick min={min} />}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      domain={[min, max]}
    />
  )

  const referenceAreaArray = new Array(Math.ceil(data.length / interval)).fill(
    ""
  )
  const referenceAreas = referenceAreaArray.map((el, index) => {
    const offset = index * interval
    const x1 = data[offset].label
    const x2 =
      index === referenceAreaArray.length - 1
        ? data[data.length - 1]
        : data[offset + interval].label
    return (
      <ReferenceArea
        key={index}
        x1={x1}
        x2={x2}
        y1={min}
        y2={max}
        fill={index % 2 === 0 ? colours.coreSecondary2 : "rgba(0, 0, 0, 0)"}
      />
    )
  })

  const renderChart = (
    <ResponsiveContainer width="100%" height={800}>
      <LineChart data={data}>
        {referenceAreas}
        {grid}
        {line}
        {xAxis}
        {yAxis}
      </LineChart>
    </ResponsiveContainer>
  )

  return <div>{renderChart}</div>
}

export default ChartContainer
