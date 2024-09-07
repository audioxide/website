<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Listening Parties // {SITE_NAME}</title>
	<meta name="description" content="Read people reacting to music in real time." />
</svelte:head>

<h1>Listening Parties</h1>
{#each data.listeningParties as listeningParty}
	<a href={`/interviews/${listeningParty.metadata.slug}`}>
		<h2>{listeningParty.metadata.title}</h2>
	</a>
{/each}
