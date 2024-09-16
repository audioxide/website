import { API_URL } from '$lib/constants';
import type { AuthorObject } from '$lib/types/shared.js';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/authors.json`);
	const authors: {
		[key: string]: AuthorObject;
	} = await response.json();
	return { authors };
}
