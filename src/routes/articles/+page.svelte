<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	export let data;
</script>

<svelte:head>
	<title>Articles // {SITE_NAME}</title>
	<meta name="description" content="Articles about music and the like." />
</svelte:head>

<h1>Articles</h1>
{#each data.articles as article}
	<a href={`/articles/${article.metadata.slug}`}>
		<h2>{article.metadata.title}</h2>
	</a>
{/each}
