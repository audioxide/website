<template>
    <post-listing :linkType="linkType" :posts="reviews" type="reviews" />
</template>

<script lang="ts">
import Vue, { VNode } from 'vue';
import PostListing from '@/components/PostListing.vue';
import ReviewLink from '~/components/ReviewLink.vue';
import { metaTitle } from '~/assets/utilities';

export default Vue.extend({
    name: 'ReviewListing',
    components: { PostListing },
    head: () => ({ title: metaTitle('Reviews') }),
    data: () => ({
        linkType: ReviewLink,
    }),
    /* async validate({ params: { slug }, store }) {
        // Add in an API endpoint that allows us to check if we have all the reviews
        // if (!store.state.posts.posts.reviews) {
            await store.dispatch('posts/getPostType', 'reviews');
        // }
        return true;
    }, */
    asyncData({ store }) {
        return store.dispatch('posts/getPostType', 'reviews');
    },
    computed: {
        reviews(): PostListing<Review> {
            return this.$store.state.posts.posts.reviews;
        },
    },
});
</script>
