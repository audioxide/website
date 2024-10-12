<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/constants';
	import { audioxideStructuredData } from '../utils/schema';
	import FeaturedPost from '$lib/components/homepage/FeaturedPost.svelte';
	import SupportBlock from '$lib/components/SupportBlock.svelte';
	import FeedYourHead from '$lib/components/FeedYourHead.svelte';

	let { data } = $props();

	// data.latest is a map of objects. Each object has a key 'metadata' which is an array of objects.
	// Find the object with the most recent published date

	const latestPost = Object.values(data.latest)
		.flat()
		.sort(
			(a, b) =>
				new Date(b.metadata.created).getMilliseconds() -
				new Date(a.metadata.created).getMilliseconds()
		)[0];
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

<div class="homepage-content-container">
	<!-- Lead -->
	<FeaturedPost post={latestPost.metadata} />

	<div>
		<!-- Album Reviews -->
		<SectionHeader header="Album Reviews" seeAllSlug="reviews" />
		<PostSummaryCardList posts={data.latest.reviews.slice(0, 8)} />
	</div>

	<!-- Feed your head -->
	<FeedYourHead />

	<div>
		<!-- Articles -->
		<SectionHeader header="Articles" seeAllSlug="articles" />
		<PostSummaryCardList posts={data.latest.articles.slice(0, 4)} />
	</div>

	<!-- Support -->
	<SupportBlock />

	<div>
		<!-- Interviews -->
		<SectionHeader header="Interviews" seeAllSlug="interviews" />
		<PostSummaryCardList posts={data.latest.interviews.slice(0, 4)} />
	</div>

	<div>
		<!-- Listening Parties -->
		<SectionHeader header="Listening Parties" seeAllSlug="listening-parties" />
		<PostSummaryCardList posts={data.latest['listening-parties'].slice(0, 4)} />
	</div>

	<div>
		<!-- Funnyfarm -->
		<SectionHeader header="Funnyfarm" seeAllSlug="funnyfarm" />
		<PostSummaryCardList posts={data.latest.funnyfarm.slice(0, 4)} />
	</div>
</div>

{@html `<script type="application/ld+json">${JSON.stringify(audioxideStructuredData())}</script>`}

<style>
	.homepage-content-container {
		display: grid;
		gap: 2rem;
	}
</style>
