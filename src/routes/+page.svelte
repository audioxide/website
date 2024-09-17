<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/constants';
	import { audioxideStructuredData } from '../utils/schema';
	import FeaturedPost from '$lib/components/homepage/FeaturedPost.svelte';
	import SupportBlock from '$lib/components/SupportBlock.svelte';

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

<!-- Lead -->
<FeaturedPost post={latestPost.metadata} />

<!-- Album Reviews -->
<SectionHeader header="Album Reviews" seeAllSlug="reviews" />
<PostSummaryCardList posts={data.latest.reviews} />

<!-- Feed your head -->
<a class="feed-your-head" href="/random"><h2>Feed Your Head</h2></a>

<!-- Articles -->
<SectionHeader header="Articles" seeAllSlug="articles" />
<PostSummaryCardList posts={data.latest.articles} />

<SupportBlock />

<!-- Interviews -->
<SectionHeader header="Interviews" seeAllSlug="interviews" />
<PostSummaryCardList posts={data.latest.interviews} />

<!-- Listening Parties -->
<SectionHeader header="Listening Parties" seeAllSlug="listening-parties" />
<PostSummaryCardList posts={data.latest['listening-parties']} />

<!-- Funnyfarm -->
<SectionHeader header="Funnyfarm" seeAllSlug="funnyfarm" />
<PostSummaryCardList posts={data.latest.funnyfarm} />

{@html `<script type="application/ld+json">${JSON.stringify(audioxideStructuredData())}</script>`}

<style>
	.feed-your-head {
		display: block;
		margin-top: 1rem;
		padding: 1rem;
		border: 2px solid var(--link-color);
		border-radius: 0.5rem;
		text-align: center;
		text-decoration: none;
		&:hover {
			background-color: var(--link-color);
			color: var(--gray-color);
		}
	}
</style>
