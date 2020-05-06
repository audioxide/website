<template>
    <main class="site-content site-content--flex" v-if="review.meta">
        <header class="review-header" :style="chromeStyles">
            <details class="collapsible">
                <summary class="collapsible__toggle">
                    <p class="content-header__date">{{ review.date }}</p>
                </summary>
                <p class="content-header__date">Last modified {{ review.modified }}</p>
            </details>
            <h1 class="review-header__heading">
                <span class="review-header__album" :style="textStyles">{{review.meta['Album Name']}}</span>
                <span class="review-header__artist">{{review.meta['Artist Name']}}</span>
            </h1>
            <p class="review-header__authors">
                <a class="review-header__author"
                v-for="(reviewItem, key) in review.reviews" :key="`reviewers-${key}`" :href="'../authors/' + reviewItem.reviewer.slug">{{reviewItem.reviewer.name}}</a>
            </p>
        </header>
        <aside class="review-sidebar">
            <img class="review-sidebar__album-cover" :src="review.featured_media.source_url">
            <p class="review-sidebar__album-info">{{ review.featured_media.description }}</p>
            <div class="review-sidebar__total-score" :style="sidebarStyles">
                <p>
                    <span class="review-sidebar__score" :styles="sidebarTextStyles">
                        {{review.meta['Overall Score'].given}}
                    </span>
                    <span class="review-sidebar__total" :styles="sidebarHighlightStyles">{{review.meta['Overall Score'].possible}}</span>
                </p>
            </div>
            <p class="review-sidebar__summary" :style="textStyles">{{ review.meta['Summary'] }}</p>
            <div class="review-sidebar__tracks" :style="sidebarStyles">
                <template v-if="review.meta['Essential Tracks'].length">
                <p class="review-sidebar__heading" :style="sidebarHighlightStyles">Essential</p>
                <p class="review-sidebar__track"
                    v-for="(track, key) in review.meta['Essential Tracks']"
                    :key="`essential-tracks-${key}`">
                    {{ track }}
                </p>
                </template>
                <template v-if="review.meta['Favourite Tracks'].length">
                <p class="review-sidebar__heading" :style="sidebarHighlightStyles">Favourites</p>
                <p class="review-sidebar__track"
                    :styles="sidebarTextStyles"
                    v-for="(track, key) in review.meta['Favourite Tracks']"
                    :key="`favourite-tracks-${key}`">
                    {{ track }}
                </p>
                </template>
            </div>
            <p class="review-sidebar__serial">No. {{ weekStr }}</p>
        </aside>
        <section class="review-content">
            <article>
                <section v-for="(reviewItem, key) in review.reviews" :key="key">
                    <h2 class="review-content__reviewer">{{reviewers[key]}}</h2>
                    <p class="review-content__reviewer-social"><a :href="reviewItem.reviewer.url">Website</a></p>
                    <div class="review-content__review">
                        <span v-html="reviewItem.body" />
                        <p class="review-content__score">
                            <span class="review-content__given" :style="textStyles">{{reviewItem.score.score}}</span>
                            <span class="review-content__possible">{{reviewItem.score.max}}</span>
                        </p>
                        <div class="review-content__favourite-tracks">
                                <span class="review-content__favourite-track"
                                    v-for="(track, tkey) in reviewItem.tracks"
                                    :key="`reviewer-tracks-${tkey}`">
                                    {{track}}
                                </span>
                        </div>
                    </div>
                    <hr class="review-content__divider" v-if="key !== review.reviews.length - 1">
                </section>
            </article>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';

type PostColours = { primary: string, secondary: string, tertiary: string };
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideReview',
    data: () => ({
        review: {} as {
            meta: {
                'Post Colours': PostColours,
                'Week Number': string,
            },
            reviews: {
                reviewer: {
                    name: string,
                }
            }[],
        },
    }),
    validate({ params, store }) {
        return store.dispatch('posts/getReview', params.slug);
    },
    async created() {
        this.review = await this.$store.dispatch('posts/getReview', this.$route.params.slug);
    },
    computed: {
        reviewers(): string[] {
            return this.review.reviews.map(review => review.reviewer.name.split(' ')[0]);
        },
        colours(): PostColours {
            return this.review.meta['Post Colours'];
        },
        weekStr(): string {
            return this.review.meta['Week Number'].padStart(7, '0');
        },
        textStyles(): ColourStyles {
            return { color: this.colours.primary };
        },
        chromeStyles(): ColourStyles {
            return { 'border-bottom-color': this.colours.primary };
        },
        sidebarStyles(): ColourStyles {
            return { 'background-color': this.colours.primary };
        },
        sidebarTextStyles(): ColourStyles {
            return { color: this.colours.secondary };
        },
        sidebarHighlightStyles(): ColourStyles {
            return { color: this.colours.tertiary };
        }
    }
})
</script>

<style lang="scss">
    @import "~assets/styles/variables";

    .review-header {
        border-bottom: 5px solid black;
        padding-bottom: $site-content__spacer--small;
    }

    @include medium {
        .review-header {
            width: 100%;
        }
    }

    .review-header__album, .review-header__artist, .review-header__date, .review-header__authors {
        font-family: $heading-fontstack;
    }

    .review-header__heading {
        margin-bottom: $site-content__spacer;
    }

    .review-header__album, .review-header__artist {
        font-size: $site-content__font--x-large;
        display: block;
    }

    .review-header__album {
        font-weight: bold;
        font-style: italic;
    }

    .review-header__date {
        @include site-content__subtext;
    }

    .review-header__authors {
        color: $colour-grey;
        &:before {
            content: "Review by";
        }
        & .review-header__author:not(:last-child):after {
            content: ",";
        }
    }

</style>

<style lang="scss">
    @import "~assets/styles/variables";

    @include medium {
        .review-sidebar {
            order: 1;
            width: $review__sidebar-size;
        }
    }

    .review-sidebar__album-cover {
        width: 100%;
    }

    .review-sidebar__album-info {
        display: none;
    }

    .review-sidebar__total-score, .review-sidebar__tracks {
        background: black;
        color: white;
        text-align: center;
    }

    .review-sidebar__heading, .review-sidebar__total-score {
        font-family: $heading-fontstack;
    }

    .review-sidebar__total-score {
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
        padding: $site-content__spacer $site-content__spacer--small;
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
        padding: $site-content__spacer--large 0;
    }

    .review-sidebar__serial {
        @include site-content__subtext;
        font-family: $heading-fontstack;
        margin-top: $site-content__spacer--small;
        text-align: right;
    }


</style>

<style lang="scss">
    @import "~assets/styles/variables";

    .review-content {
        margin-top: $site-content__spacer--large;
    }

    @include medium {
        .review-content {
            width: $site-content__content-size;
            padding-right: $site-content__spacer--xx-large;
        }
    }

    .review-content__reviewer,
    .review-content__reviewer-social,
    .review-content__score {
        font-family: $heading-fontstack;
    }

    .review-content__reviewer {
        font-weight: bold;
        font-size: $site-content__font--large;
    }

    .review-content__reviewer-social {
        @include site-content__subtext;
        margin-bottom: $site-content__spacer--small;
    }

    .review-content__review {
        margin: $site-content__spacer--large 0;
        font-family: $base-fontstack;
        /* p tags are created on the fly, so we have to target the element */
        & p:not(.review-content__score) {
            @include site-content__body-text;
        }
        &:after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .review-content__favourite-track {
        @include site-content__body-text;
        margin: 0;
        display: block;
    }

    .review-content__favourite-track:first-child:before {
        content: "Favourite tracks // ";
        font-weight: bold;
    }

    .review-content__favourite-track:nth-child(2) {
        margin-left: 195px;
    }

    .review-content__favourite-track:nth-child(3) {
        margin-left: 220px;
    }

    .review-content__score {
        float: right;
        font-size: $site-content__font--x-large;
    }

    .review-content__given {
        @include review__score-given;
    }

    .review-content__possible {
        @include review__score-possible;
    }

    .review-content__divider {
        width: 75%;
    }

</style>