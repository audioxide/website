<script lang="ts">
	import { icons } from '$lib/styles/icons';
	import type { NavSection } from '$lib/types/navigation';
	import FeedYourHead from '../FeedYourHead.svelte';
	import Icon from '../Icon.svelte';
	import HeaderLogo from './HeaderLogo.svelte';
	import HeaderSearchBar from './HeaderSearchBar.svelte';

	let {
		links,
		toggleMobileMenu
	}: {
		links: NavSection[];
		toggleMobileMenu: () => void;
	} = $props();
</script>

<div class="mobile-menu">
	<div class="top-bar">
		<div
			class="x-symbol"
			aria-label="Toggle menu off"
			onclick={toggleMobileMenu}
			onkeydown={toggleMobileMenu}
			tabindex="0"
			role="button"
		>
			<Icon icon={icons.xSymbol} color="lightgray" />
		</div>
		<div onclick={toggleMobileMenu} onkeydown={toggleMobileMenu} tabindex="0" role="button">
			<HeaderLogo />
		</div>
	</div>

	<HeaderSearchBar />
	{#each links as item}
		<a href={item.link} onclick={toggleMobileMenu}><h3>{item.name}</h3></a>
		<ul>
			{#if item.subLinks}
				{#each item.subLinks as link}
					<li><a href={link.link} onclick={toggleMobileMenu}>{link.name}</a></li>
				{/each}
			{/if}
		</ul>
	{/each}
	<div onclick={toggleMobileMenu} onkeydown={toggleMobileMenu} tabindex="0" role="button">
		<FeedYourHead />
	</div>
</div>

<style>
	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.mobile-menu {
		color: lightgray;
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		padding: 0.5rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
	}
	a {
		color: lightgray;
		text-decoration: none;
	}
	li {
		margin-left: 1rem;
	}
	.x-symbol {
		display: flex;
		align-items: center;
	}
</style>
