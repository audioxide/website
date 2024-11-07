import type { ReviewSection, SharedPostMetadata } from './shared';

export interface Review {
	metadata: ReviewMetadata;
	content: ReviewSection[];
	related: {
		metadata: ReviewMetadata;
	}[];
}

export interface ReviewMetadata extends SharedPostMetadata {
	artist: string;
	album: string;
	essentialtracks: string[];
	favouritetracks: string[];
	totalscore: {
		given: number;
		possible: number;
		fraction: number;
	};
	pullquote: string;
	week: number;
	colours: string[];
	artistMBID: string;
	albumMBID: string;
	artistLink: string;
	reviewType: string;
	components: {
		scripts: string[];
		styles: string[];
	};
}

export interface RecentReviewSummary {
	image: string;
	score: number;
	artist: string;
	album: string;
	slug: string;
}
