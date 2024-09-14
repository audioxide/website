<script lang="ts">
	let { header } = $props();
</script>

<h2>{header}</h2>

<style>
	h2 {
		font-family: 'Spectral SC', serif;
		font-weight: 300;
		font-size: 1.2rem;
		font-style: italic;
		margin-bottom: 1rem;
		padding: 0.8rem 0;
		text-align: center;
		border-top: 2px solid var(--gray-color);
		border-bottom: 2px solid var(--gray-color);
	}
</style>
