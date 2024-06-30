import allReviews from '../../../../static/api/reviews.json';
import type { ReviewMetadata } from '$lib/types/reviewInterface';

const reviews: {
	metadata: ReviewMetadata;
}[] = allReviews;

export const load = ({ params }) => {
	const matchingReview = reviews.find((review) => review.metadata.slug === params.slug);

	if (!matchingReview) {
		return {
			status: 404,
			error: new Error('Review not found')
		};
	} else {
		return {
			review: matchingReview.metadata
		};
	}
};
