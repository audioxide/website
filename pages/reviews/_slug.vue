<template>
    <div>
    <main class="site-content site-content--flex" v-if="review.metadata">
        <header class="review-header" :style="chromeStyles">
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
                        v-if="reviewAuthorLinks[key]">{{reviewItem.author.name}}</a><span v-else>{{reviewItem.author.name}}</span>{{ key !== reviews.length - 1 ? ', ' : ''}}
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
            <img class="review-sidebar__album-cover" :src="review.metadata.featuredimage['medium-square']">
            <p class="review-sidebar__album-info">{ { review.featured_media.description } }</p>
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
                <p><a :href="review.metadata.artistLink" target="_blank">Support the artist →</a></p>
            </div>
            </template>
            <p class="review-sidebar__serial">No. {{ weekStr }}</p>
        </aside>
        <section class="review-content">
            <post-content-block :content="review.content" :colours="colours" />
            <div class="tags">
                <span v-for="(tag, key) in review.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag}`">{{tag}}</nuxt-link></span>
            </div>
        </section>
        <newsletter-signup class="newsletter" />
    </main>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PostContentBlock from '../../components/PostContentBlock.vue';
import NewsletterSignup from '../../components/NewsletterSignup.vue';
import { audioxideStructuredData, metaTitle, padNum, resolveAuthorLink } from '~/assets/utilities';
import { MetaInfo } from 'vue-meta';
import formatISO from 'date-fns/formatISO';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideReview',
    components: { PostContentBlock, NewsletterSignup },
    data: () => ({
        review: {} as Review,
    }),
    head() {
        const metadata = this.review.metadata;
        const albumArtist = metadata ? `: ${metadata.album} // ${metadata.artist}` : '';
        const pageMeta: MetaInfo = { title: metaTitle(`Review${albumArtist}`) };
        if (metadata) {
            pageMeta.script = [{
                type: 'application/ld+json',
                json: {
                    '@context': 'http://schema.org',
                    '@type': 'Review',
                    reviewBody: metadata.summary || metadata.blurb || '',
                    datePublished: formatISO(metadata.created, { representation: 'date' }),
                    author: this.reviews.map(review => ({
                        '@type': 'Person',
                        name: review.author.name,
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
                        "cssSelector": ["review-header__album", "review-header__artist", "review-sidebar__summary"]
                        },
                    publisher: audioxideStructuredData(),
                }
            }]
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
        }
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

    .review-header__album, .review-header__artist, .review-header__date, .review-header__authors {
        font-family: $heading-fontstack;
    }

    .review-header__heading {
        margin-top: $site-content__spacer--large;
        margin-bottom: $site-content__spacer--large;
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
    }

    .review-sidebar__album-cover-container {
        position: relative;
    }

    .review-sidebar__ribbon {
        position: absolute;
        top: -7px;
        right: 8%;
        width: 12%;
    }

    .review-sidebar__album-cover {
        width: 100%;
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        border-left: 1px solid #dddddd;

    }

    .review-sidebar__album-info {
        display: none;
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
        text-decoration: none;
        position: relative;
        &:hover {
            border: 2px solid lighten($colour-pink, 30%);
        }
        a {
            @include overlayLink;
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
        .review-sidebar, ::v-deep .newsletter {
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
