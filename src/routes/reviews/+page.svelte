<script lang="ts">
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import PostSummaryCardList from '$lib/components/PostSummaryCardList.svelte';
	import { SITE_NAME } from '$lib/constants';
	import type { ReviewMetadata } from '$lib/types/reviews.js';

	let { data } = $props();

	const reviews: {
		metadata: ReviewMetadata;
	}[] = data.reviews;

	let displayedPosts = $state(reviews);
	let filtersConfig = $state({
		sortType: 'newest',
		filterType: 'all'
	});

	const sortAndFilterPosts = () => {
		let sortedPosts = [...reviews];

		if (filtersConfig.sortType === 'newest') {
			sortedPosts.sort(
				(a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
			);
		} else if (filtersConfig.sortType === 'oldest') {
			sortedPosts.sort(
				(a, b) => new Date(a.metadata.created).getTime() - new Date(b.metadata.created).getTime()
			);
		} else if (filtersConfig.sortType === 'highest') {
			sortedPosts.sort((a, b) => b.metadata.totalscore.given - a.metadata.totalscore.given);
		} else if (filtersConfig.sortType === 'lowest') {
			sortedPosts.sort((a, b) => a.metadata.totalscore.given - b.metadata.totalscore.given);
		}

		if (filtersConfig.filterType !== 'all') {
			sortedPosts = sortedPosts.filter(
				(post) => post.metadata.reviewType === filtersConfig.filterType
			);
		}

		displayedPosts = sortedPosts;
	};
</script>

<svelte:head>
	<title>Album Reviews // {SITE_NAME}</title>
	<meta name="description" content="Music reviews, articles, and interviews." />
</svelte:head>

<SectionHeader header="Album Reviews" />

<div class="filters-panel">
	<select
		onchange={(e) => {
		filtersConfig.sortType = (e.target as HTMLSelectElement).value;
		sortAndFilterPosts();
	}}
	>
		<option value="newest">Most recent</option>
		<option value="oldest">Least recent</option>
		<option value="highest">Highest Rating</option>
		<option value="lowest">Lowest Rating</option>
	</select>
	<select
		onchange={(e) => {
		filtersConfig.filterType = (e.target as HTMLSelectElement).value;
		sortAndFilterPosts();
	}}
	>
		<option value="all">All</option>
		<option value="newRelease">New releases</option>
		<option value="retrospective">Retrospectives</option>
		<option value="gag">Gags</option>
	</select>
</div>

<PostSummaryCardList posts={displayedPosts} />

<style>
	.filters-panel {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}
</style>
