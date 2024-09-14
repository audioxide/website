<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';
	import PostSummaryCard from './PostSummaryCard.svelte';

	let {
		posts
	}: {
		posts: {
			metadata: SharedPostMetadata;
		}[];
	} = $props();
</script>

<div class="posts-container">
	{#each posts as post}
		<PostSummaryCard
			image={post.metadata.type === 'reviews' || post.metadata.type === 'listening-parties'
				? post.metadata.featuredimage['medium-square']
				: post.metadata.featuredimage['medium-standard']}
			title={post.metadata.title}
			link={`/${post.metadata.type}/${post.metadata.slug}`}
			blurb={post.metadata.blurb}
			primaryColor={post.metadata.colours ? post.metadata.colours[0] : undefined}
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
