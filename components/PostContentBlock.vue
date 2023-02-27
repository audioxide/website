<template>
  <article>
    <section v-for="(item, key) in content" :key="key">
      <h2 v-if="authorName[key]" class="author">{{ authorName[key] }}</h2>
      <!--
            <p class="author-social" v-if="authorLink[key]"><a :href="authorLink[key].url">{{ authorLink[key].text }}</a></p>
            -->
      <post-content :content="contentHTML[key]" :decorate="decorate" />
      <p v-if="item.score" class="score">
        <span class="given" :style="textHighlight">{{ item.score.score }}</span>
        <span class="sr-only">out of</span>
        <span class="possible">{{ item.score.max }}</span>
      </p>
      <div v-if="item.tracks" class="track-wrapper">
        <span class="track-prefix">Favourite tracks //</span>
        <span class="tracks">
          <span
            v-for="(track, tkey) in item.tracks"
            :key="`tracks-${tkey}`"
            class="track"
          >
            {{ track }}
          </span>
        </span>
      </div>
      <hr v-if="key !== content.length - 1" class="divider" />
    </section>
  </article>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PostContent from '~/components/PostContent.vue'
import { isObject, resolveAuthorLink } from '~/assets/utilities'

type AuthorLink = {
  text: string
  url: string
}

export default Vue.extend({
  name: 'PostContentBlock',
  components: { PostContent },
  props: {
    content: { type: Array as PropType<Post['content']>, required: true },
    colours: (Array as unknown) as PropType<ReviewMetadata['colours']>,
    decorate: { type: Boolean, default: false }
  },
  computed: {
    textHighlight(): { color: string } {
      const primary = isObject(this.colours) ? this.colours[0] : 'black'
      return { color: primary }
    },
    authors(): (Author | undefined)[] {
      return this.content.map((item) => {
        if (!isObject(item) || !('author' in item)) return undefined
        return (item as ReviewItem).author.authors[0]
      })
    },
    authorName(): (string | null)[] {
      return this.authors.map((item) => (item ? item.forename : null))
    },
    authorLink(): (AuthorLink | null)[] {
      return this.authors.map((author) => resolveAuthorLink(author))
    },
    contentHTML(): string[] {
      return this.content.map((item) => {
        if (typeof item === 'string') return item
        if (isObject(item)) {
          return (item as ReviewItem).review || item.content || item.body || ''
        }
        return ''
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.author,
.author-social,
.score,
.track-prefix {
  font-family: $heading-fontstack;
}

.author {
  font-weight: bold;
  font-size: $site-content__font--large;
  margin-top: $site-content__spacer;
  margin-bottom: $site-content__spacer--large;
}

.author-social {
  @include site-content__subtext;
  margin-bottom: $site-content__spacer--small;
}

.track-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: $site-content__spacer--x-large;
  margin-bottom: $site-content__spacer--x-large;
}

.track-prefix,
.track {
  @include site-content__body-text;
  margin: 0;
}

.track {
  display: block;
  font-family: $base-fontstack;
}

.track-prefix {
  font-weight: bold;
  margin-right: 0.25em;
}

.track:nth-child(2) {
  margin-left: 35px;
}

.track:nth-child(3) {
  margin-left: 70px;
}

.score {
  @include score-wrap;
  align-items: center;
  float: right;
  font-size: 1.7em;
  width: 82px;
  height: 82px;
  border: $line-width solid $line-colour;
  border-radius: 2em;
}

.given {
  @include review__score-given;
}

.possible {
  @include review__score-possible;
}

.divider {
  @include hr-line-styles;
  width: 75%;
  margin-top: $site-content__spacer--x-large;
  margin-bottom: $site-content__spacer--x-large;
}
</style>
