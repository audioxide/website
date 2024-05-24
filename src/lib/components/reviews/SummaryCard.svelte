<script lang="ts">
	const {
		imageUrl,
		scoreGiven,
		scorePossible,
		summary,
		artistLink,
		essentialTracks,
		favouriteTracks
	}: {
		imageUrl: string;
		scoreGiven: number;
		scorePossible: number;
		summary: string;
		artistLink?: string;
		essentialTracks: string[];
		favouriteTracks: string[];
	} = $props();
</script>

<div class="summary-card">
	<figure>
		<img src={imageUrl} alt="" />
	</figure>
	<div class="score">
		<span>{scoreGiven}</span>
		<span>/{scorePossible}</span>
	</div>
	<div class="summary">'{summary}'</div>
	<div class="fav-tracks">
		{#if essentialTracks.length > 0}
			<h3>Essential Tracks</h3>
			<ul>
				{#each essentialTracks as track}
					<li>{track}</li>
				{/each}
			</ul>
		{/if}
		{#if favouriteTracks.length > 0}
			<h3>Favourite Tracks</h3>
			<ul>
				{#each favouriteTracks as track}
					<li>{track}</li>
				{/each}
			</ul>
		{/if}
	</div>
	{#if artistLink}
		<a href={artistLink}>
			<div class="support-the-artist-button">Support the artist...</div>
		</a>
	{/if}
</div>

<style>
	.summary-card {
		max-width: 500px;
	}
	.summary {
		color: var(--primary-color);
	}
	img {
		aspect-ratio: 1 / 1;
		outline: 1px solid lightgray;
	}
	img,
	.score,
	.fav-tracks {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		text-align: center;
	}
	.support-the-artist-button {
		border: 2px solid pink;
		border-radius: 0 0 10px 10px;
		text-align: center;
	}
</style>
