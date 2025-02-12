import React from "react"
import { useEffect, useState } from "react"
import { requestNews } from "./services"
import convertMillisecondsToNewsFeedTime from "../../utils/convertMillisecondsToNewsFeedTime"
import "./styles.css"
import { useSymbol } from "../../contexts/SymbolContext"
import Placeholder from "./Placeholder/Placeholder"
import { FLAGS, useRenderFlag } from "../../contexts/RenderFlagContext"
import STATUS from "../../utils/statusKeys"

function NewsFeed() {
	const [articles, setArticles] = useState({
		status: STATUS.LOADING,
		body: null,
	})
	const { symbol } = useSymbol()
	const { renderFlag } = useRenderFlag()

	useEffect(() => {
		if (renderFlag === FLAGS.newsFeed) {
			requestNews(symbol)
				.then((news) => {
					setArticles({ status: STATUS.RESOLVED, body: news })
				})
				.catch((error) => {
					console.error("Error requesting news data: " + error)
					setArticles({ status: STATUS.ERROR, body: null })
				})
		} else if (renderFlag === -1) {
			setArticles({ status: STATUS.LOADING, body: null })
		}
	}, [symbol, renderFlag])

	const dates = [
		Date.now() - 100000,
		Date.now() - 3.6e6 * 2,
		Date.now() - 8.64e7,
	]

	const newsRenderer = () => {
		let content = null
		if (articles.status === STATUS.LOADING) {
			content = <Placeholder />
		} else if (articles.status === STATUS.ERROR) {
			content = <Placeholder />
		} else if (articles.status === STATUS.RESOLVED) {
			content = articles.body.map((article, index) => (
				<NewsArticle
					key={article.headline}
					link={article.url}
					content={article.headline}
					timeSincePublication={dates[index]}
					source={article.source}
				/>
			))
		} else {
			throw Error(
				"Unrecognised state status in news feed component: " +
					articles.status
			)
		}
		return (
			<div className="newsfeed__background">
				<h2 className="latest-news-text">Latest News</h2>
				{content}
			</div>
		)
	}

	return newsRenderer()
}

function NewsArticle({ link, content, timeSincePublication, source }) {
	const timeString = convertMillisecondsToNewsFeedTime(timeSincePublication)

	return (
		<div className="article">
			<a href={link}>
				<h3 className="article__content">{content}</h3>
			</a>
			<p className="article__time-source">{`${timeString} - ${source}`}</p>
		</div>
	)
}

export default NewsFeed
