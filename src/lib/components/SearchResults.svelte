<script lang="ts">
	import type { SearchResponse } from '$lib/types/search';
	import PostTags from './posts/PostTags.svelte';

	let {
		searchResults
	}: {
		searchResults: SearchResponse;
	} = $props();
</script>

<div class="search-results">
	{#if searchResults.posts && searchResults.posts.length > 0}
		<div class="results-section">
			<h3>Posts</h3>
			<ul>
				{#each searchResults.posts as post}
					<li>
						<a href={post.route}>{post.title}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	{#if searchResults.tags && searchResults.tags.length > 0}
		<div class="results-section">
			<h3>Tags</h3>
			<PostTags relatedTags={searchResults.tags.map((tag) => tag.route.replace('/tags/', ''))} />
		</div>
	{/if}
</div>

<style>
	h3 {
		font-family: 'Source Sans Pro', sans-serif;
		text-transform: uppercase;
	}
	.search-results {
		background-color: white;
		padding: 1rem;
		border: none;
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	.results-section {
		margin-bottom: 1rem;
	}
	li {
		margin-bottom: 0.5rem;
	}
</style>
