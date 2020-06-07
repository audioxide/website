<template>
    <section>
        <div v-for="(article, key) in articles" :key="key">
            <p><nuxt-link :to="`/articles/${article.slug}`">{{ article.title | unescape }}</nuxt-link></p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ArticleListing',
    async validate({ params: { slug }, store }) {
        // Add in an API endpoint that allows us to check if we have all the articles
        // if (!store.state.posts.posts.articles) {
            await store.dispatch('posts/getPostType', 'articles');
        // }
        return true;
    },
    computed: {
        articles() {
            return this.$store.state.posts.posts.articles;
        },
    },
});
</script>