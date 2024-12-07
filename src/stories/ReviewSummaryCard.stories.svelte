<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ReviewSummaryCard from '../lib/components/reviews/ReviewSummaryCard.svelte';
	import { mockReview } from './mock-data';
	const { Story } = defineMeta({
		title: 'Reviews/ReviewSummaryCard',
		component: ReviewSummaryCard,
		tags: ['autodocs'],
		args: {
			review: mockReview
		}
	});
</script>

<Story name="Default" />
