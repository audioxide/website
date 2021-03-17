<template>
    <main class="site-content site-content--flex review-content" v-if="review.metadata">
        <header class="review-header" :style="chromeStyles">
            <template v-if="review.metadata.week < 15">
                <p class="review-header__disclaimer">Our early reviews are threadbare to say the least. In the spirit of remembering where we came from, we've left them as they were.</p>
            </template>
            <details class="collapsible">
                <summary class="collapsible__toggle">
                    <p class="review-header__date">{{ review.metadata.created | formatDate }}</p>
                </summary>
                <p class="review-header__date">Last modified {{ review.metadata.modified | formatDate }}</p>
            </details>
            <h1 class="review-header__heading">
                <span class="review-header__album" :style="textStyles">{{review.metadata.album}}</span>
                <span class="review-header__artist">{{review.metadata.artist}}</span>
            </h1>
            <p class="review-header__authors">
                <span>Album review by </span>
                <span v-for="(reviewItem, key) in reviews" :key="`reviewers-${key}`">
                    <a class="review-header__author"
                        :href="reviewAuthorLinks[key].url"
                        v-if="reviewAuthorLinks[key]">{{reviewItem.author.name}}</a><span v-else>{{reviewItem.author.name}}</span>{{ authorDivider(key, reviews.length) }}
                </span>
            </p>
        </header>
        <aside class="review-sidebar">
            <div class="review-sidebar__album-cover-container">
                <template v-if="review.metadata.totalscore.given > 26">
                    <img class="review-sidebar__ribbon" src="~assets/img/ribbon-27-plus.png" alt="Platinum Audioxide review ribbon">
                </template>
                <template v-if="review.metadata.totalscore.given == 26 || review.metadata.totalscore.given == 25">
                    <img class="review-sidebar__ribbon" src="~assets/img/ribbon-gold.png" alt="Gold Audioxide review ribbon">
                </template>
                <template v-if="review.metadata.totalscore.given == 24 || review.metadata.totalscore.given == 23">
                    <img class="review-sidebar__ribbon" src="~assets/img/ribbon-silver.png" alt="Silver Audioxide review ribbon">
                </template>
                <template v-if="review.metadata.totalscore.given == 22 || review.metadata.totalscore.given == 21">
                    <img class="review-sidebar__ribbon" src="~assets/img/ribbon-bronze.png" alt="Bronze Audioxide review ribbon">
                </template>
            <figure>
                <img class="review-sidebar__album-cover" :alt="coverAlt" :src="review.metadata.featuredimage['medium-square']" :style="sidebarStyles" width="600" height="600" />
                <template v-if="review.metadata.artworkCredit">
                    <figcaption class="review-sidebar__artwork-info" v-if="showCredit">The album artwork of <span class="album">{{ review.metadata.album }}</span> by {{ review.metadata.artist }} {{ review.metadata.artworkCredit }} <template v-if="review.metadata.artworkCreditSource"><a :href="review.metadata.artworkCreditSource" class="review-sidebar_artwork-source-link" target="_blank" rel="noopener" aria-label="Source link">Source <icon :icon="['fa', 'external-link-alt']" /></a></template>
                    </figcaption>
                    <icon class="review-sidebar__artwork-info-icon" @click="showCredit = !showCredit" :icon="['fad', 'info-circle']" />
                </template>
            </figure>
            </div>
            <div class="review-sidebar__total-score" :style="sidebarStyles">
                <span class="review-sidebar__score" :style="sidebarTextStyles">
                    {{review.metadata.totalscore.given}}
                </span>
                <span class="review-sidebar__total" :style="sidebarHighlightStyles">{{review.metadata.totalscore.possible}}</span>
            </div>
            <p class="review-sidebar__summary" :style="textStyles">{{ review.metadata.summary }}</p>
            <div class="review-sidebar__tracks" :class="{ 'review-sidebar__tracks--artist-link': review.metadata.artistLink }" :style="sidebarStyles">
                <template v-if="review.metadata.essentialtracks.length">
                <p class="review-sidebar__heading" :style="sidebarHighlightStyles">Essential</p>
                <p class="review-sidebar__track"
                    :style="sidebarTextStyles"
                    v-for="(track, key) in review.metadata.essentialtracks"
                    :key="`essential-tracks-${key}`">
                    {{ track }}
                </p>
                </template>
                <template v-if="review.metadata.favouritetracks.length">
                <p class="review-sidebar__heading" :style="sidebarHighlightStyles">Favourites</p>
                <p class="review-sidebar__track"
                    :style="sidebarTextStyles"
                    v-for="(track, key) in review.metadata.favouritetracks"
                    :key="`favourite-tracks-${key}`">
                    {{ track }}
                </p>
                </template>
            </div>
            <template v-if="review.metadata.artistLink">
            <div class="review-sidebar__artist-link">
                <p><a :href="review.metadata.artistLink" target="_blank" rel="noopener">Support the artist →</a></p>
            </div>
            </template>
            <p class="review-sidebar__serial">No. {{ weekStr }}</p>
        </aside>
        <section class="review-content">
            <post-content-block :content="review.content" :colours="colours" />
            <div class="tags">
                <span v-for="(tag, key) in review.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag.replace(/ /g, '-')}`">{{tag}}</nuxt-link></span>
            </div>
        </section>
        <newsletter-signup class="newsletter" />
        <related-posts class="related" v-if="review.related" :posts="review.related" />
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import PostContentBlock from '../../components/PostContentBlock.vue';
import NewsletterSignup from '../../components/NewsletterSignup.vue';
import RelatedPosts from '@/components/RelatedPosts.vue';
import {
    albumCoverAlt,
    audioxideStructuredData,
    generateBreadcrumbs,
    metaTitle,
    padNum,
    resolveAuthorLink,
    authorDivider,
    injectRichMediaComponentAssets,
} from '~/assets/utilities';
import { MetaInfo } from 'vue-meta';
import formatISO from 'date-fns/formatISO';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideReview',
    components: { PostContentBlock, NewsletterSignup, RelatedPosts },
    data: () => ({
        review: {} as Review,
        showCredit: false,
    }),
    head() {
        const metadata = this.review.metadata;
        const albumArtist = metadata ? `${metadata.album} // ${metadata.artist}` : '';
        const title = metaTitle(`Review${albumArtist && ': ' + albumArtist}`);
        const imgAlt = this.coverAlt;
        const pageMeta: MetaInfo = { title };

        pageMeta.meta = [
            { hid: "og:title", property: "og:title", content: title },
            { hid: "og:type", property: "og:type", content: "article" },
            { hid: "og:image:alt", property: "og:image:alt", content: imgAlt },
            { hid: "twitter:title", property: "twitter:title", content: title },
            { hid: "twitter:image:alt", property: "twitter:image:alt", content: imgAlt },
        ]

        if (metadata) {
            const datePublished = formatISO(metadata.created, { representation: 'date' });
            const dateModified = formatISO(metadata.modified, { representation: 'date' });

            pageMeta.meta.push(
                { hid: "twitter:description", property: "twitter:description", content: `'${metadata.pullquote}.'` },
                { hid: "article:published_time", property: "article:published_time", content: datePublished },
                { hid: "article:modified_time", property: "article:modified_time", content: dateModified },
            );

            if (metadata.blurb) {
                pageMeta.meta.push(
                    { hid: "description", name: "description", content: metadata.blurb },
                    { hid: "og:description", property: "og:description", content: metadata.blurb },
                );
            }

            if (metadata.featuredimage) {
                const imageStandard = metadata.featuredimage["medium-standard"];
                const imageSquare = metadata.featuredimage["medium-square"];
                pageMeta.meta.push(
                    { hid: "og:image-standard", property: "og:image", content: imageStandard },
                    { hid: "og:image-standard:alt", property: "og:image:alt", content: imgAlt },
                    { hid: 'og:image-standard:width', property: 'og:image:width', content: '600' },
                    { hid: 'og:image-standard:height', property: 'og:image:height', content: '400' },
                    { hid: "og:image-square", property: "og:image", content: imageSquare },
                    { hid: "og:image-square:alt", property: "og:image:alt", content: imgAlt },
                    { hid: 'og:image-square:width', property: 'og:image:width', content: '600' },
                    { hid: 'og:image-square:height', property: 'og:image:height', content: '600' },
                    { hid: "twitter:image", property: "twitter:image", content: imageSquare },
                    { hid: "twitter:image:alt", property: "twitter:image:alt", content: imgAlt },
                );
            }

            injectRichMediaComponentAssets(pageMeta, metadata.components);

            pageMeta.script = [{
                type: 'application/ld+json',
                json: {
                    '@context': 'http://schema.org',
                    '@type': 'Review',
                    headline: title,
                    description: metadata.summary || metadata.blurb || '',
                    datePublished,
                    dateModified,
                    author: metadata.author.authors.map(author => ({
                        '@type': 'Person', name: author.name
                    })),
                    itemReviewed: {
                        '@type': 'MusicAlbum',
                        'name': metadata.album,
                        '@id': `https://musicbrainz.org/release-group/${metadata.albumMBID}`,
                        'image': (metadata.featuredimage || {})['medium-square'] || '',
                        'albumReleaseType': 'http://schema.org/AlbumRelease',
                        'byArtist':{
                            '@type': 'MusicGroup',
                            'name': metadata.artist,
                            '@id': `https://musicbrainz.org/artist/${metadata.artistMBID}`,
                        }
                    },
                    reviewRating: {
                        '@type': 'Rating',
                        ratingValue: metadata.totalscore.given,
                        worstRating: 0,
                        bestRating: metadata.totalscore.possible,
                    },
                    "speakable":
                        {
                        "@type": "SpeakableSpecification",
                        "cssSelector": [".review-header__album", ".review-header__artist", ".review-sidebar__summary"]
                        },
                    publisher: audioxideStructuredData(),
                    breadcrumb: generateBreadcrumbs(this.$route, ["Album Reviews", albumArtist]),
                }
            }];
        }
        return pageMeta;
    },
    asyncData({ params: { slug }, store }) {
        return store.dispatch('posts/getPost', { type: 'reviews', slug });
    },
    async created() {
        this.review = this.$store.getters['posts/pathLookup'][`reviews/${this.$route.params.slug}`];
    },
    computed: {
        reviews(): ReviewItem[] {
            const reviews = [];
            for (let review of this.review.content) {
                if (typeof review !== 'object') continue;
                reviews.push(review);
            }
            return reviews;
        },
        reviewAuthorLinks(): ReturnType<typeof resolveAuthorLink>[] {
            const links = [];
            for (let review of this.reviews) {
                links.push(resolveAuthorLink(review.author.authors[0]));
            }
            return links;
        },
        weekStr(): string {
            return padNum(this.review.metadata.week, 7);
        },
        colours(): PostColours {
            return this.review.metadata.colours;
        },
        textStyles(): ColourStyles {
            return { color: this.colours[0] };
        },
        chromeStyles(): ColourStyles {
            return { 'border-bottom-color': this.colours[0] };
        },
        sidebarStyles(): ColourStyles {
            return { 'background-color': this.colours[0] };
        },
        sidebarTextStyles(): ColourStyles {
            return { color: this.colours[1] };
        },
        sidebarHighlightStyles(): ColourStyles {
            return { color: this.colours[2] };
        },
        coverAlt(): string {
            return albumCoverAlt(this.review);
        }
    },
    methods: {
        authorDivider,
    }
})
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .review-header {
        border-bottom: 5px solid black;
        padding-top: $site-content__spacer--large;
        padding-bottom: $site-content__spacer--x-large;
    }

    .collapsible {
        text-align: left;
    }

    .collapsible__toggle {
        display: inline;
        padding: 0.5em;
        &:active, &:focus {
            outline: none;
        }
    }

    .review-header__date {
        @include site-content__subtext;
    }

    .review-header__album, .review-header__artist, .review-header__date, .review-header__authors, .review-header__disclaimer {
        font-family: $heading-fontstack;
    }

    .review-header__heading {
        margin-top: $site-content__spacer--large;
        margin-bottom: $site-content__spacer--large;
    }

    .review-header__disclaimer {
        color: black;
        background-color: #FFE501;
        padding: 0.9em;
        font-weight: 600;
        border-radius: 5px;
        margin-top: $site-content__spacer--large;
        margin-bottom: $site-content__spacer--large;
        display: inline-block
    }

    .review-header__album {
        font-size: $site-content__font--x-large;
        padding-bottom: 0.1em;
        display: block;
    }

    .review-header__artist {
        font-size: $site-content__font--x-large * 0.9;
        display: block;
    }

    .review-header__album {
        font-weight: bold;
        font-style: italic;
    }

    .review-header__authors {
        color: $colour-grey;
        margin-top: $site-content__spacer--x-large;
    }

    .review-sidebar__album-cover-container {
        position: relative;
    }

    .review-sidebar__ribbon {
        position: absolute;
        top: -7px;
        right: 6%;
        width: 12%;
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
        bottom:0;
        left:0;
        padding: 5% 20% 5% 5%;
        opacity: 0.80;
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
        color: grey; // fallback where CSS vars aren't supported
        --fa-primary-color: #f5f5f5;
        --fa-secondary-color: black;
        margin: 8%;
        width: 8%;
        height: 8%;
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .review-sidebar__artwork-info-icon:hover {
        color: lightgray;
        cursor: pointer;
    }

    .review-sidebar__total-score, .review-sidebar__tracks {
        background: black;
        color: white;
    }

    .review-sidebar__total-score, .review-sidebar__tracks, .review-sidebar__artist-link {
        text-align: center;
        border-radius: 15px;
    }

    .review-sidebar__total-score, .review-sidebar__artist-link {
        border-top-right-radius: 0;
        border-top-left-radius: 0;
    }

    .review-sidebar__tracks--artist-link {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        margin-bottom: 3px;
    }

    .review-sidebar__tracks, .review-sidebar__artist-link {
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

    .review-sidebar__heading, .review-sidebar__total-score {
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
        &:before {
            content: open-quote;
        }
        &:after {
            content: close-quote;
        }
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
        .review-sidebar, ::v-deep .newsletter, ::v-deep .related {
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
