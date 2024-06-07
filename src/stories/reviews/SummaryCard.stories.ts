import type { Meta } from '@storybook/svelte';
import SummaryCard from '$lib/components/reviews/SummaryCard.svelte';

const meta = {
	title: 'Reviews/SummaryCard',
	component: SummaryCard,
	args: {
		scoreGiven: 25,
		scorePossible: 30,
		summary: 'This is a summary',
		essentialTracks: ['Track 1', 'Track 2'],
		favouriteTracks: ['Track 3'],
		imageUrl: 'https://via.placeholder.com/150',
		artistLink: 'https://www.google.com'
	}
} satisfies Meta<SummaryCard>;

export default meta;

export const Default = {};
