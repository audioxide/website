<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';

	let { post }: { post: SharedPostMetadata } = $props();
</script>

<a href={`/${post.type}/${post.slug}`}>
	<div class="post-summary">
		<img src={post.featuredimage['medium-original']} alt={post.featuredimageAlt} />
		<div class="post-info">
			<h2>{post.title}</h2>
			<div class="summary">{post.summary}</div>
			<!-- <div class="type">{post.type}</div> -->
		</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
	}
	.post-summary {
		display: block;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 8px;
	}
	.post-info {
		padding: 2rem;
	}
	.summary {
		font-size: 0.9rem;
		color: #555;
	}
	.type {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.8rem;
		color: black;
	}
</style>
