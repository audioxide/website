import { API_URL } from '$lib/constants';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/interviews-${params.slug}.json`);
	const interview = await response.json();
	return { interview };
}
