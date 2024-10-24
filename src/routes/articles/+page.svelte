<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Articles // {SITE_NAME}</title>
	<meta name="description" content="Articles about music and the like." />
</svelte:head>

<SectionHeader header="Articles" />

<PostSummaryCardList posts={data.articles} />
