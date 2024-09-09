<script lang="ts">
	import PostDate from '$lib/components/PostDate.svelte';
	import PostHeader from '$lib/components/PostHeader.svelte';
	import RelatedContent from '$lib/components/RelatedContent.svelte';
	import RelatedTags from '$lib/components/RelatedTags.svelte';
	import { SITE_NAME } from '$lib/constants';

	export let data: {
		article: any;
	};
	$: ({ metadata, content, related } = data.article);
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

{@html content}

<div class="related-tags">
	<RelatedTags relatedTags={metadata.tags} />
</div>

<div class="related-posts">
	<RelatedContent relatedContent={related} />
</div>
