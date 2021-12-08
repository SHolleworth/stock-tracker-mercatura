import React from "react"
import { styled } from '@mui/material/styles'
import { PriceDisplay } from "../LivePrice/LivePrice"
import "./styles.css"
import streamPricesFromSymbol from "../../streams/operators/streamPricesFromSymbol"
import { of } from "rxjs"
import { bind } from "@react-rxjs/core"

interface IndexPropsType {
	symbol: string
	className?: string
}

const StyledIndex = styled("div")(
    ({ theme }) => `
        flex: 1;
        align-self: stretch;
        max-width: 240px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: ${theme.spacing(2.4)};
        padding-right: ${theme.spacing(2.4)};
        padding-top: ${theme.spacing()};
        padding-bottom: ${theme.spacing()};
        font-size: var(--content-fontsize);
    `
)

const CenterIndex = styled(StyledIndex)`
    border-left: 1px solid var(--ui-element-light);
    border-right: 1px solid var(--ui-element-light);`


const [useSPYPrice, ] = bind(bind(of("SPY"))[1].pipe(streamPricesFromSymbol))
const [useDIAPrice, ] = bind(bind(of("DIA"))[1].pipe(streamPricesFromSymbol))
const [useIWMPrice, ] = bind(bind(of("IWM"))[1].pipe(streamPricesFromSymbol))
const indicePriceStreamMap =  new Map()
indicePriceStreamMap.set("SPY", useSPYPrice)
indicePriceStreamMap.set("DIA", useDIAPrice)
indicePriceStreamMap.set("IWM", useIWMPrice)

const Index = ({ symbol, className }: IndexPropsType) => {
    const IndexDisplay = className === "index--center" ? CenterIndex : StyledIndex
    const price = indicePriceStreamMap.get(symbol)()
    if(price) {
        return (
            <IndexDisplay>
                <PriceDisplay
                    symbol={symbol}
                    price={price}
                    className="index-price"
                    searchFocused={false}
                />
            </IndexDisplay>
        )
    }

    return null
}

export default Index
