import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared';

export async function entries() {
	const listeningPartiesResponse = await fetch(`${API_URL}/listening-parties.json`);
	const listeningParties: {
		metadata: SharedPostMetadata;
	}[] = await listeningPartiesResponse.json();

	const slugParams = listeningParties.map((listeningParty) => ({
		slug: listeningParty.metadata.slug
	}));

	return slugParams;
}

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/listening-parties-${params.slug}.json`);
	const listeningParty = await response.json();
	return { listeningParty };
}
