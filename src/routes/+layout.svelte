<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import '$lib/styles/fonts.css';

	let {
		children,
		data
	}: {
		children: Snippet;
		data: {
			bannerReviews: {
				image: string;
				score: number;
				artist: string;
				album: string;
				slug: string;
			}[];
		};
	} = $props();
</script>

<Header recentReviews={data.bannerReviews} />
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
