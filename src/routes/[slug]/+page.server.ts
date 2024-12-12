import { API_URL } from '$lib/constants';

export const prerender = true;

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

export async function load({ fetch, params }) {
	const pageResponse = await fetch(`${API_URL}/pages/${params.slug}.json`);
	const page: {
		metadata: {
			slug: string;
			title: string;
			blurb: string;
			created: string;
			modified: string;
		};
		content: string[];
	} = await pageResponse.json();
	return { page };
}
