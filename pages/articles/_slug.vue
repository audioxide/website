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
            <p class="article-header__author" v-if="article.metadata.author">By
                <a :href="authorLink.url" v-if="authorLink">{{ article.metadata.author.name }}</a>
                <span v-else>{{ article.metadata.author.name }}</span>
            </p>
        </header>
        <section class="article-content">
            <post-content :content="article.content" :decorate="true" />
            <div class="tags">
                <span v-for="(tag, key) in article.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag}`">{{tag}}</nuxt-link></span>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import PostContent from '../../components/PostContent.vue';
import { resolveAuthorLink, isObject } from '../../assets/utilities';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideArticle',
    components: { PostContent },
    data: () => ({
        article: {} as Article,
    }),
    validate({ params: { slug }, store }) {
        return store.dispatch('posts/getPost', {type: 'articles', slug });
    },
    async created() {
        this.article = this.$store.state.posts.postData.articles[this.$route.params.slug];
    },
    computed: {
        authorLink() {
            if (!isObject(this.article.metadata.author)) return;
            return resolveAuthorLink(this.article.metadata.author);
        }
    },
})
</script>

<style lang="scss">
    @import "~assets/styles/variables";

    .article-header {
        padding-bottom: $site-content__spacer--small;
    }

    @include medium {
        .article-header {
            width: 100%;
        }
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

    .article-header__heading, .article-header__date, .article-header__author {
        font-family: $heading-fontstack;
        text-align: center;
    }

    .article-header__heading {
        font-size: $site-content__font--x-large;
        margin-bottom: $site-content__spacer;
        width: 75%;
        margin: auto;
    }

    .article-header__date {
        @include site-content__subtext;
    }

    .article-header__author {
        color: $colour-grey;
    }

    .article-content {
        margin-top: $site-content__spacer--large;
    }

    .tags .tag {
        @include tag;
    }

</style>
