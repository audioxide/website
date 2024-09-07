<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Album Reviews // {SITE_NAME}</title>
	<meta name="description" content="Music reviews, articles, and interviews." />
</svelte:head>

<h1>Reviews</h1>
{#each data.reviews as review}
	<a href={`/reviews/${review.metadata.slug}`}>
		<h2>{review.metadata.title}</h2>
		<p>{review.metadata.artist}</p>
	</a>
{/each}
