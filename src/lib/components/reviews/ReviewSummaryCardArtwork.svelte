<script lang="ts">
	import type { ReviewMetadata } from '$lib/types/reviews';

	const { review }: { review: ReviewMetadata } = $props();

	const award = (scoreGiven: number) => {
		if (scoreGiven >= 27) return 'platinum';
		if (scoreGiven >= 25) return 'gold';
		if (scoreGiven >= 23) return 'silver';
		if (scoreGiven >= 21) return 'bronze';
		return undefined;
	};

	const albumAward = $derived(award(review.totalscore.given));
</script>

<div class="review-artwork-container">
	{#if albumAward}
		<img
			src={`/assets/award-${albumAward}.png`}
			alt={`${albumAward} award`}
			class={albumAward === 'platinum' ? 'sticker-award' : 'ribbon-award'}
		/>
	{/if}
	<figure>
		<img
			class="album-cover"
			loading="lazy"
			src={review.featuredimage['small-square']}
			alt={`Album artwork of '${review.album}' by ${review.artist}`}
		/>
	</figure>
</div>

<style>
	.review-artwork-container {
		position: relative;
	}
	.ribbon-award {
		position: absolute;
		top: -10px;
		right: 10%;
		width: 15%;
		height: auto;
	}
	.sticker-award {
		position: absolute;
		top: 5%;
		right: 8%;
		width: 25%;
		transform: rotate(9deg);
	}
	.album-cover {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-left: 1px solid lightgray;
		border-right: 1px solid lightgray;
		border-bottom: 1px solid lightgray;
		background-color: var(--primary-color);
	}
</style>
