<template>
    <span>
        <template v-if="type === 'page'">
            <post-single :post="data" />
        </template>
        <template v-else-if="type === 'post'">
            <span v-for="(post, key) in data" :key="key"><article-link :post="post" /></span>
        </template>
        <template v-else>
            <p>This page doesn't exist.</p>
        </template>
    </span>
</template>

<script lang="ts">
import Vue from 'vue';
import PostSingle from '@/components/PostSingle.vue';
import ArticleLink from '@/components/ArticleLink.vue';

type ContentTypes = { pages: string[], postTypes: string[] };
const isPost = (type: string, types: ContentTypes) => types.postTypes.includes(type);
const isPage = (type: string, types: ContentTypes) => types.pages.includes(type);

export default Vue.extend({
    name: 'ArticleListing',
    components: { PostSingle, ArticleLink },
    data: () => ({
        type: '',
        slug: '',
    }),
    async validate({ params: { type }, store }) {
        if (!('pages' in store.state.types) || !('postTypes' in store.state.types)) {
            await store.dispatch('getTypes');
        }
        const types = store.state.types;
        return isPage(type, types) || isPost(type, types);
    },
    asyncData({ params: { type }, store }) {
        const types = store.state.types;
        if (isPage(type, types)) {
            return store.dispatch('getPage', type);
        }
        if (isPost(type, types)) {
            return store.dispatch('posts/getPostType', type);
        }
    },
    created() {
        const types = this.$store.state.types;
        const slug = this.$route.params.type;
        this.slug = slug;
        if (isPage(slug, types)) {
            this.type = 'page';
        }
        if (isPost(slug, types)) {
            this.type = 'post';
        }
    },
    computed: {
        data() {
            if (this.type === 'page') {
                return this.$store.state.pages[this.slug];
            }
            if (this.type === 'post') {
                return this.$store.state.posts.posts[this.slug];
            }
        },
    },
});
</script>