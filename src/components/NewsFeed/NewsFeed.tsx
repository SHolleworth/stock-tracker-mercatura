import React from "react"
import { useEffect, useState } from "react"
import { requestNews } from "./services"
import convertMillisecondsToNewsFeedTime from "../../utils/convertMillisecondsToNewsFeedTime"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholders/Placeholder"
import STATUS, { StatusStringType } from "../../utils/statusKeys"

type Article = {
	headline: string
	url: string
	source: string
	timeSincePublication: number
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
				console.log("HERE")
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
			content = <Placeholder />
		} else if (articles.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (articles.status === STATUS.RESOLVED) {
			content = articles.body
				? articles.body.map((article, index) => (
						<NewsArticle
							key={article.headline}
							link={article.url}
							content={article.headline}
							timeSincePublication={article.timeSincePublication}
							source={article.source}
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
			<div className="newsfeed__background">
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
}

function NewsArticle({
	link,
	content,
	timeSincePublication,
	source,
}: NewsProps) {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	return (
		<div className="article">
			<a href={link}>
				<div className="article__content headlines">{content}</div>
			</a>
			<div className="article__time-source">{`${timeString} - ${source}`}</div>
		</div>
	)
}

export default NewsFeed
