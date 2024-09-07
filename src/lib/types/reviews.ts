import type { AuthorObject, ContentBlock, SharedPostMetadata } from './shared';

export interface ReviewMetadata extends SharedPostMetadata {
	featuredimage: {
		'xsmall-original': string;
		'xsmall-square': string;
		'xsmall-standard': string;
		'small-original': string;
		'small-square': string;
		'small-standard': string;
		'medium-original': string;
		'medium-square': string;
		'medium-standard': string;
		'large-original': string;
		'large-square': string;
		'large-standard': string;
		'xlarge-original': string;
		'xlarge-square': string;
		'xlarge-standard': string;
	};
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
	summary: string;
	week: number;
	blurb: string;
	artistMBID: string;
	albumMBID: string;
	artistLink: string;
	reviewType: string;
	components: {
		scripts: string[];
		styles: string[];
	};
	author: {
		name: string;
		authors: AuthorObject[];
	};
}

export interface Review {
	metadata: ReviewMetadata;
	content: ContentBlock[];
	related: ReviewMetadata[];
}
