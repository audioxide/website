import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared';

type ContentTypes = 'reviews' | 'articles' | 'interviews' | 'listening-parties' | 'funnyfarm';

type LatestPostsObject = {
	[key in ContentTypes]: { metadata: SharedPostMetadata }[];
};

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/latest.json`);
	const latest: LatestPostsObject = await response.json();
	return { latest };
}
