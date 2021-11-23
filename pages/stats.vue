<template>
  <main>
    <h2>Stats</h2>
    <p class="intro-blurb">All the stuff you wanted to know. And a few things you didn't.</p>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    created() {
  // Simple GET request using fetch
  fetch("https://gist.githubusercontent.com/frederickobrien/6c2239358cfa04d6aaf5f2275a864e56/raw/81e4a925db42361eaf1be69d3a1adfc94795ecec/reviews-data.json")
    .then(response => response.json())
    .then(data => console.log(data[0]));
}
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

    .intro-blurb {
        @include site-content__body-text;
        text-align: center;
    }

</style>