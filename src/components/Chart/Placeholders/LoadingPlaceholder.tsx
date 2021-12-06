import React from "react"
import styled from "styled-components"
import { usePlaceholderAnimation } from "../../../hooks/usePlaceholderAnimation"

function LoadingPlaceholder() {
	const opacity = usePlaceholderAnimation()

	return (
		<div
			className="chart__placeholder"
			style={{ opacity: opacity }}
			data-testid="chart-loading-placeholder"
		></div>
	)
}

export default styled(LoadingPlaceholder)`
	align-self: stretch;
	background-color: var(--ui-element);
	border-radius: 10px;
	margin-top: 20px;
`