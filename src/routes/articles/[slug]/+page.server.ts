import { API_URL } from '$lib/constants';
import type { GenericPost, SharedPostMetadata } from '$lib/types/shared.js';

export const prerender = true;

export async function entries() {
	const articlesResponse = await fetch(`${API_URL}/articles.json`);
	const articles: {
		metadata: SharedPostMetadata;
	}[] = await articlesResponse.json();

	const slugParams = articles.map((article) => ({ slug: article.metadata.slug }));

	return slugParams;
}

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/articles-${params.slug}.json`);
	const article: GenericPost = await response.json();
	return { article };
}
