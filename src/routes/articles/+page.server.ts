import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/articles.json`);
	const articles = await response.json();
	return { articles };
}
