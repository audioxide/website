<script lang="ts">
	import SearchResults from '$lib/components/SearchResults.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let { data } = $props();

	const { searchTerm, searchResults } = data;

	const hasPostResults = searchResults.posts && searchResults.posts.length > 0;
	const hasTagResults = searchResults.tags && searchResults.tags.length > 0;
</script>

<svelte:head>
	<title>Search results for '{searchTerm}'</title>
	<meta name="description" content="Search for posts on the site." />
	<meta name="robots" content="noindex" />
</svelte:head>

<SectionHeader header={`Search results for '${searchTerm}'`} />

{#if hasPostResults || hasTagResults}
	<SearchResults {searchResults} />
{:else}
	<div class="no-results-message">No results found.</div>
{/if}

<style>
	.no-results-message {
		font-family: 'Source Sans Pro', sans-serif;
		text-align: center;
	}
</style>
