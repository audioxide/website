<template>
    <div class="lead-post-wrapper">
        <div class="post-blur" :style="bgStyles"></div>
        <lead-review class="lead-post" v-if="post && post.metadata.type === 'reviews'" :post="post" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LeadReview from './LeadReview.vue';

export default Vue.extend({
    components: { LeadReview },
    computed: {
        post(): ({ metadata: ReviewMetadata | ArticleMetadata }) | undefined {
            return this.$store.getters['posts/latestPost'];
            // return this.$store.state.posts.posts.reviews[6];
        },
        colours(): ReviewMetadata['colours'] {
            return this.post && 'colours' in this.post.metadata ? this.post.metadata.colours : ['#000', '#FFF', '#000'];
        },
        bgStyles(): string {
            return this.post && this.post.metadata.featuredimage ? `
            background-image: url('${this.post.metadata.featuredimage['medium-square']}');` : '';
        },
    }
})
</script>

<style lang="scss" scoped>
    .lead-post-wrapper {
        margin: 0 auto;
        position:relative;
        overflow: hidden;
    }
    .post-blur {
        filter: blur(100px) brightness(0.75) contrast(1.5);
        position: absolute;
        width: 120%;
        height: 120%;
        left: -10%;
        top: -10%;
        background-size: cover;
        background-position: center center;
        z-index: -1;
        &.darkened {
            filter: blur(100px) brightness(0.5) contrast(1.5);
        }
    }
    .lead-post {
        width: 85%;
        min-width: 960px;
        margin: 0 auto;
    }
    /* .lead-post {
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px rgba(191,181,191,0.96);
    } */
</style>