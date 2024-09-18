<script lang="ts">
	import { NAVIGATION_LINKS, SITE_NAME } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import Icon from '../Icon.svelte';
	import LogoPlain from '../logos/LogoPlain.svelte';
	import HeaderMenuMobile from './HeaderMenuMobile.svelte';
	import HeaderSearchBar from './HeaderSearchBar.svelte';

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

	let showMobileMenu = $state(false);

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
		<div
			class="burger"
			onclick={() => (showMobileMenu = !showMobileMenu)}
			aria-label="Toggle menu on"
		>
			<Icon icon={icons.bars} color="lightgray" />
		</div>
		{#if showMobileMenu}
			<HeaderMenuMobile bind:showMobileMenu />
		{/if}
		<a href="/">
			<div class="logo-container">
				<h1>{SITE_NAME}</h1>
				<LogoPlain />
			</div>
		</a>
		<div class="search">
			<HeaderSearchBar />
		</div>
		<nav>
			<ul>
				{#each NAVIGATION_LINKS as item}
					<li>
						<a href={item.link}>{item.name}</a>
						<!-- {#if item.subLinks}
							<ul class="sublinks">
								{#each item.subLinks as subItem}
									<li>
										<a href={subItem.link}>{subItem.name}</a>
									</li>
								{/each}
							</ul>
						{/if} -->
					</li>
				{/each}
			</ul>
		</nav>
	</div>
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
	.burger {
		display: flex;
		align-items: center;
	}
	header {
		background-color: #000;
		padding: 0 0 1rem 0;
	}
	.top-bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}
	a {
		font-family: 'Source Sans Pro', sans-serif;
		color: #fff;
		text-decoration: none;
		display: flex;
		align-items: center;
	}
	h1 {
		font-family: 'Rounded Elegance', sans-serif;
		font-size: 2rem;
		text-transform: lowercase;
		font-weight: 400;
	}
	nav {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}
	.sublinks {
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	ul {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}
	.album-banner {
		display: flex;
		flex-direction: row;
		border-top: 1px solid #c9c9c9;
		border-bottom: 1px solid #c9c9c9;
	}
	.tablet,
	.desktop,
	.search,
	nav {
		display: none;
	}
	@media (min-width: 768px) {
		.burger {
			display: none;
		}
		.tablet,
		.search,
		nav {
			display: block;
		}
		.top-bar {
			flex-direction: row-reverse;
			justify-content: space-between;
			padding: 0.5rem 2rem;
		}
	}
	@media (min-width: 1024px) {
		.desktop {
			display: block;
		}
	}
</style>
