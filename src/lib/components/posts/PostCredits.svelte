<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';

	let { authors, isReview }: { authors: AuthorObject[]; isReview: boolean } = $props();
</script>

<div class="authors">
	{isReview ? 'Review by' : 'By'}
	{#each authors as author, i}
		<a href={`/authors/${author.slug}`}>
			{author.name}
		</a>{i === authors.length - 1 ? '' : i === authors.length - 2 ? ' and ' : ', '}
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
