<template>
    <div class="album-banner">
        <div class="album-banner__art-wrapper" v-for="(album, key) in bannerData" :key="key">
            <nuxt-link :to="`/reviews/${album.slug}/`" class="album-banner__review-link">
                <span class="album-banner__score">{{ album.score }}</span>
                <img class="album-banner__album-art" :src="album.image" :alt="`Album cover for ${album.artist} - ${album.album}`" width="300" height="300">
            </nuxt-link>
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
        height: 100%;
        display: flex;
        border-bottom: 0.6rem solid black;
    }

    .album-banner__review-link {
        &:hover, &:focus {
            & .album-banner__score {
                opacity: 1;
                -webkit-transform:translate3d(0,0,0);
            }
        }
    }

    .album-banner__art-wrapper {
        position: relative;
        @media (max-width: $bp_small - .1) {
            &:nth-child(4) ~ .album-banner__art-wrapper {
                display: none;
            }
        }
        @media (max-width: $bp_medium - .1) {
            &:nth-child(6) ~ .album-banner__art-wrapper {
                display: none;
            }
        }
    }

    .album-banner__score {
        position: absolute;
        width: 100%;
        height: 100%;
        line-height: 25vw;
        display: block;
        text-align: center;
        background: rgba(0,0,0,0.6);
        color: white;
        font-family: $logo-fontstack;
        font-size: 17vw;
        text-shadow: 0px 4px 3px rgba(0,0,0,0.4),
        0px 8px 13px rgba(0,0,0,0.1),
        0px 18px 23px rgba(0,0,0,0.1);
        opacity: 0;
        transition: 0.25s opacity ease-in-out;
        @include small {
            line-height: 17vw;
            font-size: 10vw;
        }
        @include medium {
            line-height: 10vw;
            font-size: 7vw;
        }
    }

    /* @include small {
        .album-banner__score {
            line-height: $album-banner__album-width--medium;
        }
    }

    @include medium {
        .album-banner__score {
            line-height: $album-banner__album-width--large;
        }
    } */

    .album-banner__album-art {
        width: 100%;
        height: 100%;
    }
</style>
