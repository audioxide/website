<template>
  <div class="album-banner">
    <div
      v-for="(album, key) in bannerData"
      :key="key"
      class="album-banner__art-wrapper"
    >
      <nuxt-link
        no-prefetch
        :to="`/reviews/${album.slug}/`"
        class="album-banner__review-link"
      >
        <span class="album-banner__score">{{ album.score }}/30</span>
        <img
          class="album-banner__album-art"
          :src="album.image"
          :alt="`Album cover for ${album.artist} - ${album.album}`"
          width="300"
          height="300"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'SiteHeaderAlbumBanner',
  async fetch() {
    await this.$store.dispatch('getBannerData')
  },
  computed: {
    bannerData(): PostListing<Review> {
      return this.$store.state.banner
    }
  }
})
</script>

<style lang="scss" scoped>
@use "sass:math";
@import '~assets/styles/variables.scss';

.album-banner {
  width: 100%;
  height: 100%;
  display: flex;
  border-bottom: 0.6rem solid black;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
  background-color: black;
}

.album-banner__review-link {
  &:hover,
  &:focus {
    & .album-banner__score {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
    }
  }
}

.album-banner__art-wrapper {
  position: relative;
  display: block;
  height: 100%;
  width: calc(100% / #{$album-banner__albums-shown--small});
  @include small {
    width: calc(100% / #{$album-banner__albums-shown--medium});
  }
  @include medium {
    width: calc(100% / #{$album-banner__albums-shown--large});
  }
  @media (max-width: $bp_small - 0.1) {
    &:nth-child(#{$album-banner__albums-shown--small})
      ~ .album-banner__art-wrapper {
      display: none;
    }
  }
  @media (max-width: $bp_medium - 0.1) {
    &:nth-child(#{$album-banner__albums-shown--medium})
      ~ .album-banner__art-wrapper {
      display: none;
    }
  }
}

.album-banner__score {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: $album-banner__album-width--small;
  display: block;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-family: $logo-fontstack;
  font-size: $album-banner__score-size--small;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1),
    0px 18px 23px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: 0.25s opacity ease-in-out;
  @include small {
    line-height: $album-banner__album-width--medium;
    font-size: $album-banner__score-size--medium;
  }
  @include medium {
    line-height: $album-banner__album-width--large;
    font-size: $album-banner__score-size--large;
  }
}

.album-banner__album-art {
  width: 100%;
  height: 100%;
}
</style>
