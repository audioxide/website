<script lang="ts">
	import type { RecentReviewSummary } from '$lib/types/reviews';

	let {
		recentReviews
	}: {
		recentReviews: RecentReviewSummary[];
	} = $props();

	const assignClass = (i: number) => {
		if (i < 4) return '';
		if (i >= 4 && i < 7) return 'tablet';
		if (i > 7) return 'desktop';
		else return '';
	};
</script>

<div class="album-banner">
	{#each recentReviews as recentReview, i}
		<a href={`/reviews/${recentReview.slug}`} class={assignClass(i)}>
			<div class="square">
				<img
					loading="lazy"
					class="album-artwork"
					src={recentReview.image}
					alt={`Album artwork of '${recentReview.album}' by ${recentReview.artist}`}
				/>
				<div class="score-container">
					<div class="score">{recentReview.score}/30</div>
				</div>
			</div>
		</a>
	{/each}
</div>

<style>
	img {
		aspect-ratio: 1 / 1;
		width: calc(100vw / 5);
	}
	.album-banner {
		display: flex;
		flex-direction: row;
		border-top: 1px solid #c9c9c9;
		border-bottom: 1px solid #c9c9c9;
		overflow: hidden;
	}
	.tablet,
	.desktop {
		display: none;
	}
	.square {
		position: relative;
	}
	.score-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.6);
		display: none;
	}
	.score {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: 'Rounded Elegance', sans-serif;
		color: white;
		font-size: 1.2rem;
	}
	.square:hover .score-container {
		display: block;
	}
	@media (min-width: 768px) {
		.burger {
			display: none;
		}
		.tablet,
		.search {
			display: block;
		}
		.top-bar {
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 0.5rem 2rem;
		}
		.score {
			font-size: 1.5rem;
		}
		img {
			width: calc(100vw / 8);
		}
	}
	@media (min-width: 1024px) {
		.desktop {
			display: block;
		}
		.score {
			font-size: 2rem;
		}
		img {
			width: calc(100vw / 11);
		}
	}
</style>
