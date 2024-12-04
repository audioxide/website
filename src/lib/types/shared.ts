export interface GenericPost {
	metadata: SharedPostMetadata;
	content: string;
	related: {
		metadata: SharedPostMetadata;
	}[];
}

export interface FeaturedImageSizes {
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
}

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
	colours?: string[];
	author: {
		name: string;
		authors: AuthorObject[];
	};
	featuredimage: FeaturedImageSizes;
	featuredimageAlt: string;
	showFeaturedImage?: boolean;
	featuredImageCaption?: string;
}

export interface AuthorObject {
	name: string;
	forename: string;
	slug: string;
	links?: AuthorLinks;
}

export interface AuthorLinks {
	default: string;
	website?: string;
	twitter?: string;
	facebook?: string;
	instagram?: string;
	github?: string;
	email?: string;
	support?: string;
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
