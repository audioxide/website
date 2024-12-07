<script lang="ts">
	import { API_URL, SITE_NAME } from '$lib/constants.js';
	import type { ReviewMetadata } from '$lib/types/reviews.js';

	let { data } = $props();

	const reviews: {
		metadata: ReviewMetadata;
	}[] = data.reviews;

	const totalCount = reviews.length;
	const newReleaseCount = reviews.filter(
		(review) => review.metadata.reviewType === 'newRelease'
	).length;
	const retrospectiveCount = reviews.filter(
		(review) => review.metadata.reviewType === 'retrospective'
	).length;
	const averageScore =
		reviews
			.filter((review) => review.metadata.reviewType !== 'gag')
			.reduce((acc, review) => acc + review.metadata.totalscore.given, 0) / totalCount;
	const reviewsScoring27OrMoreCount = reviews.reduce(
		(acc, review) => acc + (review.metadata.totalscore.given >= 27 ? 1 : 0),
		0
	);
</script>

<svelte:head>
	<title>Stats // {SITE_NAME}</title>
	<meta name="description" content="The sweet, sweet numbers behind our reviews." />
</svelte:head>

<div class="container">
	<h2>Stats</h2>
	<p>
		Everything below is generated using the <a href={`${API_URL}/reviews.json`}>Audioxide API</a>.
		It's all the stuff you wanted to know, and a few things you didn't.
	</p>
	<ul>
		<li>
			{totalCount} albums reviewed ({newReleaseCount} new releases and {retrospectiveCount} retrospectives)
		</li>
		<li>Average score: {averageScore.toFixed(1)}</li>
		<li>
			The <a href="/tags/27-plus-club">27+ Club</a> currently has {reviewsScoring27OrMoreCount} members
		</li>
	</ul>
	<p>More coming soon.</p>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto 2rem auto;
		* {
			font-family: 'Spectral', serif;
		}
	}
	.container h2 {
		font-family: 'Source Sans Pro', sans-serif;
		text-align: center;
		margin: 2rem 0 1rem 0;
		font-size: 2rem;
	}
	ul {
		list-style: disc;
		padding-left: 2rem;
		margin-bottom: 1rem;
	}
</style>
