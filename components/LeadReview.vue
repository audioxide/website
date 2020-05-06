<template>
    <div class="lead-review">
        <img :src="albumArtSrc" />
        <h3>
            <a :href="link">{{ album }}</a>
            <span>{{ artist }}</span>
        </h3>
        <p>{{ summary }}</p>
        <p>Review by
            <span v-for="(review, key) in reviews" :key="key">
                <a :href="`/authors/${(review.reviewer||{}).slug}`">{{ (review.reviewer||{}).name }}</a><span v-if="key !== reviews.length - 1">, </span>
            </span>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: ['post'],
    computed: {
        albumArtSrc() {
            return this.post.featured_media.source_url;
        },
        link() {
            return this.post.slug;
        },
        album() {
            return this.post.meta['Album Name'];
        },
        artist() {
            return this.post.meta['Artist Name'];
        },
        summary() {
            return this.post.meta['Summary'];
        },
        reviews() {
            return this.post.reviews;
        }
    }
});
</script>