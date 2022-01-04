<template>
  <main>
    <h2>Stats</h2>
    <stats-overview :reviewData="this.reviewData" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import StatsOverview from '@/components/StatsOverview.vue'
import { metaTitle } from '~/assets/utilities'

const apiLink = 'https://api.audioxide.com/reviews.json'
const dummyApiLinkForLocalDevelopment =
  'https://gist.githubusercontent.com/frederickobrien/6c2239358cfa04d6aaf5f2275a864e56/raw/81e4a925db42361eaf1be69d3a1adfc94795ecec/reviews-data.json'

export default Vue.extend({
  data() {
    return {
      reviewData: {}
    }
  },
  created() {
    const fetchData = async () => {
      const rawFetchedData = await fetch(apiLink)
      const formattedFetchedData = await rawFetchedData.json()
      this.reviewData = formattedFetchedData
      console.log(this.reviewData)
    }

    fetchData()
  },
  components: { StatsOverview },
  head() {
    return {
      title: metaTitle('Stats')
    }
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
