<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	import '$lib/styles/global.css';
	import '$lib/styles/fonts.css';

	let {
		children,
		data
	}: {
		children: Snippet;
		data: {
			reviews: {
				metadata: {
					slug: string;
					title: string;
					artist: string;
					featuredimage: {
						'medium-square': string;
					};
				};
			}[];
		};
	} = $props();

	const tenMostRecentReviews = data.reviews.slice(0, 10);
</script>

<Header recentReviews={tenMostRecentReviews} />
<main>
	{@render children()}
</main>
<Footer />

<style>
	main {
		max-width: 1280px;
		margin: 2rem auto;
		padding: 0 1rem;
	}
</style>
