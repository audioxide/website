<script lang="ts">
	import type { ReviewMetadata } from '$lib/types/reviewInterface.js';
	import SummaryCard from '$lib/components/reviews/SummaryCard.svelte';
	import ReviewHeader from '$lib/components/reviews/ReviewHeader.svelte';

	export let data;
	$: ({ review } = data);
</script>

<svelte:head>
	<title>{review.album} // {review.artist} // Audioxide</title>
	<meta name="description" content={review.summary} />
</svelte:head>

<div class="container">
	<div class="header">
		<ReviewHeader
			dateCreated={review.created}
			albumTitle={review.album}
			artistName={review.artist}
			authors={review.author.authors}
			primaryColor={review.colours[0]}
			secondaryColor={review.colours[1]}
		/>
	</div>
	<div class="summary-card">
		<SummaryCard
			id={review.id}
			imageUrl={review.featuredimage['medium-square']}
			scoreGiven={review.totalscore.given}
			scorePossible={review.totalscore.possible}
			summary={review.summary}
			artistLink={review.artistLink}
			essentialTracks={review.essentialtracks}
			favouriteTracks={review.favouritetracks}
			colors={review.colours}
		/>
	</div>
	<div class="review">Blah blah blah</div>
	<div class="related-content">
		<h2>Related Content</h2>
		<ul>
			<li>Related review 1</li>
			<li>Related review 2</li>
			<li>Related review 3</li>
		</ul>
	</div>
</div>

<style>
	@media (min-width: 768px) {
		.container {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: auto auto auto;
			gap: 0px 0px;
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
