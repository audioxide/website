<template>
    <section>
        <div v-for="(article, key) in articles" :key="key">
            <p><nuxt-link :to="`/${type}/${article.metadata.slug}`">{{ article.metadata.title | unescape }}</nuxt-link></p>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'ArticleListing',
    data: () => ({
        type: '',
    }),
    asyncData({ params: { type }, store }) {
        return store.dispatch('posts/getPostType', type);
    },
    computed: {
        articles() {
            this.type = this.$route.params.type;
            return this.$store.state.posts.posts[this.type];
        },
    },
});
</script>