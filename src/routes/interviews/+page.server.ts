import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/interviews.json`);
	const interviews = await response.json();
	return { interviews };
}
