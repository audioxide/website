<script lang="ts">
	import { SITE_NAME } from '$lib/constants';
	import type { SharedPostMetadata } from '$lib/types/shared';
	import { createPostStructuredData } from '../../../utils/schema';
	import ContentBlock from '../ContentBlock.svelte';
	import PostHeader from './PostHeader.svelte';
	import RelatedContent from './PostRelatedContent.svelte';
	import RelatedTags from './PostTags.svelte';

	let {
		post
	}: {
		post: {
			metadata: SharedPostMetadata;
			content: string;
			related: {
				metadata: SharedPostMetadata;
			}[];
		};
	} = $props();

	const { metadata, content, related } = $derived(post);
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

<RelatedTags relatedTags={metadata.tags} />

<RelatedContent relatedContent={related} />

{@html `<script type="application/ld+json">${JSON.stringify(createPostStructuredData(metadata))}</script>`}
