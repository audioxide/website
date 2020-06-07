<template>
    <section>
        <div v-for="(review, key) in reviews" :key="key">
            <p><nuxt-link :to="`/reviews/${review.slug}`">{{ review.artist }} // {{ review.album }}</nuxt-link></p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ReviewListing',
    async validate({ params: { slug }, store }) {
        // Add in an API endpoint that allows us to check if we have all the reviews
        // if (!store.state.posts.posts.reviews) {
            await store.dispatch('posts/getPostType', 'reviews');
        // }
        return true;
    },
    computed: {
        reviews(): PostListing<Review> {
            return this.$store.state.posts.posts.reviews;
        },
    },
});
</script>