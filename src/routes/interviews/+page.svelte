<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Interviews // {SITE_NAME}</title>
	<meta
		name="description"
		content="Interviews with musicians. At least that's what they call themselves."
	/>
</svelte:head>

<SectionHeader header="Interviews" />

<PostSummaryCardList posts={data.interviews} />
