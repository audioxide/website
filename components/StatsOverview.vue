<template>
    <div class="stats-overview-card">
        <p>Everything below is generated using the <a href="https://api.audioxide.com/reviews.json">Audioxide API</a>. 
        It's all the stuff you wanted to know, and a few things you didn't.
        </p>
        <ul>
            <li id="review-count"></li>
            <li id="average-overall-score"></li>
            <li id="27-plus-club"></li>
        </ul>
        <p>More coming soon.</p>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'StatsOverview',
    created() {
        fetch("https://api.audioxide.com/reviews.json")
            .then(response => response.json())
            .then(data => {
                const albumCount = data.length;
                let scores = 0;
                let plusClubMembers = 0;

                for (let i = 0; i < albumCount; i++) {
                    scores += data[i].metadata.totalscore.given;
                    if (data[i].metadata.totalscore.given >= 27) plusClubMembers++
                }
                const siteWideAverageScore = scores / albumCount;

                document.getElementById('review-count').innerHTML = `To date Audioxide has reviewed ${albumCount} albums.`;
                document.getElementById('average-overall-score').innerText = `The sitewide average score is ${Math.round(siteWideAverageScore * 100) / 100} out of 30.`;
                document.getElementById('27-plus-club').innerHTML = `
                    The <a href="/tags/27-plus-club/">27+ Club</a> currently has ${plusClubMembers} members.
                    `;

            });
    }
});

</script>

<style lang="scss" scoped>

@import "~assets/styles/variables";

.stats-overview-card {
    @include site-content__body-text;
    margin: auto;
    width: 95%;
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
      width: 50%;
  }
  
}

</style>

