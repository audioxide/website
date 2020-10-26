<template>
    <div class="post-link review-link">
        <div class="img-wrap">
            <img v-if="image" :src="post.metadata.featuredimage[`${imageSize}-square`]" loading="lazy" width="300" height="300" />
        </div>
        <div class="info">
            <h4 v-if="title">
                <nuxt-link :to="`/${post.metadata.type}/${post.metadata.slug}`" class="overlay-link">
                    <span class="album">{{ post.metadata.album }}</span>
                    <span class="artist">{{ post.metadata.artist }}</span>
                </nuxt-link>
            </h4>
            <p v-if="blurb">{{ post.metadata.blurb }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import PostLink from './PostLink.vue';

export default PostLink.extend({
    name: 'ReviewLink',
});
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables";

@include postLink;
@include postLinkFlex;

h4 span {
    display: block;
}

.album {
    font-style: italic;
}
</style>