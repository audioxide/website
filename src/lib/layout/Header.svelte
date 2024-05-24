<script lang="ts">
	const { recentReviews } = $props();
	const covers = recentReviews.map((review) => {
		return {
			cover: review.metadata.featuredimage['medium-square'],
			slug: review.metadata.slug
		};
	});
</script>

<header>
	<div class="top-bar">
		<a href="/"><h1>Audioxide</h1></a>
		<nav>
			<ul>
				<li><a href="/reviews">Album Reviews</a></li>
				<li><a href="/features">Articles</a></li>
				<li><a href="/interviews">Interviews</a></li>
			</ul>
		</nav>
	</div>

	<div class="album-banner">
		{#each covers as cover}
			<a href={`/reviews/${cover.slug}`}>
				<img src={cover.cover} alt="" />
			</a>
		{/each}
	</div>
</header>

<style>
	header {
		background-color: #000;
		padding: 0 0 1rem 0;
	}
	.top-bar {
		display: flex;
		flex-direction: row-reverse;
		height: 3rem;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 3rem;
	}
	a {
		font-family: 'Source Sans Pro', sans-serif;

		color: #fff;
		text-decoration: none;
	}
	h1 {
		font-family: 'Rounded Elegance', sans-serif;
		font-size: 2.4rem;
		text-transform: lowercase;
		font-weight: 400;
	}
	li {
		font-size: 1.6rem;
		display: inline;
		margin-right: 2rem;
		list-style-type: none;
	}
	.album-banner {
		display: flex;
		justify-content: space-between;
		height: 175px;
		overflow: hidden;
		border-top: 1px solid #fff;
		border-bottom: 1px solid #fff;
	}
</style>
