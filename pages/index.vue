<template>
  <main>
    <lead-post class="lead" />
    <div class="reviews">
      <h3>Reviews (<nuxt-link to="/reviews">See all</nuxt-link>)</h3>
      <div class="listing" v-for="(review, key) in reviews" :key="key">
        <img :src="review.featured_media.media_details.sizes['audioxide-album'].source_url" />
        <div>
          <h4>{{ review.meta['Album Name'] }}</h4>
          <h5>{{ review.meta['Artist Name'] }}</h5>
          <p>{{ review.meta['Summary'] }}</p>
        </div>
      </div>
    </div>
    <div class="articles">
      <h3>Articles</h3>
      <div class="listing" v-for="(article, key) in articles" :key="key">
        <div>
          <h4>{{ article.title.rendered }}</h4>
          <p>{{ article.meta['_aioseop_description'] }}</p>
          <p>By {{ article.author.name }}</p>
        </div>
        <img :src="article.featured_media.media_details.sizes['bones-thumb-300'].source_url" />
      </div>
    </div>
    <div class="interviews">
      <h3>Interviews</h3>
      <div class="listing">
        <div v-for="(interview, key) in interviews" :key="key">
          <img :src="interview.featured_media.media_details.sizes['bones-thumb-300'].source_url" />
          <h4>{{ interview.title.rendered }}</h4>
          <p>{{ interview.meta['_aioseop_description'] }}</p>
          <p>By {{ interview.author.name }}</p>
        </div>
      </div>
    </div>
    <div class="funnyfarm">
      <h3>Funnyfarm</h3>
      <div class="listing" v-for="(interview, key) in funnyfarm" :key="key">
        <img :src="interview.featured_media.media_details.sizes['bones-thumb-300'].source_url" />
        <div>
          <h4>{{ interview.title.rendered }}</h4>
          <p>{{ interview.meta['_aioseop_description'] }}</p>
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
      store.dispatch('posts/getPostsInCategory', 2),
      store.dispatch('posts/getPostsInCategory', 1),
      store.dispatch('posts/getPostsInCategory', 213),
      store.dispatch('posts/getPostsInCategory', 281),
    ]);
  },
  computed: {
    blah() {
      return this.$store.state.posts.tags;
    },
    shit() {
      return this.$store.getters['posts/byTag'];
    },
    reviews() {
      return (this.$store.getters['posts/byTag'][2] || []).slice(0, 5);
    },
    articles() {
      return (this.$store.getters['posts/byTag'][1] || []).slice(0, 3);
    },
    interviews() {
      return (this.$store.getters['posts/byTag'][213] || []).slice(0, 3);
    },
    funnyfarm() {
      return (this.$store.getters['posts/byTag'][281] || []).slice(0, 3);
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
