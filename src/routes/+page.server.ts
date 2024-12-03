import { API_URL } from '$lib/constants';
import type { SharedPostMetadata } from '$lib/types/shared';

type ContentTypes = 'reviews' | 'articles' | 'interviews' | 'listening-parties' | 'funnyfarm';

type LatestPostsObject = {
	[key in ContentTypes]: { metadata: SharedPostMetadata }[];
};

const filterPosts = (
	posts: { metadata: SharedPostMetadata }[],
	mostRecentPostSlug: string,
	postsWanted: number
) => {
	return posts.filter((post) => post.metadata.slug !== mostRecentPostSlug).slice(0, postsWanted);
};

export async function load({ fetch }) {
	const response = await fetch(`${API_URL}/latest.json`);
	const latest: LatestPostsObject = await response.json();
	const mostRecentPost = Object.values(latest)
		.flat()
		.sort(
			(a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
		)[0];
	const mostRecentPostSlug = mostRecentPost.metadata.slug;
	return {
		latest: {
			reviews: filterPosts(latest.reviews, mostRecentPostSlug, 8),
			articles: filterPosts(latest.articles, mostRecentPostSlug, 4),
			interviews: filterPosts(latest.interviews, mostRecentPostSlug, 4),
			listeningParties: filterPosts(latest['listening-parties'], mostRecentPostSlug, 4),
			funnyfarm: filterPosts(latest.funnyfarm, mostRecentPostSlug, 4)
		},
		mostRecentPost
	};
}
