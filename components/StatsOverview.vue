<template>
    <div class="stats-overview-card">
        <p id="review-count"></p>
        <p id="average-overall-score"></p>
        <p id="27-plus-club"></p>
    </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'StatsOverview',
    created() {
        fetch("https://gist.githubusercontent.com/frederickobrien/6c2239358cfa04d6aaf5f2275a864e56/raw/81e4a925db42361eaf1be69d3a1adfc94795ecec/reviews-data.json")
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

                document.getElementById('review-count').innerText = `Audioxide has reviewed ${albumCount} albums.`;
                document.getElementById('average-overall-score').innerText = `The sitewide average score is ${Math.round(siteWideAverageScore * 100) / 100} out of 30.`;
                document.getElementById('27-plus-club').innerText = `The 27+ Club currently has ${plusClubMembers} members.`;

            });
    }
});

</script>

<style lang="scss" scoped>

@import "~assets/styles/variables";

.stats-overview-card {
    @include site-content__body-text;
    text-align: center;
}

</style>

