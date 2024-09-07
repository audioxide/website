<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Funnyfarm // {SITE_NAME}</title>
	<meta name="description" content="A new low for music-related fiction." />
</svelte:head>

<h1>Funnyfarm</h1>
{#each data.funnyfarms as funnyfarmEntry}
	<a href={`/funnyfarm/${funnyfarmEntry.metadata.slug}`}>
		<h2>{funnyfarmEntry.metadata.title}</h2>
	</a>
{/each}
