<script lang="ts">
	import type { NavSection } from '$lib/types/navigation';
	import { icons } from '$lib/styles/icons';
	import Icon from '$lib/components/Icon.svelte';

	let { links }: { links: NavSection[] } = $props();

	let displaySubLinks = $state(false);

	const toggleSubLinks = () => {
		displaySubLinks = !displaySubLinks;
	};
</script>

<nav>
	<ul class="pillars">
		{#each links as item}
			<li>
				{#if item.name === 'More'}
					<div
						class="more"
						onclick={toggleSubLinks}
						onkeydown={toggleSubLinks}
						tabindex="0"
						role="button"
					>
						{item.name}
						<Icon
							icon={displaySubLinks ? icons.upChevron : icons.downChevron}
							color="white"
							size={15}
						/>
					</div>
				{:else}
					<a
						href={item.link}
						onclick={() => {
							if (displaySubLinks) {
								toggleSubLinks();
							}
						}}>{item.name}</a
					>
				{/if}
			</li>
		{/each}
	</ul>
	{#if displaySubLinks}
		<div class="sub-links">
			{#each links as item}
				{#if item.subLinks}
					<ul>
						{#each item.subLinks as link}
							<li><a href={link.link} onclick={toggleSubLinks}>{link.name}</a></li>
						{/each}
					</ul>
				{:else}
					<ul></ul>
				{/if}
			{/each}
		</div>
	{/if}
</nav>

<style>
	a {
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		text-decoration: none;
	}
	.pillars,
	.sub-links {
		display: flex;
		flex-direction: row;
	}
	.pillars li,
	.sub-links ul {
		width: 150px;
	}
	.sub-links {
		margin-top: 0.5rem;
		position: absolute;
		background-color: black;
		z-index: 5;
		padding: 0 0 1rem 0;
	}
	.sub-links::before {
		content: '';
		position: absolute;
		top: 0;
		left: -50px;
		width: 100vw;
		height: 100%;
		background-color: black;
		z-index: -1;
		overflow: hidden;
	}
	.sub-links li {
		padding: 0.4rem 0;
	}
	.more {
		color: white;
		&:hover {
			cursor: pointer;
		}
	}
	nav {
		display: none;
	}
	@media (min-width: 1024px) {
		nav {
			display: block;
		}
	}
</style>
