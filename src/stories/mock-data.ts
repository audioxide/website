import type { ReviewMetadata } from '$lib/types/reviews';

export const mockReview: ReviewMetadata = {
	slug: 'lianne-la-havas-lianne-la-havas',
	type: 'reviews',
	created: '2020-07-22',
	title: 'Lianne La Havas // Lianne La Havas',
	modified: '2020-08-14',
	tags: ['2020s', 'lianne la havas', 'radiohead', 'rhythm and blues'],
	featuredimage: {
		'xsmall-original':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xsmall-original.jpg',
		'xsmall-square':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xsmall-square.jpg',
		'xsmall-standard':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xsmall-standard.jpg',
		'small-original':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-small-original.jpg',
		'small-square':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-small-square.jpg',
		'small-standard':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-small-standard.jpg',
		'medium-original':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-medium-original.jpg',
		'medium-square':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-medium-square.jpg',
		'medium-standard':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-medium-standard.jpg',
		'large-original':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-large-original.jpg',
		'large-square':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-large-square.jpg',
		'large-standard':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-large-standard.jpg',
		'xlarge-original':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xlarge-original.jpg',
		'xlarge-square':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xlarge-square.jpg',
		'xlarge-standard':
			'http://localhost:8888/images/album-artwork/lianne-la-havas-lianne-la-havas-xlarge-standard.jpg'
	},
	artist: 'Lianne La Havas',
	album: 'Lianne La Havas',
	essentialtracks: ['Weird Fishes'],
	favouritetracks: ['Paper Thin', 'Bittersweet'],
	totalscore: {
		given: 19,
		possible: 30,
		fraction: 0.63
	},
	colours: ['#595959', '#d4d4d4', '#b6b6b6'],
	pullquote: 'One step forward, two steps back',
	summary:
		'The record lacks hooks and memorable moments. Lianne La Havas is her most cohesive album to date, but perhaps her most forgettable. It feels like one step forward, two steps back.',
	week: 241,
	blurb:
		"The record lacks hooks and memorable moments. Although this is La Havas' most cohesive album to date, it may also be her most forgettable.",
	artistMBID: '680466d6-f05b-44f6-858d-625d1b5087f6',
	albumMBID: 'e58e9147-0d9b-4dab-95f2-ae134542ea26',
	artistLink: 'https://www.liannelahavas.com/merch/',
	reviewType: 'newRelease',
	components: {
		scripts: [],
		styles: []
	},
	author: {
		name: "André Dack, Frederick O'Brien & Andrew Bridge",
		authors: [
			{
				name: 'André Dack',
				forename: 'André',
				links: {
					github: 'AndreDack',
					twitter: 'AndreDack',
					instagram: 'andredack',
					email: 'andre@audioxide.com',
					default: 'twitter'
				},
				slug: 'andre-dack'
			},
			{
				name: "Frederick O'Brien",
				forename: 'Fred',
				links: {
					github: 'frederickobrien',
					twitter: 'yagayagafred',
					email: 'fred@audioxide.com',
					website: 'https://frederickobrien.com',
					support: 'https://ko-fi.com/frederickobrien',
					default: 'twitter'
				},
				slug: 'frederick-obrien'
			},
			{
				name: 'Andrew Bridge',
				forename: 'Andrew',
				links: {
					github: 'andrewbridge',
					twitter: 'andrewbridge',
					instagram: 'andrewhbridge',
					website: 'https://www.andrewhbridge.co.uk',
					email: 'andrew@audioxide.com',
					default: 'twitter'
				},
				slug: 'andrew-bridge'
			}
		]
	},
	id: 309
};

export const mockBanner = [
	{
		image:
			'http://localhost:8888/images/album-artwork/for-your-pleasure-roxy-music-xsmall-square.jpg',
		score: 22,
		artist: 'Roxy Music',
		album: 'For Your Pleasure',
		slug: 'roxy-music-for-your-pleasure'
	},
	{
		image:
			'http://localhost:8888/images/album-artwork/ants-from-up-there-black-country-new-road-xsmall-square.jpg',
		score: 22,
		artist: 'Black Country, New Road',
		album: 'Ants from Up There',
		slug: 'black-country-new-road-ants-from-up-there'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/crawler-idles-xsmall-square.jpg',
		score: 26,
		artist: 'IDLES',
		album: 'CRAWLER',
		slug: 'idles-crawler'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/hushed-and-grim-mastodon-xsmall-square.jpg',
		score: 17,
		artist: 'Mastodon',
		album: 'Hushed and Grim',
		slug: 'mastodon-hushed-and-grim'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/skin-joy-crookes-xsmall-square.jpg',
		score: 24,
		artist: 'Joy Crookes',
		album: 'Skin',
		slug: 'joy-crookes-skin'
	},
	{
		image:
			'http://localhost:8888/images/album-artwork/friends-that-break-your-heart-james-blake-xsmall-square.jpg',
		score: 19,
		artist: 'James Blake',
		album: 'Friends That Break Your Heart',
		slug: 'james-blake-friends-that-break-your-heart'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/pinkerton-weezer-xsmall-square.jpg',
		score: 25,
		artist: 'Weezer',
		album: 'Pinkerton',
		slug: 'weezer-pinkerton'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/electric-warrior-t-rex-xsmall-square.jpg',
		score: 24,
		artist: 'T. Rex',
		album: 'Electric Warrior',
		slug: 't-rex-electric-warrior'
	},
	{
		image:
			'http://localhost:8888/images/album-artwork/sinner-get-ready-lingua-ignota-xsmall-square.jpg',
		score: 26,
		artist: 'Lingua Ignota',
		album: 'Sinner Get Ready',
		slug: 'lingua-ignota-sinner-get-ready'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/donda-kanye-west-xsmall-square.jpg',
		score: 30,
		artist: 'Kanye West',
		album: 'Donda',
		slug: 'kanye-west-donda'
	},
	{
		image: 'http://localhost:8888/images/album-artwork/is-this-it-the-strokes-xsmall-square.jpg',
		score: 25,
		artist: 'The Strokes',
		album: 'Is This It',
		slug: 'the-strokes-is-this-it'
	}
];
