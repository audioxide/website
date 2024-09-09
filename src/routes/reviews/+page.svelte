<script lang="ts">
	import PostSummaryCard from '$lib/components/PostSummaryCard.svelte';
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Album Reviews // {SITE_NAME}</title>
	<meta name="description" content="Music reviews, articles, and interviews." />
</svelte:head>

<h2>Album Reviews</h2>
<div class="reviews-container">
	{#each data.reviews as review}
		<PostSummaryCard
			image={review.metadata.featuredimage['medium-square']}
			title={review.metadata.title}
			link={`/reviews/${review.metadata.slug}`}
			blurb={review.metadata.blurb}
			primaryColor={review.metadata.colours ? review.metadata.colours[0] : 'lightgray'}
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
	.reviews-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
	}
</style>
