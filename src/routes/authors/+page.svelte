<script lang="ts">
	let { data } = $props();

	const authorKeys = Object.keys(data.authors);
</script>

<h2>Authors</h2>

<ul>
	{#each authorKeys as key}
		<li><a href={`/authors/${key}`}> {data.authors[key].name}</a></li>
	{/each}
</ul>
