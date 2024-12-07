<script lang="ts">
	let {
		relatedTags
	}: {
		relatedTags: string[];
	} = $props();
</script>

<div class="related-tags">
	<ul>
		{#each relatedTags as tag}
			<li><a href={`/tags/${tag.replace(/ /g, '-')}`}><div class="tag">{tag}</div></a></li>
		{/each}
	</ul>
</div>

<style>
	.related-tags {
		font-family: 'Source Sans Pro', sans-serif;
	}

	.related-tags ul {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		gap: 0.5rem;
	}

	.tag {
		font-size: 0.9rem;
		border-radius: 10px;
		background-color: var(--gray-color);
		padding: 0.2rem 1rem;
	}

	.related-tags a {
		text-decoration: none;
	}
</style>
