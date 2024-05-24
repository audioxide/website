<script lang="ts">
	import type { ReviewMetadata } from '$lib/types/reviewInterface.js';
	import SummaryCard from '$lib/components/reviews/SummaryCard.svelte';

	export let data;
	const {
		review
	}: {
		review: ReviewMetadata;
	} = data;
</script>

<time datetime={review.created}>{review.created}</time>

<div>{review.album}</div>
<div>{review.artist}</div>

<div>
	Review by {#each review.author.authors as author}
		<a href={`https://x.com/${author.links.twitter}`}>{author.name}</a>{author ===
		review.author.authors[review.author.authors.length - 1]
			? ''
			: ', '}
	{/each}
</div>

<SummaryCard
	imageUrl={review.featuredimage['medium-square']}
	scoreGiven={review.totalscore.given}
	scorePossible={review.totalscore.possible}
	summary={review.summary}
	artistLink={review.artistLink}
	essentialTracks={review.essentialtracks}
	favouriteTracks={review.favouritetracks}
	--primary-color={review.colours[0]}
	--secondary-color={review.colours[1]}
/>
