import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSymbol } from '../../contexts/SymbolContext'
import convertMillisecondsToNewsFeedTime from '../../utils/convertMillisecondsToNewsFeedTime'
import { requestNews } from './services'

type Article = {
	headline: string
	url: string
	source: string
	datetime: number
}

function NewsFeedContent() {
    const [articles, setArticles] = useState<Article[]>()
	const { symbol } = useSymbol()

	useEffect(() => {
		(async () => {
			try {
				const news = await requestNews(symbol)
				setArticles(news)
			}
			catch(error: any) {
				setArticles(() => { throw Error(error) })
			}
		})()
	}, [symbol])

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

const StyledLink = styled.a`
	text-decoration: none;
	:hover {
		text-decoration: underline ${props => props.theme.palette.text.primary};
	}
`

const StyledHeadline = styled(Typography)`
	padding-top: ${props => props.theme.spacing}px;
	padding-bottom: ${props => props.theme.spacing}px;
`

const StyledSource = styled(Typography)`
	padding-bottom: ${props => props.theme.spacing * 2}px;
`

const NewsArticle = ({
	link,
	headline,
	timeSincePublication,
	source,
	index,
}: ArticleProps) => {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	const firstArticleClass = index < 1 ? "article__headline__first" : ""
	const lastArticleClass = index > 1 ? "article__last" : ""

	return (
		<div className={`article ${lastArticleClass}`}>
			<StyledLink
				href={link}
				target="_blank"
				rel="noreferrer"
			>
				<StyledHeadline variant="h2" color="text.primary" gutterBottom>
					{headline}
				</StyledHeadline>
			</StyledLink>
			<StyledSource variant="subtitle1" color="text.tertiary">{`${timeString} - ${source}`}</StyledSource>
		</div>
	)
}

export default NewsFeedContent
