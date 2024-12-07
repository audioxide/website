import { API_URL } from '$lib/constants';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/articles-${params.slug}.json`);
	const article = await response.json();
	return { article };
}
