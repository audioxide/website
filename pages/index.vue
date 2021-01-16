<template>
  <main>
    <any-post-link :post="leadPost" class="lead-post" />
    <div class="panel reviews">
      <h3>Album Reviews (<nuxt-link to="/reviews/">See all<span class="sr-only">reviews</span></nuxt-link>)</h3>
      <div class="listing">
        <review-link v-for="(item, key) in reviews" :key="key" :post="item" image-size="xsmall" />
      </div>
    </div>
    <div class="panel articles">
      <h3>Articles (<nuxt-link to="/articles/">See all<span class="sr-only">articles</span></nuxt-link>)</h3>
      <div class="listing">
        <article-link v-for="(item, key) in articles" :key="key" :post="item" />
      </div>
    </div>
    <div class="panel interviews">
      <h3>Interviews (<nuxt-link to="/interviews/">See all<span class="sr-only">interviews</span></nuxt-link>)</h3>
      <div class="listing">
        <article-link v-for="(item, key) in interviews" :key="key" :post="item" :author="false" />
      </div>
    </div>
    <div class="panel listening-parties">
      <h3>Listening Parties (<nuxt-link to="/listening-parties/">See all<span class="sr-only">listening parties</span></nuxt-link>)</h3>
      <div class="listing">
        <article-link v-for="(item, key) in listeningParties" :key="key"
                    :post="item" image-size="xsmall" image-format="square" :author="false" />
      </div>
    </div>
    <div class="panel funnyfarm">
      <h3>Funnyfarm (<nuxt-link to="/funnyfarm/">See all<span class="sr-only">funnyfarm articles</span></nuxt-link>)</h3>
      <div class="listing">
        <article-link v-for="(item, key) in funnyfarm" :key="key" :post="item" :author="false" />
      </div>
    </div>
    <div class="panel social">
      <nuxt-link class="random" to="/random/">Feed your head</nuxt-link>
      <h3>Follow Audioxide</h3>
      <ul class="social-icons">
        <li>
          <span class="icon">
            <icon class="closed" icon="envelope" />
            <icon class="opened" icon="envelope-open" />
          </span>
          <a class="label" :href="NEWSLETTER_URL">Newsletter</a>
        </li>
        <li>
          <span class="icon"><icon :icon="['fab', 'facebook-f']" /></span>
          <a class="label" :href="FACEBOOK_URL">Facebook</a>
        </li>
        <li>
          <span class="icon"><icon :icon="['fab', 'twitter']" /></span>
          <a class="label" :href="TWITTER_URL">Twitter</a>
        </li>
        <li>
          <span class="icon"><icon :icon="['fab', 'instagram']" /></span>
          <a class="label" :href="INSTAGRAM_URL">Insta</a>
        </li>
        <li>
          <span class="icon"><icon icon="rss" /></span>
          <a class="label" :href="RSS_BASE">RSS</a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleLink from '@/components/ArticleLink.vue';
import ReviewLink from '@/components/ReviewLink.vue';
import Icon from '@/components/Icon.vue';
import { audioxideStructuredData } from '@/assets/utilities';
import * as SITE_CONSTANTS from '@/assets/siteConstants';
import AnyPostLink from '~/components/AnyPostLink.vue';

export default Vue.extend({
  components: { ArticleLink, ReviewLink, Icon, AnyPostLink },
  data: () => SITE_CONSTANTS,
  head() {
    return {
      script: [{
        type: 'application/ld+json',
        json: audioxideStructuredData(),
      }],
      meta: [
          { name: "google-site-verification", content: "aAaGDXrBixmXjHGSOVCBJexlPGi6VtPyX_WOSLhcKFs" },
          { name: 'p:domain_verify', content: 'd1fcf92cdd3b4392d1c76473f6ccae89' },
        ]
    };
  },
  asyncData({ store }) {
    return Promise.all([
      store.dispatch('posts/getLatestData'),
    ]);
  },
  computed: {
    posts(): PostGrouping<Post> {
      return this.$store.state.posts.posts;
    },
    leadPost(): Post {
      return this.$store.getters['posts/latestPost'];
    },
    reviews(): PostListing<Review> {
      return this.posts.reviews
        .filter(post => post !== this.leadPost)
        .slice(0, this.getLimit({
          large: 7,
          medium: 5,
          default: 3,
        })) as PostListing<Review>;
    },
    articles(): PostListing<Article> {
      return this.posts.articles
        .filter(post => post !== this.leadPost)
        .slice(0, this.getLimit({
          large: 3,
          medium: 3,
          default: 2,
        })) as PostListing<Article>;
    },
    interviews(): PostListing<Article> {
      return this.posts.interviews
        .filter(post => post !== this.leadPost)
        .slice(0, this.getLimit({
          large: 4,
          medium: 4,
          default: 2,
        })) as PostListing<Article>;
    },
    funnyfarm(): PostListing<Article> {
      return this.posts.funnyfarm
        .filter(post => post !== this.leadPost)
        .slice(0, this.getLimit({
          large: 4,
          medium: 3,
          default: 2,
        })) as PostListing<Article>;
    },
    listeningParties(): PostListing<Article> {
      return this.posts['listening-parties']
        .filter(post => post !== this.leadPost)
        .slice(0, this.getLimit({
          large: 4,
          medium: 3,
          default: 2,
        })) as PostListing<Article>;
    }
  },
  methods: {
    getLimit(sizes: { [key: string]: number }) {
      let limit = sizes.default;
      Object.keys(sizes).some((key) => {
        if (this.$store.state.breakpoint === key) {
          limit = sizes[key];
          return true;
        }
        return false;
      });
      return limit;
    },
  }
})
</script>

<style lang="scss" scoped>
  @import "~assets/styles/variables";

  main {
    width: 90%;
    margin: 40px auto;
    @include medium {
      @supports (display: grid) {
          width: 80%;
          padding-top: 1em;
          margin: 40px auto;
          display: grid;
          grid-template: repeat(5, auto) / repeat(10, 1fr);
          grid-column-gap: 30px;
          grid-row-gap: 10px;
      }
    }
  }

  .reviews, .listening-parties {
    .post-link ::v-deep {
      h4 {
        font-size: $site-content__font;
      }
      p {
        font-size: 1em;
      }
    }
  }

  .lead-post.post-link {
    order: 0;
    grid-area: 1 / 4 / 2 / 8;
    margin-bottom: 20px;
    text-align: center;
    margin-bottom: 30px;
    border: $line-width solid $line-colour;
    border-radius: 15px;
    padding-top: 0;
    ::v-deep {
      .img-wrap {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
      }
      img {
        margin: 0;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
      }
      .info {
        padding: 30px;
      }
      h4 {
        font-size: $site-content__font--large;
      }
    }
  }

  .lead-post.post-link, .interviews .post-link {
    display: block;
    ::v-deep .img-wrap {
      margin-right: 0;
    }
  }

  .panel {
    // padding: 0 7.5%;
    position: relative;
    overflow: hidden;
    flex-wrap: wrap;
    & > h3 {
      @include section-heading;
    }
  }

  .reviews {
    grid-area: 1 / 1 / 3 / 4;
  }

  .articles {
    grid-area: 2 / 4 / 3 / 11;
    @include small {
      ::v-deep .img-wrap {
        order: 1;
        margin-right: 0;
        margin-left: 10px;
        @media (min-width: $bp_small) and (max-width: $bp_medium - 1) {
          align-self: stretch;
          min-height: 230px;
          img {
              height: 100%;
              object-fit: cover;
          }
        }
      }
    }
    @include medium {
      padding-left: 20px;
      &::before {
        content: "";
        height: 80%;
        width: 2.5px;
        display: block;
        background-color: $colour-grey--lighter;
        position: absolute;
        top: 10%;
        left: -5px;
      }
    }
  }

  :not(.interviews) > .listing > .post-link:not(:last-child) {
    border-bottom: 3px solid #f5f5f5;
  }

  .interviews {
    grid-area: 3 / 1 / 4 / 11;
    @include small {
      .listing {
        display: flex;
        justify-content: space-between;
      }
      .post-link {
        width: calc(50% - .5em);
      }
    }
    @include medium {
      .post-link {
        width: calc(25% - 1em);
      }
    }
  }

  .listening-parties {
    grid-area: 4 / 7 / 5 / 11;
  }

  .funnyfarm {
    grid-area: 4 / 1 / 5 / 7;
  }

  .social {
    grid-area: 1 / 8 / 2 / 11;
    .random {
      width: 100%;
      border: 2px solid $colour-pink;
      display: block;
      border-radius: 0.6em;
      text-align: center;
      padding: 1.2em;
      font-family: $heading-fontstack;
      font-size: $site-content__font--large;
      font-weight: 600;
      margin-bottom: 1.5em;
      &:hover {
        border: 2px solid lighten($colour-pink, 30%);
      }
    }
    .social-icons {
      margin: 2em 1.5em;
      li {
        display: flex;
        align-items: center;
        margin-bottom: 1em;
        position: relative;
        &:hover {
          .icon [role="img"] {
            &.opened {
              display: initial;
            }
            &.closed {
              display: none;
            }
          }
        }
        .icon {
          margin-right: 1em;
          border-radius: 1em;
          border: 2.5px solid black;
          font-size: 1em;
          height: 2em;
          width: 2em;
          display: flex;
          justify-content: space-around;
          align-items: center;
          [role="img"] {
            width: 0.9em;
            &.opened {
              display: none;
              margin-top: -4px;
            }
          }
        }
        .label {
          font-family: $heading-fontstack;
          font-size: $site-content__font;
          font-weight: 600;
          @include overlayLink;
        }
      }
    }
  }

  /* .listing {
    position: relative;
    h4 span {
      display: block;
    }
  }

  .reviews {
    // order: 1;
    /* width: 85%; * /
    margin: 2% auto;
    display: flex;
    justify-content: space-between;
    align-items: normal;
    flex-wrap: wrap;
    h3 {
      width: 100%;
    }
    .listing {
      // width: 45%;
      // width: calc(24% - 1.5em);
      // width: calc(33% - 1.5em);
      @include medium {
        display: flex;
        width: calc(33% - 1.5em);
      }
      @include large {
        width: calc(25% - 1.5em);
      }
      display: flex;
      align-items: flex-start;
      margin-bottom: 2em;
      img {
        width: 35%;
        margin-right: 1.5em;
      }
      h4 {
        font-family: $heading-fontstack;
        display: flex;
        flex-direction: column;
        font-size: $site-content__font--large;
        margin-bottom: $site-content__spacer--large;
        line-height: 1.2em;
        margin-top: .1em;
        .album {
          font-style: italic;
        }
      }
    }
  }

  .articles {
    @include small {
      display: flex;
      justify-content: space-between;
    }
    // background: black;
    padding-top: 2%;
    padding-bottom: 2%;
    h3 {
      color: white;
      &::after {
        background-color: white;
      }
    }
    .listing {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: white;
      margin-bottom: 1.5em;
      @include small {
        width: calc((100% / 2) - 1.5em);
      }
      @include medium {
        width: calc((100% / 3) - 1.5em);
      }
      img {
        width: 100%;
      }
      h4 {
        font-family: $heading-fontstack;
        font-size: $site-content__font--large;
        margin-bottom: $site-content__spacer--large;
        line-height: 1.2em;
        margin-top: .5em;
      }
      p {
        flex-grow: 1;
      }
    }
  }

  .interviews {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 2% 0;
    .listing {
      @include small {
        // display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      @include medium {
        width: calc(50% - 1.5em);
      }
      @include large {
        width: calc((100% / 3) - 1.5em);
      }
      img {
        width: 100%;
      }
      h4 {
        font-family: $heading-fontstack;
        font-size: $site-content__font--large;
        margin-bottom: $site-content__spacer--large;
        line-height: 1.2em;
        margin-top: .5em;
        flex-grow: 2;
      }
    }
  }

  .funnyfarm {
    display: flex;
    justify-content: space-between;
    margin: 2% 0;
    .listing {
      margin-bottom: 1.5em;
      @include small {
        display: flex;
        align-items: flex-start;
      }
      @include medium {
        width: calc(50% - 1.5em);
      }
      @include large {
        width: calc(25% - 1.5em);
        flex-direction: column;
        justify-content: flex-start;
      }
      h4 {
        font-family: $heading-fontstack;
        font-size: $site-content__font--large;
        margin-bottom: $site-content__spacer--large;
        line-height: 1.2em;
        margin-top: .5em;
      }
      img {
        width: 100%;
        margin-right: 1em;
        @include small {
          // flex-grow: 1;
          width: auto;
        }
        @include medium {
          width: 50%;
        }
        @include large {
          width: auto;
          flex-grow: 0;
        }
      }
      div {
        flex-grow: 3;
      }
    }
  } */

  /* .reviews .listing > div:first-of-type {
    width: 100%;
    &:first-child {
      margin-right: 1.5em;
    }
    img {
      width: 100%;
    }
  } */

</style>
