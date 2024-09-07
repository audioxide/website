<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Tags // {SITE_NAME}</title>
	<meta name="description" content="Complete list of Audioxide content tags." />
</svelte:head>

<h1>Reviews</h1>
{#each data.tags as tag}
	<a href={`/tag/${tag}`}>
		<div>{tag}</div>
	</a>
{/each}
