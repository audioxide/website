import { API_URL } from '$lib/constants';
import type { SearchResponse } from '$lib/types/search';

export const prerender = false;

export async function load({ fetch, url }) {
	const searchTerm = url.searchParams.get('q');
	const searchUrl = `${API_URL}/search?term=${searchTerm}`;
	const response = await fetch(searchUrl);
	const searchResults: SearchResponse = response.status === 200 ? await response.json() : {};
	return {
		searchTerm,
		searchResults
	};
}
