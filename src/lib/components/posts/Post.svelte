<script lang="ts">
	import { SITE_NAME } from '$lib/constants';
	import type { SharedPostMetadata } from '$lib/types/shared';
	import { createPostStructuredData } from '../../../utils/schema';
	import ContentBlock from '../ContentBlock.svelte';
	import ListeningPartyChat from '../ListeningPartyChat.svelte';
	import SupportBlock from '../SupportBlock.svelte';
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
	{@html `<script type="application/ld+json">${JSON.stringify(createPostStructuredData(metadata))}</script>`}
</svelte:head>

<div class="header">
	<PostHeader
		datePublished={metadata.created}
		title={metadata.title}
		summary={metadata.summary}
		author={metadata.author}
	/>
</div>

{#if metadata.showFeaturedImage}
	<figure>
		<img
			loading="lazy"
			src={metadata.featuredimage['medium-original']}
			alt={metadata.featuredimageAlt}
		/>
		{#if metadata.featuredImageCaption}
			<figcaption>{@html metadata.featuredImageCaption}</figcaption>
		{/if}
	</figure>
{/if}

<div class="content">
	{#if metadata.type === 'listening-parties'}
		<ListeningPartyChat html={content} />
	{:else}
		<ContentBlock html={content} />
	{/if}
	<div class="related">
		<RelatedTags relatedTags={metadata.tags} />
	</div>
</div>

<hr />

<SupportBlock />

<RelatedContent relatedContent={related} />

<style>
	figure {
		margin: 0 0 2rem 0;
		img {
			width: 100%;
			border-radius: 1rem;
		}
		figcaption {
			text-align: right;
			margin-right: 0.5rem;
			color: #666;
		}
	}
	.header,
	.content {
		max-width: 800px;
		margin: 0 auto 2rem auto;
	}
	.related {
		margin-top: 2rem;
	}
</style>
