<<<<<<< HEAD
import React, { useEffect, useState } from "react"
=======
import React from "react"
>>>>>>> 24253b5 (feat(Chart): began building static version of the main chart)
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
<<<<<<< HEAD
  Text,
} from "recharts"
import { requestIntradayPrices } from "./services"
import convert24HourTo12Hour from "../../utils/convert24HourTo12Hour"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"

const colours = {
  accentPrimary: "#aaabd1",
  coreSecondary2: "#f1f2f2",
  coreSecondary3: "#eaebeb",
  keys: "#7f7f7f",
}

const removeNulls = (prices) => {
  return prices.filter((price) => price.average)
}

const ChartContainer = () => {
  const [intradayPrices, setIntradayPrices] = useState([])
  const { symbol } = useSymbol()

  useEffect(() => {
    requestIntradayPrices(symbol)
      .then((prices) => {
        const pricesWithoutNulls = removeNulls(prices)
        setIntradayPrices(pricesWithoutNulls)
      })
      .catch((err) => console.error(err))
  }, [symbol])

  if (intradayPrices.length) {
    return (
      <div className="chart-container">
        <Chart data={intradayPrices} interval={4} />
      </div>
    )
  } else {
    return null
  }
}

const CustomisedYAxisTick = ({ x, y, payload, style, min }) => {
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
    >
      {time}
    </Text>
  )
}

export const Chart = ({ data, interval }) => {
  const line = (
    <Line
      type="linear"
      dataKey="average"
=======
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
>>>>>>> 24253b5 (feat(Chart): began building static version of the main chart)
      dot={false}
      stroke={colours.accentPrimary}
      strokeWidth={2}
    />
  )

  const grid = (
<<<<<<< HEAD
    <CartesianGrid
      stroke={colours.coreSecondary3}
      vertical={false}
      strokeWidth={1}
    />
  )

  const axisStyle = { fontFamily: "Roboto" }
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

  //min and max are used to control the height of the graph
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

  //The amount of reference areas is going to be equal to the amount of data points
  //divided by the interval between the x-axis's ticks
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
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart data={data} margin={{ left: 20, right: 40, bottom: 10 }}>
        {referenceAreas}
        {grid}
        {line}
=======
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
>>>>>>> 24253b5 (feat(Chart): began building static version of the main chart)
        {xAxis}
        {yAxis}
      </LineChart>
    </ResponsiveContainer>
  )

<<<<<<< HEAD
  return renderChart
=======
  return <div>{renderChart}</div>
>>>>>>> 24253b5 (feat(Chart): began building static version of the main chart)
}

export default ChartContainer
