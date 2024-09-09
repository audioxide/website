<script lang="ts">
	import type { ContentBlock } from '$lib/types/shared';

	let {
		contentBlock,
		primaryColor,
		isLast = false
	}: {
		contentBlock: ContentBlock;
		primaryColor: string;
		isLast?: boolean;
	} = $props();
</script>

<div class="content-block" style="--primary-color: {primaryColor}">
	<h3>{contentBlock.author.authors[0].forename}</h3>
	{@html contentBlock.review}
	<div class="fav-tracks">
		<h4>Favourite tracks //</h4>
		<ul>
			{#each contentBlock.tracks as track, i}
				<li style="margin-left: {i}rem">{track}</li>
			{/each}
		</ul>
	</div>
	<div class="score">
		<span class="score-given">{contentBlock.score.score}</span>
		/{contentBlock.score.max}
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
	.content-block {
		position: relative;
		margin-bottom: 2rem;
	}
	.fav-tracks {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	li {
		font-family: 'Spectral', serif;
	}
	.score {
		font-size: 1.5rem;
		font-weight: bold;
		border: 3px solid var(--gray-color);
		padding: 1rem;
		width: fit-content;
		border-radius: 50%;
		position: absolute;
		right: 0;
		bottom: 0;
	}
	.score-given {
		color: var(--primary-color);
		font-size: 1.8rem;
	}
</style>
