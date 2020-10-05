<template>
    <div class="post-link">
        <img v-if="image" :src="post.metadata.featuredimage[`${imageSize}-standard`]" />
        <div class="info">
            <h4 v-if="title"><nuxt-link :to="`/${post.metadata.type}/${post.metadata.slug}`" class="overlay-link">{{ post.metadata.title | unescape }}</nuxt-link></h4>
            <p v-if="blurb">{{ post.metadata.blurb }}</p>
            <p v-if="author && post.metadata.author" class="author">By <span class="name">{{ post.metadata.author.name }}</span></p>
        </div>
    </div>
</template>

<script lang="ts">
import PostLink from './PostLink.vue';

export default PostLink.extend({
    name: 'ArticleLink',
});
</script>

<style lang="scss" scoped>
@import "~assets/styles/variables";

@include postLink;

.post-link h4 {
    font-size: $site-content__font--large;
}
</style>