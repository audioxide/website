import { API_URL } from '$lib/constants';

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
