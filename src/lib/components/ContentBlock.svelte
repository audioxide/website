<script lang="ts">
	import '$lib/styles/content-block.css';
	let { html }: { html: string } = $props();
</script>

<div class="content-block">
	{@html html}
</div>
