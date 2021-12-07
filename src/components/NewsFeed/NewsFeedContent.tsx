import { Typography } from '@mui/material'
import React from 'react'
// import styled from 'styled-components'
import { styled } from '@mui/material/styles'
import convertMillisecondsToNewsFeedTime from '../../utils/convertMillisecondsToNewsFeedTime'
import useNewsFeedStream from './streams'

function NewsFeedContent() {
 
	const articles = useNewsFeedStream()

	return (
        <>
            {articles ? articles.map((article, index) => (
                    <NewsArticle
                        key={article.headline}
                        link={article.url}
                        headline={article.headline}
                        timeSincePublication={article.datetime}
                        source={article.source}
                        index={index}
                    />
                ))
            : null}
        </>
    )
}


type ArticleProps = {
	link: string
	headline: string
	timeSincePublication: number
	source: string
	index: number
}

const StyledLink = styled("a")(
	({ theme }) => `
		text-decoration: none;
		:hover {
			text-decoration: underline ${theme.palette.text.primary};
		}
`)

const StyledHeadline = styled(Typography)(
	({ theme }) =>`
	padding-bottom: ${theme.spacing()};
`)



const StyledArticle = styled("div")(
	({ theme }) => `
	border-bottom: solid 1px var(--ui-element);
	padding-left: ${theme.spacing(1.5)};
	padding-right: ${theme.spacing(1.5)};
	padding-bottom: ${theme.spacing(1.9)};
	padding-top: ${theme.spacing(1.6)};
	`
)

const NewsArticle = ({
	link,
	headline,
	timeSincePublication,
	source,
	index,
}: ArticleProps) => {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	return (
		<StyledArticle>
			<StyledLink
				href={link}
				target="_blank"
				rel="noreferrer"
			>
				<StyledHeadline variant="h3" color="text.primary">
					{headline}
				</StyledHeadline>
			</StyledLink>
			<Typography variant="subtitle1" color="text.tertiary">{`${timeString} - ${source}`}</Typography>
		</StyledArticle>
	)
}

export default NewsFeedContent
