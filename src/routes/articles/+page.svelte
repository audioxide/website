<script lang="ts">
	import DirectoryPageHeader from '$lib/components/DirectoryPageHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Articles // {SITE_NAME}</title>
	<meta name="description" content="Articles about music and the like." />
</svelte:head>

<DirectoryPageHeader header="Articles" />

<PostSummaryCardList posts={data.articles} />
