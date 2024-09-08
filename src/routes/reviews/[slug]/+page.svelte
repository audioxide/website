<script lang="ts">
	import type { Review } from '$lib/types/reviews.js';
	import SummaryCard from '$lib/components/reviews/SummaryCard.svelte';
	import ReviewHeader from '$lib/components/reviews/ReviewHeader.svelte';
	import { SITE_NAME } from '$lib/constants';
	import PostSummaryCard from '$lib/components/PostSummaryCard.svelte';
	import RelatedContent from '$lib/components/RelatedContent.svelte';

	export let data: {
		review: Review;
	};
	$: ({ metadata, content, related } = data.review);
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
		<SummaryCard
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
		{#each content as contentBlock}
			<h3>{contentBlock.author.name}</h3>
			{@html contentBlock.review}
			<h4>Favourite tracks</h4>
			<ul>
				{#each contentBlock.tracks as track}
					<li>{track}</li>
				{/each}
			</ul>
			<div>
				{contentBlock.score.score}/{contentBlock.score.max}
			</div>
			<hr />
		{/each}
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
		}

		.related-content {
			grid-area: related-content;
		}
	}
</style>
