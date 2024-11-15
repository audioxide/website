<script lang="ts">
	import { API_URL } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import type { SearchResponse } from '$lib/types/search';
	import Icon from '../Icon.svelte';
	import SearchResults from '../SearchResults.svelte';

	// const dummyData = {
	// 	posts: [
	// 		{
	// 			route: '/reviews/the-beatles-abbey-road',
	// 			title: 'Abbey Road // The Beatles'
	// 		},
	// 		{
	// 			route: '/reviews/the-beatles-revolver',
	// 			title: 'Revolver // The Beatles'
	// 		}
	// 	],
	// 	tags: [
	// 		{
	// 			title: 'the beatles',
	// 			route: '/tags/the-beatles'
	// 		}
	// 	]
	// };

	let searchTerm = $state('');
	let searchResults: SearchResponse = $state({});
	let searchIsOpen = $state(false);

	const handleSearch = () => {
		const searchUrl = `${API_URL}/search?term=${searchTerm}`;
		fetch(searchUrl)
			.then((response) => response.json())
			.then((data) => (searchResults = data))
			.catch((error) => {
				console.error('Error fetching search results:', error);
			});
	};

	document.addEventListener('click', (event) => {
		const searchInput = document.querySelector('.search-input');
		if (searchInput && !searchInput.contains(event.target as Node)) {
			searchIsOpen = false;
		}
	});
</script>

<div class="search-container">
	<!-- <Icon icon={icons.magnifyingGlass} /> -->
	<input
		type="text"
		placeholder="Search..."
		class="search-input"
		bind:value={searchTerm}
		oninput={() => handleSearch()}
		onclick={() => (searchIsOpen = true)}
		class:no-bottom-corners={searchIsOpen}
	/>
	{#if searchIsOpen}
		<div class="results-wrapper">
			<SearchResults {searchResults} />
		</div>
	{/if}
</div>

<style>
	.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.search-input {
		border: 1px solid white;
		border-radius: 20px;
		padding: 10px;
		width: 100%;
		max-width: 500px;
		font-size: 16px;
	}

	.search-input:focus {
		border-color: var(--link-color);
		outline: none;
	}
	.results-wrapper {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
	}
	.no-bottom-corners {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
</style>
