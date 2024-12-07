import { API_URL } from '$lib/constants';
import type { GenericPost } from '$lib/types/shared.js';
import { imageUrlHack } from '../../../utils/index.js';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/articles-${params.slug}.json`);
	const article: GenericPost = await response.json();
	return {
		...article,
		content: imageUrlHack(article.content)
	};
}
