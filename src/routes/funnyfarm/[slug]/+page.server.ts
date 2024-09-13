import { API_URL } from '$lib/constants';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/funnyfarm-${params.slug}.json`);
	const funnyfarmEntry = await response.json();
	return { funnyfarmEntry };
}
