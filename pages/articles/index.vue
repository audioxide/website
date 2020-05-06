<template>
    <section>
        <div v-for="(article, key) in articles" :key="key">
            <p><nuxt-link :to="`/articles/${article.slug}`">{{ article.title.rendered }}</nuxt-link></p>
        </div>
        <p @click="loadMore">Load more</p>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    created() {
        if (this.$store.state.posts.lastSerialArticleDate === -1) {
            this.$store.dispatch('posts/getArticles');
        }
    },
    computed: {
        articles() {
            return this.$store.getters['posts/articles'];
        },
    },
    methods: {
        loadMore() {
            this.$store.dispatch('posts/getArticles');
        }
    }
});
</script>