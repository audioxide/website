<script>
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Posts tagged '{data.tag.replaceAll('-', ' ')}' // {SITE_NAME}</title>
	<meta name="description" content={`All posts tagged '${data.tag.replaceAll('-', ' ')}'`} />
	<meta name="robots" content="noindex" />
</svelte:head>

<SectionHeader header={`All posts tagged '${data.tag.replaceAll('-', ' ')}`} />
<PostSummaryCardList posts={data.contentWithTag} />
