<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	const {
		recentReviews
	}: {
		recentReviews: {
			image: string;
			score: number;
			artist: string;
			album: string;
			slug: string;
		}[];
	} = $props();
	const covers = recentReviews.map((review) => {
		return {
			cover: review.image,
			slug: review.slug
		};
	});
	const assignClass = (i: number) => {
		if (i < 4) return '';
		if (i >= 4 && i < 7) return 'tablet';
		if (i > 7) return 'desktop';
		else return '';
	};
</script>

<header>
	<div class="top-bar">
		<a href="/">
			<div class="logo-container">
				<h1>{SITE_NAME}</h1>
				<img class="logo-icon" src="/favicon.png" alt="" />
			</div>
		</a>
	</div>
	<!-- <nav>
		<ul>
			<li><a href="/reviews">Album Reviews</a></li>
			<li><a href="/features">Articles</a></li>
			<li><a href="/interviews">Interviews</a></li>
		</ul>
	</nav> -->

	<div class="album-banner">
		{#each covers as cover, i}
			<a href={`/reviews/${cover.slug}`} class={assignClass(i)}>
				<img src={cover.cover} alt="" />
			</a>
		{/each}
	</div>
</header>

<style>
	.logo-container {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		align-items: center;
	}
	.logo-icon {
		height: 2rem;
		width: 2rem;
	}
	header {
		background-color: #000;
		padding: 0 0 1rem 0;
	}
	.top-bar {
		display: flex;
		flex-direction: row-reverse;
		padding: 0.5rem 0.5rem;
	}
	a {
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		text-decoration: none;
	}
	h1 {
		font-family: 'Rounded Elegance', sans-serif;
		font-size: 2rem;
		text-transform: lowercase;
		font-weight: 400;
	}
	li {
		font-size: 1.2rem;
		display: inline;
		margin-right: 1rem;
		list-style-type: none;
	}
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
		.tablet {
			display: block;
		}
	}
	@media (min-width: 1024px) {
		.desktop {
			display: block;
		}
	}
</style>
