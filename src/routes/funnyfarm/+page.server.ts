import { API_URL } from '$lib/constants';

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/funnyfarm.json`);
	const funnyfarms = await response.json();
	return { funnyfarms };
}
