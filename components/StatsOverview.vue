<!-- eslint-disable prettier/prettier -->
<template>
  <div class="stats-overview-card">
    <p>
      Everything below is generated using the
      <a href="https://api.audioxide.com/reviews.json">Audioxide API</a>. It's
      all the stuff you wanted to know, and a few things you didn't.
    </p>
    <ul>
      <li id="review-count">
        To date Audioxide has reviewed {{ reviewData.length }} albums. Of these
        {{ calculateSummaryStats(reviewData).reviewTypeCounts.newRelease }} were
        new releases,
        {{ calculateSummaryStats(reviewData).reviewTypeCounts.retrospective }}
        were retrospectives, and
        {{ calculateSummaryStats(reviewData).reviewTypeCounts.gag }} weren't
        strictly serious.
      </li>
      <li id="average-overall-score">
        The sitewide average score is
        {{ calculateSummaryStats(reviewData).averageScore }} out of 30
      </li>
      <li id="27-plus-club">
        The <a href="/tags/27-plus-club/">27+ Club</a> currently has
        {{ calculateSummaryStats(reviewData).plusClubMembers }} members
      </li>
    </ul>
    <p>More coming soon.</p>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'StatsOverview',
  props: ['reviewData'],
  methods: {
    calculateAverageScore(data) {
      let scores = 0
      for (let i = 0; i < data.length; i++) {
        scores += data[i].metadata.totalscore.given
      }
      return Math.round((scores / data.length) * 100) / 100
    },
    count27PlusClubMembers(data) {
      let plusClubMembers = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].metadata.totalscore.given >= 27) plusClubMembers++
      }
      return plusClubMembers
    },
    getReviewTypeCounts(data) {
      let newRelease = 0
      let retrospective = 0
      let gag = 0
      for (let i = 0; i < data.length; i++) {
        if (data[i].metadata.reviewType === 'newRelease') newRelease++
        else if (data[i].metadata.reviewType === 'retrospective')
          retrospective++
        else if (data[i].metadata.reviewType === 'gag') gag++
        else console.log('Review type not recognised. Album is:' + data[i].metadata.title)
      }
      return {
        newRelease,
        retrospective,
        gag
      }
    },
    calculateSummaryStats(data) {
      const summaryStats = {
        averageScore: this.calculateAverageScore(data),
        plusClubMembers: this.count27PlusClubMembers(data),
        reviewTypeCounts: this.getReviewTypeCounts(data)
      }
      console.log(summaryStats)
      return summaryStats
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.stats-overview-card {
  @include site-content__body-text;
  margin: auto;
  padding-top: 1em;
  width: 90%;
  font-family: 'Spectral';
}

.stats-overview-card p {
  margin-bottom: 10px;
}

li {
  list-style-type: disc;
  list-style-position: inside;
  padding-bottom: 0.5em;
}

li:before {
  color: black;
}

@media (min-width: 1281px) {
  .stats-overview-card {
    width: 67%;
  }
}
</style>
