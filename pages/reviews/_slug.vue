<template>
    <main class="site-content site-content--flex" v-if="review.metadata">
        <header class="review-header" :style="chromeStyles">
            <details class="collapsible">
                <summary class="collapsible__toggle">
                    <p class="content-header__date">{{ review.metadata.created | formatDate }}</p>
                </summary>
                <p class="content-header__date">Last modified {{ review.metadata.modified | formatDate }}</p>
            </details>
            <h1 class="review-header__heading">
                <span class="review-header__album" :style="textStyles">{{review.metadata.album}}</span>
                <span class="review-header__artist">{{review.metadata.artist}}</span>
            </h1>
            <p class="review-header__authors">
                <span>Review by </span>
                <span v-for="(reviewItem, key) in reviews" :key="`reviewers-${key}`">
                    <a class="review-header__author" :href="'../authors/' + reviewItem.author.slug">{{reviewItem.author.name}}</a>{{ key !== reviews.length - 1 ? ', ' : ''}}
                </span>
            </p>
        </header>
        <aside class="review-sidebar">
            <img class="review-sidebar__album-cover" :src="review.metadata.featuredimage['medium-square']">
            <p class="review-sidebar__album-info">{ { review.featured_media.description } }</p>
            <div class="review-sidebar__total-score" :style="sidebarStyles">
                <span class="review-sidebar__score" :style="sidebarTextStyles">
                    {{review.metadata.totalscore.given}}
                </span>
                <span class="review-sidebar__total" :style="sidebarHighlightStyles">{{review.metadata.totalscore.possible}}</span>
            </div>
            <p class="review-sidebar__summary" :style="textStyles">{{ review.metadata.summary }}</p>
            <div class="review-sidebar__tracks" :style="sidebarStyles">
                <template v-if="review.metadata.essentialtracks.length">
                <p class="review-sidebar__heading" :style="sidebarHighlightStyles">Essential</p>
                <p class="review-sidebar__track"
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
            <p class="review-sidebar__serial">No. {{ weekStr }}</p>
        </aside>
        <section class="review-content">
            <post-content :content="review.content" :colours="colours" />
            <div class="tags">
                <span v-for="(tag, key) in review.metadata.tags" :key="key" class="tag"><nuxt-link :to="`/tags/${tag}`">{{tag}}</nuxt-link></span>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import PostContent from '../../components/PostContent.vue';
import { padNum } from '~/assets/utilities';

type PostColours = [string, string, string];
type ColourStyles = { [key: string]: string };

export default Vue.extend({
    name: 'AudioxideReview',
    components: { PostContent },
    data: () => ({
        review: {} as Review,
    }),
    validate({ params: { slug }, store }) {
        return store.dispatch('posts/getPost', {type: 'reviews', slug });
    },
    async created() {
        this.review = this.$store.state.posts.postData.reviews[this.$route.params.slug];
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
    }

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
    }

    .review-content {
        margin-top: $site-content__spacer--large;
    }

    @include medium {
        .review-content {
            width: $site-content__content-size;
            padding-right: $site-content__spacer--xx-large;
        }
    }

    .tags .tag {
        @include tag;
    }

</style>
