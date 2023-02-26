<template>
  <post-listing :link-type="linkType" :posts="reviews" type="reviews" />
</template>

<script lang="ts">
import Vue, { VNode } from 'vue'
import PostListing from '@/components/PostListing.vue'
import ReviewLink from '~/components/ReviewLink.vue'
import {
  audioxideStructuredData,
  generateBreadcrumbs,
  metaTitle
} from '~/assets/utilities'

export default Vue.extend({
  name: 'ReviewListing',
  components: { PostListing },
  /* async validate({ params: { slug }, store }) {
        // Add in an API endpoint that allows us to check if we have all the reviews
        // if (!store.state.posts.posts.reviews) {
            await store.dispatch('posts/getPostType', 'reviews');
        // }
        return true;
    }, */
  asyncData({ store }) {
    return store.dispatch('posts/getPostType', 'reviews')
  },
  data: () => ({
    linkType: ReviewLink
  }),
  head() {
    return {
      title: metaTitle('Reviews'),
      link: [
        {
          rel: 'alternative',
          type: 'application/rss+xml',
          title: metaTitle('Reviews'),
          href: 'https://audioxide.com/feed/reviews/'
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'CollectionPage',
            name: 'Reviews',
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: ['.post-listing h2', '.post-link .info']
            },
            publisher: audioxideStructuredData(),
            breadcrumb: generateBreadcrumbs(this.$route)
          }
        }
      ]
    }
  },
  computed: {
    reviews(): PostListing<Review> {
      return this.$store.state.posts.posts.reviews
    }
  }
})
</script>
