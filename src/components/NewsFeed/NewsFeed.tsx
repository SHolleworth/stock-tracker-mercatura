import { Suspense } from "react"
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary"
import NewsFeedContent from "./NewsFeedContent"
import ErrorPlaceholder from "./Placeholders/ErrorPlaceholder"
import LoadingPlaceholder from "./Placeholders/LoadingPlaceholder"
import "./styles.css"


function NewsFeed() {

	return (
		<div className="newsfeed">
			<div className="newsfeed__heading section-heading">
				Latest News
			</div>
			<ErrorBoundary fallback={<ErrorPlaceholder />} >	
				<Suspense fallback={<LoadingPlaceholder />}>
					<NewsFeedContent />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}

export default NewsFeed
