<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';
	import { getAuthorLink } from '../../utils';
	import PostCredits from './PostCredits.svelte';
	import PostDate from './PostDate.svelte';

	let {
		datePublished,
		title,
		summary,
		author
	}: {
		datePublished: string;
		title: string;
		summary: string;
		author: { name: string; authors: AuthorObject[] };
	} = $props();
</script>

<div class="post-header">
	<PostDate {datePublished} />
	<h2>
		{title}
	</h2>

	<div class="post-summary">{summary}</div>

	<PostCredits authors={author.authors} />
</div>

<style>
	.post-header {
		text-align: center;
		margin-bottom: 2rem;
		line-height: 1.1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h2 {
		font-size: 1.8rem;
		font-weight: 600;
	}
	.post-summary {
		font-style: italic;
		font-size: 1.1rem;
		color: #767676;
	}
</style>
