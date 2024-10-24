import { API_URL } from '$lib/constants';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/listening-parties-${params.slug}.json`);
	const listeningParty = await response.json();
	return { listeningParty };
}
