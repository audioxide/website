<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data: {
		article: any;
	};
	$: ({ metadata, content } = data.article);
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

<!-- <img src={metadata.featuredimage['large-original']} alt={metadata.featuredimageAlt} /> -->

{@html content}

<ul>
	{#each metadata.tags as tag}
		<li>{tag}</li>
	{/each}
</ul>

<h4>Related posts</h4>

TBD
