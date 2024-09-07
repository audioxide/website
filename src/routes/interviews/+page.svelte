<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Interviews // {SITE_NAME}</title>
	<meta
		name="description"
		content="Interviews with musicians. At least that's what they call themselves."
	/>
</svelte:head>

<h1>Interviews</h1>
{#each data.interviews as interview}
	<a href={`/interviews/${interview.metadata.slug}`}>
		<h2>{interview.metadata.title}</h2>
	</a>
{/each}
