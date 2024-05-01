<script lang="ts">
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<Header />
{@render children()}
<Footer />

<style>
	@font-face {
		font-family: 'Rounded Elegance';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			local('Rounded Elegance'),
			local('Rounded-Elegance'),
			url('/fonts/rounded-elegance/rounded-elegance.woff2') format('woff2'),
			url('/fonts/rounded-elegance/rounded-elegance.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral SC';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src:
			local('Spectral SC Medium'),
			local('SpectralSC-Medium'),
			url('/fonts/spectral-sc/spectral-sc-500.woff2') format('woff2'),
			url('/fonts/spectral-sc/spectral-sc-500.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral SC';
		font-style: italic;
		font-weight: 500;
		font-display: swap;
		src:
			local('Spectral SC Medium Italic'),
			local('SpectralSC-MediumItalic'),
			url('/fonts/spectral-sc/spectral-sc-500-italic.woff2') format('woff2'),
			url('/fonts/spectral-sc/spectral-sc-500-italic.woff') format('woff');
	}

	@font-face {
		font-family: 'Spectral';
		font-style: normal;
		font-weight: 200;
		font-display: swap;
		src:
			local('Spectral ExtraLight'),
			local('Spectral-ExtraLight'),
			url('/fonts/spectral/spectral-200.woff2') format('woff2'),
			url('/fonts/spectral/spectral-200.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral';
		font-style: italic;
		font-weight: 200;
		font-display: swap;
		src:
			local('Spectral ExtraLight Italic'),
			local('Spectral-ExtraLightItalic'),
			url('/fonts/spectral/spectral-200-italic.woff2') format('woff2'),
			url('/fonts/spectral/spectral-200-italic.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			local('Spectral Regular'),
			local('Spectral-Regular'),
			url('/fonts/spectral/spectral-regular.woff2') format('woff2'),
			url('/fonts/spectral/spectral-regular.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral';
		font-style: italic;
		font-weight: 400;
		font-display: swap;
		src:
			local('Spectral Italic'),
			local('Spectral-Italic'),
			url('/fonts/spectral/spectral-italic.woff2') format('woff2'),
			url('/fonts/spectral/spectral-italic.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src:
			local('Spectral SemiBold'),
			local('Spectral-SemiBold'),
			url('/fonts/spectral/spectral-600.woff2') format('woff2'),
			url('/fonts/spectral/spectral-600.woff') format('woff');
	}
	@font-face {
		font-family: 'Spectral';
		font-style: italic;
		font-weight: 600;
		font-display: swap;
		src:
			local('Spectral SemiBold Italic'),
			local('Spectral-SemiBoldItalic'),
			url('/fonts/spectral/spectral-600-italic.woff2') format('woff2'),
			url('/fonts/spectral/spectral-600-italic.woff') format('woff');
	}

	@font-face {
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			local('Source Sans Pro Regular'),
			local('SourceSansPro-Regular'),
			url('/fonts/source-sans-pro/source-sans-pro-regular.woff2') format('woff2'),
			url('/fonts/source-sans-pro/source-sans-pro-regular.woff') format('woff');
	}
	@font-face {
		font-family: 'Source Sans Pro';
		font-style: italic;
		font-weight: 400;
		font-display: swap;
		src:
			local('Source Sans Pro Italic'),
			local('SourceSansPro-Italic'),
			url('/fonts/source-sans-pro/source-sans-pro-italic.woff2') format('woff2'),
			url('/fonts/source-sans-pro/source-sans-pro-italic.woff') format('woff');
	}
	@font-face {
		font-family: 'Source Sans Pro';
		font-style: italic;
		font-weight: 600;
		font-display: swap;
		src:
			local('Source Sans Pro SemiBold Italic'),
			local('SourceSansPro-SemiBoldItalic'),
			url('/fonts/source-sans-pro/source-sans-pro-600-italic.woff2') format('woff2'),
			url('/fonts/source-sans-pro/source-sans-pro-600-italic.woff') format('woff');
	}
	@font-face {
		font-family: 'Source Sans Pro';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src:
			local('Source Sans Pro SemiBold'),
			local('SourceSansPro-SemiBold'),
			url('/fonts/source-sans-pro/source-sans-pro-600.woff2') format('woff2'),
			url('/fonts/source-sans-pro/source-sans-pro-600.woff') format('woff');
	}
</style>
