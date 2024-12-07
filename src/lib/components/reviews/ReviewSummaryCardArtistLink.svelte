<script lang="ts">
	const { artistLink }: { artistLink: string } = $props();
</script>

<a href={artistLink} class="artist-link">
	<div class="support-the-artist-button">Support the artist →</div>
</a>

<style>
	.artist-link {
		text-decoration: none;
	}
	.support-the-artist-button {
		border: 2px solid var(--link-color);
		border-radius: 0 0 15px 15px;
		text-align: center;
		font-size: 1rem;
		font-weight: bold;
		padding: 1rem 0;
		margin-top: 0.2rem;
		&:hover {
			background-color: var(--link-color);
			color: white;
		}
	}
</style>
