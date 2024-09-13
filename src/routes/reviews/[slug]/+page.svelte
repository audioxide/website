<script lang="ts">
	import type { Review } from '$lib/types/reviews.js';
	import ReviewSummaryCard from '$lib/components/reviews/ReviewSummaryCard.svelte';
	import ReviewHeader from '$lib/components/reviews/ReviewHeader.svelte';
	import { SITE_NAME } from '$lib/constants';
	import RelatedContent from '$lib/components/RelatedContent.svelte';
	import RelatedTags from '$lib/components/RelatedTags.svelte';
	import ReviewSection from '$lib/components/ReviewSection.svelte';

	let {
		data
	}: {
		data: {
			review: Review;
		};
	} = $props();
	const { metadata, content, related } = $derived(data.review);
</script>

<svelte:head>
	<title>Review: {metadata.album} // {metadata.artist} // {SITE_NAME}</title>
	<meta name="description" content={metadata.summary} />
</svelte:head>

<div class="container">
	<div class="header">
		<ReviewHeader
			dateCreated={metadata.created}
			albumTitle={metadata.album}
			artistName={metadata.artist}
			authors={metadata.author.authors}
			primaryColor={metadata.colours[0]}
			secondaryColor={metadata.colours[1]}
		/>
	</div>
	<div class="summary-card">
		<ReviewSummaryCard
			id={metadata.week}
			imageUrl={metadata.featuredimage['medium-square']}
			scoreGiven={metadata.totalscore.given}
			scorePossible={metadata.totalscore.possible}
			summary={metadata.summary}
			artistLink={metadata.artistLink}
			essentialTracks={metadata.essentialtracks}
			favouriteTracks={metadata.favouritetracks}
			colors={metadata.colours}
		/>
	</div>
	<div class="review">
		{#each content as contentBlock, i}
			<ReviewSection
				{contentBlock}
				primaryColor={metadata.colours[0]}
				isLast={i === content.length - 1}
			/>
		{/each}
	</div>
	<div class="related-tags">
		<RelatedTags relatedTags={metadata.tags} />
	</div>
	<div class="related-content">
		<RelatedContent relatedContent={related} />
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto auto auto;
			gap: 0 2rem;
			grid-auto-flow: row;
			grid-template-areas:
				'header header header'
				'review review summary-card'
				'related-tags related-tags summary-card'
				'related-content related-content related-content';
		}

		.header {
			grid-area: header;
			z-index: 2;
		}

		.summary-card {
			grid-area: summary-card;
		}

		.review {
			grid-area: review;
			margin-bottom: 2rem;
		}

		.related-tags {
			grid-area: related-tags;
		}

		.related-content {
			grid-area: related-content;
		}
	}
</style>
