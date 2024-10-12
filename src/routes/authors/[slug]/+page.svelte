<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.author?.name} // {SITE_NAME}</title>
	<meta name="description" content={`Author profile for ${data.author?.name}`} />
</svelte:head>

<h2>{data.author?.name}</h2>

<style>
	h2 {
		text-align: center;
	}
</style>
