<script lang="ts">
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import { SITE_NAME } from '$lib/constants';
	import { getAuthorLink } from '../../../utils';

	let { data } = $props();

	const authorLink = data.author?.links
		? getAuthorLink(data.author?.links, data.author?.slug)
		: null;
</script>

<svelte:head>
	<title>{data.author?.name} // Authors // {SITE_NAME}</title>
	<meta name="description" content={`Author profile for ${data.author?.name}`} />
</svelte:head>

<div class="author-page-container">
	<h2>Authors</h2>
	<div class="author-summary">
		{#if authorLink}
			<a href={authorLink}>
				<h3>{data.author?.name}</h3>
			</a>
		{:else}
			<h3>{data.author?.name}</h3>
		{/if}

		<div>
			<span class="strong">Reviews:</span>
			{data.reviews?.length} // <span class="strong">Articles:</span>
			{data.articles?.length}
		</div>
	</div>

	{#if data.reviews}
		<div>
			<SectionHeader header="Reviews" />
			<PostSummaryCardList posts={data.reviews} />
		</div>
	{/if}

	{#if data.articles}
		<div>
			<SectionHeader header="Articles" />
			<PostSummaryCardList posts={data.articles} />
		</div>
	{/if}
</div>

<style>
	h2 {
		text-align: center;
		font-size: 2rem;
	}
	h3 {
		text-align: center;
		font-size: 1.5rem;
	}
	.author-page-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.author-summary {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: center;
	}
	.strong {
		font-weight: bold;
	}
</style>
