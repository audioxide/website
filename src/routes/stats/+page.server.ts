import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/reviews.json`);
	const reviews = await response.json();
	return { reviews };
}
