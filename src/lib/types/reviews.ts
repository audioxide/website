import type { ReviewSection, SharedPostMetadata } from './shared';

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
	artistMBID: string;
	albumMBID: string;
	artistLink: string;
	reviewType: string;
	components: {
		scripts: string[];
		styles: string[];
	};
}

export interface Review {
	metadata: ReviewMetadata;
	content: ReviewSection[];
	related: {
		metadata: ReviewMetadata;
	}[];
}
