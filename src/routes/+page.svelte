<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/constants';
	import { audioxideStructuredData } from '../utils/schema';
	import FeaturedPost from '$lib/components/homepage/FeaturedPost.svelte';
	import SupportBlock from '$lib/components/SupportBlock.svelte';
	import FeedYourHead from '$lib/components/FeedYourHead.svelte';

	let { data } = $props();

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
	<div class="featured-post">
		<FeaturedPost post={latestPost.metadata} />
	</div>

	<div class="reviews">
		<SectionHeader header="Album Reviews" seeAllSlug="reviews" />
		<PostSummaryCardList posts={data.latest.reviews.slice(0, 8)} itemsPerRowDesktop={1} flatPosts />
	</div>

	<div class="feed-your-head">
		<FeedYourHead />
	</div>

	<div class="articles">
		<SectionHeader header="Articles" seeAllSlug="articles" />
		<PostSummaryCardList posts={data.latest.articles.slice(0, 4)} itemsPerRowDesktop={2} />
	</div>

	<!-- <div class="support-block">
		<SupportBlock />
	</div> -->

	<div class="interviews">
		<SectionHeader header="Interviews" seeAllSlug="interviews" />
		<PostSummaryCardList posts={data.latest.interviews.slice(0, 4)} />
	</div>

	<div class="listening-parties">
		<SectionHeader header="Listening Parties" seeAllSlug="listening-parties" />
		<PostSummaryCardList posts={data.latest['listening-parties'].slice(0, 4)} />
	</div>

	<div class="funnyfarm">
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
	@media (min-width: 768px) {
		.homepage-content-container {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-template-rows: min-content;
			gap: 2rem;
		}
		.featured-post {
			grid-area: 1 / 3 / 2 / 6;
		}
		.reviews {
			grid-area: 1 / 1 / 3 / 3;
		}
		.feed-your-head {
			grid-area: 3 / 1 / 4 / 6;
		}
		.articles {
			grid-area: 2 / 3 / 3 / 6;
		}
		.interviews {
			grid-area: 4 / 1 / 5 / 6;
		}
		.support-block {
			grid-area: 5 / 1 / 6 / 6;
		}
		.listening-parties {
			grid-area: 6 / 1 / 7 / 6;
		}
		.funnyfarm {
			grid-area: 7 / 1 / 8 / 6;
		}
	}
</style>
