<template>
    <post-listing :linkType="linkType" :posts="posts" :title="title" type="tags" />
</template>

<script lang="ts">
import Vue from 'vue';
import PostListing from '@/components/PostListing.vue';
import AnyPostLink from '@/components/AnyPostLink.vue';

const tagFromParam = (tagParam: string) => tagParam.replace(/-/g, ' ');

export default Vue.extend({
    name: 'TagListing',
    components: { PostListing },
    data: () => ({
        title: '',
        posts: [],
        linkType: AnyPostLink,
    }),
    asyncData({ params: { tag }, store }) {
        return store.dispatch('posts/getPostTag', tagFromParam(tag));
    },
    created() {
        const tag = tagFromParam(this.$route.params.tag);
        this.title = `Posts tagged "${tag}"`;
        this.posts = this.$store.getters['posts/byTag'][tag];
    },
});
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .content-list {
        width: 90%;
        margin: auto;
        padding-top: $site-content__spacer--xx-large;
    }

    @include large {
        .content-list {
            width: 50%;
        }
    }

</style>