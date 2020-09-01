<template>
    <div class="lead-review">
        <img :src="albumArtSrc" />
        <span class="review-details">
            <h3>
                <span class="album">{{ album }}</span>
                <span class="artist">{{ artist }}</span>
            </h3>
            <p class="summary">{{ summary }}</p>
            <!-- <p>Review by
                <span v-for="(review, key) in reviews" :key="key">
                    <a :href="`/authors/${(review.reviewer||{}).slug}`">{{ (review.reviewer||{}).name }}</a><span v-if="key !== reviews.length - 1">, </span>
                </span>
            </p> -->
            <nuxt-link :to="link" class="cta">Read our full review</nuxt-link>
        </span>
    </div>
</template>

<script>
export default {
    props: ['post'],
    computed: {
        albumArtSrc() {
            return this.post.metadata.featuredimage['medium-square'];
        },
        link() {
            return `/reviews/${this.post.metadata.slug}`;
        },
        album() {
            return this.post.metadata.album;
        },
        artist() {
            return this.post.metadata.artist;
        },
        summary() {
            return this.post.metadata.blurb;
        },
        reviews() {
            return this.post.content;
        },
        secondaryColour() {
            return this.post.metadata.colours[1];
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    .lead-review {
        padding: 100px 0;
        display: flex;
    }

    .review-details {
        margin-left: $site-content__spacer--xx-large;
        text-shadow: 0px 1px 3px rgba(0,0,0,0.4);
        color: white;
    }

    .album {
        font-style: italic;
    }

    h3 {
        display: flex;
        flex-direction: column;
        font-family: $heading-fontstack;
        font-size: $site-content__font--x-large;
    }

    .summary {
        font-family: $base-fontstack;
        font-size: $site-content__font--large;
        margin: $site-content__spacer--x-large 0;
        line-height: $site-content__font--large;
    }

    .cta {
        font-size: $site-content__font--large;
    }

    img {
        max-height: 300px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    }
</style>
