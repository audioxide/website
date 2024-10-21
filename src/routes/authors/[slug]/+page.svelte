<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { SITE_NAME } from '$lib/constants';
	import { icons } from '$lib/styles/icons';
	import { getAuthorLink } from '../../../utils';

	let { data } = $props();

	const authorLink = data.author?.links
		? getAuthorLink(data.author?.links, data.author?.slug)
		: null;
</script>

<svelte:head>
	<title>{data.author?.name} // {SITE_NAME}</title>
	<meta name="description" content={`Author profile for ${data.author?.name}`} />
</svelte:head>

<div class="author-summary">
	<h2>{data.author?.name}</h2>

	<!-- {#if authorLink}
		<a href={authorLink}>
			<Icon icon={icons.externalLink} />
		</a>
	{/if} -->

	<div>Reviews: {data.reviews?.length}</div>
	<div>Articles: {data.articles?.length}</div>
</div>

<h3>Reviews</h3>
{#if data.reviews}
	<ul>
		{#each data.reviews as review}
			<li><a href={`/reviews/${review.metadata.slug}`}>{review.metadata.title}</a></li>
		{/each}
	</ul>
{:else}
	<p>No reviews found.</p>
{/if}

<h3>Articles</h3>
{#if data.articles}
	<ul>
		{#each data.articles as article}
			<li><a href={`/articles/${article.metadata.slug}`}>{article.metadata.title}</a></li>
		{/each}
	</ul>
{:else}
	<p>No posts found.</p>
{/if}

<style>
	.author-summary {
		text-align: center;
	}
</style>
