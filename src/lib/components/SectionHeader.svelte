<script lang="ts">
	let {
		header,
		seeAllSlug
	}: {
		header: string;
		seeAllSlug?: string;
	} = $props();
</script>

<h2>
	{header}
	{#if seeAllSlug}
		(<a href={`/${seeAllSlug}`}>See all</a>)
	{/if}
</h2>

<style>
	h2,
	a {
		font-family: 'Spectral SC', serif;
		font-weight: 300;
		font-size: 1.2rem;
		font-style: italic;
	}
	h2 {
		font-size: 1.2rem;
		margin-bottom: 1rem;
		padding: 0.8rem 0;
		text-align: center;
		border-top: 2px solid var(--gray-color);
		border-bottom: 2px solid var(--gray-color);
	}
</style>
