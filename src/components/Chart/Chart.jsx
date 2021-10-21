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
import convert24HourTo12Hour from "../../utils/convert24HourTo12Hour"
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
      <div className={"chart-container"}>
        <Chart data={intradayPrices} />
      </div>
    )
  } else {
    return null
  }
}

const CustomisedYAxisTick = ({ x, y, fill, payload, style, min }) => {
  let text = "-"
  if ((payload.value - min) % 2 === 0) {
    text = Number.parseFloat(payload.value).toFixed(0)
  }
  return (
    <Text
      x={x}
      y={y}
      fill={colours.keys}
      style={style}
      fontSize={12}
      textAnchor="end"
      verticalAnchor="middle"
    >
      {text}
    </Text>
  )
}

const CustomisedXAxisTick = ({ x, y, payload, style, index }) => {
  const time = convert24HourTo12Hour(payload.value)
  let textAnchor = index === 0 ? "start" : "middle"
  return (
    <Text
      x={x}
      y={y + 10}
      textAnchor={textAnchor}
      fill={colours.keys}
      style={style}
      fontSize={12}
    >
      {time}
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
      strokeWidth={2}
    />
  )

  const grid = (
    <CartesianGrid
      stroke={colours.coreSecondary3}
      vertical={false}
      strokeWidth={1}
    />
  )

  const axisStyle = { fontFamily: "Roboto" }
  const interval = 6
  const xAxis = (
    <XAxis
      type="category"
      dataKey="minute"
      interval={interval - 1}
      axisLine={false}
      tickMargin={10}
      tick={<CustomisedXAxisTick />}
      tickSize={12}
      tickLine={{ stroke: colours.coreSecondary3 }}
      stroke={colours.coreSecondary3}
      strokeWidth={0.5}
      style={axisStyle}
    />
  )

  const averages = data.map((el) => el.average)
  const min = Math.floor(Math.min(...averages))
  const max = Math.max(...averages) + 1
  const difference = Math.ceil(max - min)
  let ticks = []
  for (let i = 0; i < difference; i += 1) {
    ticks.push(min + i)
  }

  const yAxis = (
    <YAxis
      type="number"
      dataKey="average"
      stroke={colours.coreSecondary3}
      style={axisStyle}
      ticks={ticks}
      tickMargin={10}
      tick={<CustomisedYAxisTick min={min} />}
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
    const x1 = data[offset].minute
    const x2 =
      index === referenceAreaArray.length - 1
        ? data[data.length - 1]
        : data[offset + interval].minute
    return (
      <ReferenceArea
        key={index}
        x1={x1}
        x2={x2}
        y1={min}
        y2={max}
        fill={index % 2 !== 0 ? colours.coreSecondary2 : "rgba(0, 0, 0, 0)"}
      />
    )
  })

  const renderChart = (
    <ResponsiveContainer width={"100%"} height={500}>
      <LineChart height={500} width={500} data={data}>
        {referenceAreas}
        {grid}
        {line}
        {xAxis}
        {yAxis}
      </LineChart>
    </ResponsiveContainer>
  )

  return renderChart
}

export default ChartContainer
