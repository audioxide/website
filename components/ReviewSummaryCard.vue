<template>
    <aside class="review-sidebar">
            <div class="review-sidebar__album-cover-container">
                <template v-if="review.metadata.totalscore.given > 26">
                    <a href="/tags/27-plus-club/" target="_blank"><img class="review-sidebar__sticker" src="~assets/img/award-platinum.png" alt="Platinum Audioxide review badge"></a>
                </template>
                <template v-if="review.metadata.totalscore.given == 26 || review.metadata.totalscore.given == 25">
                    <img class="review-sidebar__ribbon" src="~assets/img/award-gold.png" alt="Gold Audioxide review ribbon">
                </template>
                <template v-if="review.metadata.totalscore.given == 24 || review.metadata.totalscore.given == 23">
                    <img class="review-sidebar__ribbon" src="~assets/img/award-silver.png" alt="Silver Audioxide review ribbon">
                </template>
                <template v-if="review.metadata.totalscore.given == 22 || review.metadata.totalscore.given == 21">
                    <img class="review-sidebar__ribbon" src="~assets/img/award-bronze.png" alt="Bronze Audioxide review ribbon">
                </template>
            <figure>
                <img class="review-sidebar__album-cover" :alt="coverAlt" :src="review.metadata.featuredimage['medium-square']" :style="sidebarStyles" width="600" height="600" />
                <template v-if="review.metadata.artworkCredit">
                    <figcaption class="review-sidebar__artwork-info" v-if="showCredit">The album artwork of <span class="album">{{ review.metadata.album }}</span> by {{ review.metadata.artist }} {{ review.metadata.artworkCredit }} <template v-if="review.metadata.artworkCreditSource"><a :href="review.metadata.artworkCreditSource" class="review-sidebar_artwork-source-link" target="_blank" rel="noopener" aria-label="Source link">Source <icon :icon="['fa', 'external-link-alt']" /></a></template></figcaption>
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
            <p class="review-sidebar__summary" :style="textStyles">‘{{ review.metadata.summary }}’</p>
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
</template>

<script lang="ts">

import Vue from 'vue';
export default Vue.extend({
    name: 'ReviewSummaryCard',
    props: {
        
    }
});

</script>

<style lang="scss" scoped>

</style>