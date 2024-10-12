<script lang="ts">
	import { API_URL } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import Icon from '../Icon.svelte';

	let searchTerm = $state('');
	let searchResults: {
		[key: string]: {
			route: string;
			title: string;
		}[];
	} = {};

	const handleSearch = () => {
		console.log(searchTerm);
		const searchUrl = `${API_URL}/search?term=${searchTerm}`;
		fetch(searchUrl)
			.then((response) => response.json())
			.then((data) => (searchResults = data))
			.catch((error) => {
				console.error('Error fetching search results:', error);
			});
	};
</script>

<div class="search-container">
	<!-- <Icon icon={icons.magnifyingGlass} /> -->
	<input
		type="text"
		placeholder="Search..."
		class="search-input"
		bind:value={searchTerm}
		oninput={() => handleSearch()}
	/>
</div>

<style>
	.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.search-input {
		border: 1px solid #ccc;
		border-radius: 20px;
		padding: 10px;
		width: 100%;
		max-width: 400px;
		font-size: 16px;
	}

	.search-input:focus {
		border-color: var(--link-color);
		outline: none;
	}
</style>
