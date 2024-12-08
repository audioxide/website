<script lang="ts">
	import type { ReviewSection } from '$lib/types/shared';
	import ContentBlock from '../ContentBlock.svelte';
	let {
		contentBlock,
		primaryColor,
		isLast = false
	}: {
		contentBlock: ReviewSection;
		primaryColor: string;
		isLast?: boolean;
	} = $props();
</script>

<div class="review-block" style="--primary-color: {primaryColor}">
	<h3>{contentBlock.author.authors[0].forename}</h3>
	<ContentBlock html={contentBlock.review} />
	<div class="tracks-and-scores-container">
		{#if contentBlock.tracks}
			<div class="fav-tracks">
				<h4>Favourite tracks //</h4>
				<ol>
					{#each contentBlock.tracks as track, i}
						<li style="margin-left: {i}rem">{track}</li>
					{/each}
				</ol>
			</div>
		{/if}
		{#if contentBlock.score}
			<div class="score">
				<span class="score-given">{contentBlock.score.score}</span>
				/{contentBlock.score.max}
			</div>
		{/if}
	</div>
</div>
{#if !isLast}
	<hr />
{/if}

<style>
	h3 {
		font-size: 1.3rem;
		margin: 1rem 0;
	}
	.review-block {
		margin-bottom: 2rem;
	}
	.tracks-and-scores-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
	}
	.fav-tracks {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: flex-start;
	}
	ol {
		list-style-type: none;
		padding: 0;
	}
	li {
		font-family: 'Spectral', serif;
		list-style-type: none;
	}
	.score {
		font-size: 1.5rem;
		font-weight: bold;
		border: 3px solid var(--gray-color);
		padding: 1rem;
		width: fit-content;
		border-radius: 50%;
		align-self: flex-end;
	}
	.score-given {
		color: var(--primary-color);
		font-size: 1.8rem;
	}
	@media (min-width: 768px) {
		.tracks-and-scores-container {
			flex-direction: row;
		}
	}
</style>
