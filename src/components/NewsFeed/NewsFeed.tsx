import React from "react"
import { useEffect, useState } from "react"
import { requestNews } from "./services"
import convertMillisecondsToNewsFeedTime from "../../utils/convertMillisecondsToNewsFeedTime"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import STATUS, { StatusStringType } from "../../utils/statusKeys"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"

type Article = {
	headline: string
	url: string
	source: string
	datetime: number
}

function NewsFeed() {
	const [articles, setArticles] = useState<{
		status: StatusStringType
		body?: Article[]
	}>({
		status: STATUS.LOADING,
	})
	const { symbol } = useSymbol()

	useEffect(() => {
		setArticles({ status: STATUS.LOADING })
		requestNews(symbol)
			.then((news) => {
				setArticles({ status: STATUS.RESOLVED, body: news })
			})
			.catch((error) => {
				console.error("Error requesting news data: " + error)
				setArticles({ status: STATUS.ERROR })
			})
	}, [symbol])

	const newsRenderer = () => {
		let content = null
		if (articles.status === STATUS.LOADING) {
			content = <LoadingPlaceholder />
		} else if (articles.status === STATUS.ERROR) {
			content = <ErrorPlaceholder />
		} else if (articles.status === STATUS.RESOLVED) {
			content = articles.body
				? articles.body.map((article, index) => (
						<NewsArticle
							key={article.headline}
							link={article.url}
							content={article.headline}
							timeSincePublication={article.datetime}
							source={article.source}
							index={index}
						/>
				  ))
				: null
		} else {
			throw Error(
				"Unrecognised state status in news feed component: " +
					articles.status
			)
		}
		return (
			<div className="newsfeed">
				<div className="newsfeed__heading section-heading">
					Latest News
				</div>
				{content}
			</div>
		)
	}

	return newsRenderer()
}

type NewsProps = {
	link: string
	content: string
	timeSincePublication: number
	source: string
	index: number
}

function NewsArticle({
	link,
	content,
	timeSincePublication,
	source,
	index,
}: NewsProps) {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	const firstArticleClass = index < 1 ? "article__content__first" : ""
	const lastArticleClass = index > 1 ? "article__last" : ""

	return (
		<div className={`article ${lastArticleClass}`}>
			<a
				className="article__link"
				href={link}
				target="_blank"
				rel="noreferrer"
			>
				<div className={`article__content ${firstArticleClass}`}>
					{content}
				</div>
			</a>
			<div className="article__time-source">{`${timeString} - ${source}`}</div>
		</div>
	)
}

export default NewsFeed
