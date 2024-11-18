<script lang="ts">
	import { icons } from '$lib/styles/icons';
	import Icon from '../Icon.svelte';

	let searchTerm = $state('');

	function handleSearch() {
		window.location.href = `/search?q=${searchTerm}`;
	}
</script>

<div class="search-container">
	<div class="search-icon">
		<Icon icon={icons.magnifyingGlass} size={24} />
	</div>
	<input
		type="text"
		placeholder="Search..."
		class="search-input"
		bind:value={searchTerm}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				handleSearch();
			}
		}}
	/>
</div>

<style>
	.search-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.search-icon {
		position: absolute;
		left: 10px;
		display: flex;
		align-items: center;
		height: 100%;
	}
	.search-input {
		border: 1px solid white;
		border-radius: 20px;
		padding: 10px;
		width: 100%;
		max-width: 500px;
		font-size: 16px;
		padding-left: 40px;
	}

	.search-input:focus {
		border-color: var(--link-color);
		outline: none;
	}
</style>
