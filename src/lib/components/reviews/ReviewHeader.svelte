<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';

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

	// Format date as DD.MM.0YYYY. Be sure to include the 0 in front of the year.
	const prettifyDate = (date: string): string => {
		const asDate = new Date(date);
		const day = asDate.getDate().toString().padStart(2, '0');
		const month = (asDate.getMonth() + 1).toString().padStart(2, '0');
		const year = asDate.getFullYear().toString().padStart(4, '0');
		return `${day}.${month}.0${year}`;
	};
</script>

<div
	class="header-container"
	style="--primary-color: {primaryColor}; --secondary-color: {secondaryColor}"
>
	<time class="publication-date" datetime={dateCreated}>{prettifyDate(dateCreated)}</time>

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
