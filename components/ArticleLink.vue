<template>
    <div class="post-link">
        <img v-if="image" :src="post.metadata.featuredimage[`${imageSize}-standard`]" />
        <h4 v-if="title"><nuxt-link :to="`${post.metadata.type}/${post.metadata.slug}`" class="overlay-link">{{ post.metadata.title | unescape }}</nuxt-link></h4>
        <p v-if="blurb">{{ post.metadata.blurb }}</p>
        <p v-if="author && post.metadata.author">By {{ post.metadata.author.name }}</p>
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
</style>