<template>
    <section>
        <div v-for="(review, key) in reviews" :key="key">
            <p><nuxt-link :to="`/reviews/${review.slug}`">{{ review.meta['Artist Name'] }} // {{ review.meta['Album Name'] }}</nuxt-link></p>
        </div>
        <p @click="loadMore">Load more</p>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    created() {
        if (!this.$store.state.posts.tags[2]) {
            this.$store.dispatch('posts/getReviews');
        }
    },
    computed: {
        reviews() {
            return this.$store.getters['posts/byTag'][2];
        },
    },
    methods: {
        loadMore() {
            this.$store.dispatch('posts/getPostsInCategory', 2);
        }
    }
});
</script>