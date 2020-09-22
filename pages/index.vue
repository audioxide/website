<template>
  <main>
    <component :is="leadComponent" :post="leadPost" />
    <div class="panel reviews">
      <h3>Reviews <nuxt-link to="reviews">See all <span class="sr-only">reviews</span></nuxt-link></h3>
      <div class="listing" v-for="(item, key) in reviews" :key="key">
        <review-link :post="item" image-size="xsmall" />
      </div>
    </div>
    <div class="panel articles">
      <h3>Articles <nuxt-link to="articles">See all <span class="sr-only">articles</span></nuxt-link></h3>
      <div class="listing" v-for="(item, key) in articles" :key="key">
        <article-link :post="item" />
      </div>
    </div>
    <div class="panel interviews">
      <h3>Interviews <nuxt-link to="interviews">See all <span class="sr-only">interviews</span></nuxt-link></h3>
      <div class="listing" v-for="(item, key) in interviews" :key="key">
        <article-link :post="item" :author="false" />
      </div>
    </div>
    <div class="panel listening-parties">
      <h3>Listening Parties <nuxt-link to="interviews">See all <span class="sr-only">listening parties</span></nuxt-link></h3>
      <div class="listing" v-for="(item, key) in listeningParties" :key="key">
        <review-link :post="item" image-size="xsmall" :author="false" />
      </div>
    </div>
    <div class="panel funnyfarm">
      <h3>Funnyfarm <nuxt-link to="interviews">See all <span class="sr-only">funnyfarm articles</span></nuxt-link></h3>
      <div class="listing" v-for="(item, key) in funnyfarm" :key="key">
        <article-link :post="item" :author="false" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import ArticleLink from '@/components/ArticleLink.vue';
import ReviewLink from '@/components/ReviewLink.vue';

export default Vue.extend({
  components: { ArticleLink, ReviewLink },
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
    leadComponent() {
      switch(this.leadPost.metadata.type) {
        case 'reviews':
        case 'listening-parties':
          return ReviewLink;
        default:
          return ArticleLink;
      }
    },
    reviews(): PostListing<Review> {
      return this.posts.reviews
        .filter(review => review !== this.leadPost)
        .slice(0, this.getLimit({
          large: 8,
          medium: 6,
          default: 4,
        })) as PostListing<Review>;
    },
    articles(): PostListing<Article> {
      return this.posts.articles.slice(0, this.getLimit({
        large: 3,
        medium: 3,
        default: 2,
      })) as PostListing<Article>;
    },
    interviews(): PostListing<Article> {
      return this.posts.interviews.slice(0, this.getLimit({
        large: 3,
        medium: 4,
        default: 2,
      })) as PostListing<Article>;
    },
    funnyfarm(): PostListing<Article> {
      return this.posts.funnyfarm.slice(0, this.getLimit({
        large: 4,
        medium: 4,
        default: 2,
      })) as PostListing<Article>;
    },
    listeningParties(): PostListing<Article> {
      return [];
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

  .panel {
    // padding: 0 7.5%;
    position: relative;
    overflow: hidden;
    flex-wrap: wrap;
    & > h3 {
      // font-family: $heading-fontstack;
      font-size: $site-content__font--small;
      font-variant: small-caps;
      width: 100%;
      // text-align: center;
      position: relative;
      border-top: 3px solid #f5f5f5;
      border-bottom: 3px solid #f5f5f5;
      // margin-bottom: 1.5em;
      /* &::after {
        width: 5%;
        height: 1px;
        background-color: black;
        content: '';
        display: block;
        margin: .75em 0 1.5em;
      } */
    }
  }

  :not(.interviews) .listing:not(:last-child) {
    border-bottom: 3px solid #f5f5f5;
  }

  .interviews {
    display: flex;
    flex-wrap: wrap;
    h3 {
      width: 100%;
    }
    .listing {
      width: 25%;
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
