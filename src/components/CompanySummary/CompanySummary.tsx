import React, { Suspense } from "react"
import "./styles.css"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import { styled, Typography } from "@mui/material"
import useCompanyInfoStream from "./streams"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import { Subscribe } from "@react-rxjs/core"

const CompanySummary = () => {
	return (
		<Subscribe>
			<ErrorBoundary fallback={<ErrorPlaceholder />}>
				<Suspense fallback={<LoadingPlaceholder />}>
					<CompanySummaryContent />
				</Suspense>
			</ErrorBoundary>
		</Subscribe>
	)
}

function CompanySummaryContent( ) {
	const { companyName, symbol, website, description } = useCompanyInfoStream()
	return (
		<StyledSummary>
			<Typography variant="h2" color="text.primary" paddingBottom={1.5}>
				Company Summary
			</Typography>
			<Typography variant="subtitle2" color="text.primary" paddingBottom={1}
					>{companyName && symbol ? `${companyName} (${symbol})` : '-'}</Typography>
					<StyledLink
						href={website}
						rel="noreferrer"
						target="_blank"
					>
						{website ? website : null}
					</StyledLink>
					<Typography variant="body1" >
						{description ? description : 'No Summary Available'}
					</Typography>
		</StyledSummary>
	)
}


const StyledLink = styled('a')(
	({ theme }) => `
		font-family: "Roboto", sans-serif;
		color: ${theme.palette.accent};
		font-style: italic;
		padding-bottom: ${theme.spacing()};
		font-size: 0.6875rem;
		text-decoration: underline;
	`)

const StyledSummary = styled("div")(
	({ theme }) => `
		grid-area: summary;
		display: flex;
		flex-direction: column;
		border-bottom: solid 1px ${theme.palette.primary};
		padding: ${theme.spacing(1.5)};
		padding-top: ${theme.spacing(2)};
		padding-bottom: ${theme.spacing(4)};
		
		@media (max-width: 1366px) {
			padding: 0;
			padding-left: ${theme.spacing(6)};
			padding-right: ${theme.spacing(6)};
			border-bottom: none;
			flex: 1;
		}
		
		@media (max-width: 1024px) {
			padding: 0;
			padding-left: ${theme.spacing(1.5)};
			padding-bottom: ${theme.spacing(2)};
		}
		
		@media (max-width: 834px) {
			/* border-bottom: solid 1px ${theme.palette.primary}; */
			margin-bottom: ${theme.spacing(2)};
		}
	`)

export default CompanySummary
