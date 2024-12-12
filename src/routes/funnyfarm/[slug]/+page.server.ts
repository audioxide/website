import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared';

export const prerender = true;

export async function entries() {
	const funnyfarmsResponse = await fetch(`${API_URL}/funnyfarm.json`);
	const funnyfarms: {
		metadata: SharedPostMetadata;
	}[] = await funnyfarmsResponse.json();

	const slugParams = funnyfarms.map((funnyfarm) => ({ slug: funnyfarm.metadata.slug }));

	return slugParams;
}

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/funnyfarm-${params.slug}.json`);
	const funnyfarmEntry = await response.json();
	return { funnyfarmEntry };
}
