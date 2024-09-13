<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';
	import { getAuthorLink } from '../../utils';

	let { authors }: { authors: AuthorObject[] } = $props();
</script>

<div class="authors">
	By {#each authors as author, i}
		{#if author.links}
			<a href={getAuthorLink(author.links, author.slug)}>
				{author.name}
			</a>{i === authors.length - 1 ? '' : i === authors.length - 2 ? ', and ' : ', '}
		{:else}
			{author.name}{i === authors.length - 1 ? '' : i === authors.length - 2 ? ', and ' : ', '}
		{/if}
	{/each}
</div>

<style>
	.authors {
		margin-bottom: 2rem;
	}
	.authors,
	.authors a {
		font-size: 0.9rem;
	}
</style>
