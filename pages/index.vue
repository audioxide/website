<template>
  <main>
    <lead-post class="lead" />
    <div class="reviews">
      <h3>Reviews (<nuxt-link to="/reviews">See all</nuxt-link>)</h3>
      <div class="listing" v-for="(review, key) in reviews" :key="key">
        <img :src="review.featuredimage['xsmall-square']" />
        <div>
          <h4>{{ review.album }}</h4>
          <h5>{{ review.artist }}</h5>
          <p>{{ review.summary }}</p>
        </div>
      </div>
    </div>
    <div class="articles">
      <h3>Articles</h3>
      <div class="listing" v-for="(article, key) in articles" :key="key">
        <div>
          <h4>{{ article.title | unescape }}</h4>
          <p>{{ article.blurb }}</p>
          <p>By {{ article.author.name }}</p>
        </div>
        <img :src="article.featuredimage.xsmall" />
      </div>
    </div>
    <div class="interviews">
      <h3>Interviews</h3>
      <div class="listing">
        <div v-for="(interview, key) in interviews" :key="key">
          <img :src="interview.featuredimage.xsmall" />
          <h4>{{ interview.title | unescape }}</h4>
          <p>{{ interview.blurb }}</p>
          <p>By {{ interview.author.name }}</p>
        </div>
      </div>
    </div>
    <div class="funnyfarm">
      <h3>Funnyfarm</h3>
      <div class="listing" v-for="(funnyfarm, key) in funnyfarm" :key="key">
        <img :src="funnyfarm.featuredimage.xsmall" />
        <div>
          <h4>{{ funnyfarm.title | unescape }}</h4>
          <p>{{ funnyfarm.blurb }}</p>
        </div>
      </div>
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
    reviews(): PostListing<Review> {
      return this.posts.reviews as PostListing<Review>;
    },
    articles(): PostListing<Article> {
      return this.posts.articles as PostListing<Article>;
    },
    interviews(): PostListing<Article> {
      return this.posts.interviews as PostListing<Article>;
    },
    funnyfarm(): PostListing<Article> {
      return this.posts.funnyfarm as PostListing<Article>;
    }
  }
})
</script>

<style lang="scss" scoped>
  main {
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
  .newsletter { grid-area: 4 / 3 / 5 / 4; }

  .reviews, .articles, .funnyfarm {
    .listing {
      display: flex;
    }
  }

  .reviews img {
    width: 200px;
  }

  .interviews .listing {
    display: flex;
  }

</style>
