<script lang="ts">
	let { data } = $props();
</script>

<h2>{data.author?.name}</h2>

<style>
	h2 {
		text-align: center;
	}
</style>
