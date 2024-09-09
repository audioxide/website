<script lang="ts">
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
		author: { name: string; authors: { name: string; links: { twitter: string } }[] };
	} = $props();
</script>

<div class="post-header">
	<PostDate {datePublished} />
	<h2>
		{title}
	</h2>

	<div class="post-summary">{summary}</div>

	<div>
		By
		<a href={`https://x.com/${author.authors[0].links.twitter}`}>
			{author.name}
		</a>
	</div>
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
