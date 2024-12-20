<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '$lib/constants';
	import { audioxideStructuredData } from '../utils/schema';
	import FeaturedPost from '$lib/components/homepage/FeaturedPost.svelte';
	import SupportBlock from '$lib/components/SupportBlock.svelte';
	import FeedYourHead from '$lib/components/FeedYourHead.svelte';
	import OpenGraphMetaTags from '$lib/components/layout/OpenGraphMetaTags.svelte';

	let { data } = $props();

	const siteImageUrl =
		'https://api.audioxide.com/images/article-images/statsioxide-250-featured-image-xlarge-original.jpg';
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
	<meta name="description" content={SITE_DESCRIPTION} />

	<OpenGraphMetaTags
		link={SITE_URL}
		title={SITE_NAME}
		description={'Reports from the soundscapes'}
		image={siteImageUrl}
	/>

	{@html `<script type="application/ld+json">${JSON.stringify(audioxideStructuredData())}</script>`}
</svelte:head>

<div class="homepage-content-container">
	<div class="featured-post">
		<FeaturedPost post={data.mostRecentPost.metadata} />
	</div>

	<div class="reviews">
		<SectionHeader header="Album Reviews" seeAllSlug="reviews" />
		<PostSummaryCardList posts={data.latest.reviews} itemsPerRowDesktop={1} flatPosts />
	</div>

	<div class="feed-your-head">
		<FeedYourHead />
	</div>

	<div class="articles">
		<SectionHeader header="Articles" seeAllSlug="articles" />
		<PostSummaryCardList posts={data.latest.articles} itemsPerRowDesktop={2} />
	</div>

	<!-- <div class="support-block">
		<SupportBlock />
	</div> -->

	<div class="interviews">
		<SectionHeader header="Interviews" seeAllSlug="interviews" />
		<PostSummaryCardList posts={data.latest.interviews} />
	</div>

	<div class="listening-parties">
		<SectionHeader header="Listening Parties" seeAllSlug="listening-parties" />
		<PostSummaryCardList posts={data.latest.listeningParties} />
	</div>

	<div class="funnyfarm">
		<SectionHeader header="Funnyfarm" seeAllSlug="funnyfarm" />
		<PostSummaryCardList posts={data.latest.funnyfarm} />
	</div>
</div>

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
		/* .support-block {
			grid-area: 5 / 1 / 6 / 6;
		} */
		.listening-parties {
			grid-area: 6 / 1 / 7 / 6;
		}
		.funnyfarm {
			grid-area: 7 / 1 / 8 / 6;
		}
	}
</style>
