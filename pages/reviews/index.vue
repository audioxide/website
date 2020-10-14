<template>
    <span>
        <span v-for="(post, key) in reviews" :key="key"><review-link :post="post" /></span>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';
import ReviewLink from '~/components/ReviewLink.vue';
import { metaTitle } from '~/assets/utilities';

export default Vue.extend({
    name: 'ReviewListing',
    components: { ReviewLink },
    head: () => ({ title: metaTitle('Reviews') }),
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