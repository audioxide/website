<script lang="ts">
	import { page } from '$app/stores';

	console.log($page.error?.message);
</script>

<svelte:head>
	<title>Error: {$page.status} // Audioxide</title>
</svelte:head>

<div class="error-message">
	<h2>{$page.status}</h2>
	<p>Sorry, we couldn't find the page you were looking for.</p>
	<p><a href="/">Go to the homepage</a></p>
</div>

<style>
	.error-message {
		text-align: center;
		margin: 10rem auto;
	}

	h2 {
		font-size: 1.8em;
		margin: 0;
	}

	p {
		margin: 1rem 0;
	}
</style>
