<script lang="ts">
	import ContentBlock from '$lib/components/ContentBlock.svelte';
	import PostHeader from '$lib/components/PostHeader.svelte';
	import RelatedContent from '$lib/components/RelatedContent.svelte';
	import RelatedTags from '$lib/components/RelatedTags.svelte';
	import { SITE_NAME } from '$lib/constants';

	let {
		data
	}: {
		data: {
			listeningParty: any;
		};
	} = $props();
	const { metadata, content, related } = $derived(data.listeningParty);
</script>

<svelte:head>
	<title>{metadata.title} // {SITE_NAME}</title>
	<meta name="description" content={metadata.summary} />
</svelte:head>

<PostHeader
	datePublished={metadata.created}
	title={metadata.title}
	summary={metadata.summary}
	author={metadata.author}
/>

<ContentBlock html={content} />

<div class="related-tags">
	<RelatedTags relatedTags={metadata.tags} />
</div>

<div class="related-posts">
	<RelatedContent relatedContent={related} />
</div>
