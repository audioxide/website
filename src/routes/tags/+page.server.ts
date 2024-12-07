import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/tags.json`);
	const tags = await response.json();
	return { tags };
}
