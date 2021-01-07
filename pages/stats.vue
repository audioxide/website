<template>
    <main>
        <new-release-score-distribution />
    </main>
</template>

<script>
import Vue from 'vue';
import NewReleaseScoreDistribution from '@/components/data-viz/NewReleaseScoreDistribution.vue';

export default {
  name: 'AudioxideHeader',
  components: { NavBar, AlbumBanner },
};

</script>

<style lang="scss" scoped>
@import "~assets/styles/variables";
</style>