<template>
  <post-listing
    :link-type="linkType"
    :posts="posts"
    :title="title"
    type="tags"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import PostListing from '@/components/PostListing.vue'
import AnyPostLink from '@/components/link-cards/AnyPostLink.vue'
import { generateBreadcrumbs, metaTitle } from '~/assets/utilities'
import { audioxideStructuredData } from '~/assets/structured-data'

const tagFromParam = (tagParam: string) => tagParam.replace(/-/g, ' ')

export default Vue.extend({
  name: 'TagListing',
  components: { PostListing },
  asyncData({ params: { tag }, store }) {
    return store.dispatch('posts/getPostTag', tagFromParam(tag))
  },
  data: () => ({
    title: '',
    posts: [],
    linkType: AnyPostLink
  }),
  head() {
    const { title } = this
    return {
      title: metaTitle(title),
      meta: [{ name: 'robots', content: 'noindex,follow' }],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'CollectionPage',
            name: this.title,
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.post-listing h2', '.post-link .info']
            },
            publisher: audioxideStructuredData(),
            breadcrumb: generateBreadcrumbs(this.$route, [null, this.title])
          }
        }
      ]
    }
  },
  created() {
    const tag = tagFromParam(this.$route.params.tag)
    this.title = `Posts tagged "${tag}"`
    this.posts = this.$store.getters['posts/byTag'][tag]
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

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
