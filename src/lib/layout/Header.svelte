<script lang="ts">
	const covers = [
		'https://audioxide.com/api/images/album-artwork/for-your-pleasure-roxy-music-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/ants-from-up-there-black-country-new-road-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/crawler-idles-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/hushed-and-grim-mastodon-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/skin-joy-crookes-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/friends-that-break-your-heart-james-blake-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/pinkerton-weezer-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/electric-warrior-t-rex-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/sinner-get-ready-lingua-ignota-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/donda-kanye-west-xsmall-square.jpg',
		'https://audioxide.com/api/images/album-artwork/is-this-it-the-strokes-xsmall-square.jpg'
	];
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
			<a href="#">
				<img src={cover} alt="" />
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
