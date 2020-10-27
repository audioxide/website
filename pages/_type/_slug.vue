<template>
    <main class="site-content site-content--flex" v-if="article.metadata">
        <header class="article-header">
            <details class="collapsible">
                <summary class="collapsible__toggle">
                    <p class="article-header__date">{{ article.metadata.created | formatDate }}</p>
                </summary>
                <p class="article-header__date">Last modified {{ article.metadata.modified | formatDate }}</p>
            </details>
            <h1 class="article-header__heading">{{ article.metadata.title | unescape }}</h1>
            <h2 class="article-header__summary" v-if="article.metadata.summary">{{ article.metadata.summary || unescape }}</h2>
            <p class="article-header__author" v-if="article.metadata.author">By
                <span v-for="(author, key) in article.metadata.author.authors" :key="'author' + key">
                    <a class="review-header__author"
                        :href="authorLinks[key].url"
                        v-if="authorLinks[key]">{{author.name}}</a><span v-else>{{author.name}}</span>{{ key !== authorLinks.length - 1 ? ', ' : ''}}
                </span>
            </p>
        </header>
        <section class="article-content">
            <post-content-block :content="article.content" :decorate="true" />
            <div class="tags">
                <span v-for="(tag, key) in article.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag}`">{{tag}}</nuxt-link></span>
            </div>
        </section>
        <newsletter-signup />
        <related-posts v-if="article.related" :posts="article.related" />
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import PostContentBlock from '../../components/PostContentBlock.vue';
import NewsletterSignup from '../../components/NewsletterSignup.vue';
import RelatedPosts from '@/components/RelatedPosts.vue';
import { resolveAuthorLink, isObject, metaTitle, toTitleCase } from '../../assets/utilities';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideArticle',
    components: { PostContentBlock, NewsletterSignup, RelatedPosts },
    data: () => ({
        article: {} as Article,
        type: 'articles',
        slug: '',
    }),
    head() {
        const metadata = this.article.metadata;
        if (metadata) {
            return { title: metaTitle(metadata.title) };
        }
        return { title: metaTitle(toTitleCase(this.slug, '-')) };
    },
    asyncData({ params: { type, slug }, store }) {
        return store.dispatch('posts/getPost', { type, slug });
    },
    async created() {
        this.type = this.$route.params.type;
        this.slug = this.$route.params.slug;
        this.article = this.$store.getters['posts/pathLookup'][`${this.type}/${this.slug}`];
    },
    computed: {
        authorLinks(): ReturnType<typeof resolveAuthorLink>[] {
            if (!isObject(this.article.metadata.author)) return [];
            return this.article.metadata.author.authors.map(resolveAuthorLink);
        }
    },
})

</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    /* DEFAULT STYLING (MOBILE-FIRST) */

    .article-header {
        margin-top: $site-content__spacer--x-large;
        padding-bottom: $site-content__spacer--small;
    }

    .collapsible {
        text-align: center;
    }

    .collapsible__toggle {
        display: inline;
        padding: 0.5em;
        &:active, &:focus {
            outline: none;
        }
    }

    .article-header__date {
        @include site-content__subtext;
    }

    .article-header__heading, .article-header__summary, .article-header__date, .article-header__author {
        font-family: $heading-fontstack;
        text-align: center;
    }

    .article-header__heading {
        font-size: 2em;
        font-weight: 600;
        margin-bottom: $site-content__spacer;
        width: 95%;
        margin: auto;
    }

    .article-header__summary {
        padding-top: $site-content__spacer--large;
        padding-bottom: $site-content__spacer--large;
        font-size: 1.1em;
        line-height: 1.1;
        color: $colour-grey;
        margin: auto;
        width: 95%;
    }

    .article-header__author {
        color: $colour-grey;
        margin-bottom: $site-content__spacer--large;
    }

    .article-content {
        margin-top: $site-content__spacer--large;
        width: 95%;
        margin: auto;
    }

    .tags {
        padding-top: 40px;
        padding-bottom: $site-content__spacer--large;
    }

    .tags .tag {
        @include tag;
    }

    /* Medium styling (TABLET) */

    @include medium {
        .article-header {
            width: 100%;
        }
    }

    /* Large styling (DESKTOP) */

    @include large {

        .article-header__heading {
        font-size: 2.5em;
        width: 67%;
        }

        .article-header__summary {
        font-size: 1.2em;
        width: 67%;
        }

        .article-content {
            width: 100%;
        }

        .tags {
            width: 67%;
            margin: auto;
        }

        .newsletter-container {
            width: 67%;
        }

    }

</style>
