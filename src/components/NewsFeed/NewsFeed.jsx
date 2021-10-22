import React from "react"
import { useEffect, useState } from "react"
import { requestNews } from "./services"
import "./styles.css"

function NewsFeed() {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    requestNews("AAPL").then((res) => setArticles(res))
  }, [])

  if (articles) {
    return (
      <div className="background">
        <h2 className="latest-news-text">Latest News</h2>
        {articles.map((article) => {
          return (
            <NewsArticle
              key={article.headline}
              link={article.url}
              content={article.headline}
              timeSincePublication={article.datetime}
              source={article.source}
            />
          )
        })}
      </div>
    )
  } else {
    return null
  }
}

function NewsArticle({ link, content, timeSincePublication, source }) {
  return (
    <div className="news-article">
      <a href={link}>
        <h3>{content}</h3>
      </a>
      <p className="time-source-text">{`${timeSincePublication} ago - ${source}`}</p>
    </div>
  )
}

export default NewsFeed
