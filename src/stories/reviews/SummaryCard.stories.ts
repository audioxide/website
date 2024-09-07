import type { Meta } from '@storybook/svelte';
import SummaryCard from '$lib/components/reviews/SummaryCard.svelte';

const meta = {
	title: 'Reviews/SummaryCard',
	component: SummaryCard,
	parameters: {
		layout: 'centered'
	},
	args: {
		scoreGiven: 25,
		scorePossible: 30,
		summary: 'This is a summary',
		essentialTracks: ['Track 1', 'Track 2'],
		favouriteTracks: ['Track 3'],
		imageUrl:
			'https://audioxide.com/api/images/album-artwork/ants-from-up-there-black-country-new-road-large-square.jpg',
		artistLink: 'https://www.google.com',
		colors: ['navy', 'lightgray', 'black']
	}
} satisfies Meta<SummaryCard>;

export default meta;

export const Default = {};
