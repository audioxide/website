import allReviews from '../../../../static/api/reviews.json';

export const load = ({ params }) => {

	const matchingReview = allReviews.find((review) => review.metadata.slug === params.slug);

	if (!matchingReview) {
		return {
			status: 404,
			error: new Error('Review not found'),
		};
	} else {
		return {
			review: matchingReview.metadata,
		};
	}
}