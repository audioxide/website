<script lang="ts">
	import { SITE_NAME } from '$lib/constants';

	let { data } = $props();
</script>

<svelte:head>
	<title>Feed // {SITE_NAME}</title>
	<meta name="description" content="The Audioxide RSS feed." />
</svelte:head>

{data.feed}
