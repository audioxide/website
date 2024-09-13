import { API_URL } from '$lib/constants';
import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	const response = await fetch(`${API_URL}/types.json`);
	const contentTypesSummary = await response.json();
	const randomId = Math.floor(Math.random() * contentTypesSummary.postTotal);
	const randomPostResponse = await fetch(`${API_URL}/posts/indexed/${randomId}.json`);
	const { metadata } = await randomPostResponse.json();
	throw redirect(303, `/${metadata.type}/${metadata.slug}`);
};
