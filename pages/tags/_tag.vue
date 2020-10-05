<template>
    <section>
        <span v-for="(post, key) in posts" :key="key"><article-link :post="post" /></span>
    </section>
</template>

<script lang="ts">
import Vue from 'vue';
import PostSingle from '@/components/PostSingle.vue';
import ArticleLink from '@/components/ArticleLink.vue';

type ContentTypes = { pages: string[], postTypes: string[] };
const isPost = (type: string, types: ContentTypes) => types.postTypes.includes(type);
const isPage = (type: string, types: ContentTypes) => types.pages.includes(type);

export default Vue.extend({
    name: 'TagListing',
    components: { PostSingle, ArticleLink },
    data: () => ({
        posts: [],
    }),
    asyncData({ params: { tag }, store }) {
        return store.dispatch('posts/getPostTag', tag);
    },
    created() {
        this.posts = this.$store.getters['posts/byTag'][this.$route.params.tag];
    }
});
</script>