<script lang="ts">
	import type { Review } from '$lib/types/reviews.js';
	import ReviewSummaryCard from '$lib/components/reviews/ReviewSummaryCard.svelte';
	import ReviewHeader from '$lib/components/reviews/ReviewHeader.svelte';
	import { SITE_NAME, SITE_URL } from '$lib/constants';
	import RelatedContent from '$lib/components/posts/PostRelatedContent.svelte';
	import RelatedTags from '$lib/components/posts/PostTags.svelte';
	import ReviewSection from '$lib/components/reviews/ReviewSection.svelte';
	import { createReviewStructuredData } from '../../../utils/schema';
	import OpenGraphMetaTags from '$lib/components/layout/OpenGraphMetaTags.svelte';

	let { data }: { data: { review: Review } } = $props();

	const { metadata, content, related } = $derived(data.review);

	const link = $derived(`${SITE_URL}/${metadata.type}/${metadata.slug}`);
	const title = $derived(`Review: ${metadata.album} // ${metadata.artist} // ${SITE_NAME}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={metadata.blurb} />

	<OpenGraphMetaTags
		{link}
		{title}
		description={`'${metadata.pullquote}.'`}
		image={metadata.featuredimage['medium-original']}
	/>

	{@html `<script type="application/ld+json">${JSON.stringify(createReviewStructuredData(metadata))}</script>`}
</svelte:head>

{#if metadata.week < 15}
	<div class="oldie-disclaimer">
		Our early reviews are threadbare to say the least. In the spirit of remembering how we got here,
		we've left them as they were.
	</div>
{/if}
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
		<ReviewSummaryCard review={metadata} />
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
	.oldie-disclaimer {
		color: #000;
		background-color: #ffe501;
		padding: 0.5rem 0.9em;
		font-weight: 600;
		border-radius: 5px;
		display: inline-block;
		margin-bottom: 2rem;
	}
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
			margin-bottom: 2rem;
		}

		.related-content {
			grid-area: related-content;
		}
	}
</style>
