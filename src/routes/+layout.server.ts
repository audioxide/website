import { API_URL } from '$lib/constants';

export const load = async ({ fetch }) => {
	const response = await fetch(`${API_URL}/albumbanner.json`);
	const bannerReviews = await response.json();
	return {
		bannerReviews
	};
};
