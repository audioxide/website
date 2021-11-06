<template>
  <header>
    <nav-bar />
    <album-banner />
  </header>
</template>

<script>
import NavBar from './NavBar.vue';
import AlbumBanner from './AlbumBanner.vue';

export default {
  name: 'AudioxideHeader',
  components: { NavBar, AlbumBanner },
};
</script>

<style scoped lang="scss">
  @import '~assets/styles/variables.scss';

  header {
    padding-top: $site-nav__bar-height;
    background-color: black;
  }
</style>
