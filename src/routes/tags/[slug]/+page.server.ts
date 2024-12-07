import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared.js';

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/tags/${params.slug.replaceAll('-', ' ')}.json`);
	const contentWithTag: {
		metadata: SharedPostMetadata & { colours?: string[] };
	}[] = await response.json();
	return { tag: params.slug, contentWithTag };
}
