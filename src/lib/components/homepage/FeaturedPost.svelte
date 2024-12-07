<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';
	import { imageUrlHack } from '../../../utils';

	let { post }: { post: SharedPostMetadata } = $props();

	const imageAspectRatio =
		post.type === 'reviews' || post.type === 'listening-parties' ? '1 / 1' : '3 / 2';
</script>

<a href={`/${post.type}/${post.slug}`}>
	<div class="post-container">
		<img
			class="post-image"
			src={imageUrlHack(post.featuredimage['medium-original'])}
			alt={post.featuredimageAlt}
			style={`aspect-ratio: ${imageAspectRatio};`}
		/>
		<div class="post-info">
			<h2>{post.title}</h2>
			<div class="summary">{post.summary}</div>
			<div class="author">By {post.author.name}</div>
		</div>
	</div>
</a>

<style>
	a {
		text-decoration: none;
	}
	.post-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.post-image {
		border-radius: 5px;
	}
	.post-info {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h2 {
		font-size: 1.4rem;
		line-height: 1.2;
		text-decoration: underline;
	}
	.summary {
		font-size: 1rem;
		font-family: 'Spectral', serif;
		color: black;
	}
	.author {
		font-size: 0.9rem;
		font-weight: bold;
		color: black;
	}
</style>
