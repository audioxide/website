<script lang="ts">
	import DirectoryPageHeader from '$lib/components/DirectoryPageHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
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

<DirectoryPageHeader header="Interviews" />

<PostSummaryCardList posts={data.interviews} />
