<script lang="ts">
	import ContentBlock from '$lib/components/ContentBlock.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();

	const { metadata, content } = $derived(data.page);
</script>

<svelte:head>
	<title>{metadata.title} // {SITE_NAME}</title>
	<meta name="description" content={metadata.blurb} />
</svelte:head>

<div class="container">
	<h2>{metadata.title}</h2>
	{#each content as html}
		<ContentBlock {html} />
	{/each}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto 2rem auto;
	}
	.container h2 {
		text-align: center;
		margin: 2rem 0 1rem 0;
		font-size: 2rem;
	}
</style>
