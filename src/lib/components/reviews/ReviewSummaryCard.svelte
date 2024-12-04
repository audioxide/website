<script lang="ts">
	const {
		id,
		albumName,
		artistName,
		imageUrl,
		scoreGiven,
		scorePossible,
		summary,
		artistLink,
		essentialTracks,
		favouriteTracks,
		colors
	}: {
		id: number;
		albumName: string;
		artistName: string;
		imageUrl: string;
		scoreGiven: number;
		scorePossible: number;
		summary: string;
		artistLink?: string;
		essentialTracks: string[];
		favouriteTracks: string[];
		colors: string[];
	} = $props();

	const generateId = (id: number): string => {
		return id.toString().padStart(7, '0');
	};

	const award = (scoreGiven: number) => {
		if (scoreGiven >= 27) return 'platinum';
		if (scoreGiven >= 25) return 'gold';
		if (scoreGiven >= 23) return 'silver';
		if (scoreGiven >= 21) return 'bronze';
		return undefined;
	};

	const albumAward = $derived(award(scoreGiven));
</script>

<div
	class="summary-card"
	style="--primary-color: {colors[0]}; --secondary-color: {colors[1]}; --tertiary-color: {colors[2]}"
>
	<figure>
		{#if albumAward}
			<img
				src={`/assets/award-${albumAward}.png`}
				alt={`${albumAward} award`}
				class={albumAward === 'platinum' ? 'sticker-award' : 'ribbon-award'}
			/>
		{/if}
		<img
			class="album-cover"
			loading="lazy"
			src={imageUrl}
			alt={`Album artwork of '${albumName}' by ${artistName}`}
		/>
	</figure>
	<div class="score">
		<span class="given-score">{scoreGiven}</span><span class="possible-score">/{scorePossible}</span
		>
	</div>
	<div class="summary">'{summary}'</div>
	<div class="fav-tracks {artistLink ? '' : 'no-artist-link'}">
		{#if essentialTracks.length > 0}
			<h3>Essential Tracks</h3>
			<ul>
				{#each essentialTracks as track}
					<li class="top-track">{track}</li>
				{/each}
			</ul>
		{/if}
		{#if essentialTracks.length > 0 && favouriteTracks.length > 0}
			<div class="top-tracks-section-divider"></div>
		{/if}
		{#if favouriteTracks.length > 0}
			<h3>Favourite Tracks</h3>
			<ul>
				{#each favouriteTracks as track}
					<li class="top-track">{track}</li>
				{/each}
			</ul>
		{/if}
	</div>
	{#if artistLink}
		<a href={artistLink} class="artist-link">
			<div class="support-the-artist-button">Support the artist →</div>
		</a>
	{/if}
	<div class="review-id">
		No. {generateId(id)}
	</div>
</div>

<style>
	.summary {
		color: var(--primary-color);
		font-family: 'Spectral', serif;
		padding: 1rem;
		font-style: italic;
	}
	figure {
		position: relative;
	}
	.ribbon-award {
		position: absolute;
		top: -10px;
		right: 10%;
		width: 15%;
		height: auto;
	}
	.sticker-award {
		position: absolute;
		top: 5%;
		right: 8%;
		width: 25%;
		transform: rotate(9deg);
	}
	.album-cover {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-left: 1px solid lightgray;
		border-right: 1px solid lightgray;
		border-bottom: 1px solid lightgray;
		background-color: var(--primary-color);
	}
	.score,
	.fav-tracks {
		background-color: var(--primary-color);
		color: var(--secondary-color);
		text-align: center;
	}
	h3 {
		margin-bottom: 0.3rem;
	}
	.fav-tracks {
		border-radius: 15px 15px 0 0;
		padding: 2rem 0;
	}
	.fav-tracks h3 {
		font-family: 'Source Sans Pro', sans-serif;
		color: var(--tertiary-color);
	}
	.top-tracks-section-divider {
		margin-bottom: 1rem;
	}
	.top-track {
		font-family: 'Spectral', serif;
	}
	.no-artist-link {
		border-radius: 15px;
	}
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
			color: var(--gray-color);
		}
	}
	.score {
		padding: 1.5rem 2rem 2rem 2rem;
		font-family: 'Source Sans Pro', sans-serif;
		font-weight: bold;
		border-radius: 0 0 15px 15px;
	}
	.given-score {
		font-size: 4rem;
	}
	.possible-score {
		color: var(--tertiary-color);
		font-size: 3rem;
	}
	.review-id {
		font-family: 'Source Sans Pro', sans-serif;
		font-size: 0.9rem;
		color: gray;
		text-align: right;
		padding-right: 1rem;
		margin-top: 0.2rem;
	}
</style>
