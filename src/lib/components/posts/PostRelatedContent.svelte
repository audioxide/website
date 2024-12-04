<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';
	import PostSummaryCard from '../PostSummaryCard.svelte';
	import SectionHeader from '../SectionHeader.svelte';

	let {
		relatedContent
	}: {
		relatedContent: {
			metadata: SharedPostMetadata;
		}[];
	} = $props();
</script>

<div class="related-content">
	<SectionHeader header="Related Posts" />
	<div class="post-cards">
		{#each relatedContent as { metadata }}
			<PostSummaryCard
				image={metadata.featuredimage['small-square']}
				title={metadata.title}
				aspectRatio={'1 / 1'}
				link={`/${metadata.type}/${metadata.slug}`}
				blurb={metadata.blurb}
				primaryColor={metadata.colours ? metadata.colours[0] : undefined}
			/>
		{/each}
	</div>
</div>

<style>
	.related-content {
		margin: 2rem 0;
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
