import { API_URL } from '$lib/constants';

export async function entries() {
	const typesResponse = await fetch(`${API_URL}/types.json`);
	const types: {
		pages: string[];
		postTypes: string[];
		postTotal: number;
	} = await typesResponse.json();

	const slugParams = types.pages.map((slug) => ({ slug }));

	return slugParams;
}
