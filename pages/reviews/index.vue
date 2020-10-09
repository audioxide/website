<template>
    <section>
        <div v-for="(review, key) in reviews" :key="key">
            <p><nuxt-link :to="`/reviews/${review.metadata.slug}`">{{ review.metadata.artist }} // {{ review.metadata.album }}</nuxt-link></p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { metaTitle } from '~/assets/utilities';

export default Vue.extend({
    name: 'ReviewListing',
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