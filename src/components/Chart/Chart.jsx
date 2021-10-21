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

const ChartContainer = () => {
  const [intradayPrices, setIntradayPrices] = useState()

  useEffect(() => {
    (async () => {
      try {
        const prices = await requestHistoricalPrices()
        setIntradayPrices(prices)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <div style={{ padding: "20px 200px 20px 200px" }}>
      <Chart data={intradayPrices} />
    </div>
  )
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
        {xAxis}
        {yAxis}
      </LineChart>
    </ResponsiveContainer>
  )

  return renderChart
}

export default ChartContainer
