<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';
	import PostCredits from '../posts/PostCredits.svelte';
	import PostDate from '../posts/PostDate.svelte';

	let {
		dateCreated,
		albumTitle,
		artistName,
		authors,
		primaryColor,
		secondaryColor
	}: {
		dateCreated: string;
		albumTitle: string;
		artistName: string;
		authors: AuthorObject[];
		primaryColor: string;
		secondaryColor: string;
	} = $props();
</script>

<div
	class="header-container"
	style="--primary-color: {primaryColor}; --secondary-color: {secondaryColor}"
>
	<PostDate datePublished={dateCreated} />
	<div>
		<h2 class="album-title">{albumTitle}</h2>
		<h2 class="artist-name">{artistName}</h2>
	</div>

	<PostCredits {authors} isReview />
</div>

<style>
	.header-container {
		font-family: 'Source Sans Pro', sans-serif;
		border-bottom: 5px solid var(--primary-color);
		color: gray;
		line-height: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.album-title {
		font-size: 2.5rem;
		color: var(--primary-color);
		font-style: italic;
	}
	.artist-name {
		color: black;
		font-size: 2.3rem;
		font-weight: 500;
	}
</style>
