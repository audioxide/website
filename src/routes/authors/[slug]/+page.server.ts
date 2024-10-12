import { API_URL } from '$lib/constants';
import type { AuthorObject } from '$lib/types/shared.js';

export async function load({ fetch, params }) {
	const authorsResponse = await fetch(`${API_URL}/authors.json`);
	const authors: {
		[key: string]: AuthorObject;
	} = await authorsResponse.json();
	if (authors[params.slug]) return { author: authors[params.slug] };
}
