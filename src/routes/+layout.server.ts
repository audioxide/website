import { API_URL } from '$lib/constants';
import type { BannerAlbums } from '$lib/types/shared.js';

export const load = async ({ fetch }) => {
	const response = await fetch(`${API_URL}/albumbanner.json`);
	const bannerReviews: BannerAlbums = await response.json();
	return {
		bannerReviews
	};
};
