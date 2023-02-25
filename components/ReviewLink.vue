<template>
  <div class="post-link review-link">
    <div class="img-wrap" :style="{ borderColor: post.metadata.colours[0] }">
      <img
        v-if="image"
        :src="post.metadata.featuredimage[`${imageSize}-${imageFormat}`]"
        :alt="coverAlt"
        loading="lazy"
        width="300"
        height="300"
      />
    </div>
    <div class="info">
      <h4 v-if="title">
        <nuxt-link
          :to="`/${post.metadata.type}/${post.metadata.slug}/`"
          class="overlay-link"
        >
          <span class="album">{{ post.metadata.album }}</span>
          <span class="artist">{{ post.metadata.artist }}</span>
        </nuxt-link>
      </h4>
      <p v-if="blurb">{{ post.metadata.blurb }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import PostLink from './PostLink.vue'
import { albumCoverAlt } from '~/assets/utilities'

export default PostLink.extend({
  name: 'ReviewLink',
  props: {
    imageFormat: {
      type: String as PropType<ImageSizeAspectRatios>,
      default: 'square',
    },
  },
  computed: {
    coverAlt(): string {
      return albumCoverAlt(this.post as Review)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

@include postLink;
@include postLinkFlex;

h4 span {
  display: block;
}

.img-wrap {
  border: $line-width solid black;
}

.album {
  font-style: italic;
}
</style>
