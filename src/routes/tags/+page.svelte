<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Tags // {SITE_NAME}</title>
	<meta name="description" content={`Complete list of ${SITE_NAME} content tags.`} />
</svelte:head>

<h1>Reviews</h1>
{#each data.tags as tag}
	<a href={`/tags/${tag.replaceAll(' ', '-')}`}><li>{tag}</li></a>
{/each}
