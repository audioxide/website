<script lang="ts">
	import { PATREON_URL, SITE_NAME } from '$lib/constants';
</script>

<div class="block">
	<img
		loading="lazy"
		class="logo-icon"
		src="/branding/bordered-emblem-black-transparent.png"
		alt={`${SITE_NAME} logo`}
	/>
	<div>
		Support <span class="italic">Audioxide</span>'s independent music journalism.
		<a href={PATREON_URL}>Become a patron</a>
	</div>
</div>

<style>
	.block {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		text-align: center;
		padding: 2rem 1rem;
		text-align: center;
	}
	.italic {
		font-style: italic;
	}
	img {
		width: 40px;
	}
	a {
		white-space: nowrap;
	}
</style>
