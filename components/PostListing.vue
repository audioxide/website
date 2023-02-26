<template>
  <section class="listing">
    <h2>{{ listingTitle }}</h2>
    <component
      :is="linkType"
      v-for="(post, key) in shownPosts"
      :key="key"
      :post="post"
      class="post-item"
    />
  </section>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import PostLink from '@/components/PostLink.vue'
import ArticleLink from '@/components/ArticleLink.vue'
import { throttle } from '~/assets/utilities'

const ADD_SHOWN = 10

export default Vue.extend({
  name: 'PostListing',
  props: {
    title: { type: String },
    posts: { type: Array as PropType<PostListing<Post>>, required: true },
    type: { type: String, required: true },
    linkType: {
      type: Function as PropType<typeof PostLink>,
      default: ArticleLink
    }
  },
  data: () => ({
    shown: ADD_SHOWN,
    handler: null as ((evt: Event) => void) | null
  }),
  computed: {
    shownPosts(): PostListing<Post> {
      return this.posts.slice(0, this.shown)
    },
    listingTitle(): String {
      return this.title || `Latest ${this.type}`
    }
  },
  mounted() {
    const elm = this.$el
    this.handler = throttle(() => {
      const { bottom } = elm.getBoundingClientRect()
      if (bottom < window.innerHeight * 1.5) {
        this.showMore()
      }
    }, 500)
    window.addEventListener('scroll', this.handler, false)
  },
  beforeDestroy() {
    if (!this.handler) return
    window.removeEventListener('scroll', this.handler)
  },
  methods: {
    showMore() {
      if (this.posts.length > this.shown) {
        this.shown += ADD_SHOWN
      }
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

h2 {
  text-align: center;
  font-family: $heading-fontstack;
  font-size: 2em;
  font-weight: 600;
}

.post-item {
  @include line-styles;
  &:last-child {
    border: 0;
  }
}

.listing {
  width: 90%;
  margin: auto;
  padding-top: 50px;
}

@include medium {
  .listing {
    width: 75%;
  }
}

@include large {
  .listing {
    width: 50%;
  }
}
</style>
