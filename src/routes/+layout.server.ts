import reviews from '../../static/api/reviews.json';

export const load = () => {
	return {
		reviews: reviews
	};
};
