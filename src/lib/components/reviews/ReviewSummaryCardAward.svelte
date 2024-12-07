<script lang="ts">
	let { scoreGiven }: { scoreGiven: number } = $props();

	const award = (scoreGiven: number) => {
		if (scoreGiven >= 27) return 'platinum';
		if (scoreGiven >= 25) return 'gold';
		if (scoreGiven >= 23) return 'silver';
		if (scoreGiven >= 21) return 'bronze';
		return undefined;
	};

	const albumAward = $derived(award(scoreGiven));
</script>

{#if albumAward}
	<img
		src={`/assets/award-${albumAward}.png`}
		alt={`${albumAward} award`}
		class={albumAward === 'platinum' ? 'sticker-award' : 'ribbon-award'}
	/>
{/if}

<style>
	.ribbon-award {
		position: absolute;
		top: -10px;
		right: 5%;
		width: 15%;
		height: auto;
	}
	.sticker-award {
		position: absolute;
		top: 15px;
		right: 5%;
		width: 25%;
		transform: rotate(9deg);
	}
</style>
