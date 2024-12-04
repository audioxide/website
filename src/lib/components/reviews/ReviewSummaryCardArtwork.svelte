<script lang="ts">
	import { icons } from '$lib/styles/icons';
	import type { ReviewMetadata } from '$lib/types/reviews';
	import Icon from '../Icon.svelte';

	const { review }: { review: ReviewMetadata } = $props();

	const award = (scoreGiven: number) => {
		if (scoreGiven >= 27) return 'platinum';
		if (scoreGiven >= 25) return 'gold';
		if (scoreGiven >= 23) return 'silver';
		if (scoreGiven >= 21) return 'bronze';
		return undefined;
	};

	const albumAward = $derived(award(review.totalscore.given));
	let showCredit = $state(false);
</script>

<div class="review-artwork-container">
	<figure>
		<img
			class="album-cover"
			loading="lazy"
			src={review.featuredimage['small-square']}
			alt={`Album artwork of '${review.album}' by ${review.artist}`}
		/>
		{#if review.artworkCredit}
			<figcaption class={showCredit ? 'show' : 'hide'}>
				The album artwork of <span class="album-name">{review.album}</span> by {review.artist}
				{review.artworkCredit}
				{#if review.artworkCreditSource}
					<a href={review.artworkCreditSource} target="_blank" rel="noopener noreferrer">
						<Icon icon={icons.externalLink} size={12} color="#dd0e3e" />
					</a>
				{/if}
			</figcaption>
			<div
				role="button"
				tabindex="0"
				class="info-icon-wrapper"
				onclick={() => (showCredit = !showCredit)}
				onkeydown={(e) => e.key === 'Enter' && (showCredit = !showCredit)}
			>
				<Icon icon={icons.info} size={18} color="lightgray" />
			</div>
		{/if}
	</figure>
	{#if albumAward}
		<img
			src={`/assets/award-${albumAward}.png`}
			alt={`${albumAward} award`}
			class={albumAward === 'platinum' ? 'sticker-award' : 'ribbon-award'}
		/>
	{/if}
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
	.album-name {
		font-style: italic;
		font-size: 0.9rem;
	}
	figure {
		position: relative;
	}
	figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		font-size: 0.9rem;
		padding: 1rem 3rem 1rem 1rem;
		color: lightgray;
		line-height: 1.2;
		background-color: rgba(0, 0, 0, 0.8);
	}
	.info-icon-wrapper {
		position: absolute;
		bottom: 5%;
		right: 5%;
		&:hover {
			cursor: pointer;
		}
	}
	.hide {
		display: none;
	}
	.show {
		display: block;
	}
</style>
