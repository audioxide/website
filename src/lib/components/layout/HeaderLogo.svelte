<script>
	import { SITE_NAME } from '$lib/constants';
	import LogoPlain from '../logos/LogoPlain.svelte';
</script>

<a href="/">
	<div class="logo-container">
		<h1>{SITE_NAME}</h1>
		<LogoPlain />
	</div>
</a>

<style>
	.logo-container {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
		align-items: center;
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
</style>
