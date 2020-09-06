<template>
  <main>
    <lead-post class="lead" />
    <div class="panel reviews">
      <h3>Reviews</h3>
      <div class="listing" v-for="(review, key) in reviews" :key="key">
        <!-- <div> -->
        <img :src="review.metadata.featuredimage['xsmall-square']" />
        <!-- </div> -->
        <div>
          <h4>
            <nuxt-link :to="`reviews/${review.metadata.slug}`" class="overlay-link">
              <span class="album">{{ review.metadata.album }}</span>
              <span class="artist">{{ review.metadata.artist }}</span>
            </nuxt-link>
          </h4>
          <p>{{ review.metadata.blurb }}</p>
        </div>
      </div>
      <nuxt-link to="reviews" class="more-link">Read more reviews</nuxt-link>
    </div>
      <!--
        <div data-v-2a183b29="" class="listing" style="
    position: relative;
"><img data-v-2a183b29="" src="http://localhost:8888/images/2020/01/Lovely-mutant-couliflower-small-standard.jpg" style="
    border: 8px solid white;
    border-top: 0;
    border-right: 0;
    border-left-width: 10px;
"> <div data-v-2a183b29="" style="
    /* transform: translateY(-104px); */
"><h4 data-v-2a183b29="" style="
    /* background: white; */
    display: inline;
    font-family: &quot;Source Sans Pro&quot;, sans-serif;
    padding: .5em;
    font-size: 25px;
    line-height: 49px;
    width: 85%;
    backdrop-filter: blur(100px) brightness(0.75) contrast(1.5);
    color: white;
    /* border: 5px solid white; */
    border-left: 0;
    border-bottom: 0;
    position: absolute;
    bottom: 11%;
    left: 0;
">This frilly ape's 'Lovely mutant cauliflower' as weird and wonderful as it sounds</h4> <p data-v-2a183b29="">It's quite the fusion of sounds, and huge credit goes to Rumerio for creating something so distinctive. It's rather captivating, truth be told.</p> <p data-v-2a183b29="">By André Dack</p></div></div>
-->
    <div class="panel articles">
      <div class="post-blur" :style="{ backgroundImage: `url(${articles[0].metadata.featuredimage['medium-square']})` }"></div>
      <h3>Articles</h3>
      <div class="listing" v-for="(article, key) in articles" :key="key">
        <img :src="article.metadata.featuredimage['small-standard']" />
        <h4><nuxt-link :to="`articles/${article.metadata.slug}`" class="overlay-link">{{ article.metadata.title | unescape }}</nuxt-link></h4>
        <p>{{ article.metadata.blurb }}</p>
        <p v-if="article.metadata.author">By {{ article.metadata.author.name }}</p>
      </div>
      <nuxt-link to="articles" class="more-link">Read more articles</nuxt-link>
    </div>
    <div class="panel interviews">
      <h3>Interviews</h3>
      <div class="listing" v-for="(interview, key) in interviews" :key="key">
        <img :src="interview.metadata.featuredimage['xsmall-standard']" />
        <div>
          <h4><nuxt-link :to="`interviews/${interview.metadata.slug}`" class="overlay-link">{{ interview.metadata.title | unescape }}</nuxt-link></h4>
          <!-- <p>{{ interview.metadata.blurb }}</p> -->
          <!-- <p v-if="interview.metadata.author">By {{ interview.metadata.author.name }}</p> -->
        </div>
      </div>
      <nuxt-link to="interviews" class="more-link">Read more interviews</nuxt-link>
    </div>
    <div class="panel funnyfarm">
      <h3>Funnyfarm</h3>
      <div class="listing" v-for="(funnyfarm, key) in funnyfarm" :key="key">
        <img :src="funnyfarm.metadata.featuredimage['xsmall-standard']" />
        <div>
          <h4><nuxt-link :to="`funnyfarm/${funnyfarm.metadata.slug}`" class="overlay-link">{{ funnyfarm.metadata.title | unescape }}</nuxt-link></h4>
          <p>{{ funnyfarm.metadata.blurb }}</p>
        </div>
      </div>
      <nuxt-link to="funnyfarm" class="more-link">Read more funnyfarm</nuxt-link>
    </div>
    <div class="newsletter">
      <div>
        <p>Sign up for our monthly newsletter</p>
        <input type="email" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import LeadPost from '@/components/LeadPost.vue';

export default Vue.extend({
  components: { LeadPost },
  asyncData({ store }) {
    return Promise.all([
      store.dispatch('posts/getLatestData'),
    ]);
  },
  computed: {
    posts(): PostGrouping<Post> {
      return this.$store.state.posts.posts;
    },
    latest(): Post {
      return this.$store.getters['posts/latestPost'];
    },
    reviews(): PostListing<Review> {
      return this.posts.reviews
        .filter(review => review !== this.latest)
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
    padding: 0 7.5%;
    position: relative;
    overflow: hidden;
    flex-wrap: wrap;
    & > h3 {
      font-family: $heading-fontstack;
      font-size: $site-content__font--small;
      text-transform: uppercase;
      width: 100%;
      // text-align: center;
      position: relative;
      // margin-bottom: 1.5em;
      &::after {
        width: 5%;
        height: 1px;
        background-color: black;
        content: '';
        display: block;
        margin: .75em 0 1.5em;
      }
    }
    .more-link {
      width: 100%;
      text-align: center;
      margin: 0;
      font-family: $heading-fontstack;
      font-size: $site-content__font--small;
      text-decoration: none;
      &::before/* , &::after */ {
        transition: 0.25s width cubic-bezier(0.22, 0.61, 0.36, 1);
        width: 20%;
        @include small {
          width: 15%;
        }
        @include medium {
          width: 10%;
        }
        @include large {
          width: 5%;
        }
        height: 1px;
        background-color: black;
        content: '';
        display: block;
        margin: 1.5em auto;
      }
      &::after {
        margin-bottom: 0;
      }
      &:hover {
        color: lighten($color: #000000, $amount: 10%);
        &::before/* , &::after */ {
          transition-duration: 1.5s;
          width: 60%;
          @include small {
            width: 40%;
          }
          @include medium {
            width: 25%;
          }
          @include large {
            width: 12%;
          }
        }
      }
    }
  }

  .listing {
    position: relative;
    h4 span {
      display: block;
    }
  }

  .overlay-link {
    position: static;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &:before {
      bottom: 0;
      content: '';
      left: 0;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 0;
      white-space: nowrap;
      z-index: 1;
    }
  }

  .post-blur {
      filter: blur(100px) brightness(0.75) contrast(1.5);
      position: absolute;
      width: 120%;
      height: 120%;
      left: -10%;
      top: -10%;
      background-size: cover;
      background-position: center center;
      z-index: -1;
      &.darkened {
          filter: blur(100px) brightness(0.5) contrast(1.5);
      }
  }

  /* main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .reviews { grid-area: 1 / 1 / 5 / 2; }
  .lead { grid-area: 1 / 2 / 2 / 3; }
  .feed-follow { grid-area: 1 / 3 / 2 / 4; }
  .articles { grid-area: 2 / 2 / 3 / 4; }
  .interviews { grid-area: 3 / 2 / 4 / 4; }
  .funnyfarm { grid-area: 4 / 2 / 5 / 3; }
  .newsletter { grid-area: 4 / 3 / 5 / 4; } */

  /* .container {
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  .reviews {
    width: 1/3 * 100%;
  }

  .articles {
    width: 2/3 * 100%;
    .listing:first-child {
      position: relative;
      div {
        position: absolute;
        bottom: 2em;
        left: 2em;
        max-width: 75%;
        backdrop-filter: blur(100px) brightness(0.75) contrast(1.25);
        color: white;
        padding: 1em;
        display: inline-block;
        h4 {
          font-family: $heading-fontstack;
          font-size: 2em;
          line-height: 1.4em;
        }
        p {
          display: none;
        }
      }
    }
  } */

  /* .reviews {
    display: flex;
    justify-content: space-between;
    // margin-left: -.75em;
    // margin-right: -.75em;
    .listing {
      width: calc(24% - 1.5em);
      min-width: 300px;
      // padding: 0 .75em;
    }
  } */

  /* .articles {
    order: 0;
    padding-right: 2em;
    .listing:first-of-type {
      display: block;
      img {
        width: 100%;
      }
    }
  } */

  .reviews {
    // order: 1;
    /* width: 85%; */
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
    .more-link {
      color: white;
      &:hover {
        color: darken($color: white, $amount: 10%);
      }
      &::before {
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
  }

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
