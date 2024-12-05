<script lang="ts">
	import { icons } from '$lib/styles/icons';
	import type { ReviewMetadata } from '$lib/types/reviews';
	import Icon from '../Icon.svelte';
	import InfoIcon from '../InfoIcon.svelte';

	const { review }: { review: ReviewMetadata } = $props();

	let showCredit = $state(false);
</script>

<div class="review-artwork-container">
	<figure>
		<img
			class="album-cover"
			src={review.featuredimage['small-square']}
			alt={`Album artwork of '${review.album}' by ${review.artist}`}
		/>
		{#if review.artworkCredit}
			<figcaption class={showCredit ? 'show' : 'hide'}>
				The album artwork of <span class="album-name">{review.album}</span> by {review.artist}
				{review.artworkCredit}
				{#if review.artworkCreditSource}
					<a class="source-link" href={review.artworkCreditSource} target="_blank">
						Source <Icon icon={icons.externalLink} size={12} color="#dd0e3e" />
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
				<InfoIcon inverted={!showCredit} />
			</div>
		{/if}
	</figure>
</div>

<style>
	.review-artwork-container {
		position: relative;
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
	}
	figure {
		position: relative;
		margin: 0;
		* {
			font-size: 0.9rem;
		}
	}
	figcaption {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 1rem 3rem 1rem 1rem;
		color: lightgray;
		line-height: 1.2;
		background-color: rgba(0, 0, 0, 0.7);
	}
	.source-link {
		text-decoration: none;
		font-weight: bold;
		white-space: nowrap;
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
