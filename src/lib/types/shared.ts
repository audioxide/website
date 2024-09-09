export interface SharedPostMetadata {
	id: number;
	slug: string;
	type: string;
	created: string;
	modified: string;
	title: string;
	summary: string;
	blurb: string;
	tags: string[];
	author: {
		name: string;
		authors: AuthorObject[];
	};
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
	featuredimageAlt: string;
}

export interface AuthorObject {
	name: string;
	forename: string;
	links: AuthorLinks;
	slug: string;
}

interface AuthorLinks {
	[key: string]: string;
}

export interface ReviewSection {
	author: {
		name: string;
		authors: AuthorObject[];
	};
	review: string;
	score: {
		score: number;
		max: number;
		fraction: number;
	};
	tracks: string[];
}
