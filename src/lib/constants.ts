import { dev } from '$app/environment';

export const SITE_NAME = 'Audioxide';
export const SITE_URL = 'https://audioxide.com';
export const SITE_DESCRIPTION =
	'Three friends reviewing albums together. Also publish articles, interviews, and other oddities when the mood takes them.';
export const SITE_FOUNDING_YEAR = 2015;

export const FACEBOOK_URL = 'https://www.facebook.com/audioxide';
export const X_URL = 'https://x.com/audioxide';
export const INSTAGRAM_URL = 'https://www.instagram.com/audioxidecom';
export const GITHUB_URL = 'https://github.com/audioxide';
export const BLUESKY_URL = 'https://bsky.app/profile/audioxide.com';
export const PATREON_URL = 'https://www.patreon.com/c/audioxide';

export const API_URL = dev ? 'http://localhost:8888' : 'https://api.audioxide.com';

export const NAVIGATION_LINKS: {
	name: string;
	link: string;
	subLinks?: { name: string; link: string }[];
}[] = [
	{
		name: 'Reviews',
		link: '/reviews',
		subLinks: [
			{ name: 'Scoring System', link: '/scoring-system' },
			{ name: '27+ Club', link: '/tags/27-plus-club' },
			{ name: 'Stats', link: '/stats' }
		]
	},
	{
		name: 'Articles',
		link: '/articles',
		subLinks: [
			{ name: 'Rankings', link: '/tags/rankings' },
			{ name: 'Listening Parties', link: '/listening-parties' },
			{ name: 'Funnyfarm', link: '/funnyfarm' }
		]
	},
	{ name: 'Interviews', link: '/interviews' },
	{
		name: 'More',
		link: '/more',
		subLinks: [
			{ name: 'About', link: '/about' },
			{ name: 'Privacy', link: '/privacy' },
			{ name: 'Contact', link: '/contact' },
			{ name: 'Authors', link: '/authors' }
		]
	}
];
