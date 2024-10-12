<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();

	const authorKeys = Object.keys(data.authors);
</script>

<svelte:head>
	<title>Authors // {SITE_NAME}</title>
	<meta name="description" content="A list of all authors on {SITE_NAME}" />
</svelte:head>

<h2>Authors</h2>

<ul>
	{#each authorKeys as key}
		<li><a href={`/authors/${key}`}> {data.authors[key].name}</a></li>
	{/each}
</ul>
