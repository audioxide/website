<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';
	import PostSummaryCard from './PostSummaryCard.svelte';

	let {
		posts,
		itemsPerRowDesktop = 4,
		flatPosts = false
	}: {
		posts: {
			metadata: SharedPostMetadata;
		}[];
		itemsPerRowDesktop?: number;
		flatPosts?: boolean;
	} = $props();
</script>

<div class="posts-container" style="--items-per-row-desktop: {itemsPerRowDesktop}">
	{#each posts as post}
		<PostSummaryCard
			image={post.metadata.featuredimage['small-original']}
			title={post.metadata.title}
			aspectRatio={post.metadata.type === 'reviews' || post.metadata.type === 'listening-parties'
				? '1 / 1'
				: '3 / 2'}
			link={`/${post.metadata.type}/${post.metadata.slug}`}
			blurb={post.metadata.blurb}
			isFlatView={flatPosts}
			primaryColor={post.metadata.colours ? post.metadata.colours[0] : undefined}
		/>
	{/each}
</div>

<style>
	.posts-container {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 1rem;
	}
	@media (min-width: 768px) {
		.posts-container {
			grid-template-columns: repeat(var(--items-per-row-desktop), 1fr);
		}
	}
</style>
