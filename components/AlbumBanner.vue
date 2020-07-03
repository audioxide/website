<template>
    <div class="album-banner">
        <div class="album-banner__container">
            <div class="album-banner__art-wrapper" v-for="(album, key) in bannerData" :key="key">
                <nuxt-link :to="`/reviews/${album.slug}/`" class="album-banner__review-link">
                    <span class="album-banner__score">{{ album.score }}</span>
                    <img class="album-banner__album-art" :src="album.image" :alt="`Album cover for ${album.artist} - ${album.album}`">
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'AlbumBanner',
    async created() {
        // Add in an API endpoint that allows us to check if we have all the reviews
        // if (!store.state.posts.posts.reviews) {
            await this.$store.dispatch('getBannerData');
        // }
        return true;
    },
    computed: {
        bannerData(): PostListing<Review> {
            return this.$store.state.banner;
        },
    },
});
</script>

<style lang="scss" scoped>
    @import '~assets/styles/variables.scss';

    .album-banner {
        width: 100%;
        overflow: hidden;
        border-bottom: 0.6rem solid black;
        height: $album-banner__album-width--small;
    }

    @include small {
        .album-banner {
            height: $album-banner__album-width--medium;
        }
    }

    @include medium {
        .album-banner {
            height: $album-banner__album-width--large;
        }
    }

    .album-banner__container {
        display: flex;
    }

    .album-banner__art-wrapper {
        width: $album-banner__album-width--small;
        height: 100%;
        flex-shrink: 0;
    }

    @include small {
        .album-banner__art-wrapper {
            width: $album-banner__album-width--medium;
        }
    }

    @include medium {
        .album-banner__art-wrapper {
            width: $album-banner__album-width--large;
        }
    }

    .album-banner__review-link {
        position: relative;

        &:hover, &:focus {
            & .album-banner__score {
                opacity: 1;
                -webkit-transform:translate3d(0,0,0);
            }
        }
    }

    .album-banner__score {
        position: absolute;
        width: 100%;
        display: block;
        text-align: center;
        background: rgba(0,0,0,0.6);
        height: $album-banner__album-width--small;
        color: white;
        font-family: $logo-fontstack;
        line-height: $album-banner__album-width--small;
        font-size: 5rem;
        text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
        0px 8px 13px rgba(0,0,0,0.1),
        0px 18px 23px rgba(0,0,0,0.1);
        opacity: 0;
        transition: 0.25s opacity ease-in-out;
    }

    @include small {
        .album-banner__score {
            height: $album-banner__album-width--medium;
            line-height: $album-banner__album-width--medium;
        }
    }

    @include medium {
        .album-banner__score {
            height: $album-banner__album-width--large;
            line-height: $album-banner__album-width--large;
        }
    }

    .album-banner__album-art {
        width: 100%;
        height: 100%;
    }

    /* --Animation specific styling--

       We're using two animations in tandem.

       - One changes the order of a flexbox item. This is applied to the first half of the albums.
       - The other scrolls the artwork half way through the series (the number of albums rendered
       should match the total-albums variable)
     */

    @keyframes swapOrder {
        0% {
            order: 0;
        }

        50% {
            order: 1;
        }
    }

    @keyframes infiniteScroll {
        from {
            transform: none;
        }

        to {
            transform: translateX(
                calc(
                  (#{$album-banner__total-albums} / #{$album-banner__albums-shown--small}) * -50vw
                )
            );
        }
    }

    @include small {
        @keyframes infiniteScroll {
            from {
                transform: none;
            }

            to {
                transform: translateX(
                    calc(
                      (
                      #{$album-banner__total-albums} / #{$album-banner__albums-shown--medium}
                      ) * -50vw
                    )
                );
            }
        }
    }

    @include medium {
        @keyframes infiniteScroll {
            from {
                transform: none;
            }

            to {
                transform: translateX(
                    calc(
                      (
                      #{$album-banner__total-albums} / #{$album-banner__albums-shown--large}
                      ) * -50vw
                    )
                );
            }
        }
    }

    .album-banner__container {
        animation: infiniteScroll $album-banner__full-scroll-time linear both infinite;
        -webkit-transform:translate3d(0,0,0);

        /* We use nesting to ensure both animations are stopped */
        &:hover, &:hover .album-banner__art-wrapper {
            animation-play-state: paused;
        }
    }

    /* 11 relates to --album-banner__albums-shown--large but we can't do that in CSS */
    .album-banner__art-wrapper:nth-child(-n+11) {
        animation: swapOrder calc(#{$album-banner__full-scroll-time} * 2) step-end both infinite;
    }

    /* This slow motion might cause issues for some people, so allow people to turn it off via
    accessibility features */
    @media (prefers-reduced-motion) {
        .album-banner__container {
            &:hover, &:hover .album-banner__art-wrapper {
                animation-play-state: paused;
            }
        }
    }
</style>
