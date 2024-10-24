<script lang="ts">
	import { NAVIGATION_LINKS } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import FeedYourHead from '../FeedYourHead.svelte';
	import Icon from '../Icon.svelte';
	import HeaderSearchBar from './HeaderSearchBar.svelte';

	let { showMobileMenu = $bindable() } = $props();

	const hideMenu = () => {
		showMobileMenu = false;
	};
</script>

<div class="mobile-menu">
	<div class="x-symbol" aria-label="Toggle menu off" onclick={() => (showMobileMenu = false)}>
		<Icon icon={icons.xSymbol} color="lightgray" />
	</div>
	<HeaderSearchBar />
	{#each NAVIGATION_LINKS as item}
		<a href={item.link} onclick={() => hideMenu()}><h3>{item.name}</h3></a>
		<ul>
			{#if item.subLinks}
				{#each item.subLinks as link}
					<li><a href={link.link} onclick={() => hideMenu()}>{link.name}</a></li>
				{/each}
			{/if}
		</ul>
	{/each}
	<FeedYourHead />
</div>

<style>
	.mobile-menu {
		color: lightgray;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
