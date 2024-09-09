<script lang="ts">
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

<div>
	{metadata.created}
</div>

<h2>
	{metadata.title}
</h2>

<div>{metadata.summary}</div>

<div>By {metadata.author.name}</div>

{@html content}

<div class="related-tags">
	<RelatedTags relatedTags={metadata.tags} />
</div>

<div class="related-posts">
	<RelatedContent relatedContent={related} />
</div>
