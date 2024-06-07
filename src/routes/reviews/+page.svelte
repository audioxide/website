<script lang="ts">
	export let data;
</script>

<h1>Reviews</h1>
{#each data.reviews as review}
	<a href={`/reviews/${review.metadata.slug}`}>
		<h2>{review.metadata.title}</h2>
		<p>{review.metadata.artist}</p>
	</a>
{/each}
