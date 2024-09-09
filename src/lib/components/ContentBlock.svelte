<script lang="ts">
	let { html }: { html: string } = $props();
</script>

<div class="container">
	{@html html}
</div>
