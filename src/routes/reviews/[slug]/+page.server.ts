import { API_URL } from '$lib/constants';
import type { ReviewMetadata } from '$lib/types/reviews.js';
import type { SharedPostMetadata } from '$lib/types/shared.js';

export async function entries() {
	const reviewsResponse = await fetch(`${API_URL}/reviews.json`);
	const reviews: {
		metadata: ReviewMetadata;
	}[] = await reviewsResponse.json();

	const slugParams = reviews.map((review) => ({ slug: review.metadata.slug }));

	return slugParams;
}

export async function load({ fetch, params }) {
	const response = await fetch(`${API_URL}/posts/reviews-${params.slug}.json`);
	const review: {
		metadata: ReviewMetadata;
		content: string[];
		related: { metadata: SharedPostMetadata }[];
	} = await response.json();
	return { review };
}
