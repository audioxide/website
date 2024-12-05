<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Header from '../lib/components/layout/Header.svelte';
	import { mockBanner } from './mock-data';
	const { Story } = defineMeta({
		title: 'Layout/Header',
		component: Header,
		tags: ['autodocs'],
		args: {
			recentReviews: mockBanner
		}
	});
</script>

<Story name="Default" />
