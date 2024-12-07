<script lang="ts">
	import type { ReviewMetadata } from '$lib/types/reviews';
	import ReviewSummaryCardArtistLink from './ReviewSummaryCardArtistLink.svelte';
	import ReviewSummaryCardArtwork from './ReviewSummaryCardArtwork.svelte';
	import ReviewSummaryCardAward from './ReviewSummaryCardAward.svelte';

	const { review }: { review: ReviewMetadata } = $props();

	const generateId = (id: number): string => {
		return id.toString().padStart(7, '0');
	};
</script>

<div
	class="summary-card"
	style="--primary-color: {review.colours[0]}; 
		   --secondary-color: {review.colours[1]}; 
		   --tertiary-color: {review.colours[2]}"
>
	<ReviewSummaryCardArtwork {review} />
	{#if review.totalscore.given >= 21}
		<ReviewSummaryCardAward scoreGiven={review.totalscore.given} />
	{/if}
	<div class="score">
		<span class="given-score">{review.totalscore.given}</span><span class="possible-score"
			>/{review.totalscore.possible}</span
		>
	</div>
	<div class="summary">'{review.summary}'</div>
	<div class="fav-tracks {review.artistLink ? '' : 'no-artist-link'}">
		{#if review.essentialtracks.length > 0}
			<h3>Essential Tracks</h3>
			<ul>
				{#each review.essentialtracks as track}
					<li class="top-track">{track}</li>
				{/each}
			</ul>
		{/if}
		{#if review.essentialtracks.length > 0 && review.favouritetracks.length > 0}
			<div class="top-tracks-section-divider"></div>
		{/if}
		{#if review.favouritetracks.length > 0}
			<h3>Favourite Tracks</h3>
			<ul>
				{#each review.favouritetracks as track}
					<li class="top-track">{track}</li>
				{/each}
			</ul>
		{/if}
	</div>
	{#if review.artistLink}
		<ReviewSummaryCardArtistLink artistLink={review.artistLink} />
	{/if}
	<div class="review-id">
		No. {generateId(review.week)}
	</div>
</div>

<style>
	.summary-card {
		position: relative;
	}
	.summary {
		color: var(--primary-color);
		font-family: 'Spectral', serif;
		padding: 1rem;
		font-style: italic;
	}
	.score,
	.fav-tracks {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		text-align: center;
	}
	h3 {
		margin-bottom: 0.3rem;
	}
	.fav-tracks {
		border-radius: 15px 15px 0 0;
		padding: 2rem 0;
	}
	.fav-tracks h3 {
		font-family: 'Source Sans Pro', sans-serif;
		color: var(--tertiary-color);
	}
	.top-tracks-section-divider {
		margin-bottom: 1rem;
	}
	.top-track {
		font-family: 'Spectral', serif;
	}
	.no-artist-link {
		border-radius: 15px;
	}
	.score {
		padding: 1.5rem 2rem 2rem 2rem;
		font-family: 'Source Sans Pro', sans-serif;
		font-weight: bold;
		border-radius: 0 0 15px 15px;
	}
	.given-score {
		font-size: 4rem;
	}
	.possible-score {
		color: var(--tertiary-color);
		font-size: 3rem;
	}
	.review-id {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.9rem;
		color: var(--gray-text-color);
		text-align: right;
		padding-right: 1rem;
		margin-top: 0.2rem;
	}
</style>
