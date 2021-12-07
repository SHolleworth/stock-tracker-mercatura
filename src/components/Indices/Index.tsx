import React from "react"
import { styled } from '@mui/material/styles'
import usePriceStream, { indicePriceStreamMap, usePriceStreamFromSymbol } from "../LivePrice/hooks/useLivePrice"
import { PriceDisplay } from "../LivePrice/LivePrice"
import "./styles.css"

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
