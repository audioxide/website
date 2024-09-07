export interface SharedPostMetadata {
	id: number;
	slug: string;
	type: string;
	created: string;
	modified: string;
	title: string;
	tags: string[];
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

export interface ContentBlock {
	author: AuthorObject;
	review: string;
	score: {
		score: number;
		max: number;
		fraction: number;
	};
	tracks: string[];
}
