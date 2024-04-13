<template>
  <main>
    <h2>Stats</h2>
    <stats-overview :review-data="reviewData" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import StatsOverview from '@/components/stats/StatsOverview.vue'
import { metaTitle } from '~/assets/utilities'

const reviewDataLocation = 'https://api.audioxide.com/reviews.json'

export default Vue.extend({
  components: { StatsOverview },
  data() {
    return {
      reviewData: {}
    }
  },
  head() {
    return {
      title: metaTitle('Stats')
    }
  },
  created() {
    const fetchData = async () => {
      const rawFetchedData = await fetch(reviewDataLocation)
      const formattedFetchedData = await rawFetchedData.json()
      this.reviewData = formattedFetchedData
    }

    fetchData()
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

main {
  width: 90%;
  margin: auto;
}

h2 {
  text-align: center;
  font-size: 3em;
  font-family: $heading-fontstack;
  margin-top: 1em;
}

@include medium {
  main {
    width: 75%;
  }
}

@include large {
  main {
    width: 50%;
  }
}
</style>
