<script lang="ts">
	import type { AuthorObject } from '$lib/types/shared';
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

	<PostCredits authors={author.authors} isReview={false} />
</div>

<style>
	.post-header {
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
		font-size: 1.3rem;
		font-style: italic;
		color: #767676;
	}
</style>
