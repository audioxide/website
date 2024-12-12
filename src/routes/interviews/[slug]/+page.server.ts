import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared';

export const prerender = true;

export async function entries() {
	const interviewsResponse = await fetch(`${API_URL}/interviews.json`);
	const interviews: {
		metadata: SharedPostMetadata;
	}[] = await interviewsResponse.json();

	const slugParams = interviews.map((interview) => ({ slug: interview.metadata.slug }));

	return slugParams;
}

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/interviews-${params.slug}.json`);
	const interview = await response.json();
	return { interview };
}
