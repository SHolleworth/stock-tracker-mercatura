import { styled, Typography } from "@mui/material"
import { Subscribe } from "@react-rxjs/core"
import React, { Suspense } from "react"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import NewsFeedContent from "./NewsFeedContent"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import "./styles.css"

const StyledHeading = styled(Typography)(
	({ theme }) => `
	padding-left: ${theme.spacing(1.5)};
	@media (max-width: 1366px) {
		flex: 1;
	}
	`
)

function NewsFeed() {
	return (
		<div className="newsfeed">
			<StyledHeading variant="h2" color="text.primary">
				Latest News
			</StyledHeading>
			<Subscribe>
			<ErrorBoundary fallback={<ErrorPlaceholder />} >	
				<Suspense fallback={<LoadingPlaceholder />}>
					<NewsFeedContent />
				</Suspense>
			</ErrorBoundary>
			</Subscribe>
		</div>
	)
}

export default NewsFeed
