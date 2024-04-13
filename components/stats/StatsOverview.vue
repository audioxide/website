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
    calculateSummaryStats(data) {
      let scores = 0
      let plusClubMembers = 0
      const reviewTypeCounts = {
        newRelease: 0,
        retrospective: 0,
        gag: 0
      }
      for (let i = 0; i < data.length; i++) {
        // Average score
        scores += data[i].metadata.totalscore.given
        // 27+ Club members
        if (data[i].metadata.totalscore.given >= 27) plusClubMembers++
        // Release type counts
        if (data[i].metadata.reviewType === 'newRelease')
          reviewTypeCounts.newRelease++
        if (data[i].metadata.reviewType === 'retrospective')
          reviewTypeCounts.retrospective++
        if (data[i].metadata.reviewType === 'gag') reviewTypeCounts.gag++
      }
      return {
        averageScore: Math.round((scores / data.length) * 100) / 100,
        plusClubMembers,
        reviewTypeCounts
      }
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
