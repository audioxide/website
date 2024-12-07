import {
	BLUESKY_URL,
	FACEBOOK_URL,
	GITHUB_URL,
	INSTAGRAM_URL,
	SITE_DESCRIPTION,
	SITE_FOUNDING_YEAR,
	SITE_NAME,
	SITE_URL,
	X_URL
} from '$lib/constants';
import type { ReviewMetadata } from '$lib/types/reviews';
import type { SharedPostMetadata } from '$lib/types/shared';

export const audioxideStructuredData = () => ({
	'@context': 'http://schema.org',
	'@type': 'WebSite',
	name: SITE_NAME,
	description: SITE_DESCRIPTION,
	copyrightYear: SITE_FOUNDING_YEAR,
	creator: [
		{
			'@type': 'Person',
			name: 'André Dack',
			sameAs: 'https://twitter.com/andredack'
		},
		{
			'@type': 'Person',
			name: 'Andrew Bridge',
			sameAs: 'https://www.andrewhbridge.co.uk'
		},
		{
			'@type': 'Person',
			name: "Frederick O'Brien",
			sameAs: 'https://frederickobrien.com'
		}
	],
	url: SITE_URL,
	sameAs: [FACEBOOK_URL, X_URL, INSTAGRAM_URL, GITHUB_URL, BLUESKY_URL],
	isAccessibleForFree: true
});

export const createReviewStructuredData = (metadata: ReviewMetadata) => {
	return [
		{
			'@context': 'http://schema.org',
			'@type': 'Review',
			headline: 'Review: ' + metadata.title,
			description: metadata.summary || metadata.blurb || '',
			datePublished: metadata.created,
			dateModified: metadata.modified,
			author: metadata.author.authors.map((author) => ({
				'@type': 'Person',
				name: author.name
			})),
			itemReviewed: {
				'@type': 'MusicAlbum',
				name: metadata.album,
				'@id': `https://musicbrainz.org/release-group/${metadata.albumMBID}`,
				image: (metadata.featuredimage || {})['medium-square'] || '',
				albumReleaseType: 'http://schema.org/AlbumRelease',
				byArtist: {
					'@type': 'MusicGroup',
					name: metadata.artist,
					'@id': `https://musicbrainz.org/artist/${metadata.artistMBID}`
				}
			},
			reviewRating: {
				'@type': 'Rating',
				ratingValue: metadata.totalscore.given,
				worstRating: 0,
				bestRating: metadata.totalscore.possible
			},
			keywords: metadata.tags.join(', '),
			publisher: audioxideStructuredData()
		}
	];
};

export const createPostStructuredData = (metadata: SharedPostMetadata) => {
	return {
		'@context': 'http://schema.org',
		'@type': 'Article',
		headline: metadata.title,
		description: metadata.summary || metadata.blurb || '',
		image: (metadata.featuredimage || {})['medium-standard'] || '',
		datePublished: metadata.created,
		dateModified: metadata.modified,
		author: metadata.author.authors.map((author) => ({
			'@type': 'Person',
			name: author.name
		})),
		keywords: metadata.tags.join(', '),
		publisher: audioxideStructuredData()
	};
};
