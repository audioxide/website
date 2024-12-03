<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import type { Snippet } from 'svelte';
	import { dev } from '$app/environment';
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

<svelte:head>
	{#if !dev}
		<script
			data-n-head="ssr"
			data-goatcounter="https://audioxide.goatcounter.com/count"
			src="//gc.zgo.at/count.js"
		></script>
	{/if}
</svelte:head>

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
