import React from "react"
import styled from "styled-components"
import usePriceStream from "../LivePrice/hooks/useLivePrice"
import useLivePrice from "../LivePrice/hooks/useLivePrice"
import { PriceDisplay } from "../LivePrice/LivePrice"
import "./styles.css"

interface IndexPropsType {
	symbol: string
	className?: string
}

const StyledIndex = styled.div`
    flex: 1;
	align-self: stretch;
	max-width: 240px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: ${props => props.theme.spacing * 2.4}px;
	padding-right: ${props => props.theme.spacing * 2.4}px;
	padding-top: ${props => props.theme.spacing}px;
	padding-bottom: ${props => props.theme.spacing}px;
	font-size: var(--content-fontsize);
`

const CenterIndex = styled(StyledIndex)`
    border-left: 1px solid var(--ui-element-light);
    border-right: 1px solid var(--ui-element-light);`

export const Index = ({ className }: IndexPropsType) => {
    const Index = className === "index--center" ? CenterIndex : StyledIndex
    const price = usePriceStream()
    if(price) {
        return (
            <Index>
                <PriceDisplay
                    price={price}
                    className="index-price"
                    searchFocused={false}
                />
            </Index>
        )
    }

    return null
}

export default Index
