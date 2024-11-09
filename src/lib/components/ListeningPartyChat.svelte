<script lang="ts">
	import '$lib/styles/listening-parties.css';
	let { html }: { html: string } = $props();
</script>

<div class="listening-party">
	{@html html}
</div>
