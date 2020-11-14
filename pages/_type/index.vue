<template>
  <span>
    <template v-if="type === 'page'">
      <post-single :post="pageData" />
    </template>
    <template v-else-if="type === 'post'">
      <post-listing :posts="pageData" :type="slug" />
    </template>
    <template v-else>
      <p>This page doesn't exist.</p>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import he from 'he';
import { MetaInfo } from 'vue-meta';
import PostSingle from '@/components/PostSingle.vue';
import PostListing from '@/components/PostListing.vue';
import ArticleLink from '@/components/ArticleLink.vue';
import { metaTitle, toTitleCase } from '~/assets/utilities';

type ContentTypes = { pages: string[]; postTypes: string[] }
const isPost = (type: string, types: ContentTypes) =>
  types.postTypes.includes(type);
const isPage = (type: string, types: ContentTypes) =>
  types.pages.includes(type);

export default Vue.extend({
  name: 'ArticleListing',
  components: { PostSingle, PostListing, ArticleLink },
  data: () => ({
    type: '',
    slug: '',
  }),
  head() {
    let title = '';
    const metaData: MetaInfo = {};
    metaData.link = [];
    switch (this.type) {
      case 'page':
        const page = this.pageData as Post;
        metaData.title = he.decode(page.metadata.title);
        break;
      case 'post':
        const title = toTitleCase(this.slug, '-');
        metaData.title = title;
        metaData.link.push(
          {
            rel: 'alternative',
            type: 'application/rss+xml',
            title: title,
            href: `https://audioxide.com/feed/${this.slug}/`,
          },
        );
        break;
    }
    return metaData;
  },
  async validate({ params: { type }, store }) {
    if (
      !('pages' in store.state.types) ||
      !('postTypes' in store.state.types)
    ) {
      await store.dispatch('getTypes');
    }
    const types = store.state.types;
    return isPage(type, types) || isPost(type, types);
  },
  asyncData({ params: { type }, store }) {
    const types = store.state.types;
    if (isPage(type, types)) {
      return store.dispatch('getPage', type);
    }
    if (isPost(type, types)) {
      return store.dispatch('posts/getPostType', type);
    }
  },
  created() {
    const types = this.$store.state.types;
    const slug = this.$route.params.type;
    this.slug = slug;
    if (isPage(slug, types)) {
      this.type = 'page';
    }
    if (isPost(slug, types)) {
      this.type = 'post';
    }
  },
  computed: {
    pageData(): Post | Post[] | undefined {
      if (this.type === 'page') {
        return this.$store.state.pages[this.slug];
      }
      if (this.type === 'post') {
        return this.$store.state.posts.posts[this.slug];
      }
    }
  }
})
</script>
