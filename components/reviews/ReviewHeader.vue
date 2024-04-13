<script lang="ts">
import Vue from 'vue'
import { authorDivider, resolveAuthorLink } from '../../assets/utilities'

type ColourStyles = { [key: string]: string }

export default Vue.extend({
  name: 'ReviewHeader',
  props: [
    'colours',
    'week',
    'created',
    'modified',
    'artist',
    'album',
    'content'
  ],
  computed: {
    chromeStyles(): ColourStyles {
      return { 'border-bottom-color': this.colours[0] }
    },
    reviews(): ReviewItem[] {
      const reviews = []
      for (const review of this.content) {
        if (typeof review !== 'object') continue
        reviews.push(review)
      }
      return reviews
    },
    reviewAuthorLinks(): ReturnType<typeof resolveAuthorLink>[] {
      const links = []
      for (const review of this.reviews) {
        links.push(resolveAuthorLink(review.author.authors[0]))
      }
      return links
    }
  },
  methods: {
    authorDivider
  }
})
</script>

<template>
  <header class="review-header" :style="chromeStyles">
    <template v-if="week < 15">
      <p class="review-header__disclaimer">
        Our early reviews are threadbare to say the least. In the spirit of
        remembering where we came from, we've left them as they were.
      </p>
    </template>
    <details class="collapsible">
      <summary class="collapsible__toggle">
        <p class="review-header__date">
          {{ created | formatDate }}
        </p>
      </summary>
      <p class="review-header__date">
        Last modified {{ modified | formatDate }}
      </p>
    </details>
    <h1 class="review-header__heading">
      <span class="review-header__album" :style="{ color: colours[0] }">{{
        album
      }}</span>
      <span class="review-header__artist">{{ artist }}</span>
    </h1>
    <p class="review-header__authors">
      <span>Album review by </span>
      <span v-for="(reviewItem, key) in reviews" :key="`reviewers-${key}`">
        <a
          v-if="reviewAuthorLinks[key]"
          class="review-header__author"
          :href="reviewAuthorLinks[key].url"
          >{{ reviewItem.author.name }}</a
        ><span v-else>{{ reviewItem.author.name }}</span
        >{{ authorDivider(key, reviews.length) }}
      </span>
    </p>
  </header>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';
.review-header {
  border-bottom: 5px solid black;
  padding-top: $site-content__spacer--large;
  padding-bottom: $site-content__spacer--x-large;
}
.review-header__date {
  @include site-content__subtext;
}

.review-header__album,
.review-header__artist,
.review-header__date,
.review-header__authors,
.review-header__disclaimer {
  font-family: $heading-fontstack;
}

.review-header__heading {
  margin-top: $site-content__spacer--large;
  margin-bottom: $site-content__spacer--large;
}

.review-header__disclaimer {
  color: black;
  background-color: #ffe501;
  padding: 0.9em;
  font-weight: 600;
  border-radius: 5px;
  margin-top: $site-content__spacer--large;
  margin-bottom: $site-content__spacer--large;
  display: inline-block;
}

.review-header__album {
  font-size: $site-content__font--x-large;
  padding-bottom: 0.1em;
  display: block;
}

.review-header__artist {
  font-size: $site-content__font--x-large * 0.9;
  display: block;
}

.review-header__album {
  font-weight: bold;
  font-style: italic;
}

.review-header__authors {
  color: $colour-grey;
  margin-top: $site-content__spacer--x-large;
}
.collapsible {
  text-align: left;
}

.collapsible__toggle {
  display: inline;
  padding: 0.5em;
  &:active,
  &:focus {
    outline: none;
  }
}
</style>
