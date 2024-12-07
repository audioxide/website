<script lang="ts">
	import Post from '$lib/components/posts/Post.svelte';

	let { data } = $props();
</script>

<Post post={data.article} />
