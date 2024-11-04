<script lang="ts">
	import type { NavSection } from '$lib/types/navigation';

	let { links }: { links: NavSection[] } = $props();
</script>

<nav>
	<ul>
		{#each links as item}
			<li>
				{#if item.name !== 'More'}
					<a href={item.link}>{item.name}</a>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	a {
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		text-decoration: none;
	}
	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}
	ul {
		display: flex;
		flex-direction: row;
		gap: 3rem;
	}
	nav {
		display: none;
	}
	@media (min-width: 768px) {
		nav {
			display: block;
		}
	}
</style>
