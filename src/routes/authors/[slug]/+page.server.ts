import { API_URL } from '$lib/constants';
import type { ReviewMetadata } from '$lib/types/reviews.js';
import type { AuthorObject, SharedPostMetadata } from '$lib/types/shared.js';

export async function load({ fetch, params }) {
	const authorsResponse = await fetch(`${API_URL}/authors.json`);
	const authors: {
		[key: string]: AuthorObject;
	} = await authorsResponse.json();

	const paramSlug = params.slug;
	console.log('paramSlug', paramSlug);
	const authorDetails = authors[paramSlug];

	if (authorDetails) {
		// Articles by the author
		const articles = await fetch(`${API_URL}/articles.json`);
		const articlesData: {
			metadata: SharedPostMetadata;
		}[] = await articles.json();
		const authorArticles = articlesData.filter((article) =>
			article.metadata.author.authors.some((author) => author.slug === paramSlug)
		);
		// Reviews by the author
		const reviews = await fetch(`${API_URL}/reviews.json`);
		const reviewsData: {
			metadata: ReviewMetadata;
		}[] = await reviews.json();
		const authorReviews = reviewsData.filter((review) => {
			if (!review.metadata.author) {
				console.error('Review missing author metadata:', review.metadata.title);
				return false;
			}
			return review.metadata.author.authors.some((author) => author.slug === paramSlug);
		});
		return { author: authorDetails, articles: authorArticles, reviews: authorReviews };
	}
}
