<script lang="ts">
	import type { SharedPostMetadata } from '$lib/types/shared';

	let { post }: { post: SharedPostMetadata } = $props();

	const imageAspectRatio =
		post.type === 'reviews' || post.type === 'listening-parties' ? '1 / 1' : '3 / 2';
</script>

<a href={`/${post.type}/${post.slug}`}>
	<div class="post-container">
		<img
			loading="lazy"
			class="post-image"
			src={post.featuredimage['medium-original']}
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
		color: #555;
	}
	.author {
		font-size: 0.9rem;
		font-weight: bold;
		color: #555;
	}
	.type {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-size: 0.8rem;
		color: black;
	}
	/* @media (min-width: 768px) {
		.post-container {
			display: grid;
			grid-template-columns: 1fr 2fr;
			gap: 1rem;
		}
		.post-image {
			grid-area: 1 / 2 / 2 / 3;
		}
		.post-info {
			grid-area: 1 / 1 / 2 / 2;
			width: 100%;
			height: 100%;
			object-fit: cover;
			padding: 0;
		}
	} */
</style>
