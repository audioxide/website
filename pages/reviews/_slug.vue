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
  padNum,
  injectRichMediaComponentAssets
} from '~/assets/utilities'
import ReviewHeader from '~/components/reviews/ReviewHeader.vue'

type PostColours = [string, string, string]
type ColourStyles = { [key: string]: string }

export default Vue.extend({
  name: 'AudioxideReview',
  components: {
    ReviewHeader,
    PostContentBlock,
    NewsletterSignup,
    RelatedPosts
  },
  asyncData({ params: { slug }, store }) {
    return store.dispatch('posts/getPost', { type: 'reviews', slug })
  },
  data: () => ({
    review: {} as Review,
    showCredit: false
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
    weekStr(): string {
      return padNum(this.review.metadata.week, 7)
    },
    colours(): PostColours {
      return this.review.metadata.colours
    },
    sidebarStyles(): ColourStyles {
      return { 'background-color': this.colours[0] }
    },
    sidebarTextStyles(): ColourStyles {
      return { color: this.colours[1] }
    },
    sidebarHighlightStyles(): ColourStyles {
      return { color: this.colours[2] }
    },
    coverAlt(): string {
      return albumCoverAlt(this.review)
    }
  },
  async created() {
    this.review = await this.$store.getters['posts/pathLookup'][
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
    <aside class="review-sidebar">
      <div class="review-sidebar__album-cover-container">
        <template v-if="review.metadata.totalscore.given > 26">
          <a href="/tags/27-plus-club/" target="_blank"
            ><img
              class="review-sidebar__sticker"
              src="~assets/img/award-platinum.png"
              alt="Platinum Audioxide review badge"
          /></a>
        </template>
        <template
          v-if="
            review.metadata.totalscore.given == 26 ||
              review.metadata.totalscore.given == 25
          "
        >
          <img
            class="review-sidebar__ribbon"
            src="~assets/img/award-gold.png"
            alt="Gold Audioxide review ribbon"
          />
        </template>
        <template
          v-if="
            review.metadata.totalscore.given == 24 ||
              review.metadata.totalscore.given == 23
          "
        >
          <img
            class="review-sidebar__ribbon"
            src="~assets/img/award-silver.png"
            alt="Silver Audioxide review ribbon"
          />
        </template>
        <template
          v-if="
            review.metadata.totalscore.given == 22 ||
              review.metadata.totalscore.given == 21
          "
        >
          <img
            class="review-sidebar__ribbon"
            src="~assets/img/award-bronze.png"
            alt="Bronze Audioxide review ribbon"
          />
        </template>
        <figure>
          <img
            class="review-sidebar__album-cover"
            :alt="coverAlt"
            :src="review.metadata.featuredimage['medium-square']"
            :style="sidebarStyles"
            width="600"
            height="600"
          />
          <template v-if="review.metadata.artworkCredit">
            <figcaption v-if="showCredit" class="review-sidebar__artwork-info">
              The album artwork of
              <span class="album">{{ review.metadata.album }}</span> by
              {{ review.metadata.artist }} {{ review.metadata.artworkCredit }}
              <template v-if="review.metadata.artworkCreditSource"
                ><a
                  :href="review.metadata.artworkCreditSource"
                  class="review-sidebar_artwork-source-link"
                  target="_blank"
                  rel="noopener"
                  aria-label="Source link"
                  >Source
                  <img
                    class="review-sidebar__artwork-info-external-link"
                    src="@/assets/icons/external-link.svg"/></a
              ></template>
            </figcaption>
            <img
              class="review-sidebar__artwork-info-icon"
              src="@/assets/icons/information.svg"
              alt="Information icon"
              @click="showCredit = !showCredit"
            />
          </template>
        </figure>
      </div>
      <div class="review-sidebar__total-score" :style="sidebarStyles">
        <span class="review-sidebar__score" :style="sidebarTextStyles">
          {{ review.metadata.totalscore.given }}
        </span>
        <span class="review-sidebar__total" :style="sidebarHighlightStyles">{{
          review.metadata.totalscore.possible
        }}</span>
      </div>
      <p class="review-sidebar__summary" :style="{ color: colours[0] }">
        ‘{{ review.metadata.summary }}’
      </p>
      <div
        class="review-sidebar__tracks"
        :class="{
          'review-sidebar__tracks--artist-link': review.metadata.artistLink
        }"
        :style="sidebarStyles"
      >
        <template v-if="review.metadata.essentialtracks.length">
          <p class="review-sidebar__heading" :style="sidebarHighlightStyles">
            Essential
          </p>
          <p
            v-for="(track, key) in review.metadata.essentialtracks"
            :key="`essential-tracks-${key}`"
            class="review-sidebar__track"
            :style="sidebarTextStyles"
          >
            {{ track }}
          </p>
        </template>
        <template v-if="review.metadata.favouritetracks.length">
          <p class="review-sidebar__heading" :style="sidebarHighlightStyles">
            Favourites
          </p>
          <p
            v-for="(track, key) in review.metadata.favouritetracks"
            :key="`favourite-tracks-${key}`"
            class="review-sidebar__track"
            :style="sidebarTextStyles"
          >
            {{ track }}
          </p>
        </template>
      </div>
      <template v-if="review.metadata.artistLink">
        <div class="review-sidebar__artist-link">
          <p>
            <a :href="review.metadata.artistLink" target="_blank" rel="noopener"
              >Support the artist →</a
            >
          </p>
        </div>
      </template>
      <p class="review-sidebar__serial">No. {{ weekStr }}</p>
    </aside>
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

.review-sidebar__album-cover-container {
  position: relative;
}

.review-sidebar__ribbon {
  position: absolute;
  top: -7px;
  right: 6%;
  width: 12%;
}

.review-sidebar__sticker {
  position: absolute;
  top: 4%;
  right: 6%;
  width: 26%;
  transform: rotate(8deg);
}

.review-sidebar__album-cover {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid #dddddd;
  border-top: 0;
}

.review-sidebar__artwork-info {
  font-family: 'Source Sans Pro', sans-serif;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5% 20% 5% 5%;
  opacity: 0.8;
  color: white;
  background-color: black;
  line-height: 1.3;
  font-size: 0.9em;
  margin: 1px;
}

.review-sidebar__artwork-info .album {
  font-style: italic;
}

.review-sidebar_artwork-source-link {
  text-decoration: none;
  white-space: nowrap;
  font-weight: bold;
}

.review-sidebar__artwork-info-icon {
  margin: 8%;
  width: 8%;
  height: 8%;
  position: absolute;
  bottom: 0;
  right: 0;
}

.review-sidebar__artwork-info-icon:hover {
  filter: invert(97%) sepia(1%) saturate(14%) hue-rotate(314deg) brightness(93%)
    contrast(81%);
  cursor: pointer;
}

.review-sidebar__artwork-info-external-link {
  filter: invert(25%) sepia(78%) saturate(5157%) hue-rotate(334deg)
    brightness(95%) contrast(98%);
  height: 1em;
  top: 0.125em;
  position: relative;
}

.review-sidebar__total-score,
.review-sidebar__tracks {
  background: black;
  color: white;
}

.review-sidebar__total-score,
.review-sidebar__tracks,
.review-sidebar__artist-link {
  text-align: center;
  border-radius: 15px;
}

.review-sidebar__total-score,
.review-sidebar__artist-link {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}

.review-sidebar__tracks--artist-link {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  margin-bottom: 3px;
}

.review-sidebar__tracks,
.review-sidebar__artist-link {
  padding: 15px 20px;
}

.review-sidebar__tracks {
  padding-bottom: 25px;
}

.review-sidebar__artist-link {
  background: white;
  display: block;
  font-family: $heading-fontstack;
  font-weight: 400;
  font-size: 1em;
  border: 2px solid $colour-pink;
  position: relative;
  &:hover {
    border: 2px solid lighten($colour-pink, 30%);
  }
  a {
    @include overlayLink;
    text-decoration: none;
  }
}

.review-sidebar__heading,
.review-sidebar__total-score {
  font-family: $heading-fontstack;
}

.review-sidebar__total-score {
  @include score-wrap;
  font-size: $site-content__font--xx-large;
  padding: $site-content__spacer 0;
}

.review-sidebar__score {
  @include review__score-given;
}

.review-sidebar__total {
  @include review__score-possible;
}

.review-sidebar__summary {
  @include site-content__body-text;
  margin: 0;
  font-style: italic;
  padding: $site-content__spacer--large;
}

.review-sidebar__tracks :first-child {
  padding-top: $site-content__spacer--large;
}

.review-sidebar__heading {
  font-size: $site-content__font--large;
}

.review-sidebar__track {
  @include site-content__body-text;
  margin: 0;
  padding-bottom: $site-content__spacer--large;
  .review-sidebar__heading + & {
    padding-top: $site-content__spacer--large;
  }
}

.review-sidebar__serial {
  @include site-content__subtext;
  font-family: $heading-fontstack;
  margin-top: $site-content__spacer--small;
  text-align: right;
  padding: 5px 15px;
}

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
