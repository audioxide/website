<template>
  <main>
    <h2>Stats</h2>
    <stats-overview :reviewData="{ data }" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import StatsOverview from '@/components/StatsOverview.vue'

export default Vue.extend({
  data: function() {
    return fetch(
      'https://gist.githubusercontent.com/frederickobrien/6c2239358cfa04d6aaf5f2275a864e56/raw/81e4a925db42361eaf1be69d3a1adfc94795ecec/reviews-data.json'
    )
      .then((response) => response.json())
      .then((data) => data)
  },
  components: { StatsOverview }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

h2 {
  text-align: center;
  font-size: 3em;
  font-family: $heading-fontstack;
  margin-top: 1em;
}
</style>

function fetchData() { throw new Error('Function not implemented.') } function
fetchData() { throw new Error('Function not implemented.') }
