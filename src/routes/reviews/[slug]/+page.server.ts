import { API_URL } from '$lib/constants';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/reviews-${params.slug}.json`);
	const review = await response.json();
	return { review };
}
