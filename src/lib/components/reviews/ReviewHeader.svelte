<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';
	import PostDate from '../PostDate.svelte';

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

	<div class="authors">
		Review by {#each authors as author}
			<a href={`https://x.com/${author.links.twitter}`}>{author.name}</a>{author ===
			authors[authors.length - 1]
				? ''
				: author === authors[authors.length - 2]
					? ', and '
					: ', '}
		{/each}
	</div>
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
	.authors {
		margin-bottom: 2rem;
		font-size: 0.9rem;
	}
	.authors a {
		font-size: 0.9rem;
	}
</style>
