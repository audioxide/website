<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import formatISO from 'date-fns/formatISO'
import PostContentBlock from '../../components/PostContentBlock.vue'
import NewsletterSignup from '../../components/NewsletterSignup.vue'
import RelatedPosts from '@/components/RelatedPosts.vue'
import {
  albumCoverAlt,
  audioxideStructuredData,
  generateBreadcrumbs,
  metaTitle,
  injectRichMediaComponentAssets
} from '~/assets/utilities'
import ReviewHeader from '~/components/reviews/ReviewHeader.vue'
import ReviewSummary from '~/components/reviews/ReviewSummary.vue'

type PostColours = [string, string, string]

export default Vue.extend({
  name: 'AudioxideReview',
  components: {
    ReviewHeader,
    ReviewSummary,
    PostContentBlock,
    NewsletterSignup,
    RelatedPosts
  },
  asyncData({ params: { slug }, store }) {
    return store.dispatch('posts/getPost', { type: 'reviews', slug })
  },
  data: () => ({
    review: {} as Review
  }),
  head() {
    const metadata = this.review.metadata
    const albumArtist = metadata
      ? `${metadata.album} // ${metadata.artist}`
      : ''
    const title = metaTitle(`Review${albumArtist && ': ' + albumArtist}`)
    const imgAlt = this.coverAlt
    const pageMeta: MetaInfo = { title }

    pageMeta.meta = [
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:type', property: 'og:type', content: 'article' },
      { hid: 'og:image:alt', property: 'og:image:alt', content: imgAlt },
      { hid: 'twitter:title', property: 'twitter:title', content: title },
      {
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: imgAlt
      }
    ]

    if (metadata) {
      const datePublished = formatISO(metadata.created, {
        representation: 'date'
      })
      const dateModified = formatISO(metadata.modified, {
        representation: 'date'
      })

      pageMeta.meta.push(
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: `'${metadata.pullquote}.'`
        },
        {
          hid: 'article:published_time',
          property: 'article:published_time',
          content: datePublished
        },
        {
          hid: 'article:modified_time',
          property: 'article:modified_time',
          content: dateModified
        }
      )

      if (metadata.blurb) {
        pageMeta.meta.push(
          { hid: 'description', name: 'description', content: metadata.blurb },
          {
            hid: 'og:description',
            property: 'og:description',
            content: metadata.blurb
          }
        )
      }

      if (metadata.featuredimage) {
        const imageStandard = metadata.featuredimage['medium-standard']
        const imageSquare = metadata.featuredimage['medium-square']
        pageMeta.meta.push(
          {
            hid: 'og:image-standard',
            property: 'og:image',
            content: imageStandard
          },
          {
            hid: 'og:image-standard:alt',
            property: 'og:image:alt',
            content: imgAlt
          },
          {
            hid: 'og:image-standard:width',
            property: 'og:image:width',
            content: '600'
          },
          {
            hid: 'og:image-standard:height',
            property: 'og:image:height',
            content: '400'
          },
          {
            hid: 'og:image-square',
            property: 'og:image',
            content: imageSquare
          },
          {
            hid: 'og:image-square:alt',
            property: 'og:image:alt',
            content: imgAlt
          },
          {
            hid: 'og:image-square:width',
            property: 'og:image:width',
            content: '600'
          },
          {
            hid: 'og:image-square:height',
            property: 'og:image:height',
            content: '600'
          },
          {
            hid: 'twitter:image',
            property: 'twitter:image',
            content: imageSquare
          },
          {
            hid: 'twitter:image:alt',
            property: 'twitter:image:alt',
            content: imgAlt
          }
        )
      }

      injectRichMediaComponentAssets(pageMeta, metadata.components)

      pageMeta.script = [
        {
          type: 'application/ld+json',
          json: {
            '@context': 'http://schema.org',
            '@type': 'Review',
            headline: title,
            description: metadata.summary || metadata.blurb || '',
            datePublished,
            dateModified,
            author: metadata.author.authors.map((author) => ({
              '@type': 'Person',
              name: author.name
            })),
            itemReviewed: {
              '@type': 'MusicAlbum',
              name: metadata.album,
              '@id': `https://musicbrainz.org/release-group/${metadata.albumMBID}`,
              image: (metadata.featuredimage || {})['medium-square'] || '',
              albumReleaseType: 'http://schema.org/AlbumRelease',
              byArtist: {
                '@type': 'MusicGroup',
                name: metadata.artist,
                '@id': `https://musicbrainz.org/artist/${metadata.artistMBID}`
              }
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: metadata.totalscore.given,
              worstRating: 0,
              bestRating: metadata.totalscore.possible
            },
            speakable: {
              '@type': 'SpeakableSpecification',
              cssSelector: [
                '.review-header__album',
                '.review-header__artist',
                '.review-sidebar__summary'
              ]
            },
            publisher: audioxideStructuredData(),
            breadcrumb: generateBreadcrumbs(this.$route, [
              'Album Reviews',
              albumArtist
            ])
          }
        }
      ]
    }
    return pageMeta
  },
  computed: {
    colours(): PostColours {
      return this.review.metadata.colours
    },
    coverAlt(): string {
      return albumCoverAlt(this.review)
    }
  },
  async created() {
    this.review = this.$store.getters['posts/pathLookup'][
      `reviews/${this.$route.params.slug}`
    ]
  }
})
</script>

<template>
  <main
    v-if="review.metadata"
    class="site-content site-content--flex review-content"
  >
    <review-header
      :colours="colours"
      :week="review.metadata.week"
      :created="review.metadata.created"
      :modified="review.metadata.modified"
      :artist="review.metadata.artist"
      :album="review.metadata.album"
      :content="review.content"
    />
    <review-summary :review="review" :cover-alt="coverAlt" :colours="colours" />
    <section class="review-content">
      <post-content-block :content="review.content" :colours="colours" />
      <div class="tags">
        <span v-for="(tag, key) in review.metadata.tags" :key="key" class="tag"
          ><nuxt-link :to="`/tags/${tag.replace(/ /g, '-')}`">{{
            tag
          }}</nuxt-link></span
        >
      </div>
    </section>
    <newsletter-signup class="newsletter" />
    <related-posts
      v-if="review.related"
      class="related"
      :posts="review.related"
    />
  </main>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.review-content {
  margin-top: $site-content__spacer--large;
}

.tags .tag {
  @include tag;
}

.tags {
  padding: 40px 0 30px;
  clear: both;
}

/* MEDIUM STYLING (TABLET) */

@include medium {
  .review-content {
    width: $site-content__content-size;
    padding-right: $site-content__spacer--xx-large;
  }
  .review-sidebar,
  ::v-deep .newsletter,
  ::v-deep .related {
    order: 1;
  }
  .review-sidebar {
    width: $review__sidebar-size;
  }
  .review-header {
    width: 100%;
  }
  .post-review-content {
    width: $site-content__content-size * 0.95;
  }
}

/* LARGE STYLING (TABLET) */

/* LARGE STYLING (TABLET) */
</style>
