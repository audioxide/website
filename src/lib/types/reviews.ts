import type { ContentBlock, SharedPostMetadata } from './shared';

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
	colours: string[];
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
	content: ContentBlock[];
	related: ReviewMetadata[];
}
