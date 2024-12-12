import { API_URL } from '$lib/constants';
import type { ReviewMetadata } from '$lib/types/reviews.js';
import type { AuthorObject, SharedPostMetadata } from '$lib/types/shared.js';

export const prerender = true;

interface AuthorsMap {
	[key: string]: AuthorObject;
}

const getAuthors = async () => {
	const authorsResponse = await fetch(`${API_URL}/authors.json`);
	const authors: AuthorsMap = await authorsResponse.json();
	return authors;
};

export async function entries() {
	const authors = await getAuthors();

	const slugParams = Object.keys(authors).map((authorSlug) => ({ slug: authorSlug }));

	return slugParams;
}

export async function load({ fetch, params }) {
	const authors: AuthorsMap = await getAuthors();

	const paramSlug = params.slug;
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
