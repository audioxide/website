<script lang="ts">
	import type { ReviewMetadata } from '$lib/types/reviews';
	import PostSummaryCard from './PostSummaryCard.svelte';

	let {
		relatedContent
	}: {
		relatedContent: {
			metadata: ReviewMetadata;
		}[];
	} = $props();
</script>

<div class="related-content">
	<h2>Related Posts</h2>
	<div class="post-cards">
		{#each relatedContent as { metadata }}
			<PostSummaryCard
				image={metadata.featuredimage['medium-square']}
				title={metadata.title}
				link={`/reviews/${metadata.slug}`}
				blurb={metadata.blurb}
				primaryColor={metadata.colours[0]}
			/>
		{/each}
	</div>
</div>

<style>
	.related-content {
		margin: 2rem 0;
	}
	h2 {
		font-family: 'Spectral SC', serif;
		font-weight: 300;
		font-size: 1rem;
		font-style: italic;
		margin-bottom: 1rem;
		padding: 0.5rem 0;
		text-align: center;
		border-top: 1px solid lightgray;
		border-bottom: 1px solid lightgray;
	}
	.post-cards {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 1rem;
		row-gap: 2rem;
	}
	@media (min-width: 768px) {
		.post-cards {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
