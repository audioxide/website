import type { AuthorLinks } from '$lib/types/shared';

export const getAuthorLink = (authorLinks: AuthorLinks, authorSlug: string) => {
	const preferredLink = authorLinks.default;
	switch (preferredLink) {
		case 'github':
			return `https://github.com/${authorLinks.github}`;
		case 'twitter':
			return `https://x.com/${authorLinks.twitter}`;
		case 'facebook':
			return `https://facebook.com/${authorLinks.facebook}`;
		case 'instagram':
			return `https://instagram.com/${authorLinks.instagram}`;
		case 'email':
			return `mailto:${authorLinks.email}`;
		case 'support':
			return authorLinks.support;
		case 'website':
			return authorLinks.website;
		default:
			return `/authors/${authorSlug}`;
	}
};
