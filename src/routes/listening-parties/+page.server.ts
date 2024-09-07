import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/listening-parties.json`);
	const listeningParties = await response.json();
	return { listeningParties };
}
