<template>
  <main>
    <h2>Stats</h2>
    <stats-overview />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import StatsOverview from '@/components/StatsOverview.vue';

export default Vue.extend({
  components: { StatsOverview }
})

</script>

<style lang="scss" scoped>
    @import "~assets/styles/variables";

    h2 {
        text-align: center;
        font-size: 2em;
        font-family: $heading-fontstack;
        padding: 30px;
    }

</style>