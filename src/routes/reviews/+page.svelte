<script lang="ts">
	import DirectoryPageHeader from '$lib/components/DirectoryPageHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Album Reviews // {SITE_NAME}</title>
	<meta name="description" content="Music reviews, articles, and interviews." />
</svelte:head>

<DirectoryPageHeader header="Album Reviews" />

<PostSummaryCardList posts={data.reviews} />
