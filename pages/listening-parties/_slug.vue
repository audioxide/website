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
                        v-if="authorLinks[key]">{{author.name}}</a><span v-else>{{author.name}}</span>{{ authorDivider(key, authorLinks.length) }}
                </span>
            </p>
        </header>
        <section class="article-content">
            <post-content-block :content="article.content" :decorate="true" />
            <div class="tags">
                <span v-for="(tag, key) in article.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag.replace(/ /g, '-')}`">{{tag}}</nuxt-link></span>
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
import { MetaInfo, ScriptPropertyJson } from 'vue-meta';
import { formatISO } from 'date-fns';
import { resolveAuthorLink, isObject, metaTitle, toTitleCase, audioxideStructuredData, generateBreadcrumbs, authorDivider } from '../../assets/utilities';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideListeningParty',
    components: { PostContentBlock, NewsletterSignup, RelatedPosts },
    data: () => ({
        article: {} as Article,
        type: 'listening-parties',
        slug: '',
    }),
    head() {
        const metadata = this.article.metadata;
        const pageMeta: MetaInfo = {
            title: metaTitle(toTitleCase(this.slug, '-')),
        };

        pageMeta.meta = [
            { hid: "og:type", property: "og:type", content: "article" },
        ];

        if (metadata) {
            const datePublished = formatISO(metadata.created, { representation: 'date' });
            const dateModified = formatISO(metadata.modified, { representation: 'date' });

            pageMeta.title = metaTitle(metadata.title);

            pageMeta.meta.push(
                { hid: 'og:title', property: 'og:title', content: metadata.title },
                { hid: 'twitter:title', property: 'twitter:title', content: metadata.title },
                { hid: "article:published_time", property: "article:published_time", content: datePublished },
                { hid: "article:modified_time", property: "article:modified_time", content: dateModified },
            );

            if (metadata.blurb) {
                pageMeta.meta.push(
                    { hid: "description", name: "description", content: metadata.blurb },
                    { hid: "og:description", property: "og:description", content: metadata.blurb },
                    { hid: "twitter:description", property: "twitter:description", content: metadata.blurb },
                );
            }

            if (metadata.featuredimage) {
                const imageStandard = metadata.featuredimage["medium-standard"];
                const imageSquare = metadata.featuredimage["medium-square"];
                const imgAlt = metadata.featuredimageAlt;
                pageMeta.meta.push(
                    { hid: "og:image-standard", property: "og:image", content: imageStandard },
                    { hid: "og:image-standard:alt", property: "og:image:alt", content: imgAlt },
                    { hid: 'og:image-standard:width', property: 'og:image:width', content: '600' },
                    { hid: 'og:image-standard:height', property: 'og:image:height', content: '400' },
                    { hid: "og:image-square", property: "og:image", content: imageSquare },
                    { hid: "og:image-square:alt", property: "og:image:alt", content: imgAlt },
                    { hid: 'og:image-square:width', property: 'og:image:width', content: '600' },
                    { hid: 'og:image-square:height', property: 'og:image:height', content: '600' },
                    { hid: "twitter:image", property: "twitter:image", content: imageStandard },
                    { hid: "twitter:image:alt", property: "twitter:image:alt", content: imgAlt },
                );
            }

            pageMeta.script = [{
                type: 'application/ld+json',
                json: {
                    '@context': 'http://schema.org',
                    '@type': 'Article',
                    headline: metadata.title,
                    description: metadata.summary || metadata.blurb || '',
                    image: (metadata.featuredimage || {})['medium-standard'] || '',
                    datePublished,
                    dateModified,
                    "speakable": {
                        "@type": "SpeakableSpecification",
                        "cssSelector": [
                            ".site-content .article-header__heading",
                            ".site-content .article-header__summary",
                            ".site-content .article-content",
                        ],
                    },
                    publisher: audioxideStructuredData(),
                    breadcrumb: generateBreadcrumbs(this.$route, [null, metadata.title]),
                },
            }];

            if (metadata.author) {
                // Posts have the potential to not have an author (though this is incorrect)
                pageMeta.script[0].json.author = metadata.author.authors.map(author => ({
                    '@type': 'Person', name: author.name
                }));
            }
        }
        return pageMeta;
    },
    asyncData({ params: { slug }, store }) {
        return store.dispatch('posts/getPost', { type: 'listening-parties', slug });
    },
    async created() {
        this.slug = this.$route.params.slug;
        console.log(this.type, this.slug);
        const articleData = this.$store.getters['posts/pathLookup'][`${this.type}/${this.slug}`];
        if (isObject(articleData)) {
            this.article = articleData as Article;
        }
    },
    computed: {
        authorLinks(): ReturnType<typeof resolveAuthorLink>[] {
            if (!isObject(this.article.metadata.author)) return [];
            return this.article.metadata.author.authors.map(resolveAuthorLink);
        }
    },
    methods: {
        authorDivider,
    }
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
        padding-bottom: $site-content__spacer--large;
        margin: auto;
        width: 95%;
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

        .article-header__author {
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

<style lang="scss" scoped>
    .article-content ::v-deep .content > h2 ~ p:first-of-type::first-letter {
        font-size: inherit;
        float: none;
        line-height: inherit;
    }

    .article-content ::v-deep .content > h2 {
        text-align: center;
        padding-top: 1.5em;
    }

    .article-content ::v-deep .content p.speaker-name {
        font-family: Source Sans Pro,sans-serif;
        font-size: 0.9em;
    }

    .article-content ::v-deep .content p.message {
        width: 30%;
        margin-left: 16.5%;
        padding: .5em .75em;
        border-radius: 1em;
        font-family: Source Sans Pro,sans-serif;
        a {
            color: white;
            &:hover, &:focus, &:active {
                color: #ffe6e6;
            }
        }
    }

    .article-content ::v-deep .content p.message.speaker-0 {
        background: lightgrey;
        color: black;
    }

    .article-content ::v-deep .content p.speaker-name + p.message {
        margin-top: 0;
    }

    .article-content ::v-deep .content p.speaker-name.speaker-0 {
        padding-left: 0.75em;
    }

    .article-content ::v-deep .content p.speaker-name.speaker-1 {
        text-align: right;
        padding-right: 0.75em;
    }

    .article-content ::v-deep .content p.message.speaker-1 {
        background: #9f5168;
        color: white;
        margin-left: auto;
        margin-right: 16.5%;
    }

    .article-content ::v-deep .content p.message + p.message {
        margin-top: -1em;
        padding-top: 1.25em;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
