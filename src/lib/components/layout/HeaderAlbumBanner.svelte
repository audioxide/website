<script lang="ts">
	let {
		covers
	}: {
		covers: {
			cover: string;
			slug: string;
		}[];
	} = $props();

	const assignClass = (i: number) => {
		if (i < 4) return '';
		if (i >= 4 && i < 7) return 'tablet';
		if (i > 7) return 'desktop';
		else return '';
	};
</script>

<div class="album-banner">
	{#each covers as cover, i}
		<a href={`/reviews/${cover.slug}`} class={assignClass(i)}>
			<img src={cover.cover} alt="" />
		</a>
	{/each}
</div>

<style>
	.album-banner {
		display: flex;
		flex-direction: row;
		border-top: 1px solid #c9c9c9;
		border-bottom: 1px solid #c9c9c9;
	}
	.tablet,
	.desktop {
		display: none;
	}
	@media (min-width: 768px) {
		.burger {
			display: none;
		}
		.tablet,
		.search {
			display: block;
		}
		.top-bar {
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 0.5rem 2rem;
		}
	}
	@media (min-width: 1024px) {
		.desktop {
			display: block;
		}
	}
</style>
