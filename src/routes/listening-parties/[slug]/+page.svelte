<script lang="ts">
	import Post from '$lib/components/posts/Post.svelte';
	import type { GenericPost } from '$lib/types/shared';

	let {
		data
	}: {
		data: {
			listeningParty: GenericPost;
		};
	} = $props();
</script>

<Post post={data.listeningParty} />
