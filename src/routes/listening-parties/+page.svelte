<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Listening Parties // {SITE_NAME}</title>
	<meta name="description" content="Read people reacting to music in real time." />
</svelte:head>

<SectionHeader header="Listening Parties" />

<PostSummaryCardList posts={data.listeningParties} />
