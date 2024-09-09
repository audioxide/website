<script>
	import PostSummaryCard from '$lib/components/PostSummaryCard.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Posts tagged '{data.tag.replaceAll('-', ' ')}' // {SITE_NAME}</title>
	<meta name="description" content={`All posts tagged '${data.tag.replaceAll('-', ' ')}'`} />
	<meta name="robots" content="noindex" />
</svelte:head>

<h2>All posts tagged '{data.tag.replaceAll('-', ' ')}'</h2>

<div class="posts-container">
	{#each data.contentWithTag as { metadata }}
		<PostSummaryCard
			image={metadata.featuredimage['medium-square']}
			title={metadata.title}
			link={`/${metadata.type}/${metadata.slug}`}
			blurb={metadata.blurb}
			primaryColor={metadata.colours ? metadata.colours[0] : 'lightgray'}
		/>
	{/each}
</div>

<style>
	h2 {
		font-family: 'Spectral SC', serif;
		font-weight: 300;
		font-size: 1.2rem;
		font-style: italic;
		text-align: center;
		margin-bottom: 2rem;
	}
	.posts-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
	}
</style>
