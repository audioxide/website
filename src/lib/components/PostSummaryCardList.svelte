<script lang="ts">
	import PostSummaryCard from './PostSummaryCard.svelte';

	let {
		posts
	}: {
		posts: any[];
	} = $props();
</script>

<div class="posts-container">
	{#each posts as post}
		<PostSummaryCard
			image={post.metadata.featuredimage['medium-square']}
			title={post.metadata.title}
			link={`/${post.metadata.type}/${post.metadata.slug}`}
			blurb={post.metadata.blurb}
			primaryColor={post.metadata.colours ? post.metadata.colours[0] : 'lightgray'}
		/>
	{/each}
</div>

<style>
	.posts-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
	}
</style>
