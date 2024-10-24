<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Funnyfarm // {SITE_NAME}</title>
	<meta name="description" content="A new low for music-related fiction." />
</svelte:head>

<SectionHeader header="Funnyfarm" />

<PostSummaryCardList posts={data.funnyfarms} />
