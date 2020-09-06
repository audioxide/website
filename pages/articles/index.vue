<template>
    <section>
        <div v-for="(article, key) in articles" :key="key">
            <p><nuxt-link :to="`/articles/${article.metadata.slug}`">{{ article.metadata.title | unescape }}</nuxt-link></p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ArticleListing',
    asyncData({ store }) {
        return store.dispatch('posts/getPostType', 'articles');
    },
    computed: {
        articles() {
            return this.$store.state.posts.posts.articles;
        },
    },
});
</script>