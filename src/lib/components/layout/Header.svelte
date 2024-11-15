<script lang="ts">
	import { NAVIGATION_LINKS, SITE_NAME } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import type { RecentReviewSummary } from '$lib/types/reviews';
	import Icon from '../Icon.svelte';
	import HeaderAlbumBanner from './HeaderAlbumBanner.svelte';
	import HeaderLogo from './HeaderLogo.svelte';
	import HeaderMenuDesktop from './HeaderNavDesktop.svelte';
	import HeaderMenuMobile from './HeaderNavMobile.svelte';
	import HeaderSearchBar from './HeaderSearchBar.svelte';

	const {
		recentReviews
	}: {
		recentReviews: RecentReviewSummary[];
	} = $props();

	let showMobileMenu = $state(false);

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
	};
</script>

<header>
	<div class="top-bar">
		<div
			class="burger"
			onclick={toggleMobileMenu}
			onkeydown={toggleMobileMenu}
			tabindex="0"
			role="button"
			aria-label="Toggle menu on"
		>
			<Icon icon={icons.bars} color="lightgray" />
		</div>
		{#if showMobileMenu}
			<HeaderMenuMobile links={NAVIGATION_LINKS} {toggleMobileMenu} />
		{/if}
		<HeaderLogo />
		<div class="search">
			<HeaderSearchBar />
		</div>
		<HeaderMenuDesktop links={NAVIGATION_LINKS} />
	</div>
	<HeaderAlbumBanner {recentReviews} />
</header>

<style>
	header {
		background-color: #000;
		padding: 0 0 1rem 0;
	}
	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
	}
	.burger {
		display: flex;
		align-items: center;
	}
	.search {
		display: none;
	}
	@media (min-width: 768px) {
		.burger {
			display: none;
		}
		.search {
			display: block;
		}
		.top-bar {
			flex-direction: row-reverse;
			padding: 0.5rem 2rem;
		}
	}
</style>
